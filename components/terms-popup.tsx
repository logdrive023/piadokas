"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"

interface TermsPopupProps {
  onClose: () => void
}

export function TermsPopup({ onClose }: TermsPopupProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full mx-4">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Termos de Uso</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="h-[60vh] p-4">
        <div className="space-y-4 text-gray-300">
          <p>
            Bem-vindo aos Termos de Uso do PiAdokas. Ao acessar ou usar nosso site, você concorda em cumprir estes
            termos e todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está
            proibido de usar ou acessar este site.
          </p>

          <h3 className="text-lg font-semibold text-white mt-4">1. Uso da Licença</h3>
          <p>
            É concedida permissão para baixar temporariamente uma cópia dos materiais no site PiAdokas apenas para
            visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência
            de título, e sob esta licença você não pode:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>modificar ou copiar os materiais;</li>
            <li>usar os materiais para qualquer finalidade comercial;</li>
            <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site;</li>
            <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais;</li>
            <li>transferir os materiais para outra pessoa ou 'espelhar' os materiais em qualquer outro servidor.</li>
          </ul>

          <h3 className="text-lg font-semibold text-white mt-4">2. Conteúdo do Usuário</h3>
          <p>
            Ao enviar conteúdo para o PiAdokas, você concede ao site uma licença mundial, não exclusiva, isenta de
            royalties, sublicenciável e transferível para usar, reproduzir, distribuir, preparar trabalhos derivados,
            exibir e executar o conteúdo em conexão com o serviço fornecido pelo site.
          </p>
          <p>
            Você é responsável por todo o conteúdo que envia e garante que tem o direito de conceder a licença descrita
            acima. Você concorda em não enviar conteúdo que:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>seja ilegal, difamatório, obsceno, pornográfico, invasivo da privacidade de outrem;</li>
            <li>infrinja direitos autorais, marcas registradas ou outros direitos de propriedade intelectual;</li>
            <li>
              contenha vírus de software ou qualquer outro código projetado para interromper, danificar ou limitar o
              funcionamento de qualquer software ou hardware.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-white mt-4">3. Isenção de Responsabilidade</h3>
          <p>
            Os materiais no site PiAdokas são fornecidos 'como estão'. O PiAdokas não oferece garantias, expressas ou
            implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias
            implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade
            intelectual.
          </p>

          <h3 className="text-lg font-semibold text-white mt-4">4. Limitações</h3>
          <p>
            Em nenhum caso o PiAdokas ou seus fornecedores serão responsáveis por quaisquer danos decorrentes do uso ou
            da incapacidade de usar os materiais no site, mesmo que o PiAdokas ou um representante autorizado tenha
            sido notificado, oralmente ou por escrito, da possibilidade de tais danos.
          </p>

          <h3 className="text-lg font-semibold text-white mt-4">5. Revisões e Erratas</h3>
          <p>
            Os materiais exibidos no site PiAdokas podem incluir erros técnicos, tipográficos ou fotográficos. O
            PiAdokas não garante que qualquer material em seu site seja preciso, completo ou atual. O PiAdokas pode
            fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio.
          </p>

          <h3 className="text-lg font-semibold text-white mt-4">6. Links</h3>
          <p>
            O PiAdokas não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum
            site vinculado. A inclusão de qualquer link não implica endosso por parte do PiAdokas do site. O uso de
            qualquer site vinculado é por conta e risco do usuário.
          </p>

          <h3 className="text-lg font-semibold text-white mt-4">7. Modificações dos Termos de Uso</h3>
          <p>
            O PiAdokas pode revisar estes termos de uso de seu site a qualquer momento, sem aviso prévio. Ao usar este
            site, você concorda em ficar vinculado à versão atual destes Termos de Uso.
          </p>

          <h3 className="text-lg font-semibold text-white mt-4">8. Lei Aplicável</h3>
          <p>
            Estes termos e condições são regidos e interpretados de acordo com as leis do Brasil e você se submete
            irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
          </p>

          <p className="mt-6 text-sm text-gray-400">Última atualização: 22 de abril de 2024</p>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-700 flex justify-end">
        <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-700 text-white">
          Entendi e Aceito
        </Button>
      </div>
    </div>
  )
}

export default TermsPopup
