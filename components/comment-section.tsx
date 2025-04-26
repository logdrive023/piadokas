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
  Trash2,
  ThumbsDown,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ReportModal from "./report-modal"
import LinkWithLoading from "./link-with-loading"
import { useLoading } from "./loading-provider"
import { deleteComment, addComment, likeComment, dislikeComment, replyToComment } from "@/lib/api-mock-comentario"

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
    id: string // Added to check ownership
  }
  content: string
  timestamp: string
  likes: number
  dislikes: number // Added dislikes
  replies: Comment[]
  isReplyOpen?: boolean // Track if reply form is open
  userLiked?: boolean
  userDisliked?: boolean
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
  const [replyContents, setReplyContents] = useState<Record<string, string>>({})
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
          id: `user-${Math.floor(Math.random() * 1000)}`, // Random user ID
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
        dislikes: Math.floor(Math.random() * 30), // Added dislikes
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

  const handleSubmitComment = async (e: React.FormEvent) => {
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
          id: user?.id || "unknown",
        },
        content: newComment,
        timestamp: "agora mesmo",
        likes: 0,
        dislikes: 0,
        replies: [],
      }

      // Add comment using mock API
      const addedComment = await addComment(postId, comment)
      setAllComments([addedComment, ...allComments])
      setNewComment("")

      // Resetar para a primeira página e ordenação por mais recentes
      setPage(1)
      setSortOption("newest")
    }
  }

  const handleLikeComment = async (commentId: string) => {
    if (!isLoggedIn) {
      startLoading()
      router.push("/usuario")
      return
    }

    try {
      const updatedComment = await likeComment(commentId, user?.id || "unknown")

      // Atualizar o comentário na lista de forma recursiva
      setAllComments((prevComments) => {
        return updateCommentInList(prevComments, updatedComment)
      })
    } catch (error) {
      console.error("Erro ao curtir comentário:", error)
    }
  }

  const handleDislikeComment = async (commentId: string) => {
    if (!isLoggedIn) {
      startLoading()
      router.push("/usuario")
      return
    }

    try {
      const updatedComment = await dislikeComment(commentId, user?.id || "unknown")

      // Atualizar o comentário na lista de forma recursiva
      setAllComments((prevComments) => {
        return updateCommentInList(prevComments, updatedComment)
      })
    } catch (error) {
      console.error("Erro ao descurtir comentário:", error)
    }
  }

  // Função auxiliar para atualizar um comentário na lista (incluindo respostas)
  const updateCommentInList = (comments: Comment[], updatedComment: Comment): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === updatedComment.id) {
        return updatedComment
      }

      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateCommentInList(comment.replies, updatedComment),
        }
      }

      return comment
    })
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!isLoggedIn) {
      return
    }

    await deleteComment(commentId)

    setAllComments(allComments.filter((comment) => comment.id !== commentId))
  }

  const handleReplyToggle = (commentId: string) => {
    if (!isLoggedIn) {
      startLoading()
      router.push("/usuario")
      return
    }

    setAllComments(
      allComments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, isReplyOpen: !comment.isReplyOpen }
        }
        return comment
      }),
    )
  }

  const handleSubmitReply = async (commentId: string) => {
    if (!isLoggedIn || !replyContents[commentId]?.trim()) {
      return
    }

    const reply: Comment = {
      id: `reply-${Date.now()}`,
      author: {
        name: user?.username || "Usuário",
        avatar: user?.avatar || "/abstract-user-icon.png",
        id: user?.id || "unknown",
      },
      content: replyContents[commentId],
      timestamp: "agora mesmo",
      likes: 0,
      dislikes: 0,
      replies: [],
    }

    const updatedComment = await replyToComment(commentId, reply)

    setAllComments(
      allComments.map((comment) => {
        if (comment.id === commentId) {
          return updatedComment
        }
        return comment
      }),
    )

    // Clear reply content and close reply form
    setReplyContents({ ...replyContents, [commentId]: "" })
    handleReplyToggle(commentId)
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
              defaultValue={newComment}
              onChange={(e) => {
                // Usar setTimeout para evitar atualizações de estado muito frequentes
                const value = e.target.value
                setTimeout(() => {
                  setNewComment(value)
                }, 0)
              }}
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
                          className={`flex items-center ${
                            isLoggedIn
                              ? comment.userLiked
                                ? "text-green-400 hover:text-green-500 cursor-pointer"
                                : "text-gray-400 hover:text-green-400 cursor-pointer"
                              : "text-gray-500 cursor-not-allowed"
                          }`}
                          onClick={() => isLoggedIn && handleLikeComment(comment.id)}
                          disabled={!isLoggedIn}
                          title="Curtir"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span className="ml-1 text-xs">{comment.likes > 0 ? comment.likes : ""}</span>
                        </button>
                        <button
                          className={`flex items-center ${
                            isLoggedIn
                              ? comment.userDisliked
                                ? "text-red-400 hover:text-red-500 cursor-pointer"
                                : "text-gray-400 hover:text-red-400 cursor-pointer"
                              : "text-gray-500 cursor-not-allowed"
                          }`}
                          onClick={() => isLoggedIn && handleDislikeComment(comment.id)}
                          disabled={!isLoggedIn}
                          title="Não curtir"
                        >
                          <ThumbsDown className="h-4 w-4" />
                          <span className="ml-1 text-xs">{comment.dislikes > 0 ? comment.dislikes : ""}</span>
                        </button>
                        <button
                          className={`flex items-center ${
                            isLoggedIn
                              ? "text-gray-400 hover:text-purple-400 cursor-pointer"
                              : "text-gray-500 cursor-not-allowed"
                          }`}
                          onClick={() => isLoggedIn && handleReplyToggle(comment.id)}
                          disabled={!isLoggedIn}
                          title="Responder"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Reply form */}
                      {comment.isReplyOpen && isLoggedIn && (
                        <div className="mt-3 pl-2 border-l-2 border-gray-700">
                          <div className="flex gap-2">
                            <Avatar className="h-6 w-6">
                              <img src={user?.avatar || "/abstract-user-icon.png"} alt="Avatar" />
                            </Avatar>
                            <div className="flex-1">
                              <Textarea
                                placeholder="Escreva uma resposta..."
                                defaultValue={replyContents[comment.id] || ""}
                                onChange={(e) => {
                                  // Usar setTimeout para evitar atualizações de estado muito frequentes
                                  const value = e.target.value
                                  const commentId = comment.id
                                  setTimeout(() => {
                                    setReplyContents((prev) => ({ ...prev, [commentId]: value }))
                                  }, 0)
                                }}
                                className="bg-gray-800 border-gray-700 text-white resize-none mb-2 text-sm min-h-[60px]"
                              />
                              <div className="flex justify-end">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleReplyToggle(comment.id)}
                                  className="mr-2 text-gray-400 hover:text-gray-300"
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleSubmitReply(comment.id)}
                                  disabled={!replyContents[comment.id]?.trim()}
                                  className="bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                  Responder
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-3 pl-4 border-l-2 border-gray-700 space-y-3">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="pt-2">
                              <div className="flex gap-2">
                                <Avatar className="h-6 w-6">
                                  <img src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                                </Avatar>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <LinkWithLoading href={`/user/${reply.author.name}`}>
                                      <span className="font-medium text-white hover:underline cursor-pointer text-sm">
                                        {reply.author.name}
                                      </span>
                                    </LinkWithLoading>
                                    <span className="text-xs text-gray-400">{reply.timestamp}</span>
                                  </div>
                                  <p className="mt-1 text-gray-300 text-sm">{reply.content}</p>
                                  <div className="flex items-center gap-3 mt-1">
                                    <button
                                      className={`flex items-center ${
                                        isLoggedIn
                                          ? reply.userLiked
                                            ? "text-green-400 hover:text-green-500 cursor-pointer"
                                            : "text-gray-400 hover:text-green-400 cursor-pointer"
                                          : "text-gray-500 cursor-not-allowed"
                                      }`}
                                      onClick={() => isLoggedIn && handleLikeComment(reply.id)}
                                      disabled={!isLoggedIn}
                                      title="Curtir"
                                    >
                                      <ThumbsUp className="h-3 w-3" />
                                      <span className="ml-1 text-xs">{reply.likes > 0 ? reply.likes : ""}</span>
                                    </button>
                                    <button
                                      className={`flex items-center ${
                                        isLoggedIn
                                          ? reply.userDisliked
                                            ? "text-red-400 hover:text-red-500 cursor-pointer"
                                            : "text-gray-400 hover:text-red-400 cursor-pointer"
                                          : "text-gray-500 cursor-not-allowed"
                                      }`}
                                      onClick={() => isLoggedIn && handleDislikeComment(reply.id)}
                                      disabled={!isLoggedIn}
                                      title="Não curtir"
                                    >
                                      <ThumbsDown className="h-3 w-3" />
                                      <span className="ml-1 text-xs">{reply.dislikes > 0 ? reply.dislikes : ""}</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                      {isLoggedIn && user?.id === comment.author.id && (
                        <DropdownMenuItem
                          className="flex items-center text-white hover:bg-gray-700 cursor-pointer"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                          Excluir
                        </DropdownMenuItem>
                      )}
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
