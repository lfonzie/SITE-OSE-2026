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
            <h2 className="text-4xl md:text-5xl font-bold text-school-brown mb-4">
              Entre em <span className="text-school-orange">Contato</span>
            </h2>
            <p className="text-xl text-school-brown max-w-3xl mx-auto">
              Estamos aqui para esclarecer suas dúvidas e ajudar você a conhecer melhor nossa proposta educacional
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Informações de contato */}
            <div>
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
                src="https://colegioose.com.br/wp-content/uploads/2024/06/ose100-800x400.png" 
                alt="OSE" 
                className="h-12 w-auto mr-3"
              />
              <div>
                <h3 className="text-xl font-bold text-school-brown">OSE</h3>
                <p className="text-school-brown text-sm">Desde 1924</p>
              </div>
            </div>

            <p className="text-school-brown mb-6 max-w-2xl mx-auto">
              Tradição secular de ensino desde 1924. Formando cidadãos críticos e preparados para os desafios do futuro há 100 anos.
            </p>

            

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