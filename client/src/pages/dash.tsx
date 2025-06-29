import Navigation from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, User, BookOpen, Calendar, DollarSign } from "lucide-react";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import Clock from "@/components/ui/clock";
import { motion } from "framer-motion";

export default function DashPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-school-orange/30 to-school-brown/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-school-brown/20 to-school-orange/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-amber-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <Navigation />
      
      {/* Clock Section */}
      <section className="py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Clock className="mx-auto max-w-lg" />
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="py-20 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 text-white">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Portal do <span className="text-school-orange">Aluno</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Acesso completo à sua vida acadêmica
          </motion.p>
          <motion.p 
            className="text-lg mb-8 opacity-95 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Notas, horários, materiais de estudo e muito mais em um só lugar
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Serviços Disponíveis
            </h2>
            <p className="text-xl text-slate-600">
              Tudo que você precisa para acompanhar sua vida acadêmica
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedCard delay={0.1} direction="up" hover={true} scale={true}>
              <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <User className="text-school-orange mb-4" size={48} />
                  <CardTitle>Portal do Aluno ActiveSoft</CardTitle>
                  <CardDescription>
                    Sistema completo para consulta de notas, frequência, horários e materiais didáticos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-school-orange hover:bg-school-brown"
                    onClick={() => window.open('https://siga03.activesoft.com.br/login/?instituicao=COLEGIOOSE', '_blank')}
                  >
                    Acessar Portal <ExternalLink className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.2} direction="up" hover={true} scale={true}>
              <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <BookOpen className="text-school-brown mb-4" size={48} />
                  <CardTitle>Árvore de Livros</CardTitle>
                  <CardDescription>
                    Plataforma de leitura digital com milhares de livros e atividades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full border-school-brown text-school-brown hover:bg-school-brown hover:text-white"
                    onClick={() => window.location.href = '/arvore'}
                  >
                    Saiba Mais <ExternalLink className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.3} direction="up" hover={true} scale={true}>
              <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <DollarSign className="text-school-orange mb-4" size={48} />
                  <CardTitle>Portal Financeiro Isaac</CardTitle>
                  <CardDescription>
                    Consulte mensalidades, emita boletos e acompanhe seu histórico financeiro
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full border-school-orange text-school-orange hover:bg-school-orange hover:text-white"
                    onClick={() => window.location.href = '/isaac'}
                  >
                    Saiba Mais <ExternalLink className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Access Instructions */}
      <section className="py-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Como Acessar
            </h2>
            <p className="text-xl text-slate-600">
              Suas credenciais foram fornecidas pela secretaria da escola
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedCard delay={0.4} direction="left" hover={true}>
              <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-school-orange">Primeiro Acesso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>1. Use as credenciais fornecidas pela secretaria</p>
                  <p>2. Altere sua senha no primeiro login</p>
                  <p>3. Mantenha seus dados sempre atualizados</p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.5} direction="right" hover={true}>
              <Card className="bg-white/30 backdrop-blur-lg border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-school-brown">Suporte</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>• WhatsApp: +55 15 2101-3812</p>
                  <p>• Email: contato@colegioose.com.br</p>
                  <p>• Secretaria: Segunda a Sexta, 7h às 17h</p>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </div>
  );
}