
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
import { CheckCircle, Clock, Users, Award, Mail, Phone, MapPin, ChevronDown, ChevronUp, Star, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from '@/contexts/AuthContext';
import LogoutButton from '@/components/LogoutButton';
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

  const testimonials = [
    {
      name: "Ana Carolina Silva",
      text: "A bolsa de estudos da OSE mudou minha vida! Consegui me formar no Ensino Médio com excelência e hoje estudo Medicina.",
      year: "Formada em 2022"
    },
    {
      name: "Pedro Henrique Santos",
      text: "Estudar na OSE me deu as ferramentas necessárias para passar no vestibular. A qualidade do ensino é incomparável!",
      year: "Formado em 2023"
    },
    {
      name: "Maria Eduarda Costa",
      text: "Minha família sempre sonhou que eu estudasse na OSE. Com a bolsa, foi possível realizar esse sonho!",
      year: "Aluna atual - 3º ano"
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
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Prova de <span className="text-school-orange">Bolsas</span>
              <span className="block text-2xl md:text-3xl font-normal text-orange-100 mt-4">
                Sua Oportunidade de Estudar na OSE
              </span>
            </h1>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
              Conquiste uma bolsa de estudos de até <strong>100%</strong> no Colégio OSE. 
              Uma instituição centenária que forma líderes e cidadãos conscientes há mais de 100 anos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5" />
                <span>Data: 15 de Março de 2025</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5" />
                <span>Local: Campus OSE - Sorocaba</span>
              </div>
            </div>
            
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
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Informações da Prova
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Tudo que você precisa saber sobre nossa prova de bolsas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="h-full border-l-4 border-l-school-orange">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-school-orange/10 p-2 rounded-lg">
                      <Clock className="w-6 h-6 text-school-orange" />
                    </div>
                    <CardTitle>Data e Horário</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 space-y-2">
                    <p><strong>Data:</strong> 15 de Março de 2025</p>
                    <p><strong>Horário:</strong> 8h às 11h30</p>
                    <p><strong>Duração:</strong> 3h30min</p>
                    <p><strong>Chegada:</strong> 7h30 (portões fecham às 8h)</p>
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="h-full border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-green-500/10 p-2 rounded-lg">
                      <Users className="w-6 h-6 text-green-500" />
                    </div>
                    <CardTitle>Elegibilidade</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 space-y-2">
                    <p>• Estudantes do 6º ano EF ao 2º ano EM</p>
                    <p>• Renda familiar até 10 salários mínimos</p>
                    <p>• Não ter estudado na OSE anteriormente</p>
                    <p>• Idade adequada à série pretendida</p>
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="h-full border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <Award className="w-6 h-6 text-blue-500" />
                    </div>
                    <CardTitle>Benefícios</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 space-y-2">
                    <p>• Bolsas de 20% a 100%</p>
                    <p>• Material didático incluso</p>
                    <p>• Acesso a todos os programas</p>
                    <p>• Renovação anual por mérito</p>
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Histórias de Sucesso
            </h2>
            <p className="text-xl text-slate-600">
              Conheça quem já conquistou sua bolsa na OSE
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-slate-600 mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <p className="font-semibold text-slate-800">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">{testimonial.year}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-slate-600">
              Tire suas dúvidas sobre a prova de bolsas
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card>
                  <CardHeader 
                    className="cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                  </CardHeader>
                  {openFAQ === index && (
                    <CardContent>
                      <p className="text-slate-600">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-school-orange to-orange-600 text-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  Ainda tem dúvidas?
                </CardTitle>
                <CardDescription className="text-orange-100 text-lg">
                  Entre em contato conosco
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Phone className="w-8 h-8" />
                    <div>
                      <p className="font-semibold">Telefone</p>
                      <p className="text-orange-100">(15) 2101-3800</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <Mail className="w-8 h-8" />
                    <div>
                      <p className="font-semibold">E-mail</p>
                      <p className="text-orange-100">bolsas@colegioose.com.br</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <MapPin className="w-8 h-8" />
                    <div>
                      <p className="font-semibold">Endereço</p>
                      <p className="text-orange-100">Rua Exemplo, 123 - Sorocaba/SP</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="lg"
                        className="bg-white text-school-orange hover:bg-gray-100"
                        onClick={() => setDialogOpen(true)}
                      >
                        <Award className="mr-2 h-5 w-5" />
                        Fazer Inscrição Agora
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Colégio OSE</h3>
              <p className="text-slate-300">
                100 anos de tradição em educação de excelência.
                Formando líderes e cidadãos conscientes desde 1924.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-slate-300">
                <li><a href="/" className="hover:text-white">Página Inicial</a></li>
                <li><a href="/sobre" className="hover:text-white">Sobre a OSE</a></li>
                <li><a href="/contato" className="hover:text-white">Contato</a></li>
                <li><a href="/links" className="hover:text-white">Portal do Aluno</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Políticas</h3>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white">LGPD</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Colégio OSE. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
