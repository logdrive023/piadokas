"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ThumbsUp, MessageSquare, Eye } from "lucide-react"
import Link from "next/link"
import { HorizontalAd } from "@/components/horizontal-ad"
import { SidebarAd } from "@/components/sidebar-ad"
import { mockPosts } from "@/lib/mock-data"

interface RankingPost {
  id: string
  title: string
  imageUrl: string
  author: string
  likes: number
  comments: number
  views: number
  position: number
}

export default function RankingsPage() {
  const [period, setPeriod] = useState("day")

  // Mock data for rankings
  const generateMockRankings = (count: number): RankingPost[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: `post-${i + 1}`,
      title: `Meme #${i + 1} - ${
        i === 0
          ? "Quando o código funciona de primeira"
          : i === 1
            ? "Gato assustado com pepino"
            : i === 2
              ? "Programador às 3 da manhã"
              : `Título do meme ${i + 1}`
      }`,
      imageUrl: `/placeholder.svg?height=200&width=300&query=meme ${i + 1}`,
      author: `user${i + 1}`,
      likes: Math.floor(1000 / (i + 1)),
      comments: Math.floor(100 / (i + 1)),
      views: Math.floor(5000 / (i + 1)),
      position: i + 1,
    }))
  }

  const rankings = {
    day: generateMockRankings(10),
    week: generateMockRankings(10),
    month: generateMockRankings(10),
    allTime: generateMockRankings(10),
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

              <Tabs defaultValue="day" value={period} onValueChange={setPeriod}>
                <div className="overflow-x-auto -mx-2 px-2">
                  <TabsList className="grid grid-cols-4 mb-6 min-w-[300px]">
                    <TabsTrigger value="day">Hoje</TabsTrigger>
                    <TabsTrigger value="week">Semana</TabsTrigger>
                    <TabsTrigger value="month">Mês</TabsTrigger>
                    <TabsTrigger value="allTime">Todos</TabsTrigger>
                  </TabsList>
                </div>

                {Object.entries(rankings).map(([key, posts]) => (
                  <TabsContent key={key} value={key} className="space-y-6">
                    {posts.map((post, index) => (
                      <React.Fragment key={post.id}>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-gray-700 rounded-lg overflow-hidden">
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

                        {/* Insert horizontal ad after every 5 posts */}
                        {(index + 1) % 5 === 0 && <HorizontalAd />}
                      </React.Fragment>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <SidebarAd />

            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold text-white mb-4">Hall da Fama</h2>
              <div className="space-y-4">
                {mockPosts.slice(0, 3).map((post, index) => (
                  <div key={`hall-${post.id}`} className="flex items-center gap-3">
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
                ))}
              </div>
            </div>

            <SidebarAd />

            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold text-white mb-4">Top Criadores</h2>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={`creator-${i}`} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {i}
                    </div>
                    <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden">
                      <img
                        src={`/vibrant-street-market.png?height=40&width=40&query=user ${i}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">@creator{i}</h3>
                      <p className="text-xs text-gray-400">{Math.floor(50 / i)} posts</p>
                    </div>
                  </div>
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
