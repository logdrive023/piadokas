"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Bell, Check, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { getMockNotifications } from "@/lib/mock-notifications"
import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(getMockNotifications())
  const [activeTab, setActiveTab] = useState("all")
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  // Paginação
  const [currentPage, setCurrentPage] = useState(1)
  const notificationsPerPage = 10

  // Redirecionar para login se não estiver logado
  if (typeof window !== "undefined" && !isLoggedIn) {
    router.push("/usuario")
    return null
  }

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification,
      ),
    )
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  // Calcular notificações para a página atual
  const indexOfLastNotification = currentPage * notificationsPerPage
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage
  const currentNotifications = filteredNotifications.slice(indexOfFirstNotification, indexOfLastNotification)

  // Calcular número total de páginas
  const totalPages = Math.ceil(filteredNotifications.length / notificationsPerPage)

  // Mudar de página
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  // Resetar para a primeira página quando mudar de aba
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setCurrentPage(1)
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="container py-8 max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Notificações</h1>
      </div>

      <Card className="bg-gray-800 border-gray-700 mb-6">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-white">Centro de Notificações</CardTitle>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="border-purple-600 text-purple-400"
              onClick={handleMarkAllAsRead}
            >
              <Check className="h-4 w-4 mr-2" />
              Marcar todas como lidas
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
            <div className="overflow-x-auto -mx-4 px-4">
              <TabsList className="grid min-w-[500px] md:min-w-0 grid-cols-5 mb-6">
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="unread">Não lidas {unreadCount > 0 && `(${unreadCount})`}</TabsTrigger>
                <TabsTrigger value="like">Curtidas</TabsTrigger>
                <TabsTrigger value="comment">Comentários</TabsTrigger>
                <TabsTrigger value="follow">Seguidores</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <div className="space-y-1">
                {currentNotifications.length > 0 ? (
                  currentNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 p-4 rounded-lg ${
                        notification.read ? "bg-gray-800" : "bg-gray-700"
                      } hover:bg-gray-700 transition-colors`}
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        {notification.type === "system" ? (
                          <div className="h-full w-full bg-gray-600 flex items-center justify-center">
                            <Bell className="h-5 w-5 text-gray-300" />
                          </div>
                        ) : (
                          <AvatarImage
                            src={`/abstract-user-icon.png?height=40&width=40&query=user ${notification.userId || "system"}`}
                            alt="User"
                          />
                        )}
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between flex-wrap">
                          <span
                            className={`text-sm font-medium ${
                              notification.type === "like"
                                ? "text-green-400"
                                : notification.type === "comment"
                                  ? "text-blue-400"
                                  : notification.type === "follow"
                                    ? "text-purple-400"
                                    : "text-gray-400"
                            }`}
                          >
                            {notification.type === "like"
                              ? "Curtida"
                              : notification.type === "comment"
                                ? "Comentário"
                                : notification.type === "follow"
                                  ? "Novo seguidor"
                                  : "Sistema"}
                          </span>
                          <span className="text-xs text-gray-400">{notification.time}</span>
                        </div>
                        <p className="text-white mt-1 break-words">{notification.message}</p>

                        {notification.postId && (
                          <div className="mt-2">
                            <Link
                              href={`/meme/${notification.postId}`}
                              className="text-sm text-purple-400 hover:text-purple-300 inline-flex items-center"
                            >
                              Ver post
                            </Link>
                          </div>
                        )}
                      </div>

                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>Nenhuma notificação encontrada</p>
                  </div>
                )}
              </div>

              {/* Paginação */}
              {filteredNotifications.length > notificationsPerPage && (
                <div className="flex justify-center items-center mt-6 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border-gray-700 text-gray-300"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => {
                      // Mostrar apenas a página atual, primeira, última e páginas próximas
                      if (
                        number === 1 ||
                        number === totalPages ||
                        (number >= currentPage - 1 && number <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={number}
                            variant={number === currentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => paginate(number)}
                            className={
                              number === currentPage
                                ? "bg-purple-600 hover:bg-purple-700 text-white"
                                : "border-gray-700 text-gray-300"
                            }
                          >
                            {number}
                          </Button>
                        )
                      }

                      // Adicionar elipses para páginas omitidas
                      if (number === 2 && currentPage > 3) {
                        return (
                          <span key="ellipsis-start" className="text-gray-500">
                            ...
                          </span>
                        )
                      }

                      if (number === totalPages - 1 && currentPage < totalPages - 2) {
                        return (
                          <span key="ellipsis-end" className="text-gray-500">
                            ...
                          </span>
                        )
                      }

                      return null
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border-gray-700 text-gray-300"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
