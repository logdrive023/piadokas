"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"

interface PrivacyPopupProps {
  onClose: () => void
}

export function PrivacyPopup({ onClose }: PrivacyPopupProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full mx-4">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Política de Privacidade</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="h-[60vh] p-4">
        <div className="space-y-4 text-gray-300">
          <p>
            Esta Política de Privacidade descreve como suas informações pessoais são coletadas, usadas e compartilhadas
            quando você visita ou faz uma compra no PiAdokas.
          </p>

          <h3 className="text-lg font-semibold text-white mt-4">1. Informações Pessoais que Coletamos</h3>
          <p>
            Quando você visita o site, coletamos automaticamente certas informações sobre seu dispositivo, incluindo
            informações sobre seu navegador da web, endereço IP, fuso horário e alguns dos cookies que estão instalados
            em seu dispositivo.
          </p>
          <p>Quando você se registra no site, podemos coletar informações pessoais como:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nome de usuário</li>
            <li>Endereço de e-mail</li>
            <li>Senha (armazenada de forma segura e criptografada)</li>
            <li>Foto de perfil (opcional)</li>
            <li>Informações de localização (opcional)</li>
          </ul>

          <h3 className="text-lg font-semibold text-white mt-4">2. Como Usamos Suas Informações Pessoais</h3>
          <p>Usamos as informações pessoais que coletamos para:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Fornecer, operar e manter nosso site</li>
            <li>Melhorar, personalizar e expandir nosso site</li>
            <li>Entender e analisar como você usa nosso site</li>
            <li>Desenvolver novos produtos, serviços, recursos e funcionalidades</li>
            <li>
              Comunicar com você, diretamente ou através de um de nossos parceiros, para fornecer atualizações e outras
              informações relacionadas ao site
            </li>
            <li>Enviar e-mails de marketing</li>
            <li>Encontrar e prevenir fraudes</li>
          </ul>

          <h3 className="text-lg font-semibold text-white mt-4">3. Compartilhamento de Suas Informações Pessoais</h3>
          <p>
            Compartilhamos suas Informações Pessoais com terceiros para nos ajudar a usar suas Informações Pessoais,
            conforme descrito acima. Por exemplo, usamos o Google Analytics para nos ajudar a entender como nossos
            clientes usam o Site. Você pode ler mais sobre como o Google usa suas Informações Pessoais aqui:
            https://www.google.com/intl/pt-BR/policies/privacy/.
          </p>
          <p>
            Também podemos compartilhar suas Informações Pessoais para cumprir as leis e regulamentos aplicáveis, para
            responder a uma intimação, mandado de busca ou outra solicitação legal de informações que recebemos, ou para
            proteger nossos direitos.
          </p>

          <h3 className="text-lg font-semibold text-white mt-4">4. Publicidade Comportamental</h3>
          <p>
            Conforme descrito acima, usamos suas Informações Pessoais para fornecer anúncios direcionados ou
            comunicações de marketing que acreditamos ser de seu interesse. Para mais informações sobre como a
            publicidade direcionada funciona, você pode visitar a página educacional da Network Advertising Initiative
            em http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
          </p>

          <h3 className="text-lg font-semibold text-white mt-4">5. Seus Direitos</h3>
          <p>
            Se você é residente europeu, você tem o direito de acessar as informações pessoais que mantemos sobre você e
            solicitar que suas informações pessoais sejam corrigidas, atualizadas ou excluídas. Se você deseja exercer
            este direito, entre em contato conosco.
          </p>
          <p>
            Além disso, se você é residente europeu, notamos que estamos processando suas informações para cumprir
            contratos que possamos ter com você, ou para buscar nossos interesses comerciais legítimos listados acima.
            Além disso, observe que suas informações serão transferidas para fora da Europa, incluindo para o Canadá e
            os Estados Unidos.
          </p>

          <h3 className="text-lg font-semibold text-white mt-4">6. Retenção de Dados</h3>
          <p>
            Quando você se registra no site, manteremos suas Informações Pessoais em nossos registros a menos e até que
            você nos peça para excluir essas informações.
          </p>

          <h3 className="text-lg font-semibold text-white mt-4">7. Alterações</h3>
          <p>
            Podemos atualizar esta política de privacidade de tempos em tempos para refletir, por exemplo, mudanças em
            nossas práticas ou por outros motivos operacionais, legais ou regulamentares.
          </p>

          <h3 className="text-lg font-semibold text-white mt-4">8. Contate-nos</h3>
          <p>
            Para mais informações sobre nossas práticas de privacidade, se você tiver dúvidas ou se quiser fazer uma
            reclamação, entre em contato conosco por e-mail em contato@piadokas.com.br
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

export default PrivacyPopup
