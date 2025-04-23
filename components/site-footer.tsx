import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SocialLinks } from "@/components/social-links"
import LinkWithLoading from "./link-with-loading"

export function SiteFooter() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <h2 className="text-xl font-bold text-white mb-4">PiAdokas</h2>
            <p className="text-gray-400 mb-4">O melhor site de memes do Brasil. Compartilhe, curta e divirta-se!</p>
            <SocialLinks />
          </div>

          <div className="md:col-span-3">
            <h3 className="text-lg font-medium text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <LinkWithLoading href="/" className="text-gray-400 hover:text-white transition-colors">
                  Página Inicial
                </LinkWithLoading>
              </li>
              <li>
                <LinkWithLoading href="/rankings" className="text-gray-400 hover:text-white transition-colors">
                  Rankings
                </LinkWithLoading>
              </li>
              <li>
                <LinkWithLoading href="/create" className="text-gray-400 hover:text-white transition-colors">
                  Criar Post
                </LinkWithLoading>
              </li>
              <li>
                <LinkWithLoading href="/donate" className="text-gray-400 hover:text-white transition-colors">
                  Doar
                </LinkWithLoading>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-lg font-medium text-white mb-4">Informações</h3>
            <ul className="space-y-2">
              <li>
                <LinkWithLoading href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Termos de Uso
                </LinkWithLoading>
              </li>
              <li>
                <LinkWithLoading href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Política de Privacidade
                </LinkWithLoading>
              </li>
              <li>
                <LinkWithLoading href="/about" className="text-gray-400 hover:text-white transition-colors">
                  Sobre Nós
                </LinkWithLoading>
              </li>
              <li>
                <LinkWithLoading href="/contato" className="text-gray-400 hover:text-white transition-colors">
                  Contato
                </LinkWithLoading>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-white mb-2">Colabore com o site:</h3>
                  <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <div className="flex justify-center mb-2">
                      <div className="w-[120px] h-[120px] bg-gray-700 flex items-center justify-center rounded-md">
                        <div className="w-[100px] h-[100px] border-2 border-white grid grid-cols-4 grid-rows-4 p-2">
                          <div className="col-span-1 row-span-1 bg-white"></div>
                          <div className="col-span-2 row-span-1 bg-white"></div>
                          <div className="col-span-1 row-span-1 bg-white"></div>
                          <div className="col-span-1 row-span-2 bg-white"></div>
                          <div className="col-span-2 row-span-2"></div>
                          <div className="col-span-1 row-span-2 bg-white"></div>
                          <div className="col-span-1 row-span-1 bg-white"></div>
                          <div className="col-span-2 row-span-1 bg-white"></div>
                          <div className="col-span-1 row-span-1 bg-white"></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">CHAVE PIX:</p>
                    <p className="text-sm text-white font-mono bg-gray-700 p-1 rounded">piadokas@exemplo.com.br</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button className="bg-red-500 hover:bg-red-600 text-white text-xs h-auto py-2">APOIA.se</Button>
                    <Button className="bg-green-500 hover:bg-green-600 text-white text-xs h-auto py-2">PicPay</Button>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white text-xs h-auto py-2">
                      PATREON
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PiAdokas. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
