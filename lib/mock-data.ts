// Mock data for the application

import { v4 as uuidv4 } from "uuid"

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

// Array of mock image URLs
const mockImageUrls = [
  "/coding-joy.png",
  "/surprised-kitty.png",
  "/images/meme1.jpg",
  "/images/meme2.jpg",
  "/images/meme3.jpg",
  "/images/meme4.jpg",
]

// Array of mock titles
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

// Array of mock content
const mockContent = [
  "Esse momento raro merece ser celebrado!",
  "A cara de todo programador quando vê o próprio código depois de 6 meses.",
  "Quem nunca passou por isso?",
  "Minha reação quando o chefe pede para fazer hora extra na sexta.",
  "Trabalhar de casa eles disseram, seria produtivo eles disseram...",
  "Ninguém está pronto para a segunda-feira.",
  "Bugs? Que bugs?",
]

// Array of mock tags
const mockTagSets = [
  ["programação", "código", "dev", "humor"],
  ["gatos", "animais", "susto", "engraçado"],
  ["programação", "madrugada", "café", "dev"],
  ["trabalho", "humor", "cansado", "meme"],
  ["homeoffice", "trabalho", "expectativa", "realidade"],
  ["segunda", "trabalho", "cansado", "humor"],
  ["programação", "bugs", "código", "dev"],
]

// Function to generate a mock post
export function generateMockPost(index: number): MockPost {
  const now = new Date()
  const id = uuidv4()
  const randomIndex = Math.floor(Math.random() * mockTitles.length)

  return {
    id,
    title: mockTitles[randomIndex % mockTitles.length],
    content: mockContent[randomIndex % mockContent.length],
    author: `usuario${Math.floor(Math.random() * 100)}`,
    authorId: `user-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date(now.getTime() - Math.random() * 10 * 24 * 60 * 60 * 1000), // Random date within last 10 days
    imageUrl: mockImageUrls[randomIndex % mockImageUrls.length],
    isVideo: Math.random() > 0.9, // 10% chance of being a video
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 50),
    tags: mockTagSets[randomIndex % mockTagSets.length],
  }
}

// Generate a set of mock posts
export const mockPosts: MockPost[] = Array.from({ length: 10 }, (_, i) => generateMockPost(i))
