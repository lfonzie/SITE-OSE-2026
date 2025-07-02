import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Send } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
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
    content: ["Segunda a Sexta: 7h às 18h"],
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
    mutationFn: (data: InsertContact) => apiRequest("/api/contacts", {
      method: "POST",
      body: JSON.stringify(data)
    }),
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
      <section id="contato" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl p-8 shadow-xl shadow-black/10">
              <h2 className="text-4xl md:text-5xl font-bold text-school-brown mb-4">
                Entre em <span className="text-school-orange">Contato</span>
              </h2>
              <p className="text-xl text-school-brown max-w-3xl mx-auto">
                Estamos aqui para esclarecer suas dúvidas e ajudar você a conhecer melhor nossa proposta educacional
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Informações de contato */}
            <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl p-8 shadow-xl shadow-black/10">
              <h3 className="text-2xl font-bold text-school-brown mb-8">Informações de Contato</h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <div className={`${info.color} text-white p-3 rounded-lg mr-4 flex-shrink-0`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-school-brown mb-1">{info.title}</h4>
                        {info.content.map((line, lineIndex) => (
                          <p key={lineIndex} className="text-school-brown">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>



              <div className="mt-8">
                <Button 
                  size="lg"
                  className="w-full bg-school-orange text-white font-semibold"
                  onClick={() => window.location.href = '/agendamento'}
                >
                  📅 Agende sua Visita
                </Button>
              </div>
            </div>

            {/* Botão WhatsApp */}
            <div className="bg-green-50 p-8 rounded-xl border-2 border-green-200">
              <h3 className="text-2xl font-bold text-school-brown mb-6 text-center">Fale Conosco no WhatsApp</h3>
              <div className="text-center">
                <Button 
                  size="lg"
                  className="w-full bg-green-500 text-white font-semibold px-8 py-4 text-lg"
                  onClick={() => window.open('https://wa.me/551521013812', '_blank')}
                >
                  📱 Conversar no WhatsApp
                </Button>
                <p className="text-school-brown mt-4">
                  Estamos prontos para atendê-lo!<br/>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer simplificado */}
      <footer className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/images/LogoOSE100anos.png" 
                alt="OSE - 100 Anos" 
                className="h-16 w-auto"
              />
            </div>

            <p className="text-school-brown mb-6 max-w-2xl mx-auto">
              Tradição secular de ensino desde 1924. Formando cidadãos críticos e preparados para os desafios do futuro há 100 anos.
            </p>

          {/* Redes Sociais */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-800 mb-4 text-center">
              Conecte-se Conosco
            </h3>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => window.open('https://www.instagram.com/colegioose/', '_blank')}
                className="w-12 h-12 rounded-full bg-pink-600 hover:bg-pink-700 flex items-center justify-center text-white transition-colors duration-200 shadow-lg hover:shadow-xl"
                title="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </button>
              <button
                onClick={() => window.open('https://www.facebook.com/colegioose', '_blank')}
                className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors duration-200 shadow-lg hover:shadow-xl"
                title="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </button>
              <button
                onClick={() => window.open('https://twitter.com/colegioose', '_blank')}
                className="w-12 h-12 rounded-full bg-black hover:bg-gray-800 flex items-center justify-center text-white transition-colors duration-200 shadow-lg hover:shadow-xl"
                title="Twitter/X"
              >
                <FaXTwitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => window.open('https://www.youtube.com/@colegioose', '_blank')}
                className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white transition-colors duration-200 shadow-lg hover:shadow-xl"
                title="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </button>
              <button
                onClick={() => window.open('https://br.linkedin.com/school/organiza%C3%A7%C3%A3o-sorocabana-de-ensino/', '_blank')}
                className="w-12 h-12 rounded-full bg-blue-800 hover:bg-blue-900 flex items-center justify-center text-white transition-colors duration-200 shadow-lg hover:shadow-xl"
                title="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            </div>
          </div>


            <div className="border-t border-gray-200 pt-6">
              <p className="text-school-brown/70">
                © 2025 OSE. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}