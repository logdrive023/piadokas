"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Megaphone,
  BarChart3,
  Users,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { HorizontalAd } from "@/components/horizontal-ad"

export default function ContatoPage() {
  const [activeTab, setActiveTab] = useState("contato")
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")

    // Simulação de envio do formulário
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setFormStatus("success")
      setFormData({ nome: "", email: "", assunto: "", mensagem: "" })
    } catch (error) {
      setFormStatus("error")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex justify-center">
      <div className="container py-8 max-w-4xl">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Contato e Publicidade</h1>
        </div>

        <Tabs defaultValue="contato" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="contato">Contato</TabsTrigger>
            <TabsTrigger value="publicidade">Anuncie Conosco</TabsTrigger>
          </TabsList>

          <TabsContent value="contato" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Entre em Contato</CardTitle>
                <CardDescription>
                  Tem alguma dúvida, sugestão ou feedback? Preencha o formulário abaixo e entraremos em contato o mais
                  breve possível.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {formStatus === "success" ? (
                  <div className="bg-green-900/20 border border-green-800 rounded-lg p-6 text-center">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Mensagem Enviada com Sucesso!</h3>
                    <p className="text-gray-300 mb-2">
                      Agradecemos pelo seu contato. Sua mensagem é muito importante para nós!
                    </p>
                    <p className="text-gray-300 mb-4">
                      Nossa equipe analisará sua mensagem e retornará em breve através do email fornecido.
                    </p>
                    <Button
                      onClick={() => setFormStatus("idle")}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Enviar nova mensagem
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome</Label>
                        <Input
                          id="nome"
                          name="nome"
                          placeholder="Seu nome completo"
                          value={formData.nome}
                          onChange={handleChange}
                          className="bg-gray-700 border-gray-600 text-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-gray-700 border-gray-600 text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assunto">Assunto</Label>
                      <select
                        id="assunto"
                        name="assunto"
                        value={formData.assunto}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-600 bg-gray-700 text-white p-2"
                        required
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="suporte">Suporte Técnico</option>
                        <option value="sugestao">Sugestão</option>
                        <option value="parceria">Proposta de Parceria</option>
                        <option value="publicidade">Publicidade</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensagem">Mensagem</Label>
                      <Textarea
                        id="mensagem"
                        name="mensagem"
                        placeholder="Digite sua mensagem aqui..."
                        value={formData.mensagem}
                        onChange={handleChange}
                        className="bg-gray-700 border-gray-600 text-white min-h-[150px]"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700 text-white w-full"
                      disabled={formStatus === "submitting"}
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            <HorizontalAd />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-white">
                    <Mail className="h-5 w-5 mr-2 text-purple-400" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">contato@piadokas.com.br</p>
                  <p className="text-gray-300">suporte@piadokas.com.br</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-white">
                    <Phone className="h-5 w-5 mr-2 text-purple-400" />
                    Telefone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">(11) 9999-8888</p>
                  <p className="text-gray-300">Segunda a Sexta, 9h às 18h</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-white">
                    <MapPin className="h-5 w-5 mr-2 text-purple-400" />
                    Endereço
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Av. Paulista, 1000</p>
                  <p className="text-gray-300">São Paulo, SP - Brasil</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="publicidade" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Megaphone className="h-6 w-6 mr-2 text-purple-400" />
                  Anuncie no PiAdokas
                </CardTitle>
                <CardDescription>
                  Alcance milhões de usuários diariamente e aumente a visibilidade da sua marca ou produto.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    O PiAdokas é um dos maiores sites de memes e humor do Brasil, com milhões de visualizações mensais e
                    uma audiência engajada. Anunciar conosco é uma excelente oportunidade para promover sua marca,
                    produto ou serviço para um público jovem e conectado.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-white text-lg">
                        <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
                        Nossos Números
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Visitantes mensais:</span>
                        <span className="text-white font-bold">2.5 milhões</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Visualizações de página:</span>
                        <span className="text-white font-bold">12 milhões</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Usuários cadastrados:</span>
                        <span className="text-white font-bold">500 mil</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Tempo médio no site:</span>
                        <span className="text-white font-bold">8 minutos</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-white text-lg">
                        <Users className="h-5 w-5 mr-2 text-green-400" />
                        Perfil da Audiência
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Idade:</span>
                        <span className="text-white font-bold">18-34 anos (75%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Gênero:</span>
                        <span className="text-white font-bold">60% H, 40% M</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Interesses:</span>
                        <span className="text-white font-bold">Humor, games, tech</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Dispositivos:</span>
                        <span className="text-white font-bold">70% mobile</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-white text-lg">
                        <DollarSign className="h-5 w-5 mr-2 text-yellow-400" />
                        Formatos de Anúncios
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Banner horizontal:</span>
                        <span className="text-white font-bold">728x90px</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Banner lateral:</span>
                        <span className="text-white font-bold">300x250px</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Post patrocinado:</span>
                        <span className="text-white font-bold">Conteúdo</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Pop-up:</span>
                        <span className="text-white font-bold">600x400px</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-purple-900/30 border border-purple-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Solicite uma proposta personalizada</h3>
                  <p className="text-gray-300 mb-4">
                    Entre em contato conosco para receber uma proposta personalizada de acordo com suas necessidades e
                    objetivos de marketing.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => {
                        setActiveTab("contato")
                        // Garantir que a página não role para baixo
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                    >
                      Fale com nossa equipe
                    </Button>
                    <Button variant="outline" className="border-purple-600 text-purple-400">
                      <a href="/midia-kit-piadokas.pdf" download>
                        Baixar mídia kit
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <HorizontalAd />

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Perguntas Frequentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Quais são os formatos de anúncios disponíveis?
                  </h3>
                  <p className="text-gray-300">
                    Oferecemos diversos formatos, incluindo banners horizontais, banners laterais, posts patrocinados e
                    pop-ups. Todos os formatos são responsivos e se adaptam a dispositivos móveis e desktop.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Como funciona o modelo de cobrança?</h3>
                  <p className="text-gray-300">
                    Trabalhamos com diferentes modelos de cobrança, incluindo CPM (custo por mil impressões), CPC (custo
                    por clique) e pacotes mensais com valor fixo. O modelo ideal depende dos seus objetivos de
                    marketing.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Qual é o investimento mínimo?</h3>
                  <p className="text-gray-300">
                    O investimento mínimo para campanhas no PiAdokas é de R$ 500,00. Este valor pode variar de acordo
                    com a sazonalidade e disponibilidade de espaços publicitários.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
