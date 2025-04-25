// Mock data for the application

export interface MockPost {
  id: string
  title: string
  content?: string
  author: string
  authorId: string
  timestamp: Date
  imageUrl: string
  isVideo: boolean
  likes: number
  comments: number
  tags: string[]
}

// Memes com IDs fixos para garantir consistência entre navegações
export const mockPosts: MockPost[] = [
  {
    id: "meme-1",
    title: "Quando o código funciona de primeira tentativa",
    content: "Esse momento raro merece ser celebrado!",
    author: "usuario9",
    authorId: "user-234",
    timestamp: new Date("2025-04-23T12:49:31.140Z"),
    imageUrl: "/coding-joy.png",
    isVideo: false,
    likes: 357,
    comments: 23,
    tags: ["programação", "código", "dev", "humor"],
  },
  {
    id: "meme-2",
    title: "Gato assustado com pepino",
    content: "A cara de todo programador quando vê o próprio código depois de 6 meses.",
    author: "usuario95",
    authorId: "user-864",
    timestamp: new Date("2025-04-22T03:16:54.084Z"),
    imageUrl: "/surprised-kitty.png",
    isVideo: false,
    likes: 92,
    comments: 10,
    tags: ["gatos", "animais", "susto", "engraçado"],
  },
  {
    id: "meme-3",
    title: "Programador às 3 da manhã",
    content: "Quem nunca passou por isso?",
    author: "usuario50",
    authorId: "user-854",
    timestamp: new Date("2025-04-23T13:26:03.176Z"),
    imageUrl: "/images/meme1.jpg",
    isVideo: false,
    likes: 187,
    comments: 8,
    tags: ["programação", "madrugada", "café", "dev"],
  },
  {
    id: "meme-4",
    title: "Quando alguém pergunta se estou bem",
    content: "Minha reação quando o chefe pede para fazer hora extra na sexta.",
    author: "usuario31",
    authorId: "user-144",
    timestamp: new Date("2025-04-24T15:34:11.084Z"),
    imageUrl: "/surprised-kitty.png",
    isVideo: false,
    likes: 923,
    comments: 12,
    tags: ["trabalho", "humor", "cansado", "meme"],
  },
  {
    id: "meme-5",
    title: "Expectativa vs Realidade: Home Office",
    content: "Trabalhar de casa eles disseram, seria produtivo eles disseram...",
    author: "usuario14",
    authorId: "user-459",
    timestamp: new Date("2025-04-19T05:15:31.199Z"),
    imageUrl: "/images/meme3.jpg",
    isVideo: false,
    likes: 694,
    comments: 7,
    tags: ["homeoffice", "trabalho", "expectativa", "realidade"],
  },
  {
    id: "meme-6",
    title: "Segunda-feira chegando",
    content: "Ninguém está pronto para a segunda-feira.",
    author: "usuario86",
    authorId: "user-255",
    timestamp: new Date("2025-04-24T22:35:50.180Z"),
    imageUrl: "/images/meme4.jpg",
    isVideo: false,
    likes: 743,
    comments: 13,
    tags: ["segunda", "trabalho", "cansado", "humor"],
  },
  {
    id: "meme-7",
    title: "Meu código em produção",
    content: "Bugs? Que bugs?",
    author: "usuario45",
    authorId: "user-199",
    timestamp: new Date("2025-04-22T15:12:34.255Z"),
    imageUrl: "/coding-joy.png",
    isVideo: false,
    likes: 510,
    comments: 46,
    tags: ["programação", "bugs", "código", "dev"],
  },
  {
    id: "meme-8",
    title: "Quando o cliente explica o que quer",
    content: "Esse momento raro merece ser celebrado!",
    author: "usuario75",
    authorId: "user-976",
    timestamp: new Date("2025-04-20T03:48:29.700Z"),
    imageUrl: "/surprised-kitty.png",
    isVideo: false,
    likes: 624,
    comments: 30,
    tags: ["programação", "código", "dev", "humor"],
  },
  {
    id: "meme-9",
    title: "Quando encontro um bug no meu código",
    content: "Não era um bug, era uma feature!",
    author: "usuario22",
    authorId: "user-333",
    timestamp: new Date("2025-04-21T09:22:15.123Z"),
    imageUrl: "/surprised-at-pump.png",
    isVideo: false,
    likes: 421,
    comments: 18,
    tags: ["programação", "bugs", "código", "dev"],
  },
  {
    id: "meme-10",
    title: "Reunião que poderia ter sido um email",
    content: "Uma hora depois e ainda estamos discutindo o mesmo ponto...",
    author: "usuario67",
    authorId: "user-512",
    timestamp: new Date("2025-04-18T14:30:45.789Z"),
    imageUrl: "/monday-cat-slump.png",
    isVideo: false,
    likes: 876,
    comments: 42,
    tags: ["trabalho", "reunião", "escritório", "humor"],
  },
]

// Função para gerar posts adicionais se necessário
export function generateMockPost(index: number): MockPost {
  // Usar um ID previsível baseado no índice para garantir consistência
  const id = `generated-meme-${index + 100}`

  // Usar o índice para selecionar elementos de forma determinística
  const titleIndex = index % mockTitles.length
  const contentIndex = index % mockContent.length
  const imageIndex = index % mockImageUrls.length
  const tagIndex = index % mockTagSets.length

  return {
    id,
    title: mockTitles[titleIndex],
    content: mockContent[contentIndex],
    author: `usuario${(index * 7) % 100}`,
    authorId: `user-${(index * 13) % 1000}`,
    timestamp: new Date(new Date().getTime() - index * 12 * 60 * 60 * 1000), // Datas espaçadas
    imageUrl: mockImageUrls[imageIndex],
    isVideo: index % 10 === 0, // Apenas 10% são vídeos
    likes: 100 + ((index * 17) % 900),
    comments: 5 + ((index * 3) % 45),
    tags: mockTagSets[tagIndex],
  }
}

// Arrays para a função generateMockPost
const mockImageUrls = [
  "/coding-joy.png",
  "/surprised-kitty.png",
  "/images/meme1.jpg",
  "/images/meme2.jpg",
  "/images/meme3.jpg",
  "/images/meme4.jpg",
]

const mockTitles = [
  "Quando o código funciona de primeira tentativa",
  "Gato assustado com pepino",
  "Programador às 3 da manhã",
  "Quando alguém pergunta se estou bem",
  "Expectativa vs Realidade: Home Office",
  "Segunda-feira chegando",
  "Meu código em produção",
  "Quando o cliente explica o que quer",
]

const mockContent = [
  "Esse momento raro merece ser celebrado!",
  "A cara de todo programador quando vê o próprio código depois de 6 meses.",
  "Quem nunca passou por isso?",
  "Minha reação quando o chefe pede para fazer hora extra na sexta.",
  "Trabalhar de casa eles disseram, seria produtivo eles disseram...",
  "Ninguém está pronto para a segunda-feira.",
  "Bugs? Que bugs?",
]

const mockTagSets = [
  ["programação", "código", "dev", "humor"],
  ["gatos", "animais", "susto", "engraçado"],
  ["programação", "madrugada", "café", "dev"],
  ["trabalho", "humor", "cansado", "meme"],
  ["homeoffice", "trabalho", "expectativa", "realidade"],
  ["segunda", "trabalho", "cansado", "humor"],
  ["programação", "bugs", "código", "dev"],
]
