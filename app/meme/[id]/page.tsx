"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { mockPosts, type MockPost } from "@/lib/mock-data"
import CommentSection from "@/components/comment-section"
import ShareButtons from "@/components/share-buttons"
import { HorizontalAd } from "@/components/horizontal-ad"
import { SidebarAd } from "@/components/sidebar-ad"

export default function MemePage() {
  const params = useParams()
  const router = useRouter()
  const [meme, setMeme] = useState<MockPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [relatedMemes, setRelatedMemes] = useState<MockPost[]>([])

  useEffect(() => {
    // Simular carregamento do meme
    setIsLoading(true)

    setTimeout(() => {
      // Encontrar o meme pelo ID
      const id = params.id as string
      const foundMeme =
        mockPosts.find((post) => post.id.toString() === id) || mockPosts[Math.floor(Math.random() * mockPosts.length)]

      setMeme(foundMeme)

      // Encontrar memes relacionados (com tags semelhantes)
      if (foundMeme) {
        const related = mockPosts
          .filter((post) => post.id !== foundMeme.id)
          .filter((post) => post.tags.some((tag) => foundMeme.tags.includes(tag)))
          .slice(0, 3)

        setRelatedMemes(related)
      }

      setIsLoading(false)
    }, 500)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!meme) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => router.back()} className="flex items-center text-purple-400">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Voltar</span>
            </Button>
          </div>

          <Card className="bg-gray-800 border-gray-700 p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Meme não encontrado</h1>
            <p className="text-gray-300 mb-6">O meme que você está procurando não existe ou foi removido.</p>
            <Link href="/">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Voltar para a página inicial</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  const formattedDate =
    typeof meme.timestamp === "string"
      ? meme.timestamp
      : meme.timestamp.toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-8">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => router.back()} className="flex items-center text-purple-400">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Voltar</span>
            </Button>
          </div>

          <Card className="bg-gray-800 border-gray-700 overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-700">
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-3">{meme.title}</h1>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage
                      src={`/abstract-user-icon.png?height=40&width=40&query=user avatar ${meme.authorId}`}
                    />
                    <AvatarFallback>{meme.author[0]}</AvatarFallback>
                  </Avatar>
                  <Link href={`/user/${meme.authorId}`} className="text-sm font-medium hover:underline mr-2 text-white">
                    {meme.author}
                  </Link>
                  <span className="text-xs text-gray-400">{formattedDate}</span>
                </div>

                <div className="flex items-center">
                  <ShareButtons url={`https://memeverse.com/meme/${meme.id}`} title={meme.title} />
                </div>
              </div>

              {meme.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {meme.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gray-900 flex justify-center">
              {meme.isVideo ? (
                <div className="w-full">
                  <video className="w-full max-h-[80vh] object-contain" controls poster={meme.imageUrl} playsInline>
                    <source src="#" type="video/mp4" />
                    Seu navegador não suporta vídeos.
                  </video>
                </div>
              ) : (
                <div className="w-full">
                  <img
                    src={meme.imageUrl || "/placeholder.svg"}
                    alt={meme.title}
                    className="w-full max-h-[80vh] object-contain"
                  />
                </div>
              )}
            </div>

            <div className="p-4">
              {meme.content && <p className="text-gray-300 mb-4">{meme.content}</p>}

              <div className="flex items-center gap-4">
                <span className="flex items-center text-sm text-gray-300">
                  <span className="font-medium text-white">{meme.likes}</span>
                  <span className="ml-1">curtidas</span>
                </span>
                <span className="flex items-center text-sm text-gray-300">
                  <span className="font-medium text-white">{meme.comments}</span>
                  <span className="ml-1">comentários</span>
                </span>
              </div>
            </div>
          </Card>

          <HorizontalAd className="mb-6" />

          <Card className="bg-gray-800 border-gray-700 p-4 mb-6">
            <CommentSection postId={meme.id.toString()} />
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <SidebarAd />

          <Card className="bg-gray-800 border-gray-700 p-4">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Memes relacionados</h2>
            <div className="space-y-3">
              {relatedMemes.length > 0 ? (
                relatedMemes.map((relatedMeme) => (
                  <Link href={`/meme/${relatedMeme.id}`} key={relatedMeme.id}>
                    <div className="flex gap-3 hover:bg-gray-700 p-2 rounded-lg transition-colors">
                      <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={relatedMeme.imageUrl || "/placeholder.svg"}
                          alt={relatedMeme.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-white line-clamp-2">{relatedMeme.title}</h3>
                        <p className="text-xs text-gray-400 mt-1">{relatedMeme.likes} curtidas</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-400 text-center py-4">Nenhum meme relacionado encontrado</p>
              )}
            </div>
          </Card>

          <SidebarAd />

          <Card className="bg-gray-800 border-gray-700 p-4">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Mais do autor</h2>
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 sm:h-12 w-10 sm:w-12">
                <AvatarImage src={`/abstract-user-icon.png?height=48&width=48&query=user avatar ${meme.authorId}`} />
                <AvatarFallback>{meme.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/user/${meme.authorId}`}
                  className="font-medium text-white hover:underline block text-ellipsis overflow-hidden"
                >
                  {meme.author}
                </Link>
                <p className="text-sm text-gray-400">120 posts</p>
              </div>
            </div>
            <Separator className="bg-gray-700 mb-4" />
            <Link href={`/user/${meme.authorId}`} className="block">
              <Button variant="outline" className="w-full border-purple-600 text-purple-400">
                Ver perfil
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
