"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { SidebarAd } from "@/components/sidebar-ad"
import { HorizontalAd } from "@/components/horizontal-ad"
import { StopScrollButton } from "@/components/stop-scroll-button"
import { useAuth } from "@/lib/auth-context"
import React from "react"
import MemePost from "@/components/meme-post"
import { RankingTabs } from "@/components/ranking-tabs"
import CryptoDonationSection from "@/components/crypto-donation-section"
import OnlineReaders from "@/components/online-readers"
import { useLoading } from "@/components/loading-provider"
import { LinkWithLoading } from "@/components/link-with-loading"
import { fetchPosts, fetchPostsByTag, fetchPopularTags, fetchTrendingPosts } from "@/lib/api-mock"
import type { MockPost } from "@/lib/mock-data"
import { X } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [posts, setPosts] = useState<MockPost[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [isScrollingEnabled, setIsScrollingEnabled] = useState(true)
  const [paginationMethod, setPaginationMethod] = useState<"infinite" | "button">("infinite")
  const { isLoggedIn, user } = useAuth()
  const { stopLoading } = useLoading()
  const [totalPages, setTotalPages] = useState(0)
  const observer = useRef<IntersectionObserver | null>(null)
  const lastPostRef = useRef<HTMLDivElement>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [popularTags, setPopularTags] = useState<{ tag: string; count: number }[]>([])
  const [loadingTags, setLoadingTags] = useState(true)
  const [trendingPosts, setTrendingPosts] = useState<MockPost[]>([])
  const [loadingTrending, setLoadingTrending] = useState(true)

  // Garantir que o loading seja parado quando a página inicial for montada
  useEffect(() => {
    // Pequeno timeout para garantir que a página carregou completamente
    const timer = setTimeout(() => {
      stopLoading()
    }, 100)

    return () => clearTimeout(timer)
  }, [stopLoading])

    // Carregar tags populares
  useEffect(() => {
     const loadPopularTags = async () => {
       setLoadingTags(true)
       try {
          const tags = await fetchPopularTags(10) // Limitar a 10 tags
          setPopularTags(tags)
        } catch (error) {
          console.error("Erro ao carregar tags populares:", error)
        } finally {
          setLoadingTags(false)
        }
      }
  
     loadPopularTags()
    }, [])

  // Carregar memes em alta
  useEffect(() => {
    const loadTrendingPosts = async () => {
      setLoadingTrending(true)
      try {
        const trending = await fetchTrendingPosts(3) // Sempre buscar 3 memes em alta
        setTrendingPosts(trending)
      } catch (error) {
        console.error("Erro ao carregar memes em alta:", error)
      } finally {
        setLoadingTrending(false)
      }
    }

    loadTrendingPosts()
  }, [])

  // Carregar posts iniciais
  useEffect(() => {
    if (activeTag) {
      loadPostsByTag(activeTag, 1, true)
    } else {
      loadPosts(1, true)
    }
  }, [activeTag])

  // Função para carregar posts
  const loadPosts = async (pageNumber: number, isInitialLoad = false) => {
    if (!isScrollingEnabled && !isInitialLoad) return

    setLoading(true)

    try {
      const response = await fetchPosts(pageNumber)

      if (isInitialLoad || pageNumber === 1) {
        setPosts(response.posts)
      } else {
        setPosts((prevPosts) => [...prevPosts, ...response.posts])
      }

      setPage(response.currentPage)
      setHasMore(response.hasMore)
      setTotalPages(response.totalPages)
    } catch (error) {
      console.error("Erro ao carregar posts:", error)
    } finally {
      setLoading(false)
    }
  }

   // Função para carregar posts por tag
   const loadPostsByTag = async (tag: string, pageNumber: number, isInitialLoad = false) => {
    if (!isScrollingEnabled && !isInitialLoad) return

    setLoading(true)

    try {
      const response = await fetchPostsByTag(tag, pageNumber)

      if (isInitialLoad || pageNumber === 1) {
        setPosts(response.posts)
      } else {
        setPosts((prevPosts) => [...prevPosts, ...response.posts])
      }

      setPage(response.currentPage)
      setHasMore(response.hasMore)
      setTotalPages(response.totalPages)
    } catch (error) {
      console.error("Erro ao carregar posts por tag:", error)
    } finally {
      setLoading(false)
    }
  }

  // Função para carregar mais posts
  const loadMorePosts = () => {
    if (loading || !hasMore || !isScrollingEnabled) return

    if (activeTag) {
      loadPostsByTag(activeTag, page + 1)
    } else {
      loadPosts(page + 1)
    }
  }

  // Função para lidar com clique em uma tag
  const handleTagClick = (tag: string) => {
     setActiveTag(tag)
     // Resetar para a primeira página
     setPage(1)
     // Rolar para o topo
     window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Função para limpar o filtro de tag
  const clearTagFilter = () => {
    setActiveTag(null)
    // Resetar para a primeira página
    setPage(1)
  }

  // Configurar o Intersection Observer para infinite scroll
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return

      // Desconectar o observer anterior
      if (observer.current) {
        observer.current.disconnect()
      }

      // Criar um novo observer
      observer.current = new IntersectionObserver(
        (entries) => {
          // Se o elemento estiver visível e o infinite scroll estiver ativado
          if (entries[0].isIntersecting && hasMore && isScrollingEnabled && paginationMethod === "infinite") {
            loadMorePosts()
          }
        },
        { threshold: 0.5 },
      )

      // Observar o novo elemento
      if (node) {
        observer.current.observe(node)
      }
    },
    [loading, hasMore, isScrollingEnabled, paginationMethod],
  )

  const handleScrollToggle = (stopped: boolean) => {
    setIsScrollingEnabled(!stopped)
  }

  const togglePaginationMethod = () => {
    setPaginationMethod((prev) => (prev === "infinite" ? "button" : "infinite"))
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        {/* Filtro de tag ativo */}
        {activeTag && (
          <div className="mb-6 bg-gray-800 p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-white mr-2">Filtrando por:</span>
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">#{activeTag}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={clearTagFilter} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4 mr-1" />
              Limpar filtro
            </Button>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              <RankingTabs />
              <HorizontalAd />

              {/* Meme Feed */}
              <div className="space-y-6" id="meme-feed">
                {posts.map((post, index) => (
                  <React.Fragment key={post.id}>
                    {index === posts.length - 1 ? (
                      <div ref={lastPostElementRef}>
                        <MemePost {...post} />
                      </div>
                    ) : (
                      <MemePost {...post} />
                    )}
                    {/* Insert horizontal ad after every 3 posts */}
                    {(index + 1) % 3 === 0 && <HorizontalAd />}
                  </React.Fragment>
                ))}
              </div>

              {/* Loading indicator */}
              {loading && (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                </div>
              )}

              {/* Load more button - only shown when pagination method is "button" */}
              {hasMore && !loading && paginationMethod === "button" && (
                <div className="flex justify-center py-4">
                  <Button
                    onClick={loadMorePosts}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={!isScrollingEnabled}
                  >
                    Carregar mais posts
                  </Button>
                </div>
              )}

              {/* End of content message */}
              {!hasMore && !loading && (
                <div className="text-center py-8 text-gray-400">
                  <p>Você chegou ao fim do conteúdo</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-purple-600 text-purple-400"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" })
                      if (activeTag) {
                        loadPostsByTag(activeTag, 1, true)
                      } else {
                        loadPosts(1, true)
                      }
                    }}
                  >
                    Voltar ao topo e recarregar
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <SidebarAd />

            {/* Online Readers Section */}
            <div className="bg-gray-800 rounded-lg p-4">
              <OnlineReaders count={142} />
            </div>

            {/* Crypto Donation Section */}
            <CryptoDonationSection />
            
            {/* Memes em alta */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold text-white mb-4">Memes em alta</h2>
              {loadingTrending ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {trendingPosts.map((post) => (
                    <LinkWithLoading href={`/meme/${post.id}`} key={`trending-${post.id}`} className="block">
                      <div className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-lg transition-colors">
                        <div className="w-16 h-16 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={post.imageUrl || "/placeholder.svg"}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white line-clamp-2">{post.title}</h3>
                          <p className="text-xs text-gray-400 mt-1">{post.likes} curtidas</p>
                        </div>
                      </div>
                    </LinkWithLoading>
                  ))}
                </div>
              )}
              <LinkWithLoading href="/rankings">
                <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 mt-2 h-auto text-sm">
                  Ver mais
                </Button>
              </LinkWithLoading>
            </div>

            <SidebarAd />

            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold text-white mb-4">Tags populares</h2>
              {loadingTags ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                </div>
              ) : (
              <div className="flex flex-wrap gap-2">
              {popularTags.map(({ tag, count }) => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    className={`${
                      activeTag === tag
                        ? "bg-purple-700 hover:bg-purple-800 text-white border-purple-600"
                        : "bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                    }`}
                    onClick={() => handleTagClick(tag)}
                  >
                    #{tag}
                    <span className="ml-1 text-xs opacity-70">({count})</span>
                  </Button>
                ))}
              </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Pagination Toggle and Stop Scroll Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <Button
          className="rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          size="icon"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          title="Voltar ao topo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </Button>

        <Button
          className={`rounded-full shadow-lg ${
            paginationMethod === "infinite" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
          size="icon"
          onClick={togglePaginationMethod}
          title={paginationMethod === "infinite" ? "Modo: Scroll Infinito" : "Modo: Botão de Carregar"}
        >
          {paginationMethod === "infinite" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M8 3v3a2 2 0 0 1-2 2H3" />
              <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
              <path d="M3 16h3a2 2 0 0 1 2 2v3" />
              <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <line x1="12" x2="12" y1="8" y2="16" />
              <line x1="8" x2="16" y1="12" y2="12" />
            </svg>
          )}
        </Button>

        <StopScrollButton onToggle={handleScrollToggle} />
      </div>
    </div>
  )
}
