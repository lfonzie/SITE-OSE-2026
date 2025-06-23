import { GraduationCap, MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

const quickLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Programas Acadêmicos", href: "#programas" },
  { label: "Professores", href: "#professores" },
  { label: "Notícias", href: "#noticias" },
  { label: "Contato", href: "#contato" }
];

const services = [
  { label: "Portal do Aluno", href: "/portal-aluno" },
  { label: "Portal dos Pais", href: "/portal-pais" },
  { label: "Biblioteca Digital", href: "/servicos" },
  { label: "Calendário Escolar", href: "/servicos" },
  { label: "Documentos", href: "/servicos" },
  { label: "Uniforme Escolar", href: "/servicos" }
];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Youtube, href: "#" }
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-slate-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="https://colegioose.com.br/wp-content/uploads/2024/06/ose100-800x400.png"
                alt="Colégio OSE - 100 Anos"
                className="h-12 w-auto object-contain filter brightness-0 invert"
              />
              <div>
                <h3 className="text-xl font-bold">Colégio OSE</h3>
                <p className="text-slate-400 text-sm">Desde 1924</p>
              </div>
            </div>
            <p className="text-slate-300 mb-4">
              Tradição secular de ensino desde 1924. Formando cidadãos críticos e preparados para os desafios do futuro há 100 anos.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="bg-slate-700 p-2 rounded hover:bg-school-orange transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-300 hover:text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">Serviços</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-slate-300 hover:text-white transition-colors"
                    onClick={(e) => {
                      if (service.href.startsWith('/')) {
                        e.preventDefault();
                        window.location.href = service.href;
                      }
                    }}
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contato</h4>
            <div className="space-y-3">
              <div className="text-slate-300 flex items-start">
                <MapPin className="mr-2 mt-1 flex-shrink-0" size={16} />
                <div>
                  <span>Rua da Penha, 620</span><br />
                  <span>Centro - Sorocaba, SP</span>
                </div>
              </div>
              <p className="text-slate-300 flex items-center">
                <Phone className="mr-2" size={16} />
                <span>(15) 2101-3800</span>
              </p>
              <p className="text-slate-300 flex items-center">
                <Mail className="mr-2" size={16} />
                <span>info@colegioose.com.br</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center">
          <p className="text-slate-400">
            © 2025 Colégio OSE. Todos os direitos reservados. |{" "}
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a> |{" "}
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
