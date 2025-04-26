"use client"

import { useState, useEffect,use  } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MemePost } from "@/components/meme-post"
import { Settings, Edit, Check, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  fetchUserProfile,
  fetchUserPosts,
  fetchUserComments,
  fetchUserLikedPosts,
  toggleFollowUser,
  updateUserProfile,
  type UserProfile,
} from "@/lib/api-mock-user"
import type { MockPost } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

interface UserPageProps {
  params: Promise<{ id: string }>
}

export default function UserPage(props: UserPageProps) {
  const { id } = use(props.params)
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [editedBio, setEditedBio] = useState("")
  const [editedLocation, setEditedLocation] = useState("")
  const [editedWebsite, setEditedWebsite] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)
  const [followersCount, setFollowersCount] = useState(0)
  const [isFollowLoading, setIsFollowLoading] = useState(false)

  // Estados para as abas
  const [activeTab, setActiveTab] = useState("posts")
  const [posts, setPosts] = useState<MockPost[]>([])
  const [comments, setComments] = useState<any[]>([])
  const [likedPosts, setLikedPosts] = useState<MockPost[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // Verificar se o usuário atual é o dono do perfil
  const isOwnProfile = user?.username === id || user?.id === id

  // Carregar o perfil do usuário
  useEffect(() => {
    const loadUserProfile = async () => {
      setIsLoading(true)
      try {
        const userProfile = await fetchUserProfile(id)
        setProfile(userProfile)
        setEditedBio(userProfile.bio)
        setEditedLocation(userProfile.location)
        setEditedWebsite(userProfile.website)
        setIsFollowing(userProfile.isFollowing)
        setFollowersCount(userProfile.followersCount)
      } catch (error) {
        console.error("Erro ao carregar perfil:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar o perfil do usuário.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadUserProfile()
  }, [id, toast])

  // Carregar conteúdo da aba ativa
  useEffect(() => {
    const loadTabContent = async () => {
      setIsLoading(true)
      setCurrentPage(1)

      try {
        switch (activeTab) {
          case "posts":
            const postsData = await fetchUserPosts(id, 1)
            setPosts(postsData.posts)
            setHasMore(postsData.hasMore)
            break
          case "comments":
            const commentsData = await fetchUserComments(id, 1)
            setComments(commentsData.comments)
            setHasMore(commentsData.hasMore)
            break
          case "upvoted":
            const likedData = await fetchUserLikedPosts(id, 1)
            setLikedPosts(likedData.posts)
            setHasMore(likedData.hasMore)
            break
        }
      } catch (error) {
        console.error(`Erro ao carregar ${activeTab}:`, error)
        toast({
          title: "Erro",
          description: `Não foi possível carregar os ${activeTab} do usuário.`,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (profile) {
      loadTabContent()
    }
  }, [activeTab, id, profile, toast])

  // Função para carregar mais conteúdo
  const loadMore = async () => {
    if (isLoadingMore || !hasMore) return

    setIsLoadingMore(true)
    const nextPage = currentPage + 1

    try {
      switch (activeTab) {
        case "posts":
          const postsData = await fetchUserPosts(id, nextPage)
          setPosts((prev) => [...prev, ...postsData.posts])
          setHasMore(postsData.hasMore)
          break
        case "comments":
          const commentsData = await fetchUserComments(id, nextPage)
          setComments((prev) => [...prev, ...commentsData.comments])
          setHasMore(commentsData.hasMore)
          break
        case "upvoted":
          const likedData = await fetchUserLikedPosts(id, nextPage)
          setLikedPosts((prev) => [...prev, ...likedData.posts])
          setHasMore(likedData.hasMore)
          break
      }
      setCurrentPage(nextPage)
    } catch (error) {
      console.error(`Erro ao carregar mais ${activeTab}:`, error)
      toast({
        title: "Erro",
        description: `Não foi possível carregar mais ${activeTab}.`,
        variant: "destructive",
      })
    } finally {
      setIsLoadingMore(false)
    }
  }

  // Função para seguir/deixar de seguir o usuário
  const handleToggleFollow = async () => {
    if (!user) {
      toast({
        title: "Ação não permitida",
        description: "Você precisa estar logado para seguir outros usuários.",
        variant: "destructive",
      })
      return
    }

    setIsFollowLoading(true)
    try {
      const result = await toggleFollowUser(id, user.id)
      setIsFollowing(result.isFollowing)
      setFollowersCount(result.followersCount)

      toast({
        title: result.isFollowing ? "Seguindo" : "Deixou de seguir",
        description: result.isFollowing
          ? `Você agora está seguindo ${profile?.displayName || id}.`
          : `Você deixou de seguir ${profile?.displayName || id}.`,
      })
    } catch (error) {
      console.error("Erro ao seguir/deixar de seguir:", error)
      toast({
        title: "Erro",
        description: "Não foi possível realizar esta ação. Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsFollowLoading(false)
    }
  }

  // Função para salvar alterações no perfil
  const handleSaveChanges = async () => {
    try {
      const updatedProfile = await updateUserProfile(id, {
        bio: editedBio,
        location: editedLocation,
        website: editedWebsite,
      })

      setProfile(updatedProfile)
      setIsEditing(false)

      toast({
        title: "Perfil atualizado",
        description: "Suas alterações foram salvas com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o perfil. Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  const handleCancelChanges = () => {
    if (profile) {
      setEditedBio(profile.bio)
      setEditedLocation(profile.location)
      setEditedWebsite(profile.website)
    }
    setIsEditing(false)
  }

  if (isLoading && !profile) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <div className="container py-8">
        <Card className="mb-8">
          <CardHeader className="pb-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar className="w-20 h-20 border-4 border-background">
                <AvatarImage
                  src={profile?.avatarUrl || `/abstract-user-icon.png?height=80&width=80&query=user avatar ${id}`}
                />
                <AvatarFallback>{id.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{profile?.displayName || id}</h1>
                <p className="text-muted-foreground">
                  Membro desde{" "}
                  {profile?.joinedAt.toLocaleDateString("pt-BR") ||
                    new Date(
                      Date.now() - 1000 * 3600 * 24 * 30 * Number.parseInt(id.replace(/\D/g, "") || "1"),
                    ).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="flex gap-2">
                {!isOwnProfile && (
                  <Button
                    variant={isFollowing ? "outline" : "default"}
                    onClick={handleToggleFollow}
                    disabled={isFollowLoading}
                  >
                    {isFollowLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {isFollowing ? "Seguindo" : "Seguir"}
                  </Button>
                )}
                {isOwnProfile && !isEditing && (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar perfil
                  </Button>
                )}
                {isOwnProfile && isEditing && (
                  <>
                    <Button variant="outline" className="border-green-600 text-green-500" onClick={handleSaveChanges}>
                      <Check className="h-4 w-4 mr-2" />
                      Salvar
                    </Button>
                    <Button variant="outline" className="border-red-600 text-red-500" onClick={handleCancelChanges}>
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </>
                )}
                {isOwnProfile && (
                  <Link href="/settings">
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                      <span className="sr-only">Configurações</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Biografia</label>
                  <Textarea
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Conte um pouco sobre você..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Localização</label>
                    <Input
                      value={editedLocation}
                      onChange={(e) => setEditedLocation(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Sua cidade, país"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Website</label>
                    <Input
                      value={editedWebsite}
                      onChange={(e) => setEditedWebsite(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="https://seusite.com"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-300 mb-4">{profile?.bio || "Sem biografia."}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="font-bold">{profile?.postsCount || 0}</span> posts
                  </div>
                  <div>
                    <span className="font-bold">{followersCount}</span> seguidores
                  </div>
                  <div>
                    <span className="font-bold">{profile?.followingCount || 0}</span> seguindo
                  </div>
                  {profile?.location && (
                    <div className="text-gray-400">
                      <span className="mr-1">📍</span> {profile.location}
                    </div>
                  )}
                  {profile?.website && (
                    <div className="text-blue-400">
                      <span className="mr-1">🔗</span>
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {profile.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-3 mb-8">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="comments">Comentários</TabsTrigger>
            <TabsTrigger value="upvoted">Curtidos</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-0 space-y-6">
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : posts.length > 0 ? (
              <>
                {posts.map((post) => (
                  <MemePost
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    author={post.author}
                    authorId={post.authorId}
                    timestamp={new Date(post.timestamp)}
                    imageUrl={post.imageUrl}
                    likes={post.likes}
                    comments={post.comments}
                    tags={post.tags}
                  />
                ))}
                {hasMore && (
                  <div className="flex justify-center pt-4">
                    <Button variant="outline" onClick={loadMore} disabled={isLoadingMore}>
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Carregando...
                        </>
                      ) : (
                        "Carregar mais"
                      )}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">Este usuário ainda não publicou nenhum meme.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="comments" className="mt-0">
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <Card>
                <CardContent className="p-6">
                  {comments.length > 0 ? (
                    <div className="space-y-6">
                      {comments.map((comment) => (
                        <div key={comment.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <Link href={`/meme/${comment.postId}`} className="text-sm font-medium hover:underline">
                            Em resposta a: {comment.postTitle}
                          </Link>
                          <p className="mt-2">{comment.content}</p>
                          <div className="flex items-center mt-2 text-xs text-muted-foreground">
                            <span>{new Date(comment.timestamp).toLocaleString("pt-BR")}</span>
                            <span className="mx-2">•</span>
                            <span>{comment.likes} votos</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">Este usuário ainda não fez nenhum comentário.</p>
                    </div>
                  )}
                </CardContent>
                {hasMore && comments.length > 0 && (
                  <div className="flex justify-center pb-6">
                    <Button variant="outline" onClick={loadMore} disabled={isLoadingMore}>
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Carregando...
                        </>
                      ) : (
                        "Carregar mais"
                      )}
                    </Button>
                  </div>
                )}
              </Card>
            )}
          </TabsContent>

          <TabsContent value="upvoted" className="mt-0 space-y-6">
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : likedPosts.length > 0 ? (
              <>
                {likedPosts.map((post) => (
                  <MemePost
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    author={post.author}
                    authorId={post.authorId}
                    timestamp={new Date(post.timestamp)}
                    imageUrl={post.imageUrl}
                    likes={post.likes}
                    comments={post.comments}
                    tags={post.tags}
                  />
                ))}
                {hasMore && (
                  <div className="flex justify-center pt-4">
                    <Button variant="outline" onClick={loadMore} disabled={isLoadingMore}>
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Carregando...
                        </>
                      ) : (
                        "Carregar mais"
                      )}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">Este usuário ainda não curtiu nenhum meme.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
