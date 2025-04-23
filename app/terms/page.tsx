import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="flex justify-center">
      <div className="container py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>1. Aceitação dos Termos</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Ao acessar ou usar o PiAdokas, você concorda em cumprir estes Termos de Uso e todas as leis e regulamentos
              aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>2. Conteúdo do Usuário</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Ao enviar conteúdo para o PiAdokas, você garante que:</p>
            <ul>
              <li>
                Você é o proprietário do conteúdo ou tem o direito de usá-lo e conceder-nos os direitos descritos nestes
                termos.
              </li>
              <li>
                O conteúdo não infringe os direitos de privacidade, direitos autorais, direitos contratuais ou quaisquer
                outros direitos de qualquer pessoa.
              </li>
              <li>
                O conteúdo não contém material que seja ilegal, obsceno, difamatório, ameaçador, pornográfico, invasivo
                da privacidade ou direitos de publicidade.
              </li>
            </ul>
            <p>
              Reservamo-nos o direito de remover qualquer conteúdo que viole estes termos ou que consideremos
              questionável.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>3. Comportamento do Usuário</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Ao usar o PiAdokas, você concorda em não:</p>
            <ul>
              <li>Usar o serviço para qualquer finalidade ilegal ou proibida por estes termos.</li>
              <li>
                Assediar, abusar, insultar, prejudicar, difamar, caluniar, depreciar, intimidar ou discriminar com base
                em gênero, orientação sexual, religião, etnia, raça, idade, nacionalidade ou deficiência.
              </li>
              <li>
                Enviar ou transmitir qualquer forma de malware, vírus ou código projetado para interferir, destruir ou
                limitar a funcionalidade de qualquer software, hardware ou equipamento de telecomunicações.
              </li>
              <li>Coletar ou rastrear as informações pessoais de outros usuários.</li>
              <li>Spam, phishing, pharming, pretexting, spiders, crawlers ou scraping.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>4. Sistema de Votação e Ranking</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>O PiAdokas utiliza um sistema de votação para classificar o conteúdo. Você concorda em:</p>
            <ul>
              <li>Não manipular o sistema de votação através de contas múltiplas ou automatizadas.</li>
              <li>
                Não utilizar qualquer método para artificialmente aumentar ou diminuir a classificação de qualquer
                conteúdo.
              </li>
              <li>
                Aceitar que os rankings são determinados por algoritmos baseados nas interações dos usuários e podem
                mudar a qualquer momento.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>5. Propriedade Intelectual</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              O serviço e seu conteúdo original, recursos e funcionalidades são e permanecerão propriedade exclusiva do
              PiAdokas e seus licenciadores. O serviço é protegido por direitos autorais, marcas registradas e outras
              leis. Nosso conteúdo não pode ser usado, copiado, reproduzido, distribuído, transmitido, transmitido,
              exibido, vendido, licenciado ou explorado para qualquer outro fim sem nosso consentimento prévio por
              escrito.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>6. Modificações dos Termos</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Reservamo-nos o direito de modificar ou substituir estes termos a qualquer momento. Se uma revisão for
              material, tentaremos fornecer um aviso de pelo menos 30 dias antes que quaisquer novos termos entrem em
              vigor. O que constitui uma alteração material será determinado a nosso critério.
            </p>
            <p>
              Ao continuar a acessar ou usar nosso serviço após essas revisões se tornarem efetivas, você concorda em
              ficar vinculado aos termos revisados. Se você não concordar com os novos termos, deixe de usar o serviço.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Contato</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco através do email:
              contato@piadokas.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
