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
    <div className="min-h-screen relative overflow-hidden">
      {/* Glassmorphism Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-school-orange via-school-brown to-amber-600"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-school-orange/30 to-transparent rounded-full blur-3xl floating-orb"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-amber-400/25 to-transparent rounded-full blur-3xl floating-orb"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-school-brown/20 to-transparent rounded-full blur-3xl floating-orb"></div>
      </div>

      {/* Glass Navigation */}
      <div className="relative z-50">
        <div className="glass-navigation">
          <Navigation />
        </div>
      </div>
      
      {/* Clock Section */}
      <section className="py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-6 max-w-lg mx-auto">
            <Clock className="mx-auto" />
          </div>
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-strong rounded-3xl p-12 text-white">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Portal do <span className="text-amber-200">Aluno</span>
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
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Serviços Disponíveis
              </h2>
              <p className="text-xl text-white/90">
                Tudo que você precisa para acompanhar sua vida acadêmica
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedCard delay={0.1} direction="up" hover={true} scale={true}>
              <Card className="glass-card border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <CardHeader>
                  <User className="text-amber-200 mb-4 group-hover:scale-110 transition-transform" size={48} />
                  <CardTitle className="text-white">Portal do Aluno ActiveSoft</CardTitle>
                  <CardDescription className="text-white/80">
                    Sistema completo para consulta de notas, frequência, horários e materiais didáticos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-school-orange hover:bg-amber-600 border-none text-white shadow-lg"
                    onClick={() => window.open('https://siga03.activesoft.com.br/login/?instituicao=COLEGIOOSE', '_blank')}
                  >
                    Acessar Portal <ExternalLink className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.2} direction="up" hover={true} scale={true}>
              <Card className="glass-card border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <CardHeader>
                  <BookOpen className="text-green-300 mb-4 group-hover:scale-110 transition-transform" size={48} />
                  <CardTitle className="text-white">Árvore de Livros</CardTitle>
                  <CardDescription className="text-white/80">
                    Plataforma de leitura digital com milhares de livros e atividades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full border-green-300 text-green-300 hover:bg-green-300 hover:text-slate-800 shadow-lg"
                    onClick={() => window.location.href = '/arvore'}
                  >
                    Saiba Mais <ExternalLink className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.3} direction="up" hover={true} scale={true}>
              <Card className="glass-card border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <CardHeader>
                  <DollarSign className="text-yellow-300 mb-4 group-hover:scale-110 transition-transform" size={48} />
                  <CardTitle className="text-white">Portal Financeiro Isaac</CardTitle>
                  <CardDescription className="text-white/80">
                    Consulte mensalidades, emita boletos e acompanhe seu histórico financeiro
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-slate-800 shadow-lg"
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
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Como Acessar
              </h2>
              <p className="text-xl text-white/90">
                Suas credenciais foram fornecidas pela secretaria da escola
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedCard delay={0.4} direction="left" hover={true}>
              <Card className="glass-strong border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-amber-200 text-xl">Primeiro Acesso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-white/90">
                  <p className="flex items-start"><span className="text-amber-200 mr-2">1.</span>Use as credenciais fornecidas pela secretaria</p>
                  <p className="flex items-start"><span className="text-amber-200 mr-2">2.</span>Altere sua senha no primeiro login</p>
                  <p className="flex items-start"><span className="text-amber-200 mr-2">3.</span>Mantenha seus dados sempre atualizados</p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.5} direction="right" hover={true}>
              <Card className="glass-strong border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-green-300 text-xl">Suporte</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-white/90">
                  <p className="flex items-center"><i className="fab fa-whatsapp text-green-400 mr-3"></i>WhatsApp: +55 15 2101-3812</p>
                  <p className="flex items-center"><i className="fas fa-envelope text-blue-400 mr-3"></i>Email: contato@colegioose.com.br</p>
                  <p className="flex items-center"><i className="fas fa-clock text-yellow-400 mr-3"></i>Secretaria: Segunda a Sexta, 7h às 17h</p>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </div>
  );
}