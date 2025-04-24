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
  // Gerar 30 notificações para testar a paginação
  const mockNotifications: Notification[] = []

  // Notificações de curtidas
  for (let i = 1; i <= 8; i++) {
    mockNotifications.push({
      id: `like-${i}`,
      type: "like",
      message: `${Math.floor(Math.random() * 10) + 1} pessoas curtiram seu post "${i % 2 === 0 ? "Quando o código finalmente funciona" : "Meu gato quando vê o aspirador"}"`,
      time: `há ${i < 3 ? i * 5 : i * 10} minutos`,
      read: i > 4,
      postId: `post-${i}`,
    })
  }

  // Notificações de comentários
  for (let i = 1; i <= 8; i++) {
    mockNotifications.push({
      id: `comment-${i}`,
      type: "comment",
      message: `usuario${i * 10} comentou no seu post: "${i % 3 === 0 ? "KKKKKK muito bom!" : i % 3 === 1 ? "Isso me lembra quando..." : "Vou compartilhar com meus amigos!"}"`,
      time: `há ${i < 3 ? i : i * 2} horas`,
      read: i > 5,
      postId: `post-${i + 10}`,
      userId: `user-${i * 10}`,
    })
  }

  // Notificações de seguidores
  for (let i = 1; i <= 8; i++) {
    mockNotifications.push({
      id: `follow-${i}`,
      type: "follow",
      message: `${i % 2 === 0 ? "memeMaster" : "usuario"}${i * 5} começou a seguir você`,
      time: `há ${i} dia${i > 1 ? "s" : ""}`,
      read: i > 3,
      userId: `user-${i * 5}`,
    })
  }

  // Notificações do sistema
  for (let i = 1; i <= 6; i++) {
    mockNotifications.push({
      id: `system-${i}`,
      type: "system",
      message: `${i % 3 === 0 ? "Seu post foi aprovado pelos moderadores" : i % 3 === 1 ? "Bem-vindo ao PiAdokas! Complete seu perfil." : "Você ganhou uma conquista: Meme Master!"}`,
      time: `há ${i} dia${i > 1 ? "s" : ""}`,
      read: i > 2,
      postId: i % 3 === 0 ? `post-${i + 20}` : undefined,
    })
  }

  return mockNotifications
}
