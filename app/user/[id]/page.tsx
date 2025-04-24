"use client"

import { useState  } from "react"
import { useParams } from "next/navigation" // ✅ importar isso
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MemePost } from "@/components/meme-post"
import { Settings, Edit, Check, X } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"



export default function UserPage() {
  const params = useParams()
  const id = params.id as string 

  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [bio, setBio] = useState("Olá! Sou um usuário do PiAdokas e adoro compartilhar memes engraçados.")
  const [editedBio, setEditedBio] = useState(bio)
  const [location, setLocation] = useState("São Paulo, Brasil")
  const [editedLocation, setEditedLocation] = useState(location)
  const [website, setWebsite] = useState("https://meusite.com.br")
  const [editedWebsite, setEditedWebsite] = useState(website)

  // Verificar se o usuário atual é o dono do perfil
  const isOwnProfile = user?.username === id || user?.id === id

  const handleSaveChanges = () => {
    setBio(editedBio)
    setLocation(editedLocation)
    setWebsite(editedWebsite)
    setIsEditing(false)
  }

  const handleCancelChanges = () => {
    setEditedBio(bio)
    setEditedLocation(location)
    setEditedWebsite(website)
    setIsEditing(false)
  }

  return (
    <div className="flex justify-center">
      <div className="container py-8">
        <Card className="mb-8">
          <CardHeader className="pb-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar className="w-20 h-20 border-4 border-background">
                <AvatarImage src={`/abstract-user-icon.png?height=80&width=80&query=user avatar ${id}`} />
                <AvatarFallback>{id.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{id}</h1>
                <p className="text-muted-foreground">
                  Membro desde{" "}
                  {new Date(
                    Date.now() - 1000 * 3600 * 24 * 30 * Number.parseInt(id.replace(/\D/g, "") || "1"),
                  ).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="flex gap-2">
                {!isOwnProfile && <Button variant="outline">Seguir</Button>}
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
                <p className="text-gray-300 mb-4">{bio}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="font-bold">120</span> posts
                  </div>
                  <div>
                    <span className="font-bold">1.5k</span> seguidores
                  </div>
                  <div>
                    <span className="font-bold">350</span> seguindo
                  </div>
                  {location && (
                    <div className="text-gray-400">
                      <span className="mr-1">📍</span> {location}
                    </div>
                  )}
                  {website && (
                    <div className="text-blue-400">
                      <span className="mr-1">🔗</span>
                      <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-3 mb-8">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="comments">Comentários</TabsTrigger>
            <TabsTrigger value="upvoted">Curtidos</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-0 space-y-6">
            {Array.from({ length: 3 }).map((_, i) => {
              // Gerar um ID baseado no username para manter consistência
              const userId = Number.parseInt(id.replace(/\D/g, "") || "1")
              return (
                <MemePost
                  key={i}
                  id={userId * 10 + i}
                  title={`Meme do ${id} #${i + 1}`}
                  author={id}
                  authorId={id}
                  timestamp={new Date()}
                  imageUrl={`/placeholder.svg?height=400&width=600&query=meme ${id} ${i}`}
                  likes={Math.floor(Math.random() * 100)}
                  comments={Math.floor(Math.random() * 20)}
                  tags={["meme", "humor"]}
                />
              )
            })}
          </TabsContent>

          <TabsContent value="comments" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                      <Link href={`/post/${i}`} className="text-sm font-medium hover:underline">
                        Em resposta a: Meme super engraçado #{i + 1}
                      </Link>
                      <p className="mt-2">
                        Este é um comentário de exemplo para o post #{i}. O que você achou deste meme? 😂
                      </p>
                      <div className="flex items-center mt-2 text-xs text-muted-foreground">
                        <span>{new Date(Date.now() - i * 1000000).toLocaleString("pt-BR")}</span>
                        <span className="mx-2">•</span>
                        <span>{Math.floor(Math.random() * 50)} votos</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upvoted" className="mt-0 space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <MemePost
                key={i}
                id={i * 3}
                title={`Meme curtido #${i + 1}`}
                author={`usuario${i + 1}`}
                authorId={`usuario${i + 1}`}
                timestamp={new Date()}
                imageUrl={`/placeholder.svg?height=400&width=600&query=liked meme ${i}`}
                likes={Math.floor(Math.random() * 100)}
                comments={Math.floor(Math.random() * 20)}
                tags={["curtido", "favorito"]}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
