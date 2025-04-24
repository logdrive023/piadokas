"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, ImageIcon, FileVideo, LinkIcon, X } from "lucide-react"
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState("")
  const [uploadType, setUploadType] = useState<"image" | "video" | "link">("image")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [linkUrl, setLinkUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  // Refs para os inputs de arquivo
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  // Check if user is logged in, if not redirect to login page
  if (typeof window !== "undefined" && !isLoggedIn) {
    router.push("/usuario")
    return null
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setVideoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const clearPreview = () => {
    setImagePreview(null)
    setVideoPreview(null)
    setLinkUrl("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success! Redirect to home page
      router.push("/")
    } catch (error) {
      console.error("Error submitting post:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Voltar para a página inicial</span>
            </Link>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h1 className="text-2xl font-bold text-white mb-6">Criar novo post</h1>

            <div className="mb-8">
              <Accordion type="single" collapsible className="bg-gray-800 border border-gray-700 rounded-lg">
                <AccordionItem value="rules" className="border-b-0">
                  <AccordionTrigger className="px-4 py-3 text-white hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-purple-400" />
                      <span className="font-medium">Regras para envio de memes</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      <Alert className="bg-gray-700 border-gray-600">
                        <AlertCircle className="h-4 w-4 text-blue-400" />
                        <AlertTitle className="text-white">Formatos e Tamanhos</AlertTitle>
                        <AlertDescription className="text-gray-300">
                          <ul className="list-disc pl-5 space-y-1 mt-2">
                            <li>
                              Formatos recomendados: JPEG ou PNG. Para vídeos: MP4. Os formatos JFIF e MOV não são
                              recomendados, mas são aceitos.
                            </li>
                            <li>
                              Você pode mandar o link do vídeo ou gif caso não saiba baixar. Isso inclusive facilita a
                              postagem.
                            </li>
                            <li>
                              Tamanho do meme: de preferência menos de 2000px de altura. A largura é automaticamente
                              ajustada para 620px.
                            </li>
                            <li>Anexe no máximo 10 arquivos por vez.</li>
                          </ul>
                        </AlertDescription>
                      </Alert>

                      <Alert className="bg-gray-700 border-gray-600">
                        <AlertTriangle className="h-4 w-4 text-amber-400" />
                        <AlertTitle className="text-white">Restrições Importantes</AlertTitle>
                        <AlertDescription className="text-gray-300">
                          <ul className="list-disc pl-5 space-y-1 mt-2">
                            <li>
                              Só serão aceitos memes sem marca d'água de outro site. Não é necessário inserir a marca do
                              PiAdokas, é automático.
                            </li>
                            <li>Memes repetidos ou com mesma ideia de outro meme recente não serão aprovados.</li>
                            <li className="font-medium text-amber-300">
                              Temas proibidos: política, violência, discurso de ódio, pornografia ou brincadeiras de mal
                              gosto envolvendo crianças e adolescentes.
                            </li>
                          </ul>
                        </AlertDescription>
                      </Alert>

                      <Alert className="bg-gray-700 border-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <AlertTitle className="text-white">Processo de Publicação</AlertTitle>
                        <AlertDescription className="text-gray-300">
                          <ul className="list-disc pl-5 space-y-1 mt-2">
                            <li>
                              Coloque nome e sobrenome ou apelido. Se tiver alguma dúvida, coloque seu e-mail real para
                              ser respondido.
                            </li>
                            <li>
                              Seu meme poderá ser publicado entre 1 e 3 dias, ou pode cair na coletânea peculiar de
                              domingo.
                            </li>
                            <li>Enviando uma foto você automaticamente autoriza a mesma a ser postada no blog.</li>
                          </ul>
                        </AlertDescription>
                      </Alert>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Digite um título para seu meme"
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="humor, memes, engraçado"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-4">
                <Label>Conteúdo</Label>

                <Tabs defaultValue="image" value={uploadType} onValueChange={(v) => setUploadType(v as any)}>
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="image" className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      <span>Imagem</span>
                    </TabsTrigger>
                    <TabsTrigger value="video" className="flex items-center gap-2">
                      <FileVideo className="h-4 w-4" />
                      <span>Vídeo</span>
                    </TabsTrigger>
                    <TabsTrigger value="link" className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" />
                      <span>Link</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="image">
                    <div className="space-y-4">
                      {!imagePreview ? (
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                          <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                          <p className="text-gray-400 mb-2">Arraste e solte uma imagem ou clique para fazer upload</p>
                          <p className="text-xs text-gray-500 mb-4">PNG, JPG ou GIF (máx. 5MB)</p>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            ref={imageInputRef}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="border-purple-600 text-purple-400"
                            onClick={() => imageInputRef.current?.click()}
                          >
                            Selecionar arquivo
                          </Button>
                        </div>
                      ) : (
                        <div className="relative">
                          <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full rounded-lg" />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={clearPreview}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="video">
                    <div className="space-y-4">
                      {!videoPreview ? (
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                          <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                          <p className="text-gray-400 mb-2">Arraste e solte um vídeo ou clique para fazer upload</p>
                          <p className="text-xs text-gray-500 mb-4">MP4, WebM ou OGG (máx. 50MB)</p>
                          <Input
                            id="video-upload"
                            type="file"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            className="hidden"
                            ref={videoInputRef}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="border-purple-600 text-purple-400"
                            onClick={() => videoInputRef.current?.click()}
                          >
                            Selecionar arquivo
                          </Button>
                        </div>
                      ) : (
                        <div className="relative">
                          <video src={videoPreview} controls className="w-full rounded-lg" />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={clearPreview}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="link">
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          value={linkUrl}
                          onChange={(e) => setLinkUrl(e.target.value)}
                          placeholder="https://exemplo.com/meme.jpg"
                          className="bg-gray-700 border-gray-600 text-white flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="border-purple-600 text-purple-400"
                          onClick={() => {
                            if (linkUrl) {
                              setImagePreview(linkUrl)
                            }
                          }}
                        >
                          Visualizar
                        </Button>
                      </div>

                      {imagePreview && (
                        <div className="relative">
                          <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full rounded-lg" />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={clearPreview}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição (opcional)</Label>
                <Textarea
                  id="description"
                  placeholder="Adicione uma descrição para seu meme..."
                  className="bg-gray-700 border-gray-600 text-white resize-none"
                  rows={3}
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={isSubmitting || (!imagePreview && !videoPreview && !linkUrl) || !title}
                >
                  {isSubmitting ? "Publicando..." : "Publicar meme"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
