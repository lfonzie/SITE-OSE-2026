import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, BookOpen, Users } from 'lucide-react';
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import PedagogicalProposalSection from "@/components/pedagogical-proposal-section";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { useVisualComposer } from '@/hooks/useVisualComposer';
import { usePageData } from '@/hooks/usePageData';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';
import LogoutButton from '@/components/LogoutButton';

export default function BolsasInscricao() {
  const { isAuthenticated } = useSecureAuth();
  const { VisualComposerComponent } = useVisualComposer('Bolsas 2026');

  // Initialize page data with auto-save functionality
  const { 
    heroBackground,
    updateHeroBackground
  } = usePageData('Bolsas 2026', {
    heroBackground: {
      type: 'image',
      imageUrl: '/images/horizontal_4.png',
      opacity: 1,
      overlay: true,
      overlayColor: '#1e293b',
      overlayOpacity: 0.8,
      position: 'center',
      size: 'cover',
      repeat: 'no-repeat'
    }
  });

  useEffect(() => {
    updateSEO({
      title: "Prova de Bolsas 2026 - Colégio OSE Sorocaba",
      description: "Inscreva-se na prova de bolsas 2026 do Colégio OSE. Provas no dia 13 de setembro: 9h (Ensino Médio) e 14h (Fundamental II). Matemática e Português.",
      keywords: "prova de bolsas sorocaba, colégio ose bolsa estudo, ensino fundamental médio sorocaba, escola particular desconto"
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* SEO */}
      <SEO 
        title="Prova de Bolsas 2026 - Colégio OSE Sorocaba"
        description="Inscreva-se na prova de bolsas 2026 do Colégio OSE. Provas no dia 13 de setembro: 9h (Ensino Médio) e 14h (Fundamental II). Matemática e Português."
        keywords="prova de bolsas sorocaba, colégio ose bolsa estudo, ensino fundamental médio sorocaba, escola particular desconto"
        ogImage="/images/bolsas-2026-og.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Event",
          "name": "Prova de Bolsas 2026 - Colégio OSE",
          "description": "Processo seletivo para bolsas de estudo no Colégio OSE",
          "startDate": "2025-09-13",
          "location": {
            "@type": "Place",
            "name": "Colégio OSE",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rua Sorocaba, 150",
              "addressLocality": "Sorocaba", 
              "addressRegion": "SP",
              "postalCode": "18000-000",
              "addressCountry": "BR"
            }
          },
          "organizer": {
            "@type": "EducationalOrganization",
            "name": "Colégio OSE"
          }
        }}
      />

      {/* Background Management for Admin */}
      {isAuthenticated && (
        <HeroBackgroundManager 
          currentBackground={heroBackground}
          onBackgroundChange={updateHeroBackground}
        />
      )}

      {/* Visual Composer */}
      {isAuthenticated && <VisualComposerComponent />}
      
      {/* Admin Logout Button */}
      {isAuthenticated && <LogoutButton />}

      {/* Background overlay with animated orbs */}
      <div className="absolute inset-0 z-0">
        {/* Dynamic background based on admin settings or default gradient */}
        <div 
          className="absolute inset-0"
          style={
            heroBackground?.type === 'image' && heroBackground.imageUrl
              ? {
                  backgroundImage: `url(${heroBackground.imageUrl})`,
                  backgroundSize: heroBackground.size || 'cover',
                  backgroundPosition: heroBackground.position || 'center',
                  backgroundRepeat: heroBackground.repeat || 'no-repeat',
                  opacity: heroBackground.opacity || 1,
                }
              : {
                  background: `linear-gradient(135deg, 
                    rgba(251, 146, 60, 0.95) 0%, 
                    rgba(249, 115, 22, 0.9) 25%, 
                    rgba(234, 88, 12, 0.85) 50%, 
                    rgba(194, 65, 12, 0.8) 75%, 
                    rgba(154, 52, 18, 0.75) 100%)`,
                }
          }
        />
        
        {/* Overlay */}
        {heroBackground?.overlay && (
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: heroBackground.overlayColor || '#1e293b',
              opacity: heroBackground.overlayOpacity || 0.8,
            }}
          />
        )}

        {/* Animated floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-10 -left-10 w-96 h-96 bg-gradient-to-br from-amber-400/30 to-orange-600/30 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-1/2 -right-10 w-80 h-80 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-10 left-1/3 w-64 h-64 bg-gradient-to-br from-amber-600/20 to-orange-400/20 rounded-full blur-2xl"
            animate={{
              x: [0, -60, 0],
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="relative z-50">
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Prova de Bolsas
                <span className="block text-orange-400">2026</span>
              </h1>
              <p className="text-xl md:text-2xl text-orange-100 max-w-4xl mx-auto leading-relaxed">
                Colégio OSE
              </p>
            </motion.div>
          </div>
        </section>

        {/* Informações da Prova */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Informações da Prova
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <AnimatedCard delay={0.1}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20 h-full">
                  <CardHeader className="text-center">
                    <Calendar className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                    <CardTitle className="text-2xl text-white">Data</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-orange-100 text-lg font-semibold">
                      13 de setembro (sábado)
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20 h-full">
                  <CardHeader className="text-center">
                    <Clock className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                    <CardTitle className="text-2xl text-white">Horários</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-2">
                    <p className="text-orange-100">
                      <strong>Ensino Médio:</strong> 9h
                    </p>
                    <p className="text-orange-100">
                      <strong>Fundamental II:</strong> 14h
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.3}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20 h-full">
                  <CardHeader className="text-center">
                    <BookOpen className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                    <CardTitle className="text-2xl text-white">Matérias</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-2">
                    <p className="text-orange-100">Matemática</p>
                    <p className="text-orange-100">Português</p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.4}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20 h-full">
                  <CardHeader className="text-center">
                    <Users className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                    <CardTitle className="text-2xl text-white">Segmentos</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-2">
                    <p className="text-orange-100 text-sm">Ensino Fundamental II</p>
                    <p className="text-orange-100 text-sm">Ensino Médio</p>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </div>
          </div>
        </section>

        {/* Formulário de Inscrição */}
        <section id="inscricao" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="text-orange-400">Formulário</span> de Inscrição
              </h2>
              <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                Preencha o formulário abaixo para se inscrever na <strong className="text-orange-400">prova de bolsas 2026</strong>
              </p>
            </motion.div>

            <AnimatedCard delay={0.2}>
              <Card className="bg-white/30 backdrop-blur-lg border-white/20 overflow-hidden">
                <CardContent className="p-0">
                  {/* Formulário do Forms.app */}
                  <div className="w-full overflow-hidden">
                    <iframe 
                      allowFullScreen={true} 
                      allow="geolocation; microphone; camera" 
                      src="https://trfyo43h.forms.app/form/6882db63040c8be61e1a2b3c" 
                      frameBorder="0" 
                      style={{
                        width: '100%', 
                        height: '600px', 
                        border: 'none',
                        display: 'block'
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </section>

        {/* Regulamentos */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Regulamentos
              </h2>
              <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                Consulte os regulamentos da prova de bolsas 2026
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Regulamento Concurso de Bolsas - PRIMEIRO */}
              <AnimatedCard delay={0.1}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20 overflow-hidden">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">
                      <span className="text-orange-400 font-bold">Concurso de Bolsas 2026</span>
                    </CardTitle>
                    <p className="text-orange-200 text-sm mt-2">
                      Para estudantes que iniciarão o Ensino Fundamental II (6º ano) e Ensino Médio (1ª série)
                    </p>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="mb-4 bg-gray-100 rounded-lg p-4">
                      <p className="text-gray-700 text-center">
                        <span className="text-orange-600 font-bold">📄 Regulamento do Concurso de Bolsas</span>
                        <br />
                        <span className="text-sm">Clique no botão abaixo para acessar o documento completo</span>
                      </p>
                    </div>
                    <div className="text-center">
                      <Button 
                        asChild
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3"
                      >
                        <a 
                          href="https://docs.google.com/document/d/e/2PACX-1vR7BERYh0NPZ0kg9KSky_Vbj8Xm9dZU2Hy67r5_kTQaJUN5evDeSLFsQ-xGwdi0qZ1tgUNtN9VmXBZK/pub"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          📄 Ver Regulamento Completo
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* Regulamento Vagas Remanescentes - SEGUNDO */}
              <AnimatedCard delay={0.2}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20 overflow-hidden">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">
                      <span className="text-orange-400 font-bold">Vagas Remanescentes</span>
                    </CardTitle>
                    <p className="text-orange-200 text-sm mt-2">
                      Para preenchimento de vagas disponíveis
                    </p>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="mb-4 bg-gray-100 rounded-lg p-4">
                      <p className="text-gray-700 text-center">
                        <span className="text-orange-600 font-bold">📄 Regulamento de Vagas Remanescentes</span>
                        <br />
                        <span className="text-sm">Clique no botão abaixo para acessar o documento completo</span>
                      </p>
                    </div>
                    <div className="text-center">
                      <Button 
                        asChild
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3"
                      >
                        <a 
                          href="https://docs.google.com/document/d/e/2PACX-1vTJTlGGo0Rk7_GfZrZKw7ga_A28_pYSBXlLxE0HDmPtCmhJxwV48yARJzbSF40Uu-uq5npiFk8YvCEb/pub"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          📄 Ver Regulamento Completo
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </div>

            {/* Informações Importantes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12"
            >
              <AnimatedCard delay={0.3}>
                <Card className="bg-orange-100/95 backdrop-blur-lg border-orange-500/50">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-orange-700 mb-4 text-center">
                      ⚠️ Informações Importantes
                    </h3>
                    <div className="text-gray-800 space-y-3">
                      <p>• <strong className="text-orange-600">Leia atentamente</strong> os dois regulamentos antes de se inscrever</p>
                      <p>• <strong className="text-orange-600">Data da prova:</strong> 13 de setembro de 2025 (sábado)</p>
                      <p>• <strong className="text-orange-600">Horários:</strong> 9h (Ensino Médio) e 14h (Fundamental II)</p>
                      <p>• <strong className="text-orange-600">Matérias:</strong> Matemática e Português</p>
                      <p>• <strong className="text-orange-600">Dúvidas:</strong> Entre em contato pelo telefone (15) 2101-3800</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </motion.div>
          </div>
        </section>

        {/* FAQ - Perguntas Frequentes */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="text-orange-400">FAQ</span> - Perguntas Frequentes
              </h2>
              <p className="text-xl text-orange-100 max-w-3xl mx-auto">
                Esclarecimentos sobre o concurso de bolsas e vagas remanescentes
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* FAQ 1 */}
              <AnimatedCard delay={0.1}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-orange-400 mb-3">
                      🎓 Quem pode participar do concurso de bolsas?
                    </h3>
                    <p className="text-white">
                      Estudantes regularmente matriculados no <strong className="text-orange-400">5º ano (nascidos em 2014/2015)</strong> para 6º ano e <strong className="text-orange-400">9º ano (nascidos em 2010)</strong> para 1ª série do Ensino Médio.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* FAQ 2 */}
              <AnimatedCard delay={0.2}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-orange-400 mb-3">
                      📅 Quando será realizada a prova?
                    </h3>
                    <p className="text-white">
                      <strong className="text-orange-400">13 de setembro de 2025 (sábado)</strong><br/>
                      • 9h às 11h: 1ª série do Ensino Médio<br/>
                      • 14h às 16h: 6º ano do Ensino Fundamental
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* FAQ 3 */}
              <AnimatedCard delay={0.3}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-orange-400 mb-3">
                      📚 Como é estruturada a prova?
                    </h3>
                    <p className="text-white">
                      <strong className="text-orange-400">30 testes de múltipla escolha:</strong><br/>
                      • 15 questões de Matemática<br/>
                      • 15 questões de Português
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* FAQ 4 */}
              <AnimatedCard delay={0.4}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-orange-400 mb-3">
                      💰 Quantas bolsas estão disponíveis?
                    </h3>
                    <p className="text-white">
                      <strong className="text-orange-400">Concurso de Bolsas (Novas Turmas):</strong><br/>
                      • 2 bolsas de 100% (1º colocado de cada segmento)<br/>
                      • 1 bolsa de 80%<br/>
                      • 2 bolsas de 60%<br/>
                      • 20 bolsas de 50%<br/>
                      • 10 bolsas de 40%<br/>
                      • Outras bolsas a critério da escola
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* FAQ 5 */}
              <AnimatedCard delay={0.5}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-orange-400 mb-3">
                      📝 Como faço a inscrição?
                    </h3>
                    <p className="text-white">
                      Inscrições pelo site <strong className="text-orange-400">www.colegioose.com.br</strong><br/>
                      Período: <strong className="text-orange-400">28/07/2025 a 11/09/2025</strong> (até 14h)
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* FAQ 6 */}
              <AnimatedCard delay={0.6}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-orange-400 mb-3">
                      🔄 O que são vagas remanescentes?
                    </h3>
                    <p className="text-white">
                      Para alunos que iniciarão <strong className="text-orange-400">7º, 8º, 9º anos e 2ª, 3ª séries</strong> em 2026. São 5 bolsas de 50% (uma para cada série). <strong className="text-orange-400">Inscrições a partir de 28/07/2025.</strong>
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* FAQ 7 */}
              <AnimatedCard delay={0.7}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-orange-400 mb-3">
                      📅 Quando saem os resultados?
                    </h3>
                    <p className="text-white">
                      <strong className="text-orange-400">Gabarito:</strong> 14/09/2025 às 14h (site)<br/>
                      <strong className="text-orange-400">Resultado oficial:</strong> 15/09/2025 às 14h (no colégio)
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* FAQ 8 */}
              <AnimatedCard delay={0.8}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-orange-400 mb-3">
                      📞 Como tirar dúvidas?
                    </h3>
                    <p className="text-white">
                      <strong className="text-orange-400">Ensino Fundamental:</strong> cristina.lima@colegioose.com.br<br/>
                      <strong className="text-orange-400">Ensino Médio:</strong> regina.crippa@colegioose.com.br
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* FAQ 9 */}
              <AnimatedCard delay={0.9}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-orange-400 mb-3">
                      📄 Quais documentos preciso levar?
                    </h3>
                    <p className="text-white">
                      <strong className="text-orange-400">Para matrícula:</strong> Declaração de escolaridade, foto 3x4, RG e CPF, certidão de nascimento, transferência, histórico escolar e comprovante de residência. <strong className="text-orange-400">Pagamento da 1ª parcela no ato.</strong>
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* FAQ 10 */}
              <AnimatedCard delay={1.0}>
                <Card className="bg-white/30 backdrop-blur-lg border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-orange-400 mb-3">
                      ⏰ Preciso chegar com antecedência?
                    </h3>
                    <p className="text-white">
                      Sim, chegue com <strong className="text-orange-400">30 minutos de antecedência</strong>. Traga caneta (preta ou azul), lápis e borracha. <strong className="text-orange-400">Conteúdos disponíveis a partir de 01/08/2025</strong> no site e mural da escola.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </div>

            {/* CTA Final do FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-center mt-12"
            >
              <AnimatedCard delay={0.9}>
                <Card className="bg-gradient-to-r from-orange-600/30 to-orange-500/30 backdrop-blur-lg border-orange-400/50">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      🚀 Pronto para conquistar sua bolsa?
                    </h3>
                    <p className="text-orange-100 mb-6">
                      Não perca esta oportunidade única! <strong className="text-orange-400">Inscreva-se agora</strong> e garante sua vaga no Colégio OSE.
                    </p>
                    <Button 
                      asChild
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-lg"
                    >
                      <a href="#inscricao">
                        ✨ Inscrever-se Agora
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </motion.div>
          </div>
        </section>

        {/* Por que escolher a OSE */}
        <WhyOSESection />

        {/* Proposta Pedagógica */}
        <PedagogicalProposalSection />

        {/* Contato */}
        <ContactSection />
      </div>
    </div>
  );
}