// Mock data for search functionality

interface SearchResult {
  id: string
  title: string
  imageUrl: string
  tags: string[]
  likes: number
  comments: number
}

const mockSearchData: SearchResult[] = [
  {
    id: "1",
    title: "Quando o código finalmente funciona depois de 5 horas debugando",
    imageUrl: "/coding-joy.png",
    tags: ["programação", "debug", "dev", "humor"],
    likes: 1245,
    comments: 89,
  },
  {
    id: "2",
    title: "Gato assustado com pepino",
    imageUrl: "/surprised-kitty.png",
    tags: ["gatos", "animais", "susto", "engraçado"],
    likes: 3421,
    comments: 156,
  },
  {
    id: "3",
    title: "Quando o professor diz que a prova está fácil",
    imageUrl: "/placeholder.svg?key=lid4u",
    tags: ["escola", "estudantes", "provas", "confuso"],
    likes: 2198,
    comments: 112,
  },
  {
    id: "4",
    title: "Expectativa vs Realidade: Home Office",
    imageUrl: "/placeholder.svg?height=100&width=100&query=home office reality",
    tags: ["trabalho", "homeoffice", "expectativa", "realidade"],
    likes: 4532,
    comments: 201,
  },
  {
    id: "5",
    title: "Quando alguém fala que PHP é a melhor linguagem",
    imageUrl: "/placeholder.svg?height=100&width=100&query=laughing developers",
    tags: ["programação", "php", "dev", "piada"],
    likes: 1876,
    comments: 245,
  },
  {
    id: "6",
    title: "Segunda-feira chegando",
    imageUrl: "/placeholder.svg?height=100&width=100&query=monday blues",
    tags: ["trabalho", "segundafeira", "cansado", "humor"],
    likes: 5421,
    comments: 178,
  },
  {
    id: "7",
    title: "Meu código em produção",
    imageUrl: "/placeholder.svg?height=100&width=100&query=broken code",
    tags: ["programação", "bugs", "produção", "dev"],
    likes: 3254,
    comments: 143,
  },
]

// Popular tags based on frequency in the mock data
const popularTags = [
  "programação",
  "humor",
  "gatos",
  "trabalho",
  "dev",
  "animais",
  "engraçado",
  "memes",
  "segundafeira",
  "bugs",
]

export function searchPosts(query: string): SearchResult[] {
  const lowercaseQuery = query.toLowerCase()

  return mockSearchData.filter((post) => {
    // Search in title
    if (post.title.toLowerCase().includes(lowercaseQuery)) {
      return true
    }

    // Search in tags
    if (post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))) {
      return true
    }

    return false
  })
}

export function getPopularTags(): string[] {
  return popularTags
}

export function getPostsByTag(tag: string): SearchResult[] {
  return mockSearchData.filter((post) => post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()))
}
