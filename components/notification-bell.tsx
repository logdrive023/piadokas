"use client"

import { useState, useEffect } from "react"
import { Bell, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getMockNotifications } from "@/lib/mock-notifications"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function NotificationBell() {
  const [notifications, setNotifications] = useState(getMockNotifications())
  const [isOpen, setIsOpen] = useState(false)
  const [hasNewNotifications, setHasNewNotifications] = useState(false)
  const { isLoggedIn } = useAuth()

  const unreadCount = notifications.filter((notification) => !notification.read).length

  // Simular recebimento de novas notificações
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn && !isOpen) {
        setHasNewNotifications(true)
      }
    }, 30000) // A cada 30 segundos, simula uma nova notificação

    return () => clearTimeout(timer)
  }, [isOpen, isLoggedIn, notifications])

  useEffect(() => {
    if (isOpen && hasNewNotifications) {
      setHasNewNotifications(false)
    }
  }, [isOpen, hasNewNotifications])

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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <div className="w-2 h-2 rounded-full bg-green-500"></div>
      case "comment":
        return <div className="w-2 h-2 rounded-full bg-blue-500"></div>
      case "follow":
        return <div className="w-2 h-2 rounded-full bg-purple-500"></div>
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-500"></div>
    }
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
          <Bell className={`h-5 w-5 ${hasNewNotifications ? "animate-bounce" : ""}`} />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 hover:bg-red-600"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-gray-800 border-gray-700 p-0">
        <div className="flex items-center justify-between p-3 border-b border-gray-700">
          <DropdownMenuLabel className="text-white m-0 p-0">Notificações</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-purple-400 hover:text-purple-300 h-8 px-2"
              onClick={handleMarkAllAsRead}
            >
              <Check className="h-3.5 w-3.5 mr-1" />
              Marcar todas como lidas
            </Button>
          )}
        </div>

        <div className="max-h-[350px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex p-0 cursor-pointer ${
                  notification.read ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-700 focus:bg-gray-700`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex items-start gap-3 p-3 w-full">
                  <div className="flex-shrink-0 mt-1">
                    <Avatar className="h-8 w-8">
                      {notification.type === "system" ? (
                        <div className="h-full w-full bg-gray-600 flex items-center justify-center">
                          <Bell className="h-4 w-4 text-gray-300" />
                        </div>
                      ) : (
                        <AvatarImage
                          src={`/abstract-user-icon.png?height=32&width=32&query=user ${notification.userId || "system"}`}
                          alt="User"
                        />
                      )}
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-xs font-medium ${
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
                    <p className="text-sm text-white mt-1 line-clamp-2">{notification.message}</p>

                    {notification.postId && (
                      <Link
                        href={`/post/${notification.postId}`}
                        className="text-xs text-purple-400 hover:text-purple-300 mt-1 inline-block"
                      >
                        Ver post
                      </Link>
                    )}
                  </div>

                  {!notification.read && <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2"></div>}
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-6 text-center text-gray-400">
              <Bell className="h-10 w-10 mx-auto mb-2 opacity-20" />
              <p>Nenhuma notificação</p>
            </div>
          )}
        </div>

        <DropdownMenuSeparator className="bg-gray-700 m-0" />
        <div className="p-2 flex justify-center">
          <Link
            href="/notifications"
            className="text-sm text-purple-400 hover:text-purple-300 w-full text-center py-2 hover:bg-gray-700 rounded-md transition-colors"
          >
            Ver todas as notificações
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NotificationBell
