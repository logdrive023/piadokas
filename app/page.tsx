"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SidebarAd } from "@/components/sidebar-ad"
import { HorizontalAd } from "@/components/horizontal-ad"
import { StopScrollButton } from "@/components/stop-scroll-button"
import { generateMockPost } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import React from "react"
import MemePost from "@/components/meme-post"
import { RankingTabs } from "@/components/ranking-tabs"
import CryptoDonationSection from "@/components/crypto-donation-section"
import OnlineReaders from "@/components/online-readers"
import { useLoading } from "@/components/loading-provider"
import { LinkWithLoading } from "@/components/link-with-loading"

export default function Home() {
  const [posts, setPosts] = useState(() => Array.from({ length: 5 }, (_, i) => generateMockPost(i)))
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const observer = useRef<IntersectionObserver | null>(null)
  const [isScrollingEnabled, setIsScrollingEnabled] = useState(true)
  const { isLoggedIn, user } = useAuth()
  const lastPostRef = useRef<HTMLDivElement>(null)
  const { stopLoading } = useLoading()

  // Garantir que o loading seja parado quando a página inicial for montada
  useEffect(() => {
    // Pequeno timeout para garantir que a página carregou completamente
    const timer = setTimeout(() => {
      stopLoading()
    }, 100)

    return () => clearTimeout(timer)
  }, [stopLoading])

  const loadMorePosts = useCallback(() => {
    if (!isScrollingEnabled || loading || !hasMore) return

    setLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      const newPosts = Array.from({ length: 5 }, (_, i) => generateMockPost(posts.length + i))
      setPosts((prevPosts) => [...prevPosts, ...newPosts])
      setPage((prevPage) => prevPage + 1)
      setLoading(false)

      // Stop after 20 pages for demo purposes
      if (page >= 20) {
        setHasMore(false)
      }
    }, 1000)
  }, [isScrollingEnabled, loading, hasMore, posts.length, page])

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const currentObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && isScrollingEnabled) {
          loadMorePosts()
        }
      },
      { threshold: 0.5 },
    )

    if (lastPostRef.current) {
      currentObserver.observe(lastPostRef.current)
    }

    return () => {
      if (lastPostRef.current) {
        currentObserver.unobserve(lastPostRef.current)
      }
    }
  }, [loadMorePosts, isScrollingEnabled])

  const handleScrollToggle = (stopped: boolean) => {
    setIsScrollingEnabled(!stopped)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <main className="container mx-auto px-4 py-8">
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
                      <div ref={lastPostRef}>
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

              {/* End of content message */}
              {!hasMore && !loading && (
                <div className="text-center py-8 text-gray-400">
                  <p>Você chegou ao fim do conteúdo</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-purple-600 text-purple-400"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                  >
                    Voltar ao topo
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

            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold text-white mb-4">Memes em alta</h2>
              <div className="space-y-4">
                {posts.slice(0, 3).map((post) => (
                  <div key={`trending-${post.id}`} className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gray-700 rounded overflow-hidden">
                      <img src={post.imageUrl || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white line-clamp-2">{post.title}</h3>
                      <p className="text-xs text-gray-400 mt-1">{post.likes} curtidas</p>
                    </div>
                  </div>
                ))}
              </div>
              <LinkWithLoading href="/rankings">
                <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 mt-2 h-auto text-sm">
                  Ver mais
                </Button>
              </LinkWithLoading>
            </div>

            <SidebarAd />

            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold text-white mb-4">Tags populares</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "memes",
                  "humor",
                  "engraçado",
                  "gatos",
                  "cachorros",
                  "brasil",
                  "games",
                  "filmes",
                  "séries",
                  "programação",
                ].map((tag) => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                  >
                    #{tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Stop Scroll Button */}
      <StopScrollButton onToggle={handleScrollToggle} />
    </div>
  )
}
