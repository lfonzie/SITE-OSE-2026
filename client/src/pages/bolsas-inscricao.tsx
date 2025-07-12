import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { insertBolsasInscricaoSchema } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { z } from 'zod';
import { Calendar, User, Mail, Phone, MapPin, School, GraduationCap, FileText, Award, Users, BookOpen, Star, Target, Lightbulb, Heart } from 'lucide-react';
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
import { useAuth } from '@/contexts/AuthContext';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';
import LogoutButton from '@/components/LogoutButton';

type FormData = z.infer<typeof insertBolsasInscricaoSchema>;

// Schema modificado para não incluir observações
const inscricaoSchema = insertBolsasInscricaoSchema.omit({ observacoes: true });

export default function BolsasInscricao() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [selectedSegment, setSelectedSegment] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);
  const { isAuthenticated } = useAuth();
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
      description: "Inscreva-se na prova de bolsas 2026 do Colégio OSE. Oportunidade única de ingressar em uma das melhores escolas de Sorocaba com desconto especial.",
      keywords: "prova de bolsas sorocaba, colégio ose bolsa estudo, ensino fundamental médio sorocaba, escola particular desconto"
    });
  }, []);

  const form = useForm<Omit<FormData, 'observacoes'>>({
    resolver: zodResolver(inscricaoSchema),
    defaultValues: {
      nomeAluno: '',
      dataNascimento: '',
      serie: '',
      escolaAtual: '',
      nomeResponsavel: '',
      emailResponsavel: '',
      telefoneResponsavel: '',
      endereco: '',
      cidade: 'Sorocaba',
      cep: ''
    },
  });

  // Watch form fields to show next step
  const watchedFields = form.watch();
  
  // Determine which step to show based on filled fields
  const updateCurrentStep = () => {
    if (watchedFields.nomeAluno && watchedFields.dataNascimento && selectedSegment) {
      if (watchedFields.serie && watchedFields.escolaAtual) {
        if (watchedFields.nomeResponsavel && watchedFields.emailResponsavel && watchedFields.telefoneResponsavel) {
          if (watchedFields.endereco && watchedFields.cidade && watchedFields.cep) {
            setCurrentStep(5); // All done
          } else {
            setCurrentStep(4); // Address
          }
        } else {
          setCurrentStep(3); // Responsible person
        }
      } else {
        setCurrentStep(2); // School details
      }
    } else {
      setCurrentStep(1); // Student basics
    }
  };

  // Update step when fields change
  React.useEffect(() => {
    updateCurrentStep();
  }, [watchedFields, selectedSegment]);

  const inscricaoMutation = useMutation({
    mutationFn: (data: FormData) => apiRequest('/api/bolsas-inscricao', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    onSuccess: (data) => {
      toast({
        title: "Inscrição realizada com sucesso!",
        description: `Protocolo: ${data.protocolo}`,
      });
      navigate('/bolsas-inscricao/success');
    },
    onError: (error: any) => {
      toast({
        title: "Erro na inscrição",
        description: error.message || "Ocorreu um erro ao processar sua inscrição",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: Omit<FormData, 'observacoes'>) => {
    inscricaoMutation.mutate({ ...data, observacoes: '' });
  };

  const getSerieOptions = () => {
    if (selectedSegment === 'fund2') {
      return [
        { value: '6º ano', label: '6º ano' },
        { value: '7º ano reman', label: '7º ano reman' },
        { value: '8º ano reman', label: '8º ano reman' },
        { value: '9º ano reman', label: '9º ano reman' }
      ];
    } else if (selectedSegment === 'medio') {
      return [
        { value: '1ª série', label: '1ª série' },
        { value: '2ª série reman', label: '2ª série reman' },
        { value: '3ª série reman', label: '3ª série reman' }
      ];
    }
    return [];
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Prova de Bolsas 2026 - Colégio OSE",
    "url": "https://colegioose.com.br/bolsas-inscricao",
    "description": "Inscrição para prova de bolsas 2026 do Colégio OSE. Oportunidade de ingressar com desconto em uma das melhores escolas de Sorocaba.",
    "provider": {
      "@type": "EducationalOrganization", 
      "name": "Colégio OSE",
      "url": "https://colegioose.com.br"
    },
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "audienceType": "students aged 11-17"
    },
    "educationalLevel": ["Ensino Fundamental II", "Ensino Médio"],
    "offers": {
      "@type": "Offer",
      "name": "Bolsas de Estudo 2026",
      "description": "Descontos especiais para novos alunos"
    }
  };

  return (
    <div className="min-h-screen relative">
      <SEO
        title="Prova de Bolsas 2026 - Colégio OSE | Inscrições Abertas Sorocaba"
        description="Inscreva-se na prova de bolsas 2026 do Colégio OSE. Oportunidade única de ingressar com desconto especial em uma das melhores escolas de Sorocaba. Ensino Fundamental II e Médio."
        keywords="prova bolsas 2026 sorocaba, colégio ose desconto, bolsa estudo sorocaba, ensino fundamental médio particular, escola tradicional sorocaba, desconto mensalidade"
        canonical="https://colegioose.com.br/bolsas-inscricao"
        ogTitle="Prova de Bolsas 2026 - Colégio OSE | Oportunidade Única em Sorocaba"
        ogDescription="Inscrições abertas para prova de bolsas 2026. Ensino de qualidade com tradição centenária e descontos especiais para novos alunos."
        ogImage="https://colegioose.com.br/images/LogoOSE100anos.png"
        structuredData={structuredData}
      />
      
      {/* Enhanced Glassmorphism Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-white/90 to-amber-50/80"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-school-orange/30 via-school-orange/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-amber-400/25 via-amber-300/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-tr from-yellow-400/20 via-orange-300/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative py-20 text-white overflow-hidden"
        style={(() => {
          const baseStyle: React.CSSProperties = {
            opacity: heroBackground?.opacity || 1
          };

          if (heroBackground?.type === 'gradient') {
            return {
              ...baseStyle,
              backgroundImage: `linear-gradient(135deg, ${heroBackground.gradientColors?.join(', ') || '#475569, #64748b'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            };
          }

          if (heroBackground?.type === 'image' && heroBackground.imageUrl) {
            return {
              ...baseStyle,
              backgroundImage: `url(${heroBackground.imageUrl})`,
              backgroundSize: heroBackground.size || 'cover',
              backgroundPosition: heroBackground.position || 'center',
              backgroundRepeat: heroBackground.repeat || 'no-repeat'
            };
          }

          if (heroBackground?.type === 'color') {
            return {
              ...baseStyle,
              backgroundColor: heroBackground.solidColor || '#475569'
            };
          }

          return {
            ...baseStyle,
            backgroundImage: 'linear-gradient(135deg, #475569, #64748b)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          };
        })()}
      >
        {/* Hero Background Manager */}
        {isAuthenticated && (
          <HeroBackgroundManager
            currentBackground={heroBackground}
            onBackgroundChange={updateHeroBackground}
            className="absolute inset-0"
          />
        )}

        {/* Overlay */}
        {heroBackground?.overlay && (
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: heroBackground.overlayColor || '#1e293b',
              opacity: heroBackground.overlayOpacity || 0.8
            }}
          ></div>
        )}

        <div className="relative z-10 container mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-xl shadow-black/20 max-w-4xl"
          >
            <div className="text-center mb-8">
              <Award className="h-16 w-16 text-orange-300 mx-auto mb-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Prova de <span className="text-school-orange">Bolsas 2026</span>
                <span className="block text-lg md:text-xl font-normal text-orange-100 mt-2">
                  Colégio OSE - Organização Sorocabana de Ensino
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-200 mb-6">
                Oportunidade única de <strong>ingressar</strong> com <strong>desconto especial</strong>
              </p>
              <p className="text-lg mb-8 text-slate-300 max-w-3xl mx-auto">
                Desde 1924, formamos gerações com excelência educacional. Agora é a sua vez de 
                fazer parte desta tradição centenária com condições especiais.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center">
                <GraduationCap className="h-10 w-10 text-orange-300 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Ensino Fundamental II</h3>
                <p className="text-orange-100 text-sm">6º ao 9º ano (11 a 14 anos)</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center">
                <BookOpen className="h-10 w-10 text-orange-300 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Ensino Médio</h3>
                <p className="text-orange-100 text-sm">1ª à 3ª série (15 a 17 anos)</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-center">
                <Star className="h-10 w-10 text-orange-300 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Bolsas de Estudo</h3>
                <p className="text-orange-100 text-sm">Descontos especiais</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Por que estudar na OSE */}
      <WhyOSESection />

      {/* Proposta Pedagógica */}
      <PedagogicalProposalSection />

        {/* Formulário de Inscrição */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-amber-900 mb-4">Formulário de Inscrição</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Preencha os dados abaixo para garantir sua vaga na prova de bolsas 2026
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Passo 1: Dados Básicos do Aluno */}
                  <Card className="bg-white/30 backdrop-blur-lg border-white/20">
                    <CardHeader>
                      <CardTitle className="text-2xl text-amber-900 flex items-center gap-2">
                        <User className="h-6 w-6" />
                        1. Dados do Aluno
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="nomeAluno"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome Completo do Aluno</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Nome completo" className="bg-white/60" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="dataNascimento"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Data de Nascimento</FormLabel>
                              <FormControl>
                                <Input {...field} type="date" className="bg-white/60" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      {/* Seleção de Segmento */}
                      {watchedFields.nomeAluno && watchedFields.dataNascimento && (
                        <div className="space-y-4 animate-in slide-in-from-top-4 duration-500">
                          <h4 className="text-lg font-semibold text-amber-900">Selecione o segmento:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() => setSelectedSegment('fund2')}
                              className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                                selectedSegment === 'fund2'
                                  ? 'border-amber-500 bg-amber-50/80 shadow-lg'
                                  : 'border-white/30 bg-white/20 hover:bg-white/30'
                              }`}
                            >
                              <GraduationCap className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                              <h3 className="font-semibold text-amber-900">Ensino Fundamental II</h3>
                              <p className="text-amber-800 text-sm">6º ao 9º ano</p>
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedSegment('medio')}
                              className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                                selectedSegment === 'medio'
                                  ? 'border-amber-500 bg-amber-50/80 shadow-lg'
                                  : 'border-white/30 bg-white/20 hover:bg-white/30'
                              }`}
                            >
                              <BookOpen className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                              <h3 className="font-semibold text-amber-900">Ensino Médio</h3>
                              <p className="text-amber-800 text-sm">1ª à 3ª série</p>
                            </button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Passo 2: Série e Escola */}
                  {selectedSegment && (
                    <Card className="bg-white/30 backdrop-blur-lg border-white/20 animate-in slide-in-from-top-4 duration-500">
                      <CardHeader>
                        <CardTitle className="text-2xl text-amber-900 flex items-center gap-2">
                          <School className="h-6 w-6" />
                          2. Detalhes Escolares
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="serie"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Série/Ano que irá cursar em 2026</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-white/60">
                                      <SelectValue placeholder="Selecione a série" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {getSerieOptions().map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="escolaAtual"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Escola Atual</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Nome da escola atual" className="bg-white/60" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Passo 3: Dados do Responsável */}
                  {currentStep >= 3 && (
                    <Card className="bg-white/30 backdrop-blur-lg border-white/20 animate-in slide-in-from-top-4 duration-500">
                      <CardHeader>
                        <CardTitle className="text-2xl text-amber-900 flex items-center gap-2">
                          <User className="h-6 w-6" />
                          3. Dados do Responsável
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="nomeResponsavel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome Completo do Responsável</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Nome completo" className="bg-white/60" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="emailResponsavel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email do Responsável</FormLabel>
                                <FormControl>
                                  <Input {...field} type="email" placeholder="email@exemplo.com" className="bg-white/60" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="telefoneResponsavel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Telefone do Responsável</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="(15) 99999-9999" className="bg-white/60" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Passo 4: Endereço */}
                  {currentStep >= 4 && (
                    <Card className="bg-white/30 backdrop-blur-lg border-white/20 animate-in slide-in-from-top-4 duration-500">
                      <CardHeader>
                        <CardTitle className="text-2xl text-amber-900 flex items-center gap-2">
                          <MapPin className="h-6 w-6" />
                          4. Endereço
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="endereco"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Endereço Completo</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Rua, número, complemento" className="bg-white/60" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cep"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CEP</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="00000-000" className="bg-white/60" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="cidade"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cidade</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Sorocaba" className="bg-white/60" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  )}

                  {/* Botão de Envio */}
                  {currentStep >= 4 && (
                    <div className="flex justify-center animate-in slide-in-from-top-4 duration-500">
                      <Button
                        type="submit"
                        disabled={inscricaoMutation.isPending}
                        className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-12 py-4 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {inscricaoMutation.isPending ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Processando...
                          </div>
                        ) : (
                          'Confirmar Inscrição'
                        )}
                      </Button>
                    </div>
                  )}
                </form>
              </Form>
            </div>
          </div>
        </section>

        {/* Segmentos de Ensino */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-amber-900 mb-4">Nossos Segmentos</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Conheça nossa proposta pedagógica para cada etapa da educação básica
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <GraduationCap className="h-16 w-16 text-amber-600 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-amber-900 mb-4 text-center">Ensino Fundamental II</h3>
                <p className="text-amber-800 mb-4 text-center">
                  Formação crítica e desenvolvimento de competências para os anos finais
                </p>
                <ul className="space-y-2 text-amber-800">
                  <li>• 6º ao 9º ano (11 a 14 anos)</li>
                  <li>• Metodologia ativa e projetos interdisciplinares</li>
                  <li>• Preparação para o Ensino Médio</li>
                  <li>• Programa de Orientação Vocacional</li>
                </ul>
              </div>

              <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <BookOpen className="h-16 w-16 text-amber-600 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-amber-900 mb-4 text-center">Ensino Médio</h3>
                <p className="text-amber-800 mb-4 text-center">
                  Preparação completa para o ensino superior e mercado de trabalho
                </p>
                <ul className="space-y-2 text-amber-800">
                  <li>• 1ª à 3ª série (15 a 17 anos)</li>
                  <li>• Foco em vestibulares e ENEM</li>
                  <li>• Simulados e monitorias</li>
                  <li>• Orientação profissional especializada</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Informações de Contato */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-amber-900 mb-4">Contato</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Tire suas dúvidas sobre a prova de bolsas 2026
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="bg-white/30 backdrop-blur-lg border-white/20 text-center">
                <CardContent className="p-8">
                  <Phone className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">Telefone</h3>
                  <p className="text-amber-800 font-medium">(15) 2101-3812</p>
                  <p className="text-amber-700 text-sm mt-1">Horário comercial</p>
                </CardContent>
              </Card>

              <Card className="bg-white/30 backdrop-blur-lg border-white/20 text-center">
                <CardContent className="p-8">
                  <Mail className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">Email</h3>
                  <p className="text-amber-800 font-medium">info@colegioose.com.br</p>
                  <p className="text-amber-700 text-sm mt-1">Resposta em até 24h</p>
                </CardContent>
              </Card>

              <Card className="bg-white/30 backdrop-blur-lg border-white/20 text-center">
                <CardContent className="p-8">
                  <MapPin className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">Endereço</h3>
                  <p className="text-amber-800 font-medium">Rua Duque de Caxias, 1101</p>
                  <p className="text-amber-700 text-sm mt-1">Centro - Sorocaba/SP</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      {/* Contato */}
      <ContactSection />
      
      {/* Visual Composer para admin */}
      {isAuthenticated && <VisualComposerComponent />}
      {isAuthenticated && <LogoutButton />}
    </div>
  );
}