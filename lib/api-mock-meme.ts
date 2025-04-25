import { mockPosts, type MockPost } from "@/lib/mock-data"

// Simular um atraso de rede
const NETWORK_DELAY = 800

// Interface para a resposta da API
export interface MemeApiResponse {
  meme: MockPost | null
  relatedMemes: MockPost[]
}

/**
 * Simula uma chamada de API para buscar um meme específico por ID
 */
export const fetchMemeById = async (id: string): Promise<MemeApiResponse> => {
  console.log("Fetching meme with ID:", id)

  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY))

  // Encontrar o meme pelo ID - garantindo que a comparação seja feita como string
  const meme = mockPosts.find((post) => String(post.id) === String(id))

  console.log("Found meme:", meme ? "yes" : "no")

  // Se não encontrou o meme, retornar resposta vazia
  if (!meme) {
    return {
      meme: null,
      relatedMemes: [],
    }
  }

  // Encontrar memes relacionados (com tags semelhantes)
  const relatedMemes = mockPosts
    .filter((post) => String(post.id) !== String(id))
    .filter((post) => post.tags.some((tag) => meme.tags.includes(tag)))
    .slice(0, 3)

  // Retornar os dados
  return {
    meme,
    relatedMemes,
  }
}

/**
 * Simula uma chamada de API para buscar mais memes do mesmo autor
 */
export const fetchAuthorMemes = async (authorId: string | number, limit = 3): Promise<MockPost[]> => {
  // Simular atraso de rede
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY / 2))

  // Encontrar memes do mesmo autor - garantindo que a comparação seja feita como string
  const authorMemes = mockPosts.filter((post) => String(post.authorId) === String(authorId)).slice(0, limit)

  return authorMemes
}
