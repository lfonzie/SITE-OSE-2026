import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { trackEvent, trackFBEvent } from "@/lib/analytics";

const contactInfo = [
  {
    icon: MapPin,
    title: "Endereço",
    content: ["Rua da Penha, 620", "Centro - Sorocaba, SP", "CEP: 18010-002"],
    color: "bg-school-orange"
  },
  {
    icon: Phone,
    title: "Telefones",
    content: ["(15) 2101-3800"],
    color: "bg-school-brown"
  },
  {
    icon: Mail,
    title: "E-mail",
    content: ["info@colegioose.com.br"],
    color: "bg-school-orange"
  },
  {
    icon: Clock,
    title: "Horário de Atendimento",
    content: ["Segunda a Sexta: 7h às 18h", "Sábados: 8h às 12h"],
    color: "bg-purple-600"
  }
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/colegioose", color: "bg-blue-600 hover:bg-blue-700" },
  { icon: Instagram, href: "https://instagram.com/colegioose", color: "bg-pink-600 hover:bg-pink-700" },
  { icon: Youtube, href: "https://youtube.com/@colegioose", color: "bg-red-600 hover:bg-red-700" }
];

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interest: "",
      message: ""
    }
  });

  const createContactMutation = useMutation({
    mutationFn: (data: InsertContact) => apiRequest("POST", "/api/contacts", data),
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve. Obrigado pelo interesse!",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao enviar mensagem",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    trackEvent('form_submit', 'contact', 'contact_form');
    trackFBEvent('Lead', { content_name: 'Contact Form' });
    
    createContactMutation.mutate(data);
  };

  return (
    <>
      <section id="contato" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Entre em <span className="text-school-orange">Contato</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Estamos aqui para esclarecer suas dúvidas e ajudar você a conhecer melhor nossa proposta educacional
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Informações de contato */}
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-8">Informações de Contato</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <div className={`${info.color} text-white p-3 rounded-lg mr-4 flex-shrink-0`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1">{info.title}</h4>
                        {info.content.map((line, lineIndex) => (
                          <p key={lineIndex} className="text-slate-600">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <h4 className="font-bold text-slate-800 mb-4">Redes Sociais</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.color} text-white p-3 rounded-lg transition-colors`}
                      >
                        <Icon size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8">
                <Button 
                  size="lg"
                  className="w-full bg-school-orange hover:bg-school-orange/90 text-white"
                  onClick={() => window.open('https://calendly.com/colegioose/apresentacao', '_blank')}
                >
                  📅 Agende sua Visita
                </Button>
              </div>
            </div>

            {/* Links Rápidos */}
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-8">Links Rápidos</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/" className="text-slate-600 hover:text-school-orange transition-colors">
                    Início
                  </a>
                </li>
                <li>
                  <a href="/legacy" className="text-slate-600 hover:text-school-orange transition-colors">
                    Nosso Legado
                  </a>
                </li>
                <li>
                  <a href="/missao-valores" className="text-slate-600 hover:text-school-orange transition-colors">
                    Missão e Valores
                  </a>
                </li>
                <li>
                  <a href="/professores" className="text-slate-600 hover:text-school-orange transition-colors">
                    Professores
                  </a>
                </li>
                <li>
                  <a href="/bilingue" className="text-slate-600 hover:text-school-orange transition-colors">
                    Bilíngue
                  </a>
                </li>
                <li>
                  <a href="/code-ose" className="text-slate-600 hover:text-school-orange transition-colors">
                    CODE OSE
                  </a>
                </li>
                <li>
                  <a href="/integral" className="text-slate-600 hover:text-school-orange transition-colors">
                    Integral Flex
                  </a>
                </li>
                <li>
                  <a href="/amplia" className="text-slate-600 hover:text-school-orange transition-colors">
                    Plataforma Amplia
                  </a>
                </li>
              </ul>
            </div>

            {/* Programas */}
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-8">Programas</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/educacao-infantil" className="text-slate-600 hover:text-school-orange transition-colors">
                    Educação Infantil
                  </a>
                </li>
                <li>
                  <a href="/fundamental-1" className="text-slate-600 hover:text-school-orange transition-colors">
                    Fundamental I
                  </a>
                </li>
                <li>
                  <a href="/fundamental-2" className="text-slate-600 hover:text-school-orange transition-colors">
                    Fundamental II
                  </a>
                </li>
                <li>
                  <a href="/ensino-medio" className="text-slate-600 hover:text-school-orange transition-colors">
                    Ensino Médio
                  </a>
                </li>
                <li>
                  <a href="/arvore" className="text-slate-600 hover:text-school-orange transition-colors">
                    Árvore Livros
                  </a>
                </li>
                <li>
                  <a href="/isaac" className="text-slate-600 hover:text-school-orange transition-colors">
                    ISAAC Financeiro
                  </a>
                </li>
                <li>
                  <a href="/portal-aluno" className="text-slate-600 hover:text-school-orange transition-colors">
                    Portal do Aluno
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-600">
              Estamos localizados no coração de Sorocaba, próximos aos principais pontos da cidade.
            </p>
          </div>
        </div>
      </section>

      {/* Footer com fundo branco e redes sociais */}
      <footer className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* About */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <img 
                  src="https://colegioose.com.br/wp-content/uploads/2024/06/ose100-800x400.png" 
                  alt="a OSE" 
                  className="h-12 w-auto mr-3"
                />
                <div>
                  <h3 className="text-xl font-bold text-slate-800">OSE</h3>
                  <p className="text-slate-600 text-sm">Desde 1924</p>
                </div>
              </div>
              <p className="text-slate-600 mb-4">
                Tradição secular de ensino desde 1924. Formando cidadãos críticos e preparados para os desafios do futuro há 100 anos.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-slate-800 mb-6">Links Rápidos</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/" className="text-slate-600 hover:text-school-orange transition-colors">
                    Início
                  </a>
                </li>
                <li>
                  <a href="/legacy" className="text-slate-600 hover:text-school-orange transition-colors">
                    Nosso Legado
                  </a>
                </li>
                <li>
                  <a href="/professores" className="text-slate-600 hover:text-school-orange transition-colors">
                    Professores
                  </a>
                </li>
                <li>
                  <a href="/services" className="text-slate-600 hover:text-school-orange transition-colors">
                    Serviços
                  </a>
                </li>
                <li>
                  <a href="/portal-aluno" className="text-slate-600 hover:text-school-orange transition-colors">
                    Portal do Aluno
                  </a>
                </li>
                <li>
                  <a href="/portal-pais" className="text-slate-600 hover:text-school-orange transition-colors">
                    Portal dos Pais
                  </a>
                </li>
              </ul>
            </div>

            {/* Programas */}
            <div>
              <h4 className="text-lg font-bold text-slate-800 mb-6">Programas</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/educacao-infantil" className="text-slate-600 hover:text-school-orange transition-colors">
                    Educação Infantil
                  </a>
                </li>
                <li>
                  <a href="/fundamental-1" className="text-slate-600 hover:text-school-orange transition-colors">
                    Fundamental I
                  </a>
                </li>
                <li>
                  <a href="/fundamental-2" className="text-slate-600 hover:text-school-orange transition-colors">
                    Fundamental II
                  </a>
                </li>
                <li>
                  <a href="/ensino-medio" className="text-slate-600 hover:text-school-orange transition-colors">
                    Ensino Médio
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h5 className="text-slate-800 font-semibold mb-3">Siga-nos nas Redes Sociais:</h5>
            <div className="flex space-x-6">
              <a href="https://instagram.com/colegioose" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center text-slate-600 hover:text-school-orange transition-colors">
                <Instagram className="mr-2" size={20} />
                @colegioose
              </a>
              <a href="https://facebook.com/colegioose" target="_blank" rel="noopener noreferrer"
                 className="flex items-center text-slate-600 hover:text-school-orange transition-colors">
                <Facebook className="mr-2" size={20} />
                Colégio OSE
              </a>
              <a href="https://youtube.com/@colegioose" target="_blank" rel="noopener noreferrer"
                 className="flex items-center text-slate-600 hover:text-school-orange transition-colors">
                <Youtube className="mr-2" size={20} />
                Canal OSE
              </a>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-slate-500">
              © 2025 a OSE. Todos os direitos reservados. |{" "}
              <a href="#" className="hover:text-school-orange transition-colors">Política de Privacidade</a> |{" "}
              <a href="#" className="hover:text-school-orange transition-colors">Termos de Uso</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}