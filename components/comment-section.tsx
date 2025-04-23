"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import {
  ThumbsUp,
  MessageSquare,
  Flag,
  MoreHorizontal,
  ChevronDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ReportModal from "./report-modal"
import LinkWithLoading from "./link-with-loading"
import { useLoading } from "./loading-provider"

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
  replies: Comment[]
}

interface CommentSectionProps {
  postId: string
  initialComments?: Comment[]
}

type SortOption = "newest" | "most-liked" | "least-liked"

export function CommentSection({ postId, initialComments = [] }: CommentSectionProps) {
  const [allComments, setAllComments] = useState<Comment[]>([])
  const [displayedComments, setDisplayedComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [sortOption, setSortOption] = useState<SortOption>("newest")
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const commentsPerPage = 10
  const { isLoggedIn, user } = useAuth()
  const router = useRouter()
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [reportingCommentId, setReportingCommentId] = useState<string | null>(null)
  const { startLoading } = useLoading()

  // Gerar comentários de exemplo
  useEffect(() => {
    if (initialComments.length === 0 && allComments.length === 0) {
      // Gerar 30 comentários de exemplo para testar a paginação
      const exampleComments: Comment[] = Array.from({ length: 30 }, (_, i) => ({
        id: `comment-${i + 1}`,
        author: {
          name: `Usuário${Math.floor(Math.random() * 100)}`,
          avatar: `/abstract-user-icon.png?height=40&width=40&query=user avatar ${i + 1}`,
        },
        content: [
          "Esse meme é simplesmente perfeito! 😂 Não consigo parar de rir!",
          "Já passei por isso tantas vezes que nem é engraçado mais... quem estou enganando, é hilário! 🤣",
          "Vou compartilhar isso com todos os meus amigos agora mesmo!",
          "Isso me lembra aquela vez que... bem, melhor não contar aqui 😅",
          "Quem mais está vendo isso em 2024? ✋",
          "O criador desse meme merece um prêmio!",
          "Meu chefe quase me pegou rindo disso no trabalho 💀",
          "Esse é o conteúdo de qualidade que eu espero ver aqui!",
          "Alguém mais notou o detalhe no canto? Genial!",
          "Eu não deveria estar rindo disso, mas... 🤣",
        ][Math.floor(Math.random() * 10)],
        timestamp: `${Math.floor(Math.random() * 24)} hora${Math.floor(Math.random() * 24) === 1 ? "" : "s"} atrás`,
        likes: Math.floor(Math.random() * 100),
        replies: [],
      }))

      setAllComments(exampleComments)
    } else if (initialComments.length > 0 && allComments.length === 0) {
      setAllComments(initialComments)
    }
  }, [initialComments, allComments.length])

  // Aplicar ordenação e paginação aos comentários
  useEffect(() => {
    if (allComments.length > 0) {
      const sortedComments = [...allComments]

      // Aplicar ordenação
      switch (sortOption) {
        case "most-liked":
          sortedComments.sort((a, b) => b.likes - a.likes)
          break
        case "least-liked":
          sortedComments.sort((a, b) => a.likes - b.likes)
          break
        case "newest":
        default:
          // Assumindo que os comentários mais recentes estão no início do array
          // Se necessário, poderia ordenar por timestamp se fosse um objeto Date
          break
      }

      // Aplicar paginação
      const paginatedComments = sortedComments.slice(0, page * commentsPerPage)
      setDisplayedComments(paginatedComments)

      // Verificar se há mais comentários para carregar
      setHasMore(paginatedComments.length < sortedComments.length)
    }
  }, [allComments, page, sortOption])

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoggedIn) {
      startLoading()
      router.push("/usuario")
      return
    }

    if (newComment.trim()) {
      const comment: Comment = {
        id: `comment-${Date.now()}`,
        author: {
          name: user?.username || "Usuário",
          avatar: user?.avatar || "/abstract-user-icon.png",
        },
        content: newComment,
        timestamp: "agora mesmo",
        likes: 0,
        replies: [],
      }

      setAllComments([comment, ...allComments])
      setNewComment("")

      // Resetar para a primeira página e ordenação por mais recentes
      setPage(1)
      setSortOption("newest")
    }
  }

  const handleLikeComment = (commentId: string) => {
    if (!isLoggedIn) {
      startLoading()
      router.push("/usuario")
      return
    }

    setAllComments(
      allComments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 }
        }
        return comment
      }),
    )
  }

  const handleReportClick = (commentId: string) => {
    if (!isLoggedIn) {
      startLoading()
      router.push("/usuario")
      return
    }

    setReportingCommentId(commentId)
    setReportModalOpen(true)
  }

  const handleLoadMore = () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)

    // Simular carregamento
    setTimeout(() => {
      setPage(page + 1)
      setIsLoading(false)
    }, 800)
  }

  const handleSortChange = (option: SortOption) => {
    setSortOption(option)
    setPage(1) // Resetar para a primeira página ao mudar a ordenação
  }

  const getSortLabel = () => {
    switch (sortOption) {
      case "most-liked":
        return "Mais curtidos"
      case "least-liked":
        return "Menos curtidos"
      case "newest":
      default:
        return "Mais recentes"
    }
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Comentários ({allComments.length})</h3>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
              <ArrowUpDown className="h-3.5 w-3.5 mr-2" />
              {getSortLabel()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
            <DropdownMenuItem
              className={`flex items-center text-white hover:bg-gray-700 cursor-pointer ${sortOption === "newest" ? "bg-gray-700" : ""}`}
              onClick={() => handleSortChange("newest")}
            >
              <ChevronDown className="h-4 w-4 mr-2 text-gray-400" />
              Mais recentes
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`flex items-center text-white hover:bg-gray-700 cursor-pointer ${sortOption === "most-liked" ? "bg-gray-700" : ""}`}
              onClick={() => handleSortChange("most-liked")}
            >
              <ArrowUp className="h-4 w-4 mr-2 text-green-500" />
              Mais curtidos
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`flex items-center text-white hover:bg-gray-700 cursor-pointer ${sortOption === "least-liked" ? "bg-gray-700" : ""}`}
              onClick={() => handleSortChange("least-liked")}
            >
              <ArrowDown className="h-4 w-4 mr-2 text-red-500" />
              Menos curtidos
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            <img
              src={isLoggedIn ? user?.avatar || "/abstract-user-icon.png" : "/abstract-user-icon.png"}
              alt="Avatar"
            />
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder={isLoggedIn ? "Escreva um comentário..." : "Faça login para comentar..."}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white resize-none mb-2"
              disabled={!isLoggedIn}
            />
            {!isLoggedIn && <p className="text-sm text-yellow-500 mb-2">Você precisa estar logado para comentar.</p>}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!isLoggedIn || !newComment.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Comentar
              </Button>
            </div>
          </div>
        </div>
      </form>

      <div className="space-y-6">
        {displayedComments.length > 0 ? (
          <>
            {displayedComments.map((comment) => (
              <div key={comment.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <img src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <LinkWithLoading href={`/user/${comment.author.name}`}>
                          <span className="font-medium text-white hover:underline cursor-pointer">
                            {comment.author.name}
                          </span>
                        </LinkWithLoading>
                        <span className="text-xs text-gray-400">{comment.timestamp}</span>
                      </div>
                      <p className="mt-1 text-gray-300">{comment.content}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          className={`flex items-center gap-1 text-xs ${
                            isLoggedIn
                              ? "text-gray-400 hover:text-purple-400 cursor-pointer"
                              : "text-gray-500 cursor-not-allowed"
                          }`}
                          onClick={() => isLoggedIn && handleLikeComment(comment.id)}
                          disabled={!isLoggedIn}
                        >
                          <ThumbsUp className="h-3.5 w-3.5" />
                          <span>{comment.likes > 0 ? comment.likes : ""} Curtir</span>
                        </button>
                        <button
                          className={`flex items-center gap-1 text-xs ${
                            isLoggedIn
                              ? "text-gray-400 hover:text-purple-400 cursor-pointer"
                              : "text-gray-500 cursor-not-allowed"
                          }`}
                          disabled={!isLoggedIn}
                          onClick={() => (isLoggedIn ? null : startLoading() && router.push("/usuario"))}
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>Responder</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                      <DropdownMenuItem
                        className={`flex items-center ${
                          isLoggedIn
                            ? "text-white hover:bg-gray-700 cursor-pointer"
                            : "text-gray-500 cursor-not-allowed"
                        }`}
                        onClick={() => isLoggedIn && handleReportClick(comment.id)}
                      >
                        <Flag className="h-4 w-4 mr-2 text-red-500" />
                        Denunciar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}

            {hasMore && (
              <div className="flex justify-center pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-gray-300 border-t-transparent rounded-full" />
                      Carregando...
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-2" />
                      Carregar mais comentários
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-20" />
            <p>Seja o primeiro a comentar!</p>
          </div>
        )}
      </div>

      {reportModalOpen && reportingCommentId && (
        <ReportModal
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          contentType="comment"
          contentId={reportingCommentId}
        />
      )}
    </div>
  )
}

export default CommentSection
