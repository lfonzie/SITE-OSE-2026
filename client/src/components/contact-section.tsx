import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema, type InsertContact } from "@shared/schema";

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
  { icon: Twitter, href: "https://twitter.com/colegioose", color: "bg-blue-400 hover:bg-blue-500" },
  { icon: Youtube, href: "https://youtube.com/colegioose", color: "bg-red-600 hover:bg-red-700" }
];

export default function ContactSection() {
  useEffect(() => {
    // Adiciona o script do UCChat
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = 'https://www.uchat.com.au/js/widget/to6wv2osffcdtdwb/full.js';
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove o script quando o componente for desmontado
      const existingScript = document.querySelector('script[src="https://www.uchat.com.au/js/widget/to6wv2osffcdtdwb/full.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
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
                      className={`${social.color} text-white p-3 rounded-lg transition-colors`}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}