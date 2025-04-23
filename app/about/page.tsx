import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Award, Users, TrendingUp, Heart, Target, Smile, Coffee, Code } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Ana Silva",
      role: "Fundadora & CEO",
      bio: "Apaixonada por memes desde 2010, Ana criou o PiAdokas para compartilhar humor de qualidade com o Brasil.",
      avatar: "/confident-professional-profile.png",
    },
    {
      name: "Pedro Santos",
      role: "Diretor de Conteúdo",
      bio: "Curador de memes profissional, Pedro garante que apenas o conteúdo mais engraçado chegue à sua timeline.",
      avatar: "/thoughtful-architect.png",
    },
    {
      name: "Juliana Costa",
      role: "Desenvolvedora Full-Stack",
      bio: "Quando não está criando novos recursos para o site, Juliana está procurando bugs em códigos e memes.",
      avatar: "/confident-coder.png",
    },
    {
      name: "Lucas Oliveira",
      role: "Designer UX/UI",
      bio: "Responsável pelo visual incrível do PiAdokas, Lucas acredita que humor e design andam de mãos dadas.",
      avatar: "/focused-designer.png",
    },
  ]

  const milestones = [
    {
      year: "2018",
      title: "Nascimento do PiAdokas",
      description: "O que começou como um blog pessoal de memes se transformou em uma comunidade vibrante.",
    },
    {
      year: "2019",
      title: "100 mil usuários",
      description: "Alcançamos nossa primeira grande marca de usuários cadastrados.",
    },
    {
      year: "2020",
      title: "Aplicativo Mobile",
      description: "Lançamos nosso aplicativo para iOS e Android, expandindo nossa presença digital.",
    },
    {
      year: "2021",
      title: "Prêmio de Melhor Site de Humor",
      description: "Fomos reconhecidos como o melhor site de humor do Brasil pelo prêmio Web Brasil.",
    },
    {
      year: "2022",
      title: "1 Milhão de Usuários",
      description: "Ultrapassamos a marca de 1 milhão de usuários cadastrados.",
    },
    {
      year: "2023",
      title: "Redesign Completo",
      description: "Lançamos uma nova versão do site com design moderno e recursos avançados.",
    },
  ]

  const stats = [
    { label: "Usuários Ativos", value: "2.5M+", icon: <Users className="h-5 w-5 text-blue-400" /> },
    { label: "Memes Publicados", value: "500K+", icon: <Smile className="h-5 w-5 text-yellow-400" /> },
    { label: "Curtidas", value: "50M+", icon: <Heart className="h-5 w-5 text-red-400" /> },
    { label: "Xícaras de Café", value: "∞", icon: <Coffee className="h-5 w-5 text-amber-400" /> },
  ]

  return (
    <div className="flex justify-center">
      <div className="container py-8 max-w-5xl">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Sobre Nós</h1>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-lg overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-blue-900/90 z-10"></div>
          <img src="/Pixelated Prank.png" alt="PiAdokas Banner" className="w-full h-64 md:h-80 object-cover" />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Compartilhando <span className="text-purple-300">Sorrisos</span> Desde 2018
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
              O PiAdokas nasceu da ideia de que um bom meme pode transformar o dia de qualquer pessoa.
            </p>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-white">
                <Target className="h-5 w-5 mr-2 text-purple-400" />
                Nossa Missão
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Conectar pessoas através do humor, criando um espaço onde todos possam compartilhar e desfrutar de
                conteúdo engraçado de qualidade, promovendo momentos de alegria no dia a dia.
              </p>
              <p>
                Acreditamos que o humor tem o poder de unir pessoas, quebrar barreiras e proporcionar alívio em momentos
                difíceis. Nossa plataforma é dedicada a criar uma comunidade onde o riso é a linguagem universal.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-white">
                <Award className="h-5 w-5 mr-2 text-purple-400" />
                Nossos Valores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Badge className="mt-1 bg-purple-600">Criatividade</Badge>
                  <span className="text-gray-300">
                    Valorizamos o pensamento original e incentivamos nossos usuários a expressarem sua criatividade.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge className="mt-1 bg-blue-600">Comunidade</Badge>
                  <span className="text-gray-300">
                    Construímos um ambiente acolhedor onde todos se sentem parte de algo maior.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge className="mt-1 bg-green-600">Respeito</Badge>
                  <span className="text-gray-300">
                    Promovemos o humor saudável que não diminui ou ofende grupos ou indivíduos.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge className="mt-1 bg-amber-600">Inovação</Badge>
                  <span className="text-gray-300">
                    Buscamos constantemente melhorar nossa plataforma com novas tecnologias e recursos.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <Card className="bg-gray-800 border-gray-700 mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <TrendingUp className="h-5 w-5 mr-2 text-purple-400" />
              PiAdokas em Números
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="bg-gray-800 border-gray-700 mb-12">
          <CardHeader>
            <CardTitle className="text-white">Nossa História</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-600"></div>

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative pl-12">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{milestone.year}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card className="bg-gray-800 border-gray-700 mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Users className="h-5 w-5 mr-2 text-purple-400" />
              Conheça Nossa Equipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-700 rounded-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white">{member.name}</h3>
                    <p className="text-sm text-purple-400 mb-2">{member.role}</p>
                    <p className="text-sm text-gray-300">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card className="bg-gray-800 border-gray-700 mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Code className="h-5 w-5 mr-2 text-purple-400" />
              Nossa Stack Tecnológica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { name: "React", logo: "/atom-orbitals.png" },
                { name: "Next.js", logo: "/nextjs-abstract.png" },
                { name: "TypeScript", logo: "/typescript-logo-abstract.png" },
                { name: "Tailwind CSS", logo: "/tailwind-css-abstract.png" },
                { name: "Node.js", logo: "/nodejs-abstract-logo.png" },
                { name: "MongoDB", logo: "/placeholder.svg?height=60&width=60&query=mongodb logo" },
              ].map((tech, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center">
                    <img src={tech.logo || "/placeholder.svg"} alt={tech.name} className="max-w-full max-h-full" />
                  </div>
                  <span className="text-sm text-gray-300 mt-2">{tech.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Junte-se à Nossa Comunidade</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Faça parte da maior comunidade de memes do Brasil. Compartilhe risadas, faça amigos e descubra conteúdo que
            vai alegrar seu dia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/usuario">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Criar Conta
              </Button>
            </Link>
            <Link href="/contato">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Entre em Contato
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
