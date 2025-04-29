export const getApiBaseUrl = (): string => {
    const isProd = process.env.NODE_ENV === 'production'
  
    if (isProd) {
      return process.env.NEXT_PUBLIC_API_URL_PROD!
    } else {
      return process.env.NEXT_PUBLIC_API_URL_LOCAL!
    }
  }
  
  export const apiFetch = async (endpoint: string, options?: RequestInit) => {
    const baseUrl = getApiBaseUrl()
  
    const url = `${baseUrl}${endpoint}`
  
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    })
  
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`)
    }
  
    return response.json()
  }
  