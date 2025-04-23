// Vamos modificar o arquivo loading.tsx para garantir que ele não cause problemas
// Este arquivo é usado pelo Next.js para mostrar um estado de loading durante a navegação entre rotas

import PageLoading from "@/components/page-loading"

export default function Loading() {
  // Retornamos o componente PageLoading sem nenhuma lógica adicional
  // para evitar conflitos com o LoadingProvider
  return <PageLoading />
}
