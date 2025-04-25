"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ThumbsUp, MessageSquare, Eye, Loader2 } from "lucide-react"
import Link from "next/link"
import { HorizontalAd } from "@/components/horizontal-ad"
import { SidebarAd } from "@/components/sidebar-ad"
import { fetchRankings, fetchTrendingPosts, fetchPopularTags } from "@/lib/api-mock-rankings"
import type { RankingPost, RankingUser } from "@/lib/api-mock-rankings"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function RankingsPage() {
  const [period, setPeriod] = useState<"day" | "week" | "month" | "allTime">("day")
  const [isLoading, setIsLoading] = useState(true)
  const [rankingPosts, setRankingPosts] = useState<RankingPost[]>([])
  const [topUsers, setTopUsers] = useState<RankingUser[]>([])
  const [trendingPosts, setTrendingPosts] = useState<RankingPost[]>([])
  const [popularTags, setPopularTags] = useState<{ tag: string; count: number }[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Carregar dados de ranking quando o período ou página mudar
  useEffect(() => {
    const loadRankings = async () => {
      setIsLoading(true)
      try {
        const response = await fetchRankings(period, currentPage, 10)
        setRankingPosts(response.posts)
        setTopUsers(response.users)
        setTotalPages(response.totalPages)
      } catch (error) {
        console.error("Erro ao carregar rankings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRankings()
  }, [period, currentPage])

  // Carregar posts em alta e tags populares apenas uma vez
  useEffect(() => {
    const loadSidebarData = async () => {
      try {
        const [trendingResponse, tagsResponse] = await Promise.all([fetchTrendingPosts(5), fetchPopularTags()])
        setTrendingPosts(trendingResponse)
        setPopularTags(tagsResponse)
      } catch (error) {
        console.error("Erro ao carregar dados da barra lateral:", error)
      }
    }

    loadSidebarData()
  }, [])

  // Função para mudar de página
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
      // Rolar para o topo da página
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Função para obter o título do período
  const getPeriodTitle = () => {
    switch (period) {
      case "day":
        return "Hoje"
      case "week":
        return "Esta Semana"
      case "month":
        return "Este Mês"
      case "allTime":
        return "Todos os Tempos"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Voltar para a página inicial</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h1 className="text-2xl font-bold text-white mb-6">Rankings</h1>

              <Tabs
                defaultValue="day"
                value={period}
                onValueChange={(v) => {
                  setPeriod(v as "day" | "week" | "month" | "allTime")
                  setCurrentPage(1) // Resetar para a primeira página ao mudar o período
                }}
              >
                <div className="overflow-x-auto -mx-2 px-2">
                  <TabsList className="grid grid-cols-4 mb-6 min-w-[300px]">
                    <TabsTrigger value="day">Hoje</TabsTrigger>
                    <TabsTrigger value="week">Semana</TabsTrigger>
                    <TabsTrigger value="month">Mês</TabsTrigger>
                    <TabsTrigger value="allTime">Todos</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value={period} className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Top Memes: {getPeriodTitle()}</h2>

                  {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                    </div>
                  ) : rankingPosts.length > 0 ? (
                    <>
                      {rankingPosts.map((post, index) => (
                        <div
                          key={post.id}
                          className="flex flex-col sm:flex-row sm:items-center gap-4 bg-gray-700 rounded-lg overflow-hidden"
                        >
                          <div className="w-full sm:w-12 h-12 sm:h-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl">
                            {post.position}
                          </div>
                          <div className="flex flex-1 items-center gap-4 p-4">
                            <div className="w-20 h-20 bg-gray-600 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={post.imageUrl || "/placeholder.svg"}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-white font-medium line-clamp-2">{post.title}</h3>
                              <p className="text-sm text-gray-400 mt-1">por @{post.author}</p>
                              <div className="flex items-center gap-4 mt-2 flex-wrap">
                                <span className="flex items-center text-sm text-gray-300">
                                  <ThumbsUp className="h-3.5 w-3.5 mr-1 text-purple-400" />
                                  {post.likes}
                                </span>
                                <span className="flex items-center text-sm text-gray-300">
                                  <MessageSquare className="h-3.5 w-3.5 mr-1 text-blue-400" />
                                  {post.comments}
                                </span>
                                <span className="flex items-center text-sm text-gray-300">
                                  <Eye className="h-3.5 w-3.5 mr-1 text-green-400" />
                                  {post.views}
                                </span>
                              </div>
                            </div>
                            <Link href={`/meme/${post.id}`} className="flex-shrink-0">
                              <Button variant="outline" size="sm" className="border-purple-600 text-purple-400">
                                Ver post
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}

                      {/* Paginação */}
                      {totalPages > 1 && (
                        <Pagination className="mt-8">
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault()
                                  handlePageChange(currentPage - 1)
                                }}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                              />
                            </PaginationItem>

                            {Array.from({ length: totalPages }).map((_, i) => {
                              const pageNumber = i + 1

                              // Mostrar apenas a página atual, primeira, última e páginas próximas
                              if (
                                pageNumber === 1 ||
                                pageNumber === totalPages ||
                                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                              ) {
                                return (
                                  <PaginationItem key={pageNumber}>
                                    <PaginationLink
                                      href="#"
                                      isActive={pageNumber === currentPage}
                                      onClick={(e) => {
                                        e.preventDefault()
                                        handlePageChange(pageNumber)
                                      }}
                                    >
                                      {pageNumber}
                                    </PaginationLink>
                                  </PaginationItem>
                                )
                              }

                              // Adicionar elipses para páginas omitidas
                              if (
                                (pageNumber === 2 && currentPage > 3) ||
                                (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                              ) {
                                return (
                                  <PaginationItem key={`ellipsis-${pageNumber}`}>
                                    <PaginationEllipsis />
                                  </PaginationItem>
                                )
                              }

                              return null
                            })}

                            <PaginationItem>
                              <PaginationNext
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault()
                                  handlePageChange(currentPage + 1)
                                }}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12 text-gray-400">
                      <p>Nenhum meme encontrado para este período.</p>
                    </div>
                  )}

                  {/* Inserir anúncio horizontal após os posts */}
                  <HorizontalAd />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <SidebarAd />

            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold text-white mb-4">Hall da Fama</h2>
              <div className="space-y-4">
                {trendingPosts.map((post, index) => (
                  <Link href={`/meme/${post.id}`} key={`hall-${post.id}`}>
                    <div className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-lg transition-colors">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="w-16 h-16 bg-gray-700 rounded overflow-hidden">
                        <img src={post.imageUrl || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white line-clamp-2">{post.title}</h3>
                        <p className="text-xs text-gray-400 mt-1">{post.likes} curtidas</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <SidebarAd />

            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold text-white mb-4">Top Criadores</h2>
              <div className="space-y-3">
                {topUsers.map((user) => (
                  <Link href={`/user/${user.id}`} key={`creator-${user.id}`}>
                    <div className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-lg transition-colors">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user.position}
                      </div>
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-sm font-medium text-white">@{user.username}</h3>
                        <p className="text-xs text-gray-400">{user.postCount} posts</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold text-white mb-4">Tags Populares</h2>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tagData) => (
                  <Badge
                    key={tagData.tag}
                    variant="outline"
                    className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                  >
                    #{tagData.tag}
                    <span className="ml-1 text-xs text-gray-400">({tagData.count})</span>
                  </Badge>
                ))}
              </div>
            </div>

            <SidebarAd />
          </div>
        </div>
      </div>
    </div>
  )
}
