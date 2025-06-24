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
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove o script quando o componente for desmontado
      const existingScript = document.querySelector('script[src="https://www.uchat.com.au/js/widget/to6wv2osffcdtdwb/full.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <footer id="contato" className="bg-school-brown text-white py-16">
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
                <h3 className="text-xl font-bold text-white">a OSE</h3>
                <p className="text-white/80 text-sm">Desde 1924</p>
              </div>
            </div>
            <p className="text-white/80 mb-4">
              Tradição secular de ensino desde 1924. Formando cidadãos críticos e preparados para os desafios do futuro há 100 anos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-white/80 hover:text-school-orange transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="/legacy" className="text-white/80 hover:text-school-orange transition-colors">
                  Nosso Legado
                </a>
              </li>
              <li>
                <a href="/professores" className="text-white/80 hover:text-school-orange transition-colors">
                  Professores
                </a>
              </li>
              <li>
                <a href="/bilingue" className="text-white/80 hover:text-school-orange transition-colors">
                  Bilíngue
                </a>
              </li>
            </ul>
          </div>

          {/* Programas */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Programas</h4>
            <ul className="space-y-3">
              <li>
                <a href="/educacao-infantil" className="text-white/80 hover:text-school-orange transition-colors">
                  Educação Infantil
                </a>
              </li>
              <li>
                <a href="/fundamental-1" className="text-white/80 hover:text-school-orange transition-colors">
                  Fundamental I
                </a>
              </li>
              <li>
                <a href="/fundamental-2" className="text-white/80 hover:text-school-orange transition-colors">
                  Fundamental II
                </a>
              </li>
              <li>
                <a href="/ensino-medio" className="text-white/80 hover:text-school-orange transition-colors">
                  Ensino Médio
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 bg-school-orange/10 rounded-xl p-6">
          <h4 className="text-lg font-bold text-white mb-6">Contato e Localização</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-white/90">
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
          <div className="mt-6 pt-6 border-t border-white/20">
            <h5 className="text-white font-semibold mb-3">Siga-nos nas Redes Sociais:</h5>
            <div className="flex space-x-4">
              <a href="https://instagram.com/colegioose" target="_blank" rel="noopener noreferrer" 
                 className="text-white/80 hover:text-school-orange transition-colors">
                📸 @colegioose
              </a>
              <a href="https://facebook.com/colegioose" target="_blank" rel="noopener noreferrer"
                 className="text-white/80 hover:text-school-orange transition-colors">
                📘 Colégio OSE
              </a>
              <a href="https://youtube.com/@colegioose" target="_blank" rel="noopener noreferrer"
                 className="text-white/80 hover:text-school-orange transition-colors">
                📺 Canal OSE
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/60">
            © 2025 a OSE. Todos os direitos reservados. |{" "}
            <a href="#" className="hover:text-school-orange transition-colors">Política de Privacidade</a> |{" "}
            <a href="#" className="hover:text-school-orange transition-colors">Termos de Uso</a>
          </p>
        </div>
      </div>
    </footer>
  );
}