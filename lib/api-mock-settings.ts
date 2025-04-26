import { simulateNetworkDelay } from "./api-mock-auth"

// Interface para os dados do perfil
export interface ProfileData {
  username: string
  email: string
  avatar?: string
}

// Interface para atualização de senha
export interface PasswordUpdateData {
  currentPassword: string
  newPassword: string
}

/**
 * Simula uma chamada de API para buscar os dados do perfil
 * @param userId ID do usuário
 * @returns Promise com os dados do perfil
 */
export async function fetchProfileData(userId: string): Promise<ProfileData> {
  await simulateNetworkDelay(300, 800)

  // Simular dados do perfil
  return {
    username: userId === "admin-1" ? "Administrador" : `usuario${userId}`,
    email: userId === "admin-1" ? "admin@admin.com" : `usuario${userId}@exemplo.com`,
    avatar: "/abstract-user-icon.png",
  }
}

/**
 * Simula uma chamada de API para atualizar os dados do perfil
 * @param userId ID do usuário
 * @param data Novos dados do perfil
 * @returns Promise com status de sucesso ou erro
 */
export async function updateProfileData(
  userId: string,
  data: Partial<ProfileData>,
): Promise<{ success: boolean; error?: string }> {
  await simulateNetworkDelay(500, 1000)

  // Validar dados
  if (data.username && data.username.length < 3) {
    return {
      success: false,
      error: "Nome de usuário deve ter pelo menos 3 caracteres.",
    }
  }

  if (data.email && !data.email.includes("@")) {
    return {
      success: false,
      error: "Email inválido.",
    }
  }

  // Simular atualização bem-sucedida
  return {
    success: true,
  }
}

/**
 * Simula uma chamada de API para atualizar a senha
 * @param userId ID do usuário
 * @param data Dados de atualização de senha
 * @returns Promise com status de sucesso ou erro
 */
export async function updatePassword(
  userId: string,
  data: PasswordUpdateData,
): Promise<{ success: boolean; error?: string }> {
  await simulateNetworkDelay(500, 1000)

  // Validar senha atual (simulação)
  if (data.currentPassword.length < 6) {
    return {
      success: false,
      error: "Senha atual incorreta.",
    }
  }

  // Validar nova senha
  if (data.newPassword.length < 6) {
    return {
      success: false,
      error: "A nova senha deve ter pelo menos 6 caracteres.",
    }
  }

  // Simular atualização bem-sucedida
  return {
    success: true,
  }
}

/**
 * Simula uma chamada de API para enviar um link de redefinição de senha
 * @param email Email do usuário
 * @returns Promise com status de sucesso ou erro
 */
export async function sendPasswordResetLink(email: string): Promise<{ success: boolean; error?: string }> {
  await simulateNetworkDelay(800, 1500)

  // Validar email
  if (!email || !email.includes("@")) {
    return {
      success: false,
      error: "Email inválido.",
    }
  }

  // Simular envio bem-sucedido
  return {
    success: true,
  }
}
