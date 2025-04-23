"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, MessageSquare, Flag, MoreVertical, Send } from "lucide-react"
import Link from "next/link"

interface Comment {
  id: string
  user: {
    name: string
    avatar?: string
    username: string
  }
  content: string
  timestamp: string
  likes: number
  replies?: Comment[]
}

interface EnhancedCommentSectionProps {
  postId: string
  comments: Comment[]
  isLoggedIn: boolean
}

export function EnhancedCommentSection({ postId, comments, isLoggedIn }: EnhancedCommentSectionProps) {
  const [newComment, setNewComment] = useState("")
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }

    if (newComment.trim()) {
      console.log("Submitting comment:", newComment)
      // Here you would typically send the comment to your API
      setNewComment("")
    }
  }

  const handleCommentClick = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold text-white mb-4">Comentários ({comments.length})</h3>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="mb-6">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={isLoggedIn ? "/abstract-user-icon.png" : undefined} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder={isLoggedIn ? "Adicione um comentário..." : "Faça login para comentar..."}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onClick={handleCommentClick}
              className="bg-gray-700 border-gray-600 text-white min-h-[80px] mb-2"
              disabled={!isLoggedIn}
            />
            {isLoggedIn && (
              <div className="flex justify-end">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  <span>Comentar</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Login Prompt */}
      {showLoginPrompt && !isLoggedIn && (
        <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 mb-6 text-center">
          <p className="text-white mb-3">Você precisa estar logado para comentar.</p>
          <Link href="/usuario">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Fazer login</Button>
          </Link>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium text-white">{comment.user.name}</span>
                    <span className="text-gray-400 text-sm ml-2">@{comment.user.username}</span>
                    <span className="text-gray-500 text-xs ml-2">{comment.timestamp}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-gray-300 mt-1">{comment.content}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-8 px-2">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{comment.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-8 px-2">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>{comment.replies?.length || 0}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-8 px-2">
                    <Flag className="h-4 w-4 mr-1" />
                    <span>Denunciar</span>
                  </Button>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-3 pl-4 border-l border-gray-700 space-y-3">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={reply.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-medium text-white">{reply.user.name}</span>
                              <span className="text-gray-400 text-sm ml-2">@{reply.user.username}</span>
                              <span className="text-gray-500 text-xs ml-2">{reply.timestamp}</span>
                            </div>
                          </div>
                          <p className="text-gray-300 mt-1">{reply.content}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-white h-6 px-2 text-xs"
                            >
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              <span>{reply.likes}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EnhancedCommentSection
