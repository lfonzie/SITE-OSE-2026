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
      // Check if it's an external link
      if (item.id.startsWith('http')) {
        window.open(item.id, '_blank', 'noopener,noreferrer');
      } else {
        // Use wouter navigation for internal pages
        window.location.href = item.id;
      }
    }
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const navigationItems = [
    { label: "Início", id: "/", isSection: false },
    {
      label: "Colégio OSE",
      submenu: [
        { label: "Legado", id: "/legado", isSection: false },
        { label: "Missão e Valores", id: "/missao", isSection: false },
        { label: "Nossa Estrutura", id: "/estrutura", isSection: false },
      ]
    },
    {
      label: "Segmentos",
      submenu: [
        { label: "Infantil", id: "/infantil", isSection: false },
        { label: "Ensino Fundamental I", id: "/efi", isSection: false },
        { label: "Ensino Fundamental II", id: "/efii", isSection: false },
        { label: "Ensino Médio", id: "/em", isSection: false }
      ]
    },
    {
      label: "Acadêmico",
      submenu: [
        { label: "Global Citizens - Bilíngue", id: "/bilingue", isSection: false },
        { label: "Integral Flex", id: "/integralflex", isSection: false },
        { label: "Amplia", id: "/amplia", isSection: false },
        { label: "{CODE.OSE}", id: "/code", isSection: false },
        { label: "SócioEmocional", id: "/socioemocional", isSection: false },
        { label: "Lista de Material", id: "/lista-material", isSection: false }
      ]
    },
    {
      label: "Serviços",
      submenu: [
        { label: "Árvore (Livros Digitais)", id: "/arvore", isSection: false },
        { label: "Portal do Aluno", id: "https://siga03.activesoft.com.br/login/?instituicao=COLEGIOOSE", isSection: false },
        { label: "ISAAC (Financeiro)", id: "/isaac", isSection: false },
        { label: "Plurall", id: "/plurall", isSection: false },
        { label: "AgendaEdu", id: "/agendaedu", isSection: false }
      ]
    }
  ];

  return (
    <nav className="bg-white/40 backdrop-blur-xl border-b border-white/30 shadow-xl fixed top-0 left-0 right-0 z-50 supports-[backdrop-filter]:bg-white/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/">
              <img 
                src="/images/LogoOSE100anos.png" 
                alt="a OSE - 100 Anos" 
                className="h-24 w-auto"
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
                    <button className="text-slate-800 hover:text-school-orange transition-colors font-medium flex items-center font-body drop-shadow-sm">
                      {item.label}
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                    <div className={`absolute top-full left-0 mt-2 w-56 bg-white/50 backdrop-blur-xl rounded-lg shadow-xl border border-white/40 py-2 z-50 transition-all duration-200 ${
                      activeDropdown === item.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}>
                      {item.submenu.map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => handleNavigation(subItem)}
                          className="block w-full text-left px-4 py-2 text-slate-800 hover:bg-school-orange hover:text-white transition-colors font-body drop-shadow-sm"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavigation(item)}
                    className="text-slate-800 hover:text-school-orange transition-colors font-medium font-body drop-shadow-sm"
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
        <div className="lg:hidden bg-white/50 backdrop-blur-xl border-t border-white/40 shadow-lg">
          <div className="px-4 py-3 space-y-3">
            {navigationItems.map((item, index) => (
              <div key={index}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      className="flex items-center justify-between w-full text-left text-slate-800 hover:text-school-orange font-medium py-2 drop-shadow-sm"
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
                            className="block w-full text-left text-slate-700 hover:text-school-orange py-1 drop-shadow-sm"
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
                    className="block w-full text-left text-slate-800 hover:text-school-orange font-medium py-2 drop-shadow-sm"
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