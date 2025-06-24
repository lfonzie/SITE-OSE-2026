import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#FF4F00' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="space-y-4 col-span-1 lg:col-span-2">
              <div className="flex items-center space-x-3">
                <img 
                  src="/attached_assets/ose-logo-branco.png" 
                  alt="OSE"
                  className="h-12 w-auto"
                  onError={(e) => {
                    // Fallback if logo image is not found
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div>
                  <h3 className="text-xl font-bold">OSE</h3>
                  <p className="text-sm text-white/80">Desde 1924</p>
                </div>
              </div>
              <p className="text-white/90 max-w-md">
                Tradição secular de ensino desde 1924. Formando cidadãos críticos e preparados 
                para os desafios do futuro há 100 anos.
              </p>
              <div className="space-y-2">
                <p className="text-white/90 text-sm">
                  Funciona de seg a sex somente
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-white/80 hover:text-white transition-colors">
                    Início
                  </a>
                </li>
                <li>
                  <a href="/legacy" className="text-white/80 hover:text-white transition-colors">
                    Nosso Legado
                  </a>
                </li>
                <li>
                  <a href="/professores" className="text-white/80 hover:text-white transition-colors">
                    Professores
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.activesoft.com.br/intranet/familia/login/index.php?co_entidade=9989" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Portal do Aluno
                  </a>
                </li>
                <li>
                  <a href="/portal-pais" className="text-white/80 hover:text-white transition-colors">
                    Portal dos Pais
                  </a>
                </li>
              </ul>
            </div>

            {/* Educational Programs */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Programas</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/educacao-infantil" className="text-white/80 hover:text-white transition-colors">
                    Educação Infantil
                  </a>
                </li>
                <li>
                  <a href="/fundamental-1" className="text-white/80 hover:text-white transition-colors">
                    Fundamental I
                  </a>
                </li>
                <li>
                  <a href="/fundamental-2" className="text-white/80 hover:text-white transition-colors">
                    Fundamental II
                  </a>
                </li>
                <li>
                  <a href="/ensino-medio" className="text-white/80 hover:text-white transition-colors">
                    Ensino Médio
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 py-8">
          <div className="text-center">
            <div className="text-white/70 text-sm">
              © 2024 Colégio OSE. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}