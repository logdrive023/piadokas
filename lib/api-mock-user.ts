import { generateMockPost, type MockPost } from "@/lib/mock-data"

// Simular um atraso de rede
const NETWORK_DELAY = 800

// Interface para comentários
interface UserComment {
  id: number
  postId: number
  postTitle: string
  content: string
  timestamp: Date
  likes: number
}

// Interface para informações do usuário
export interface UserProfile {
  id: string
  username: string
  displayName: string
  bio: string
  location: string
  website: string
  avatarUrl: string
  joinedAt: Date
  postsCount: number
  followersCount: number
  followingCount: number
  isFollowing: boolean
}

// Cache de usuários para simular um banco de dados
const usersCache = new Map<string, UserProfile>()

// Cache de seguidores
const followersCache = new Map<string, Set<string>>()

// Cache de posts por usuário
const userPostsCache = new Map<string, MockPost[]>()

// Cache de comentários por usuário
const userCommentsCache = new Map<string, UserComment[]>()

// Cache de posts curtidos por usuário
const userLikedPostsCache = new Map<string, MockPost[]>()

// Função para gerar um perfil de usuário aleatório
const generateUserProfile = (userId: string): UserProfile => {
  const username = userId.toLowerCase()
  const joinedMonthsAgo = Math.floor(Math.random() * 36) + 1 // 1 a 36 meses atrás
  const joinedAt = new Date()
  joinedAt.setMonth(joinedAt.getMonth() - joinedMonthsAgo)

  return {
    id: userId,
    username: username,
    displayName: userId.charAt(0).toUpperCase() + userId.slice(1),
    bio: `Olá! Sou ${username} e adoro compartilhar memes engraçados.`,
    location:
      ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Brasília", "Curitiba"][Math.floor(Math.random() * 5)] +
      ", Brasil",
    website: Math.random() > 0.3 ? `https://${username}.com.br` : "",
    avatarUrl: `/abstract-user-icon.png?height=80&width=80&query=user avatar ${userId}`,
    joinedAt,
    postsCount: Math.floor(Math.random() * 200) + 5,
    followersCount: Math.floor(Math.random() * 2000) + 10,
    followingCount: Math.floor(Math.random() * 500) + 5,
    isFollowing: Math.random() > 0.7,
  }
}

// Função para gerar comentários aleatórios para um usuário
const generateUserComments = (userId: string, count: number): UserComment[] => {
  return Array.from({ length: count }, (_, i) => {
    const postId = Math.floor(Math.random() * 100) + 1
    return {
      id: i + 1,
      postId,
      postTitle: `Meme super engraçado #${postId}`,
      content: [
        `Este meme é incrível! 😂`,
        `Eu não aguento mais rir disso! 🤣`,
        `Isso me lembra quando eu estava programando às 3 da manhã...`,
        `Muito bom! Vou compartilhar com meus amigos.`,
        `Esse é o melhor meme que vi hoje!`,
        `Quem mais se identifica? 😅`,
        `Isso é tão real que dói!`,
        `Eu toda segunda-feira...`,
      ][Math.floor(Math.random() * 8)],
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 3600 * 1000),
      likes: Math.floor(Math.random() * 50),
    }
  })
}

// Função para gerar posts aleatórios para um usuário
const generateUserPosts = (userId: string, count: number): MockPost[] => {
  return Array.from({ length: count }, (_, i) => {
    return generateMockPost(i, userId)
  })
}

// Função para buscar o perfil de um usuário
export const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY))

  // Verificar se o usuário já está em cache
  if (!usersCache.has(userId)) {
    usersCache.set(userId, generateUserProfile(userId))
  }

  return usersCache.get(userId)!
}

// Função para atualizar o perfil de um usuário
export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY))

  // Buscar o perfil atual
  const currentProfile = await fetchUserProfile(userId)

  // Aplicar as atualizações
  const updatedProfile = {
    ...currentProfile,
    ...updates,
  }

  // Atualizar o cache
  usersCache.set(userId, updatedProfile)

  return updatedProfile
}

// Função para buscar os posts de um usuário com paginação
export const fetchUserPosts = async (
  userId: string,
  page = 1,
  pageSize = 5,
): Promise<{
  posts: MockPost[]
  totalPosts: number
  totalPages: number
  currentPage: number
  hasMore: boolean
}> => {
  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY))

  // Verificar se os posts do usuário já estão em cache
  if (!userPostsCache.has(userId)) {
    // Obter o perfil do usuário para saber quantos posts ele tem
    const userProfile = await fetchUserProfile(userId)
    const postsCount = userProfile.postsCount

    // Gerar posts aleatórios para o usuário
    userPostsCache.set(userId, generateUserPosts(userId, postsCount))
  }

  const userPosts = userPostsCache.get(userId)!

  // Calcular o número total de páginas
  const totalPages = Math.ceil(userPosts.length / pageSize)

  // Calcular índices de início e fim para a página atual
  const startIndex = (page - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, userPosts.length)

  // Obter posts para a página atual
  const paginatedPosts = userPosts.slice(startIndex, endIndex)

  // Verificar se há mais páginas
  const hasMore = page < totalPages

  return {
    posts: paginatedPosts,
    totalPosts: userPosts.length,
    totalPages,
    currentPage: page,
    hasMore,
  }
}

// Função para buscar os comentários de um usuário com paginação
export const fetchUserComments = async (
  userId: string,
  page = 1,
  pageSize = 5,
): Promise<{
  comments: UserComment[]
  totalComments: number
  totalPages: number
  currentPage: number
  hasMore: boolean
}> => {
  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY))

  // Verificar se os comentários do usuário já estão em cache
  if (!userCommentsCache.has(userId)) {
    // Gerar um número aleatório de comentários (entre 10 e 50)
    const commentsCount = Math.floor(Math.random() * 40) + 10

    // Gerar comentários aleatórios para o usuário
    userCommentsCache.set(userId, generateUserComments(userId, commentsCount))
  }

  const userComments = userCommentsCache.get(userId)!

  // Calcular o número total de páginas
  const totalPages = Math.ceil(userComments.length / pageSize)

  // Calcular índices de início e fim para a página atual
  const startIndex = (page - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, userComments.length)

  // Obter comentários para a página atual
  const paginatedComments = userComments.slice(startIndex, endIndex)

  // Verificar se há mais páginas
  const hasMore = page < totalPages

  return {
    comments: paginatedComments,
    totalComments: userComments.length,
    totalPages,
    currentPage: page,
    hasMore,
  }
}

// Função para buscar os posts curtidos por um usuário com paginação
export const fetchUserLikedPosts = async (
  userId: string,
  page = 1,
  pageSize = 5,
): Promise<{
  posts: MockPost[]
  totalPosts: number
  totalPages: number
  currentPage: number
  hasMore: boolean
}> => {
  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY))

  // Verificar se os posts curtidos pelo usuário já estão em cache
  if (!userLikedPostsCache.has(userId)) {
    // Gerar um número aleatório de posts curtidos (entre 5 e 30)
    const likedPostsCount = Math.floor(Math.random() * 25) + 5

    // Gerar posts aleatórios curtidos pelo usuário
    const likedPosts = Array.from({ length: likedPostsCount }, (_, i) => {
      // Gerar um post com um autor diferente do usuário atual
      const randomAuthor = `usuario${Math.floor(Math.random() * 20) + 1}`
      return generateMockPost(i * 3, randomAuthor !== userId ? randomAuthor : `outro${randomAuthor}`)
    })

    userLikedPostsCache.set(userId, likedPosts)
  }

  const likedPosts = userLikedPostsCache.get(userId)!

  // Calcular o número total de páginas
  const totalPages = Math.ceil(likedPosts.length / pageSize)

  // Calcular índices de início e fim para a página atual
  const startIndex = (page - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, likedPosts.length)

  // Obter posts para a página atual
  const paginatedPosts = likedPosts.slice(startIndex, endIndex)

  // Verificar se há mais páginas
  const hasMore = page < totalPages

  return {
    posts: paginatedPosts,
    totalPosts: likedPosts.length,
    totalPages,
    currentPage: page,
    hasMore,
  }
}

// Função para seguir um usuário
export const followUser = async (
  userId: string,
  currentUserId: string,
): Promise<{
  success: boolean
  isFollowing: boolean
  followersCount: number
}> => {
  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY))

  // Buscar o perfil do usuário
  const userProfile = await fetchUserProfile(userId)

  // Verificar se o conjunto de seguidores para este usuário já existe
  if (!followersCache.has(userId)) {
    followersCache.set(userId, new Set())
  }

  const followers = followersCache.get(userId)!

  // Verificar se o usuário atual já está seguindo
  const isAlreadyFollowing = followers.has(currentUserId)

  if (isAlreadyFollowing) {
    // Se já está seguindo, não faz nada
    return {
      success: true,
      isFollowing: true,
      followersCount: userProfile.followersCount,
    }
  }

  // Adicionar o usuário atual aos seguidores
  followers.add(currentUserId)

  // Atualizar a contagem de seguidores no perfil
  const updatedProfile = await updateUserProfile(userId, {
    followersCount: userProfile.followersCount + 1,
    isFollowing: true,
  })

  return {
    success: true,
    isFollowing: true,
    followersCount: updatedProfile.followersCount,
  }
}

// Função para deixar de seguir um usuário
export const unfollowUser = async (
  userId: string,
  currentUserId: string,
): Promise<{
  success: boolean
  isFollowing: boolean
  followersCount: number
}> => {
  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY))

  // Buscar o perfil do usuário
  const userProfile = await fetchUserProfile(userId)

  // Verificar se o conjunto de seguidores para este usuário já existe
  if (!followersCache.has(userId)) {
    followersCache.set(userId, new Set())

    // Se o conjunto não existia, o usuário atual não estava seguindo
    return {
      success: true,
      isFollowing: false,
      followersCount: userProfile.followersCount,
    }
  }

  const followers = followersCache.get(userId)!

  // Verificar se o usuário atual está seguindo
  const isFollowing = followers.has(currentUserId)

  if (!isFollowing) {
    // Se não está seguindo, não faz nada
    return {
      success: true,
      isFollowing: false,
      followersCount: userProfile.followersCount,
    }
  }

  // Remover o usuário atual dos seguidores
  followers.delete(currentUserId)

  // Atualizar a contagem de seguidores no perfil
  const updatedProfile = await updateUserProfile(userId, {
    followersCount: Math.max(0, userProfile.followersCount - 1),
    isFollowing: false,
  })

  return {
    success: true,
    isFollowing: false,
    followersCount: updatedProfile.followersCount,
  }
}

// Função para alternar entre seguir e deixar de seguir
export const toggleFollowUser = async (
  userId: string,
  currentUserId: string,
): Promise<{
  success: boolean
  isFollowing: boolean
  followersCount: number
}> => {
  // Buscar o perfil do usuário para verificar se já está seguindo
  const userProfile = await fetchUserProfile(userId)

  if (userProfile.isFollowing) {
    return unfollowUser(userId, currentUserId)
  } else {
    return followUser(userId, currentUserId)
  }
}
