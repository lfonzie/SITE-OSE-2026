
import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Clock, Users, Award, Mail, Phone, MapPin, ChevronDown, ChevronUp, Star, Loader2, BookOpen, Target, Heart, Brain, GraduationCap, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { AnimatedSection } from "@/components/animated/AnimatedSection";
import { useAuth } from '@/contexts/AuthContext';
import LogoutButton from '@/components/LogoutButton';
import WhyOSESection from '@/components/why-ose-section';
import ContactSection from '@/components/contact-section';
import { newImages } from "@/lib/image-verification";
import { usePageData } from '@/hooks/usePageData';
import HeroBackgroundManager from '@/components/HeroBackgroundManager';

interface FormData {
  nomeCompleto: string;
  email: string;
  telefone: string;
  idade: string;
  escola: string;
  serie: string;
  motivacao: string;
  responsavel: string;
  telefoneResponsavel: string;
}

export default function ProvaBolsas() {
  const { isAuthenticated } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    nomeCompleto: '',
    email: '',
    telefone: '',
    idade: '',
    escola: '',
    serie: '',
    motivacao: '',
    responsavel: '',
    telefoneResponsavel: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const { 
    heroBackground,
    updateHeroBackground,
  } = usePageData('Prova de Bolsas', {
    heroBackground: {
      type: 'image',
      imageUrl: newImages.horizontal15,
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
      title: "Prova de Bolsas - Colégio OSE | Oportunidade de Educação de Qualidade",
      description: "Inscreva-se na Prova de Bolsas do Colégio OSE e concorra a uma vaga com desconto na mensalidade. Tradição centenária em educação de excelência.",
      keywords: "prova de bolsas, bolsa de estudos, colégio ose, desconto mensalidade, educação qualidade, sorocaba"
    });
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\(?[1-9]{2}\)?\s?9?\d{4}-?\d{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateCurrentStep = () => {
    const newErrors: Partial<FormData> = {};
    
    switch (currentStep) {
      case 1:
        if (!formData.nomeCompleto.trim()) newErrors.nomeCompleto = 'Nome completo é obrigatório';
        if (!formData.email.trim()) {
          newErrors.email = 'E-mail é obrigatório';
        } else if (!validateEmail(formData.email)) {
          newErrors.email = 'E-mail inválido';
        }
        break;
      case 2:
        if (!formData.telefone.trim()) {
          newErrors.telefone = 'Telefone é obrigatório';
        } else if (!validatePhone(formData.telefone)) {
          newErrors.telefone = 'Telefone inválido';
        }
        if (!formData.idade.trim()) newErrors.idade = 'Idade é obrigatória';
        break;
      case 3:
        if (!formData.escola.trim()) newErrors.escola = 'Escola atual é obrigatória';
        if (!formData.serie.trim()) newErrors.serie = 'Série é obrigatória';
        break;
      case 4:
        if (!formData.responsavel.trim()) newErrors.responsavel = 'Nome do responsável é obrigatório';
        if (!formData.telefoneResponsavel.trim()) {
          newErrors.telefoneResponsavel = 'Telefone do responsável é obrigatório';
        } else if (!validatePhone(formData.telefoneResponsavel)) {
          newErrors.telefoneResponsavel = 'Telefone inválido';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const submitForm = async () => {
    if (!validateCurrentStep()) return;

    setIsLoading(true);
    
    try {
      // Simular envio para Google Sheets
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aqui você integraria com a API do Google Sheets
      console.log('Dados para envio:', formData);
      
      setIsSubmitted(true);
      setCurrentStep(6);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Erro ao enviar inscrição. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nomeCompleto: '',
      email: '',
      telefone: '',
      idade: '',
      escola: '',
      serie: '',
      motivacao: '',
      responsavel: '',
      telefoneResponsavel: ''
    });
    setCurrentStep(1);
    setIsSubmitted(false);
    setErrors({});
    setDialogOpen(false);
  };

  const diferenciais = [
    {
      icon: Award,
      title: "Bolsas até 100%",
      description: "Descontos de 20% a 100% na mensalidade, baseados no desempenho na prova e análise socioeconômica.",
      color: "bg-blue-500"
    },
    {
      icon: GraduationCap,
      title: "Tradição Centenária",
      description: "100 anos de excelência educacional formando líderes e cidadãos conscientes em Sorocaba.",
      color: "bg-green-500"
    },
    {
      icon: BookOpen,
      title: "Material Incluso",
      description: "Material didático completo incluído na bolsa, sem custos adicionais para a família.",
      color: "bg-purple-500"
    },
    {
      icon: Target,
      title: "Renovação por Mérito",
      description: "Bolsa renovada anualmente mediante manutenção do bom desempenho acadêmico.",
      color: "bg-orange-500"
    }
  ];

  const criterios = [
    {
      icon: Users,
      title: "Elegibilidade",
      subtitle: "Quem pode participar",
      items: [
        "Estudantes do 6º ano EF ao 2º ano EM",
        "Renda familiar até 10 salários mínimos",
        "Não ter estudado na OSE anteriormente",
        "Idade adequada à série pretendida"
      ]
    },
    {
      icon: Clock,
      title: "Cronograma",
      subtitle: "Datas importantes",
      items: [
        "Inscrições: até 10 de Março",
        "Prova: 15 de Março de 2025",
        "Resultado: até 30 de Março",
        "Matrícula: até 10 de Abril"
      ]
    },
    {
      icon: Trophy,
      title: "Avaliação",
      subtitle: "Como funciona",
      items: [
        "Prova de conhecimentos gerais",
        "Redação sobre tema atual",
        "Análise socioeconômica",
        "Entrevista com responsáveis"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Ana Carolina Silva",
      text: "A bolsa de estudos da OSE mudou minha vida! Consegui me formar no Ensino Médio com excelência e hoje estudo Medicina.",
      year: "Formada em 2022",
      course: "Medicina - USP"
    },
    {
      name: "Pedro Henrique Santos",
      text: "Estudar na OSE me deu as ferramentas necessárias para passar no vestibular. A qualidade do ensino é incomparável!",
      year: "Formado em 2023",
      course: "Engenharia - UNESP"
    },
    {
      name: "Maria Eduarda Costa",
      text: "Minha família sempre sonhou que eu estudasse na OSE. Com a bolsa, foi possível realizar esse sonho!",
      year: "Aluna atual - 3º ano",
      course: "Preparação ENEM"
    }
  ];

  const faqs = [
    {
      question: "Quem pode participar da prova de bolsas?",
      answer: "Estudantes que estão cursando do 6º ano do Ensino Fundamental ao 2º ano do Ensino Médio e desejam ingressar no ano seguinte."
    },
    {
      question: "Como me preparar para a prova?",
      answer: "A prova aborda conteúdos do ano letivo atual. Recomendamos revisar português, matemática e conhecimentos gerais."
    },
    {
      question: "Qual é o valor da bolsa?",
      answer: "As bolsas variam de 20% a 100% de desconto na mensalidade, dependendo do desempenho na prova e análise socioeconômica."
    },
    {
      question: "Quando sai o resultado?",
      answer: "O resultado será divulgado em até 15 dias úteis após a realização da prova, por e-mail e telefone."
    },
    {
      question: "A prova é presencial ou online?",
      answer: "A prova será realizada presencialmente nas dependências do Colégio OSE, com todos os protocolos de segurança."
    },
    {
      question: "Posso fazer a prova mais de uma vez?",
      answer: "Cada candidato pode participar apenas uma vez por processo seletivo, que acontece anualmente."
    }
  ];

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Vamos começar!</h3>
              <p className="text-slate-600">Primeiro, precisamos de suas informações básicas</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="nomeCompleto">Nome Completo *</Label>
                <Input
                  id="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
                  placeholder="Digite seu nome completo"
                  className={errors.nomeCompleto ? 'border-red-500' : ''}
                />
                {errors.nomeCompleto && <p className="text-red-500 text-sm mt-1">{errors.nomeCompleto}</p>}
              </div>
              
              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Informações de Contato</h3>
              <p className="text-slate-600">Como podemos entrar em contato com você?</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="telefone">Telefone/WhatsApp *</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange('telefone', e.target.value)}
                  placeholder="(15) 99999-9999"
                  className={errors.telefone ? 'border-red-500' : ''}
                />
                {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>}
              </div>
              
              <div>
                <Label htmlFor="idade">Idade *</Label>
                <Select onValueChange={(value) => handleInputChange('idade', value)}>
                  <SelectTrigger className={errors.idade ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione sua idade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 8 }, (_, i) => i + 11).map(age => (
                      <SelectItem key={age} value={age.toString()}>{age} anos</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.idade && <p className="text-red-500 text-sm mt-1">{errors.idade}</p>}
              </div>
            </div>
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Informações Acadêmicas</h3>
              <p className="text-slate-600">Conte-nos sobre sua vida escolar atual</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="escola">Escola Atual *</Label>
                <Input
                  id="escola"
                  value={formData.escola}
                  onChange={(e) => handleInputChange('escola', e.target.value)}
                  placeholder="Nome da sua escola atual"
                  className={errors.escola ? 'border-red-500' : ''}
                />
                {errors.escola && <p className="text-red-500 text-sm mt-1">{errors.escola}</p>}
              </div>
              
              <div>
                <Label htmlFor="serie">Série Atual *</Label>
                <Select onValueChange={(value) => handleInputChange('serie', value)}>
                  <SelectTrigger className={errors.serie ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione sua série atual" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6ano">6º ano do Ensino Fundamental</SelectItem>
                    <SelectItem value="7ano">7º ano do Ensino Fundamental</SelectItem>
                    <SelectItem value="8ano">8º ano do Ensino Fundamental</SelectItem>
                    <SelectItem value="9ano">9º ano do Ensino Fundamental</SelectItem>
                    <SelectItem value="1ano">1º ano do Ensino Médio</SelectItem>
                    <SelectItem value="2ano">2º ano do Ensino Médio</SelectItem>
                  </SelectContent>
                </Select>
                {errors.serie && <p className="text-red-500 text-sm mt-1">{errors.serie}</p>}
              </div>
            </div>
          </motion.div>
        );
      
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Informações do Responsável</h3>
              <p className="text-slate-600">Dados do seu responsável legal</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="responsavel">Nome do Responsável *</Label>
                <Input
                  id="responsavel"
                  value={formData.responsavel}
                  onChange={(e) => handleInputChange('responsavel', e.target.value)}
                  placeholder="Nome completo do responsável"
                  className={errors.responsavel ? 'border-red-500' : ''}
                />
                {errors.responsavel && <p className="text-red-500 text-sm mt-1">{errors.responsavel}</p>}
              </div>
              
              <div>
                <Label htmlFor="telefoneResponsavel">Telefone do Responsável *</Label>
                <Input
                  id="telefoneResponsavel"
                  value={formData.telefoneResponsavel}
                  onChange={(e) => handleInputChange('telefoneResponsavel', e.target.value)}
                  placeholder="(15) 99999-9999"
                  className={errors.telefoneResponsavel ? 'border-red-500' : ''}
                />
                {errors.telefoneResponsavel && <p className="text-red-500 text-sm mt-1">{errors.telefoneResponsavel}</p>}
              </div>
            </div>
          </motion.div>
        );
      
      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Quase lá!</h3>
              <p className="text-slate-600">Conte-nos por que você quer esta bolsa</p>
            </div>
            
            <div>
              <Label htmlFor="motivacao">Por que você quer estudar na OSE? (Opcional)</Label>
              <Textarea
                id="motivacao"
                value={formData.motivacao}
                onChange={(e) => handleInputChange('motivacao', e.target.value)}
                placeholder="Compartilhe sua motivação em algumas palavras..."
                className="min-h-[100px]"
              />
            </div>
          </motion.div>
        );
      
      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Inscrição Realizada!</h3>
              <p className="text-slate-600 mb-4">
                Parabéns! Sua inscrição foi enviada com sucesso.
              </p>
              <p className="text-sm text-slate-500">
                Você receberá um e-mail de confirmação em breve com mais detalhes sobre a prova.
              </p>
            </div>
            
            <Button onClick={resetForm} className="bg-school-orange hover:bg-school-orange/90">
              Fazer Nova Inscrição
            </Button>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Admin Logout Button */}
      {isAuthenticated && (
        <div className="fixed top-4 right-4 z-50">
          <LogoutButton />
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden flex items-center">
        {/* Background Image */}
        {heroBackground && (
          <div className="absolute inset-0">
            {heroBackground.type === 'image' && heroBackground.imageUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={{
                  backgroundImage: `url(${heroBackground.imageUrl})`,
                  backgroundPosition: heroBackground.position || 'center',
                  backgroundSize: heroBackground.size || 'cover',
                  backgroundRepeat: heroBackground.repeat || 'no-repeat',
                  opacity: heroBackground.opacity || 1
                }}
              />
            )}
          </div>
        )}

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
            className="text-center max-w-5xl mx-auto"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Prova de <span className="text-school-orange">Bolsas</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Sua Oportunidade de Educação de Excelência
            </motion.p>
            <motion.p 
              className="text-lg mb-8 opacity-95 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Conquiste uma bolsa de estudos de até <strong>100%</strong> no Colégio OSE. 
              Uma instituição centenária que forma líderes e cidadãos conscientes há mais de 100 anos.
              Transforme seu futuro através da educação de qualidade que você merece.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5" />
                <span>Data: 15 de Março de 2025</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5" />
                <span>Local: Campus OSE - Sorocaba</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-school-orange text-white hover:bg-school-orange/90 text-lg px-8 py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Award className="mr-2 h-6 w-6" />
                    Inscreva-se Agora - É Grátis!
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Inscrição para Prova de Bolsas
                    </DialogTitle>
                  </DialogHeader>
                  
                  {/* Progress Bar */}
                  {currentStep <= 5 && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                      <div 
                        className="bg-school-orange h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentStep / 5) * 100}%` }}
                      ></div>
                    </div>
                  )}
                  
                  <div className="max-h-[60vh] overflow-y-auto">
                    {renderFormStep()}
                  </div>
                  
                  {/* Navigation Buttons */}
                  {currentStep <= 5 && (
                    <div className="flex justify-between pt-4 border-t">
                      {currentStep > 1 && (
                        <Button variant="outline" onClick={prevStep}>
                          Voltar
                        </Button>
                      )}
                      
                      <div className="ml-auto">
                        {currentStep < 5 ? (
                          <Button onClick={nextStep} className="bg-school-orange hover:bg-school-orange/90">
                            Próximo
                          </Button>
                        ) : (
                          <Button 
                            onClick={submitForm} 
                            disabled={isLoading}
                            className="bg-school-orange hover:bg-school-orange/90"
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Enviando...
                              </>
                            ) : (
                              'Finalizar Inscrição'
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Diferenciais da Prova de Bolsas */}
      <AnimatedSection className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Diferenciais</span> da Nossa Bolsa
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Mais que um desconto na mensalidade, é uma oportunidade de transformar seu futuro
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diferenciais.map((diferencial, index) => {
              const Icon = diferencial.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.1} className="h-full">
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center h-full">
                    <div className={`${diferencial.color} text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto`}>
                      <Icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">{diferencial.title}</h3>
                    <p className="text-slate-600">{diferencial.description}</p>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Critérios e Processo */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Como</span> Funciona
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Processo transparente e justo para seleção dos bolsistas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {criterios.map((criterio, index) => {
              const Icon = criterio.icon;
              return (
                <AnimatedCard key={index} delay={index * 0.1} className="h-full">
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow h-full">
                    <div className="bg-school-orange text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{criterio.title}</h3>
                    <p className="text-slate-500 mb-6">{criterio.subtitle}</p>
                    <ul className="space-y-3">
                      {criterio.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <div className="bg-school-orange/10 rounded-full p-1 mt-1">
                            <div className="w-2 h-2 bg-school-orange rounded-full"></div>
                          </div>
                          <span className="text-slate-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Histórias de Sucesso */}
      <AnimatedSection className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Histórias</span> de Sucesso
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Conheça quem já conquistou sua bolsa e transformou seu futuro na OSE
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedCard key={index} delay={index * 0.1} className="h-full">
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 italic text-lg">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <p className="font-bold text-slate-800 text-lg">{testimonial.name}</p>
                    <p className="text-school-orange font-medium">{testimonial.course}</p>
                    <p className="text-sm text-slate-500">{testimonial.year}</p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-school-orange">Perguntas</span> Frequentes
            </h2>
            <p className="text-xl text-slate-600">
              Tire suas dúvidas sobre a prova de bolsas
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedCard key={index} delay={index * 0.1}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div 
                    className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-800">{faq.question}</h3>
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                  </div>
                  {openFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Call to Action Final */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-school-orange to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Não Perca Esta Oportunidade!
          </h2>
          <p className="text-xl text-orange-100 mb-8 leading-relaxed">
            As vagas são limitadas e a concorrência é alta. Garante já sua inscrição 
            e dê o primeiro passo rumo ao seu futuro de sucesso.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Phone className="w-8 h-8 text-white" />
              <div>
                <p className="font-semibold text-white">Telefone</p>
                <p className="text-orange-100">(15) 2101-3800</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <Mail className="w-8 h-8 text-white" />
              <div>
                <p className="font-semibold text-white">E-mail</p>
                <p className="text-orange-100">bolsas@colegioose.com.br</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <MapPin className="w-8 h-8 text-white" />
              <div>
                <p className="font-semibold text-white">Endereço</p>
                <p className="text-orange-100">Rua Exemplo, 123 - Sorocaba/SP</p>
              </div>
            </div>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                size="lg"
                className="bg-white text-school-orange hover:bg-gray-100 text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => setDialogOpen(true)}
              >
                <Award className="mr-2 h-6 w-6" />
                Fazer Inscrição Agora
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </AnimatedSection>

      <WhyOSESection />
      <ContactSection />
    </div>
  );
}
