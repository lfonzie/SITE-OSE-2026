import { MapPin, Phone, Mail, Clock } from "lucide-react";

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

// Links para redes sociais serão adicionados posteriormente

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
        <div className="grid lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="https://colegioose.com.br/wp-content/uploads/2021/03/logo-ose.png" 
                alt="a OSE" 
                className="h-12 w-auto mr-3"
              />
              <div>
                <h3 className="text-xl font-bold text-white">a OSE</h3>
                <p className="text-slate-300 text-sm">Desde 1924</p>
              </div>
            </div>
            <p className="text-slate-300 mb-4">
              Tradição secular de ensino desde 1924. Formando cidadãos críticos e preparados para os desafios do futuro há 100 anos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-slate-300 hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="/professores" className="text-slate-300 hover:text-white transition-colors">
                  Professores
                </a>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Programas */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Programas</h4>
            <ul className="space-y-3">
              <li>
                <a href="/educacao-infantil" className="text-slate-300 hover:text-white transition-colors">
                  Educação Infantil
                </a>
              </li>
              <li>
                <a href="/fundamental-1" className="text-slate-300 hover:text-white transition-colors">
                  Fundamental I
                </a>
              </li>
              <li>
                <a href="/fundamental-2" className="text-slate-300 hover:text-white transition-colors">
                  Fundamental II
                </a>
              </li>
              <li>
                <a href="/ensino-medio" className="text-slate-300 hover:text-white transition-colors">
                  Ensino Médio
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contato</h4>
            <div className="space-y-3 text-slate-300">
              <div className="flex items-start">
                <MapPin className="mr-2 mt-1 flex-shrink-0 text-school-orange" size={16} />
                <span>Rua Comendador Oetterer, 758<br />Centro, Sorocaba - SP</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 flex-shrink-0 text-school-orange" size={16} />
                <span>(15) 3231-5588</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 flex-shrink-0 text-school-orange" size={16} />
                <span>contato@colegioose.com.br</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 flex-shrink-0 text-school-orange" size={16} />
                <span>Segunda a Sexta: 7h30 às 17h30</span>
              </div>
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
