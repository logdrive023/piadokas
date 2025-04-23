// Mock data for notifications

interface Notification {
  id: string
  type: "like" | "comment" | "follow" | "system"
  message: string
  time: string
  read: boolean
  postId?: string
  userId?: string
}

export function getMockNotifications(): Notification[] {
  return [
    {
      id: "1",
      type: "like",
      message: '5 pessoas curtiram seu post "Quando o código finalmente funciona"',
      time: "há 5 minutos",
      read: false,
      postId: "post-1",
    },
    {
      id: "2",
      type: "comment",
      message: 'usuarioLegal comentou no seu post: "KKKKKK muito bom!"',
      time: "há 15 minutos",
      read: false,
      postId: "post-1",
      userId: "user-1",
    },
    {
      id: "3",
      type: "follow",
      message: "memeMaster começou a seguir você",
      time: "há 1 hora",
      read: false,
      userId: "user-2",
    },
    {
      id: "4",
      type: "like",
      message: "10 pessoas curtiram seu comentário",
      time: "há 2 horas",
      read: true,
      postId: "post-2",
    },
    {
      id: "5",
      type: "system",
      message: "Seu post foi aprovado pelos moderadores",
      time: "há 3 horas",
      read: true,
      postId: "post-3",
    },
    {
      id: "6",
      type: "comment",
      message: 'dev123 respondeu ao seu comentário: "Concordo totalmente!"',
      time: "há 5 horas",
      read: true,
      postId: "post-2",
      userId: "user-3",
    },
    {
      id: "7",
      type: "like",
      message: '3 pessoas curtiram seu post "Meu gato quando vê o aspirador"',
      time: "há 1 dia",
      read: true,
      postId: "post-4",
    },
  ]
}
