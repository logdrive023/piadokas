import { mockPosts, generateMockPost, type MockPost } from "@/lib/mock-data"

// Simular um atraso de rede
const NETWORK_DELAY = 800

// Número total de posts disponíveis no "banco de dados"
const TOTAL_POSTS = 100

// Tamanho da página padrão
const DEFAULT_PAGE_SIZE = 5

// Cache de posts para simular um banco de dados
let postsCache: MockPost[] = [...mockPosts]

// Inicializar o cache de posts com posts adicionais gerados
const initializePostsCache = () => {
  if (postsCache.length <= mockPosts.length) {
    // Adicionar posts gerados ao cache apenas se ainda não foram adicionados
    const additionalPosts = Array.from({ length: TOTAL_POSTS - mockPosts.length }, (_, i) =>
      generateMockPost(i + mockPosts.length),
    )
    postsCache = [...mockPosts, ...additionalPosts]
  }
}

// Função para simular uma chamada de API para buscar posts
export const fetchPosts = async (
  page = 1,
  pageSize: number = DEFAULT_PAGE_SIZE,
  sortBy: "newest" | "popular" | "comments" = "newest",
  filter?: string,
): Promise<{
  posts: MockPost[]
  totalPosts: number
  totalPages: number
  currentPage: number
  hasMore: boolean
}> => {
  // Inicializar o cache se ainda não estiver inicializado
  initializePostsCache()

  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY))

  // Filtrar posts se necessário
  let filteredPosts = [...postsCache]

  if (filter) {
    const lowercaseFilter = filter.toLowerCase()
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowercaseFilter) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowercaseFilter)) ||
        post.author.toLowerCase().includes(lowercaseFilter),
    )
  }

  // Ordenar posts
  switch (sortBy) {
    case "newest":
      filteredPosts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      break
    case "popular":
      filteredPosts.sort((a, b) => b.likes - a.likes)
      break
    case "comments":
      filteredPosts.sort((a, b) => b.comments - a.comments)
      break
  }

  // Calcular o número total de páginas
  const totalPages = Math.ceil(filteredPosts.length / pageSize)

  // Calcular índices de início e fim para a página atual
  const startIndex = (page - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, filteredPosts.length)

  // Obter posts para a página atual
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

  // Verificar se há mais páginas
  const hasMore = page < totalPages

  // Retornar os dados
  return {
    posts: paginatedPosts,
    totalPosts: filteredPosts.length,
    totalPages,
    currentPage: page,
    hasMore,
  }
}

// Função para buscar posts por tag
export const fetchPostsByTag = async (
  tag: string,
  page = 1,
  pageSize: number = DEFAULT_PAGE_SIZE,
): Promise<{
  posts: MockPost[]
  totalPages: number
  currentPage: number
  hasMore: boolean
}> => {
  // Inicializar o cache se ainda não estiver inicializado
  initializePostsCache()

  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY))

  // Filtrar posts pela tag
  const filteredPosts = postsCache.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))

  // Calcular o número total de páginas
  const totalPages = Math.ceil(filteredPosts.length / pageSize)

  // Calcular índices de início e fim para a página atual
  const startIndex = (page - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, filteredPosts.length)

  // Obter posts para a página atual
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

  // Verificar se há mais páginas
  const hasMore = page < totalPages

  // Retornar os dados
  return {
    posts: paginatedPosts,
    totalPages,
    currentPage: page,
    hasMore,
  }
}

// Função para buscar posts por autor
export const fetchPostsByAuthor = async (
  authorId: string,
  page = 1,
  pageSize: number = DEFAULT_PAGE_SIZE,
): Promise<{
  posts: MockPost[]
  totalPages: number
  currentPage: number
  hasMore: boolean
}> => {
  // Inicializar o cache se ainda não estiver inicializado
  initializePostsCache()

  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY))

  // Filtrar posts pelo autor
  const filteredPosts = postsCache.filter((post) => String(post.authorId) === String(authorId))

  // Calcular o número total de páginas
  const totalPages = Math.ceil(filteredPosts.length / pageSize)

  // Calcular índices de início e fim para a página atual
  const startIndex = (page - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, filteredPosts.length)

  // Obter posts para a página atual
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

  // Verificar se há mais páginas
  const hasMore = page < totalPages

  // Retornar os dados
  return {
    posts: paginatedPosts,
    totalPages,
    currentPage: page,
    hasMore,
  }
}

// Função para buscar posts populares
export const fetchTrendingPosts = async (limit = 5): Promise<MockPost[]> => {
  // Inicializar o cache se ainda não estiver inicializado
  initializePostsCache()

  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY / 2))

  // Ordenar por popularidade (likes + comentários)
  const sortedPosts = [...postsCache].sort((a, b) => {
    const scoreA = a.likes * 2 + a.comments * 3
    const scoreB = b.likes * 2 + b.comments * 3
    return scoreB - scoreA
  })

  // Retornar os posts mais populares
  return sortedPosts.slice(0, limit)
}

// Função para buscar tags populares
export const fetchPopularTags = async (limit = 15): Promise<{ tag: string; count: number }[]> => {
  // Inicializar o cache se ainda não estiver inicializado
  initializePostsCache()

  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY / 2))

  // Contar ocorrências de cada tag
  const tagCounts = new Map<string, number>()

  postsCache.forEach((post) => {
    post.tags.forEach((tag) => {
      const count = tagCounts.get(tag) || 0
      tagCounts.set(tag, count + 1)
    })
  })

  // Converter para array e ordenar por contagem
  const popularTags = Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)

  return popularTags
}

// Função para simular uma ação de curtir um post
export const likePost = async (
  postId: string | number,
  increment = true,
): Promise<{
  success: boolean
  likes: number
}> => {
  // Inicializar o cache se ainda não estiver inicializado
  initializePostsCache()

  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY / 2))

  // Encontrar o post pelo ID
  const postIndex = postsCache.findIndex((post) => String(post.id) === String(postId))

  if (postIndex === -1) {
    return {
      success: false,
      likes: 0,
    }
  }

  // Atualizar o número de curtidas
  if (increment) {
    postsCache[postIndex].likes += 1
  } else {
    postsCache[postIndex].likes = Math.max(0, postsCache[postIndex].likes - 1)
  }

  return {
    success: true,
    likes: postsCache[postIndex].likes,
  }
}

// Função para adicionar um comentário a um post
export const addComment = async (
  postId: string | number,
  comment: string,
  author: string,
): Promise<{
  success: boolean
  commentCount: number
}> => {
  // Inicializar o cache se ainda não estiver inicializado
  initializePostsCache()

  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY))

  // Encontrar o post pelo ID
  const postIndex = postsCache.findIndex((post) => String(post.id) === String(postId))

  if (postIndex === -1) {
    return {
      success: false,
      commentCount: 0,
    }
  }

  // Incrementar o contador de comentários
  postsCache[postIndex].comments += 1

  return {
    success: true,
    commentCount: postsCache[postIndex].comments,
  }
}
