
import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import ContactSection from "@/components/contact-section";
import { updateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, Phone, Mail, User } from "lucide-react";

export default function CV() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    curriculo: null as File | null
  });
  const { toast } = useToast();

  useEffect(() => {
    updateSEO({
      title: "Envio de Currículo | Colégio OSE",
      description: "Envie seu currículo para fazer parte da equipe OSE. Junte-se a nós na missão de transformar vidas através da educação.",
      keywords: "trabalhe conosco, vagas ose, currículo, emprego escola, carreira educação"
    });
  }, []);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length > 11) return formData.telefone;
    
    let formatted = '';
    if (numbers.length > 0) {
      formatted = '(' + numbers.slice(0, 2);
      if (numbers.length > 2) {
        formatted += ') ' + numbers.slice(2, 7);
        if (numbers.length > 7) {
          formatted += '-' + numbers.slice(7, 11);
        }
      }
    }
    return formatted;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'telefone') {
      setFormData(prev => ({
        ...prev,
        [name]: formatPhone(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      curriculo: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.curriculo) {
        toast({
          title: "Erro",
          description: "Por favor, selecione um arquivo de currículo.",
          variant: "destructive"
        });
        return;
      }

      // Simular envio (substituir pela integração real)
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Sucesso!",
        description: "Seu currículo foi enviado com sucesso! Agradecemos o seu interesse."
      });

      // Limpar formulário
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        curriculo: null
      });

      // Limpar input de arquivo
      const fileInput = document.getElementById('curriculo') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      toast({
        title: "Erro",
        description: "Houve um erro ao enviar seu currículo. Por favor, tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-school-brown to-school-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Trabalhe <span className="text-yellow-300">Conosco</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Faça parte da nossa equipe de educadores
          </p>
          <p className="text-lg mb-8 opacity-95 max-w-3xl mx-auto">
            Junte-se a nós na missão de transformar vidas através da educação há mais de 100 anos
          </p>
        </div>
      </section>

      {/* Formulário */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <FileText className="w-16 h-16 text-school-orange mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-school-brown mb-4">
                Envio de Currículo
              </h2>
              <p className="text-slate-600">
                Preencha os dados abaixo e anexe seu currículo
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="nome" className="flex items-center gap-2 text-school-brown font-semibold">
                  <User size={18} />
                  Nome Completo
                </Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  className="mt-2"
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2 text-school-brown font-semibold">
                  <Mail size={18} />
                  E-mail
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-2"
                  placeholder="exemplo@email.com"
                />
              </div>

              <div>
                <Label htmlFor="telefone" className="flex items-center gap-2 text-school-brown font-semibold">
                  <Phone size={18} />
                  Telefone Celular
                </Label>
                <Input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  required
                  className="mt-2"
                  placeholder="(00) 00000-0000"
                />
                <p className="text-sm text-slate-500 mt-1">Formato: (00) 00000-0000</p>
              </div>

              <div>
                <Label htmlFor="curriculo" className="flex items-center gap-2 text-school-brown font-semibold">
                  <Upload size={18} />
                  Envie seu CV aqui
                </Label>
                <Input
                  id="curriculo"
                  name="curriculo"
                  type="file"
                  onChange={handleFileChange}
                  required
                  className="mt-2"
                  accept=".pdf,.doc,.docx"
                />
                <p className="text-sm text-slate-500 mt-1">
                  Formatos aceitos: PDF, DOC, DOCX
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-school-orange hover:bg-school-orange/90 text-white font-semibold py-3 text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando currículo...
                  </div>
                ) : (
                  "Enviar Currículo"
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Informações adicionais */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-school-brown mb-6">
            Por que trabalhar na OSE?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-school-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-school-orange" />
              </div>
              <h4 className="font-bold text-school-brown mb-2">Tradição e Inovação</h4>
              <p className="text-slate-600">
                100 anos de experiência em educação aliados às metodologias mais modernas
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-school-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-school-orange" />
              </div>
              <h4 className="font-bold text-school-brown mb-2">Desenvolvimento Profissional</h4>
              <p className="text-slate-600">
                Investimos no crescimento e capacitação contínua de nossa equipe
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-school-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-school-orange" />
              </div>
              <h4 className="font-bold text-school-brown mb-2">Ambiente Colaborativo</h4>
              <p className="text-slate-600">
                Trabalhe em um ambiente acolhedor e colaborativo, focado na excelência
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
