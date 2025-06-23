import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-school-brown text-white py-16">
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
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white/80 hover:text-school-orange transition-colors text-left"
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
          <h4 className="text-lg font-bold text-white mb-6">Contato</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-white/90">
            <div className="flex items-start">
              <MapPin className="mr-2 mt-1 flex-shrink-0 text-school-orange" size={16} />
              <span className="text-sm">Rua Comendador Oetterer, 758<br />Centro, Sorocaba - SP</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 flex-shrink-0 text-school-orange" size={16} />
              <span className="text-sm">(15) 3231-5588</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 flex-shrink-0 text-school-orange" size={16} />
              <span className="text-sm">contato@colegioose.com.br</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 flex-shrink-0 text-school-orange" size={16} />
              <span className="text-sm">Segunda a Sexta: 7h30 às 17h30</span>
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