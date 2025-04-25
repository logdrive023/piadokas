// Simula um atraso de rede para parecer uma chamada de API real
const simulateNetworkDelay = (minMs = 300, maxMs = 800) => {
    const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs
    return new Promise((resolve) => setTimeout(resolve, delay))
  }
  
  // Interface para o usuário
  export interface User {
    id: string
    username: string
    email: string
    avatar?: string
    isAdmin?: boolean
  }
  
  // Interface para as credenciais de login
  export interface LoginCredentials {
    email: string
    password: string
  }
  
  // Interface para os dados de registro
  export interface RegisterData {
    username: string
    email: string
    password: string
  }
  
  // Usuários de teste pré-definidos
  const TEST_USERS: Record<string, User & { password: string }> = {
    "admin@admin.com": {
      id: "admin-1",
      username: "Administrador",
      email: "admin@admin.com",
      password: "senha1234",
      avatar: "/admin-avatar.png",
      isAdmin: true,
    },
    "usuario@teste.com": {
      id: "user-test",
      username: "UsuarioTeste",
      email: "usuario@teste.com",
      password: "senha123",
      avatar: "/abstract-user-icon.png",
      isAdmin: false,
    },
  }
  
  /**
   * Simula uma chamada de API para login
   * @param credentials Credenciais de login (email e senha)
   * @returns Promise com o usuário ou erro
   */
  export async function loginApi(
    credentials: LoginCredentials,
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    await simulateNetworkDelay()
  
    // Verificar se é um usuário de teste
    const testUser = TEST_USERS[credentials.email]
    if (testUser && testUser.password === credentials.password) {
      // Remover a senha antes de retornar o usuário
      const { password, ...userWithoutPassword } = testUser
      return { success: true, user: userWithoutPassword }
    }
  
    // Para outros emails, simular login bem-sucedido com dados gerados
    if (credentials.email && credentials.password.length >= 6) {
      // Extrair username do email
      const username = credentials.email.split("@")[0]
  
      return {
        success: true,
        user: {
          id: `user-${Date.now()}`,
          username,
          email: credentials.email,
          avatar: "/abstract-user-icon.png",
          isAdmin: false,
        },
      }
    }
  
    // Simular falha de login
    return {
      success: false,
      error: "Email ou senha inválidos.",
    }
  }
  
  /**
   * Simula uma chamada de API para registro de novo usuário
   * @param data Dados de registro (username, email, senha)
   * @returns Promise com o usuário criado ou erro
   */
  export async function registerApi(data: RegisterData): Promise<{ success: boolean; user?: User; error?: string }> {
    await simulateNetworkDelay(500, 1200) // Registro geralmente leva mais tempo
  
    // Verificar se o email já está em uso
    if (TEST_USERS[data.email]) {
      return {
        success: false,
        error: "Este email já está em uso.",
      }
    }
  
    // Validar dados
    if (!data.username || data.username.length < 3) {
      return {
        success: false,
        error: "Nome de usuário deve ter pelo menos 3 caracteres.",
      }
    }
  
    if (!data.email || !data.email.includes("@")) {
      return {
        success: false,
        error: "Email inválido.",
      }
    }
  
    if (!data.password || data.password.length < 6) {
      return {
        success: false,
        error: "A senha deve ter pelo menos 6 caracteres.",
      }
    }
  
    // Simular registro bem-sucedido
    const newUser: User = {
      id: `user-${Date.now()}`,
      username: data.username,
      email: data.email,
      avatar: "/abstract-user-icon.png",
      isAdmin: false,
    }
  
    return {
      success: true,
      user: newUser,
    }
  }
  
  /**
   * Simula uma chamada de API para recuperação de senha
   * @param email Email do usuário
   * @returns Promise com status de sucesso ou erro
   */
  export async function forgotPasswordApi(email: string): Promise<{ success: boolean; error?: string }> {
    await simulateNetworkDelay(800, 1500) // Recuperação de senha geralmente leva mais tempo
  
    // Validar email
    if (!email || !email.includes("@")) {
      return {
        success: false,
        error: "Email inválido.",
      }
    }
  
    // Sempre retorna sucesso para qualquer email válido
    // Em uma API real, verificaria se o email existe antes de enviar o link
    return {
      success: true,
    }
  }
  
  /**
   * Simula uma chamada de API para redefinir a senha
   * @param token Token de redefinição
   * @param newPassword Nova senha
   * @returns Promise com status de sucesso ou erro
   */
  export async function resetPasswordApi(
    token: string,
    newPassword: string,
  ): Promise<{ success: boolean; error?: string }> {
    await simulateNetworkDelay(600, 1200)
  
    // Validar token
    if (!token || token.length < 6) {
      return {
        success: false,
        error: "Token inválido ou expirado.",
      }
    }
  
    // Validar nova senha
    if (!newPassword || newPassword.length < 6) {
      return {
        success: false,
        error: "A nova senha deve ter pelo menos 6 caracteres.",
      }
    }
  
    // Simular redefinição bem-sucedida
    return {
      success: true,
    }
  }
  