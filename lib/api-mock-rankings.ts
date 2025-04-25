import { mockPosts, type MockPost } from "@/lib/mock-data"

// Simular um atraso de rede
const NETWORK_DELAY = 800

// Interface para os dados de ranking
export interface RankingPost extends MockPost {
  position: number
  views: number
}

export interface RankingUser {
  id: string
  username: string
  avatar: string
  postCount: number
  totalLikes: number
  position: number
}

export interface RankingResponse {
  posts: RankingPost[]
  users: RankingUser[]
  period: "day" | "week" | "month" | "allTime"
  totalPages: number
  currentPage: number
}

// Função para gerar visualizações baseadas em curtidas e comentários
const generateViews = (likes: number, comments: number): number => {
  return likes * 5 + comments * 10 + Math.floor(Math.random() * 1000)
}

// Função para ordenar posts por popularidade (likes + comentários)
const sortPostsByPopularity = (posts: MockPost[]): MockPost[] => {
  return [...posts].sort((a, b) => {
    const scoreA = a.likes * 2 + a.comments * 3
    const scoreB = b.likes * 2 + b.comments * 3
    return scoreB - scoreA
  })
}

// Função para gerar usuários populares baseados nos posts
const generateTopUsers = (posts: MockPost[], count = 10): RankingUser[] => {
  // Agrupar posts por autor
  const userMap = new Map<string, { posts: MockPost[]; id: string; username: string }>()

  posts.forEach((post) => {
    if (!userMap.has(post.authorId)) {
      userMap.set(post.authorId, {
        posts: [],
        id: post.authorId,
        username: post.author,
      })
    }
    userMap.get(post.authorId)?.posts.push(post)
  })

  // Converter para array e calcular métricas
  const users = Array.from(userMap.values()).map((user) => {
    const totalLikes = user.posts.reduce((sum, post) => sum + post.likes, 0)
    const postCount = user.posts.length

    return {
      id: user.id,
      username: user.username,
      avatar: `/abstract-user-icon.png?height=40&width=40&query=user avatar ${user.id}`,
      postCount,
      totalLikes,
      position: 0, // Será definido após a ordenação
    }
  })

  // Ordenar por total de curtidas
  const sortedUsers = users.sort((a, b) => b.totalLikes - a.totalLikes).slice(0, count)

  // Definir posições
  sortedUsers.forEach((user, index) => {
    user.position = index + 1
  })

  return sortedUsers
}

// Função para simular a obtenção de rankings para diferentes períodos
export const fetchRankings = async (
  period: "day" | "week" | "month" | "allTime" = "day",
  page = 1,
  pageSize = 10,
): Promise<RankingResponse> => {
  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY))

  // Filtrar posts com base no período
  let filteredPosts: MockPost[] = []
  const now = new Date()

  switch (period) {
    case "day":
      // Posts das últimas 24 horas
      filteredPosts = mockPosts.filter((post) => {
        const postDate = new Date(post.timestamp)
        const diffHours = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60)
        return diffHours <= 24
      })
      break
    case "week":
      // Posts da última semana
      filteredPosts = mockPosts.filter((post) => {
        const postDate = new Date(post.timestamp)
        const diffDays = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24)
        return diffDays <= 7
      })
      break
    case "month":
      // Posts do último mês
      filteredPosts = mockPosts.filter((post) => {
        const postDate = new Date(post.timestamp)
        const diffDays = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24)
        return diffDays <= 30
      })
      break
    case "allTime":
      // Todos os posts
      filteredPosts = [...mockPosts]
      break
  }

  // Se não houver posts suficientes para o período, usar todos os posts
  if (filteredPosts.length < 5) {
    filteredPosts = [...mockPosts]
  }

  // Ordenar posts por popularidade
  const sortedPosts = sortPostsByPopularity(filteredPosts)

  // Adicionar posição e visualizações aos posts
  const rankingPosts: RankingPost[] = sortedPosts.map((post, index) => ({
    ...post,
    position: index + 1,
    views: generateViews(post.likes, post.comments),
  }))

  // Paginação
  const totalPages = Math.ceil(rankingPosts.length / pageSize)
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedPosts = rankingPosts.slice(startIndex, endIndex)

  // Gerar usuários populares
  const topUsers = generateTopUsers(filteredPosts)

  return {
    posts: paginatedPosts,
    users: topUsers,
    period,
    totalPages,
    currentPage: page,
  }
}

// Função para obter os posts mais populares para a página inicial
export const fetchTrendingPosts = async (limit = 5): Promise<RankingPost[]> => {
  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY / 2))

  // Ordenar todos os posts por popularidade
  const sortedPosts = sortPostsByPopularity(mockPosts)

  // Adicionar posição e visualizações aos posts
  const rankingPosts: RankingPost[] = sortedPosts.slice(0, limit).map((post, index) => ({
    ...post,
    position: index + 1,
    views: generateViews(post.likes, post.comments),
  }))

  return rankingPosts
}

// Função para obter as tags mais populares
export const fetchPopularTags = async (): Promise<{ tag: string; count: number }[]> => {
  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY / 2))

  // Contar ocorrências de cada tag
  const tagCounts = new Map<string, number>()

  mockPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      const count = tagCounts.get(tag) || 0
      tagCounts.set(tag, count + 1)
    })
  })

  // Converter para array e ordenar por contagem
  const popularTags = Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15)

  return popularTags
}
