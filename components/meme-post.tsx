"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowBigDown, ArrowBigUp, MessageSquare, AlertCircle, Share2 } from "lucide-react"
import CommentSection from "@/components/comment-section"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import LinkWithLoading from "./link-with-loading"
import { useLoading } from "./loading-provider"

interface MemePostProps {
  id: string | number
  title: string
  content?: string
  author: string
  authorId: string | number
  timestamp: Date | string
  imageUrl: string
  isVideo?: boolean
  likes: number
  comments: number
  tags?: string[]
  compact?: boolean
}

export function MemePost({
  id,
  title,
  content,
  author,
  authorId,
  timestamp,
  imageUrl,
  isVideo = false,
  likes: initialLikes,
  comments: commentCount,
  tags = [],
  compact = false,
}: MemePostProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [showComments, setShowComments] = useState(false)
  const [showLoginAlert, setShowLoginAlert] = useState(false)
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const { startLoading } = useLoading()

  const handleVote = (direction: "up" | "down") => {
    if (!isLoggedIn) {
      setShowLoginAlert(true)
      return
    }

    if (userVote === direction) {
      setUserVote(null)
      setLikes(direction === "up" ? likes - 1 : likes + 1)
    } else {
      if (userVote) {
        // Change vote direction
        setLikes(direction === "up" ? likes + 2 : likes - 2)
      } else {
        // New vote
        setLikes(direction === "up" ? likes + 1 : likes - 1)
      }
      setUserVote(direction)
    }
  }

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: title,
          url: `https://piadokas.com/meme/${id}`,
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            console.error("Error sharing:", err)
          }
        })
    }
  }

  if (compact) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 bg-gray-800 rounded-lg overflow-hidden w-full">
        <div className="w-full sm:w-40 h-40 relative">
          {isVideo ? (
            <video className="w-full h-full object-cover" poster={imageUrl}>
              <source src="#" type="video/mp4" />
            </video>
          ) : (
            <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-medium text-white line-clamp-2">{title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Avatar className="h-5 w-5">
                <AvatarImage src={`/abstract-user-icon.png?height=40&width=40&query=user avatar ${authorId}`} />
                <AvatarFallback>{(author && author[0]) || "U"}</AvatarFallback>
              </Avatar>
              <LinkWithLoading href={`/user/${authorId}`} className="text-sm text-gray-400 hover:text-gray-300">
                @{author}
              </LinkWithLoading>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center text-sm text-gray-300">
                <ArrowBigUp className="h-4 w-4 mr-1 text-green-500" />
                {likes}
              </span>
              <span className="flex items-center text-sm text-gray-300">
                <MessageSquare className="h-4 w-4 mr-1 text-blue-500" />
                {commentCount}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white bg-gray-750 hover:bg-gray-700 rounded-lg h-8 flex items-center"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-1.5" />
              <span className="whitespace-nowrap">Compartilhar</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className="overflow-hidden bg-gray-800 border-gray-700">
      <LinkWithLoading href={`/meme/${id}`} className="block">
        <div className="p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={`/abstract-user-icon.png?height=40&width=40&query=user avatar ${authorId}`} />
                <AvatarFallback>{(author && author[0]) || "U"}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium mr-2 text-white">{author}</span>
              <span className="text-xs text-gray-400">
                {typeof timestamp === "string"
                  ? timestamp
                  : timestamp.toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
              </span>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </LinkWithLoading>

      <CardContent className="p-0 relative">
        {isVideo ? (
          <div className="aspect-video bg-gray-900 relative">
            <video className="w-full h-full object-contain" controls poster={imageUrl}>
              <source src="#" type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
          </div>
        ) : (
          <div className="aspect-video bg-gray-900 relative">
            <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-full object-contain" />
          </div>
        )}
        {content && (
          <div className="px-4 py-3 bg-gray-800/95 border-t border-gray-700">
            <p className="text-sm text-gray-200">{content}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col p-4">
        {showLoginAlert && (
          <Alert className="mb-4 bg-amber-900/20 text-amber-300 border-amber-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between w-full">
              <span>Você precisa estar logado para votar.</span>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-amber-800 text-amber-300"
                onClick={startLoading}
              >
                <LinkWithLoading href="/usuario">Entrar agora</LinkWithLoading>
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-gray-750 rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                onClick={() => handleVote("up")}
                className={`h-9 px-2 rounded-none ${
                  userVote === "up"
                    ? "bg-green-600/20 text-green-400"
                    : "text-gray-400 hover:text-green-400 hover:bg-gray-700"
                }`}
              >
                <ArrowBigUp className="h-5 w-5" />
                <span className="sr-only">Upvote</span>
              </Button>

              <div className="px-3 py-1.5 bg-gray-800/80 flex items-center justify-center min-w-[40px]">
                <span className="text-sm font-medium text-white">{likes}</span>
              </div>

              <Button
                variant="ghost"
                onClick={() => handleVote("down")}
                className={`h-9 px-2 rounded-none ${
                  userVote === "down"
                    ? "bg-red-600/20 text-red-400"
                    : "text-gray-400 hover:text-red-400 hover:bg-gray-700"
                }`}
              >
                <ArrowBigDown className="h-5 w-5" />
                <span className="sr-only">Downvote</span>
              </Button>
            </div>

            <Button
              variant="ghost"
              onClick={() => setShowComments(!showComments)}
              className="h-9 bg-gray-750 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg flex items-center px-3"
            >
              <MessageSquare className="h-4 w-4 mr-2 text-blue-400" />
              <span className="whitespace-nowrap hidden sm:inline">{commentCount} comentários</span>
              <span className="whitespace-nowrap sm:hidden">{commentCount}</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            className="h-9 bg-gray-750 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg flex items-center px-3"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-2" />
            <span className="whitespace-nowrap">Compartilhar</span>
          </Button>
        </div>

        {showComments && (
          <div className="w-full mt-4">
            <Separator className="my-4 bg-gray-700" />
            <CommentSection postId={id.toString()} />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

// Add default export
export default MemePost
