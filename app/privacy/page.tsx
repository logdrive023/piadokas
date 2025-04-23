import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="flex justify-center">
      <div className="container py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>1. Informações que Coletamos</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Coletamos vários tipos de informações para fornecer e melhorar nosso serviço para você:</p>
            <ul>
              <li>
                <strong>Informações da Conta:</strong> Quando você se registra, coletamos seu nome de usuário, endereço
                de e-mail e senha.
              </li>
              <li>
                <strong>Conteúdo do Usuário:</strong> Qualquer conteúdo que você enviar, incluindo posts, comentários e
                votos.
              </li>
              <li>
                <strong>Dados de Uso:</strong> Informações sobre como você acessa e usa o PiAdokas, como seu endereço
                IP, tipo de navegador, páginas visitadas e tempo gasto no site.
              </li>
              <li>
                <strong>Cookies e Tecnologias Semelhantes:</strong> Usamos cookies e tecnologias semelhantes para
                rastrear a atividade em nosso serviço e manter certas informações.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>2. Como Usamos Suas Informações</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Usamos as informações coletadas para:</p>
            <ul>
              <li>Fornecer, manter e melhorar nosso serviço.</li>
              <li>Personalizar sua experiência.</li>
              <li>Comunicar-nos com você, incluindo enviar notificações relacionadas ao serviço.</li>
              <li>Monitorar o uso do nosso serviço.</li>
              <li>Detectar, prevenir e resolver problemas técnicos e de segurança.</li>
              <li>Cumprir com obrigações legais.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>3. Compartilhamento de Informações</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Podemos compartilhar suas informações nas seguintes situações:</p>
            <ul>
              <li>
                <strong>Com Provedores de Serviços:</strong> Podemos compartilhar suas informações com terceiros que
                realizam serviços em nosso nome.
              </li>
              <li>
                <strong>Para Conformidade Legal:</strong> Podemos divulgar suas informações quando acreditarmos de boa
                fé que a divulgação é necessária para cumprir com uma obrigação legal.
              </li>
              <li>
                <strong>Com Seu Consentimento:</strong> Podemos compartilhar suas informações pessoais para qualquer
                outro propósito com seu consentimento.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>4. Segurança de Dados</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              A segurança de seus dados é importante para nós, mas lembre-se de que nenhum método de transmissão pela
              Internet ou método de armazenamento eletrônico é 100% seguro. Embora nos esforcemos para usar meios
              comercialmente aceitáveis para proteger suas informações pessoais, não podemos garantir sua segurança
              absoluta.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>5. Seus Direitos de Privacidade</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Dependendo da sua localização, você pode ter certos direitos relacionados às suas informações pessoais,
              incluindo:
            </p>
            <ul>
              <li>O direito de acessar as informações pessoais que temos sobre você.</li>
              <li>O direito de solicitar a correção de informações imprecisas ou incompletas.</li>
              <li>O direito de solicitar a exclusão de suas informações pessoais.</li>
              <li>O direito de retirar o consentimento para o processamento de suas informações pessoais.</li>
              <li>O direito de se opor ao processamento de suas informações pessoais.</li>
              <li>O direito à portabilidade de dados.</li>
            </ul>
            <p>
              Para exercer qualquer um desses direitos, entre em contato conosco através do email:
              privacidade@piadokas.com
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>6. Alterações a Esta Política de Privacidade</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer
              alterações publicando a nova Política de Privacidade nesta página e atualizando a data "Última
              atualização" no topo desta Política de Privacidade.
            </p>
            <p>
              Você é aconselhado a revisar esta Política de Privacidade periodicamente para quaisquer alterações.
              Alterações a esta Política de Privacidade são efetivas quando são publicadas nesta página.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Contato</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através do email:
              privacidade@piadokas.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
