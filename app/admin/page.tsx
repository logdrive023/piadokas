"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Shield,
  Users,
  Flag,
  BarChart3,
  Settings,
  Search,
  LineChart,
  BarChart,
  PieChart,
} from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"

export default function AdminPage() {
  const { isLoggedIn, user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("users")

  // Estado para gerenciamento de usuários
  const [userFilter, setUserFilter] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<any[] | null>(null)

  // Estado para paginação de denúncias
  const [currentReportPage, setCurrentReportPage] = useState(1)
  const [reportsPerPage] = useState(3)
  const [reportFilter, setReportFilter] = useState("")
  const [filteredReports, setFilteredReports] = useState<any[]>([])

  // Dados mockados
  const mockUsers = [
    { id: 1, username: "usuario1", email: "usuario1@email.com", avatar: "/vibrant-street-market.png" },
    { id: 2, username: "usuario2", email: "usuario2@email.com", avatar: "/vibrant-street-market.png" },
    { id: 3, username: "usuario3", email: "usuario3@email.com", avatar: "/vibrant-street-market.png" },
    { id: 4, username: "admin", email: "admin@email.com", avatar: "/vibrant-street-market.png" },
    { id: 5, username: "moderador", email: "moderador@email.com", avatar: "/vibrant-street-market.png" },
    { id: 6, username: "teste", email: "teste@email.com", avatar: "/vibrant-street-market.png" },
    { id: 7, username: "joao123", email: "joao123@email.com", avatar: "/vibrant-street-market.png" },
    { id: 8, username: "maria456", email: "maria456@email.com", avatar: "/vibrant-street-market.png" },
  ]

  const mockReports = [
    {
      id: 1,
      type: "Conteúdo inapropriado",
      reporter: "usuario1",
      reportedContent: "Post #121",
      description: "Este conteúdo viola as regras da comunidade porque contém conteúdo inapropriado.",
      date: "22/04/2024",
    },
    {
      id: 2,
      type: "Discurso de ódio",
      reporter: "usuario2",
      reportedContent: "Post #122",
      description: "Este conteúdo viola as regras da comunidade porque contém discurso de ódio.",
      date: "22/04/2024",
    },
    {
      id: 3,
      type: "Spam",
      reporter: "usuario3",
      reportedContent: "Post #123",
      description: "Este conteúdo viola as regras da comunidade porque contém spam.",
      date: "21/04/2024",
    },
    {
      id: 4,
      type: "Conteúdo inapropriado",
      reporter: "usuario4",
      reportedContent: "Post #124",
      description: "Este conteúdo viola as regras da comunidade porque contém conteúdo inapropriado.",
      date: "21/04/2024",
    },
    {
      id: 5,
      type: "Assédio",
      reporter: "usuario5",
      reportedContent: "Post #125",
      description: "Este conteúdo viola as regras da comunidade porque contém assédio.",
      date: "20/04/2024",
    },
    {
      id: 6,
      type: "Violação de direitos autorais",
      reporter: "usuario6",
      reportedContent: "Post #126",
      description: "Este conteúdo viola as regras da comunidade porque contém violação de direitos autorais.",
      date: "20/04/2024",
    },
    {
      id: 7,
      type: "Desinformação",
      reporter: "usuario7",
      reportedContent: "Post #127",
      description: "Este conteúdo viola as regras da comunidade porque contém desinformação.",
      date: "19/04/2024",
    },
  ]

  // Dados para os gráficos
  const visitData = [
    { day: "Segunda", visits: 1200 },
    { day: "Terça", visits: 1900 },
    { day: "Quarta", visits: 1500 },
    { day: "Quinta", visits: 1800 },
    { day: "Sexta", visits: 2200 },
    { day: "Sábado", visits: 2500 },
    { day: "Domingo", visits: 2100 },
  ]

  const contentTypeData = [
    { type: "Memes", count: 65 },
    { type: "GIFs", count: 20 },
    { type: "Vídeos", count: 15 },
  ]

  const engagementData = [
    { type: "Curtidas", count: 12500 },
    { type: "Comentários", count: 4200 },
    { type: "Compartilhamentos", count: 2800 },
  ]

  // Protect admin route
  useEffect(() => {
    if (!isLoggedIn || !user?.isAdmin) {
      router.push("/usuario")
    }
  }, [isLoggedIn, user, router])

  // Filtrar usuários com base no nome
  useEffect(() => {
    if (userFilter.trim() === "") {
      setFilteredUsers(null)
    } else {
      const filtered = mockUsers.filter((user) => user.username.toLowerCase().includes(userFilter.toLowerCase()))
      setFilteredUsers(filtered)
    }
  }, [userFilter])

  // Filtrar denúncias com base no nome do usuário
  useEffect(() => {
    if (reportFilter.trim() === "") {
      setFilteredReports(mockReports)
    } else {
      const filtered = mockReports.filter((report) =>
        report.reporter.toLowerCase().includes(reportFilter.toLowerCase()),
      )
      setFilteredReports(filtered)
    }
    // Resetar para a primeira página quando o filtro mudar
    setCurrentReportPage(1)
  }, [reportFilter])

  // Paginação para denúncias
  const indexOfLastReport = currentReportPage * reportsPerPage
  const indexOfFirstReport = indexOfLastReport - reportsPerPage
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport)
  const totalReportPages = Math.ceil(filteredReports.length / reportsPerPage)

  if (!isLoggedIn || !user?.isAdmin) {
    return null
  }

  // Renderizar gráfico de visitas
  const renderVisitsChart = () => {
    const maxVisits = Math.max(...visitData.map((d) => d.visits))
    const chartHeight = 200

    return (
      <div className="mt-4">
        <div className="flex items-end h-[200px] gap-2">
          {visitData.map((data, index) => {
            const barHeight = (data.visits / maxVisits) * chartHeight
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-purple-600 rounded-t-md transition-all duration-300 hover:bg-purple-500"
                  style={{ height: `${barHeight}px` }}
                ></div>
                <div className="text-xs mt-2 text-gray-400">{data.day}</div>
              </div>
            )
          })}
        </div>
        <div className="flex justify-between mt-4">
          <div className="text-sm text-gray-400">0</div>
          <div className="text-sm text-gray-400">{maxVisits}</div>
        </div>
      </div>
    )
  }

  // Renderizar gráfico de tipos de conteúdo
  const renderContentTypeChart = () => {
    const total = contentTypeData.reduce((acc, curr) => acc + curr.count, 0)
    let startAngle = 0

    return (
      <div className="relative h-[200px] w-[200px] mx-auto mt-4">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {contentTypeData.map((data, index) => {
            const percentage = (data.count / total) * 100
            const angle = (percentage / 100) * 360
            const endAngle = startAngle + angle

            // Calcular pontos do arco
            const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
            const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
            const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
            const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)

            // Determinar se o arco é maior que 180 graus
            const largeArcFlag = angle > 180 ? 1 : 0

            // Criar path para o arco
            const path = `
              M 50 50
              L ${x1} ${y1}
              A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}
              Z
            `

            // Cores para os diferentes tipos
            const colors = ["#8b5cf6", "#3b82f6", "#ec4899"]

            // Atualizar ângulo inicial para o próximo arco
            startAngle = endAngle

            return (
              <path
                key={index}
                d={path}
                fill={colors[index % colors.length]}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            )
          })}
        </svg>

        {/* Legenda */}
        <div className="mt-4 flex justify-center gap-4">
          {contentTypeData.map((data, index) => {
            const colors = ["bg-purple-600", "bg-blue-600", "bg-pink-600"]
            return (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 ${colors[index % colors.length]} rounded-full mr-1`}></div>
                <span className="text-xs text-gray-300">
                  {data.type} ({data.count}%)
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Renderizar gráfico de engajamento
  const renderEngagementChart = () => {
    const maxCount = Math.max(...engagementData.map((d) => d.count))

    return (
      <div className="mt-4">
        {engagementData.map((data, index) => {
          const percentage = (data.count / maxCount) * 100
          const colors = ["bg-green-600", "bg-blue-600", "bg-amber-600"]

          return (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-300">{data.type}</span>
                <span className="text-sm text-gray-400">{data.count}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className={`${colors[index % colors.length]} h-2.5 rounded-full`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <div className="container py-8 max-w-6xl">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-500" />
            <h1 className="text-3xl font-bold">Painel de Administração</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2">
                <Flag className="h-4 w-4 text-red-400" />
                Denúncias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{filteredReports.length}</p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-gray-600 text-gray-300"
                onClick={() => setActiveTab("reports")}
              >
                Revisar
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-green-400" />
                Usuários
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{mockUsers.length}</p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-gray-600 text-gray-300"
                onClick={() => setActiveTab("users")}
              >
                Gerenciar
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-400" />
                Visualizações Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">12,845</p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-gray-600 text-gray-300"
                onClick={() => setActiveTab("stats")}
              >
                Estatísticas
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="reports">Denúncias</TabsTrigger>
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Gerenciamento de Usuários</CardTitle>
                <CardDescription>Administre os usuários da plataforma</CardDescription>
                <div className="mt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Filtrar por nome de usuário..."
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                      value={userFilter}
                      onChange={(e) => setUserFilter(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers === null ? (
                    <div className="text-center py-8 text-gray-400">
                      <p>Digite um nome de usuário para buscar.</p>
                    </div>
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between border-b border-gray-700 pb-4 last:border-b-0 last:pb-0"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden">
                            <img
                              src={user.avatar || "/placeholder.svg"}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{user.username}</h3>
                            <p className="text-sm text-gray-400">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-amber-600 text-amber-500 hover:bg-amber-900/20"
                          >
                            Suspender
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <p>Nenhum usuário encontrado com este nome.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Denúncias</CardTitle>
                <CardDescription>Revise as denúncias feitas pelos usuários</CardDescription>
                <div className="mt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Filtrar por nome do denunciante..."
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                      value={reportFilter}
                      onChange={(e) => setReportFilter(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentReports.length > 0 ? (
                    currentReports.map((report) => (
                      <div key={report.id} className="border border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium text-white">Denúncia #{report.id}</h3>
                            <p className="text-sm text-gray-400">
                              Reportado por: {report.reporter} • {report.date}
                            </p>
                          </div>
                          <div className="bg-red-900/20 text-red-400 text-xs px-2 py-1 rounded">{report.type}</div>
                        </div>
                        <p className="text-gray-300 mb-3">{report.description}</p>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-16 h-16 bg-gray-700 rounded overflow-hidden">
                            <img
                              src={`/social-media-moderation.png?height=64&width=64&query=reported content ${report.id}`}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Conteúdo denunciado</h4>
                            <p className="text-sm text-gray-400">{report.reportedContent}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                            Ignorar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-600 text-red-500 hover:bg-red-900/20"
                          >
                            Remover conteúdo
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <p>Nenhuma denúncia encontrada com este filtro.</p>
                    </div>
                  )}
                </div>

                {/* Paginação para denúncias */}
                <div className="mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentReportPage((prev) => Math.max(prev - 1, 1))
                          }}
                          className={currentReportPage === 1 ? "pointer-events-none opacity-50" : ""}
                        >
                          Anterior
                        </PaginationPrevious>
                      </PaginationItem>

                      {Array.from({ length: totalReportPages }).map((_, index) => {
                        const pageNumber = index + 1

                        // Mostrar apenas páginas próximas à atual
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalReportPages ||
                          (pageNumber >= currentReportPage - 1 && pageNumber <= currentReportPage + 1)
                        ) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                href="#"
                                isActive={pageNumber === currentReportPage}
                                onClick={(e) => {
                                  e.preventDefault()
                                  setCurrentReportPage(pageNumber)
                                }}
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        }

                        // Adicionar elipses para páginas omitidas
                        if (
                          (pageNumber === currentReportPage - 2 && pageNumber > 1) ||
                          (pageNumber === currentReportPage + 2 && pageNumber < totalReportPages)
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
                            setCurrentReportPage((prev) => Math.min(prev + 1, totalReportPages))
                          }}
                          className={currentReportPage === totalReportPages ? "pointer-events-none opacity-50" : ""}
                        >
                          Próximo
                        </PaginationNext>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-purple-400" />
                    Visitas por Dia da Semana
                  </CardTitle>
                  <CardDescription>Análise de tráfego dos últimos 7 dias</CardDescription>
                </CardHeader>
                <CardContent>{renderVisitsChart()}</CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-400" />
                    Distribuição de Conteúdo
                  </CardTitle>
                  <CardDescription>Tipos de conteúdo publicados na plataforma</CardDescription>
                </CardHeader>
                <CardContent>{renderContentTypeChart()}</CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-green-400" />
                    Métricas de Engajamento
                  </CardTitle>
                  <CardDescription>Análise de interações dos usuários com o conteúdo</CardDescription>
                </CardHeader>
                <CardContent>{renderEngagementChart()}</CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="h-5 w-5 text-gray-400" />
                  Configurações do Site
                </CardTitle>
                <CardDescription>Gerencie as configurações gerais da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-2">
                    <h3 className="text-lg font-medium text-white">Configurações Gerais</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="text-sm text-gray-400">Email de contato</label>
                        <input
                          type="email"
                          value="contato@piadokas.com"
                          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <h3 className="text-lg font-medium text-white">Moderação</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-400">Aprovação manual de posts</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white mt-1">
                          <option value="enabled">Habilitado</option>
                          <option value="disabled">Desabilitado</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400">Filtro de palavras</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white mt-1">
                          <option value="strict">Rigoroso</option>
                          <option value="moderate">Moderado</option>
                          <option value="disabled">Desabilitado</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <h3 className="text-lg font-medium text-white">Publicidade</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-400">Anúncios pop-up</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white mt-1">
                          <option value="enabled">Habilitado</option>
                          <option value="disabled">Desabilitado</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400">Frequência de anúncios</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white mt-1">
                          <option value="high">Alta</option>
                          <option value="medium">Média</option>
                          <option value="low">Baixa</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Salvar configurações</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
