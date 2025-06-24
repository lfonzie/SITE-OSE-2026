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

          <div className="grid lg:grid-cols-2 gap-16">
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
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-8">Envie sua Mensagem</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome completo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="seu@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input placeholder="(11) 99999-9999" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="interest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interesse</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma opção" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="educacao-infantil">Educação Infantil</SelectItem>
                              <SelectItem value="ensino-fundamental">Ensino Fundamental</SelectItem>
                              <SelectItem value="ensino-medio">Ensino Médio</SelectItem>
                              <SelectItem value="informacoes-gerais">Informações Gerais</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={5}
                            placeholder="Conte-nos como podemos ajudar..." 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-school-orange hover:bg-school-orange/90 text-white py-4 text-lg font-bold"
                    disabled={createContactMutation.isPending}
                  >
                    {createContactMutation.isPending ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Send className="mr-2" size={20} />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              </Form>
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
                  <h3 className="text-xl font-bold text-slate-800">a OSE</h3>
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

          {/* Contact Info */}
          <div className="mt-12 bg-slate-50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-slate-800 mb-6">Informações de Contato</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-slate-700">
              <div className="flex items-start">
                <MapPin className="mr-2 mt-1 flex-shrink-0 text-school-orange" size={16} />
                <div className="text-sm">
                  <strong>Endereço:</strong><br />
                  Rua da Penha, 620<br />
                  Centro - Sorocaba, SP<br />
                  CEP: 18010-002
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="mr-2 mt-1 flex-shrink-0 text-school-orange" size={16} />
                <div className="text-sm">
                  <strong>Telefones:</strong><br />
                  (15) 2101-3800
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="mr-2 mt-1 flex-shrink-0 text-school-orange" size={16} />
                <div className="text-sm">
                  <strong>E-mail:</strong><br />
                  info@colegioose.com.br
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="mr-2 mt-1 flex-shrink-0 text-school-orange" size={16} />
                <div className="text-sm">
                  <strong>Horário de Atendimento:</strong><br />
                  Segunda a Sexta: 7h às 18h<br />
                  Sábados: 8h às 12h
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="mt-6 pt-6 border-t border-gray-200">
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