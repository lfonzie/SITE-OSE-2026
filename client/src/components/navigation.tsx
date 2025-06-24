import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleNavigation = (item: { id: string; isSection: boolean }) => {
    if (item.isSection) {
      // If we're not on home page, navigate to home first
      if (location !== "/") {
        window.location.href = `/#${item.id}`;
      } else {
        const element = document.getElementById(item.id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // Use wouter navigation for internal pages
      window.location.href = item.id;
    }
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const navigationItems = [
    { label: "Início", id: "/", isSection: false },
    {
      label: "Colégio OSE",
      submenu: [
        { label: "Legado", id: "/legacy", isSection: false },
        { label: "Missão e Valores", id: "/missao-valores", isSection: false },
        { label: "Nossa Estrutura", id: "sobre", isSection: true }
      ]
    },
    {
      label: "Segmentos",
      submenu: [
        { label: "Infantil", id: "/educacao-infantil", isSection: false },
        { label: "Ensino Fundamental I", id: "/fundamental-1", isSection: false },
        { label: "Ensino Fundamental II", id: "/fundamental-2", isSection: false },
        { label: "Ensino Médio", id: "/ensino-medio", isSection: false }
      ]
    },
    {
      label: "Acadêmico",
      submenu: [
        { label: "Bilíngue", id: "/bilingue", isSection: false },
        { label: "CODE OSE", id: "/code-ose", isSection: false },
        { label: "Integral", id: "/integral", isSection: false },
        { label: "Amplia", id: "/amplia", isSection: false },
        { label: "SócioEmocional", id: "/socioemocional", isSection: false },
        { label: "Lista de Material", id: "/lista-material", isSection: false },
        { label: "Professores", id: "/professores", isSection: false }
      ]
    },
    {
      label: "Serviços",
      submenu: [
        { label: "Árvore (Livros Digitais)", id: "/arvore", isSection: false },
        { label: "Portal do Aluno", id: "/portal-aluno", isSection: false },
        { label: "ISAAC (Financeiro)", id: "/isaac", isSection: false },
        { label: "Contato", id: "contato", isSection: true }
      ]
    }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/">
              <img 
                src="https://colegioose.com.br/wp-content/uploads/2024/06/ose100-800x400.png" 
                alt="a OSE" 
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.submenu ? (
                  <div 
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="text-slate-700 hover:text-school-orange transition-colors font-medium flex items-center">
                      {item.label}
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                    <div className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 transition-all duration-200 ${
                      activeDropdown === item.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}>
                      {item.submenu.map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => handleNavigation(subItem)}
                          className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-school-orange hover:text-white transition-colors"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavigation(item)}
                    className="text-slate-700 hover:text-school-orange transition-colors font-medium"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            {navigationItems.map((item, index) => (
              <div key={index}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      className="flex items-center justify-between w-full text-left text-slate-700 hover:text-school-orange font-medium py-2"
                    >
                      {item.label}
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="pl-4 space-y-2 mt-2">
                        {item.submenu.map((subItem, subIndex) => (
                          <button
                            key={subIndex}
                            onClick={() => handleNavigation(subItem)}
                            className="block w-full text-left text-slate-600 hover:text-school-orange py-1"
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavigation(item)}
                    className="block w-full text-left text-slate-700 hover:text-school-orange font-medium py-2"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}