import { useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const handleNavigation = (item: { id: string; isSection: boolean }) => {
    if (item.isSection) {
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = item.id;
    }
    setMobileMenuOpen(false);
  };

  const navigationItems = [
    { label: "Início", id: "inicio", isSection: true },
    { label: "Sobre", id: "sobre", isSection: true },
    { label: "Programas", id: "programas", isSection: true },
    { label: "Professores", id: "professores", isSection: true },
    { label: "Notícias", id: "noticias", isSection: true },
    { label: "Serviços", id: "/servicos", isSection: false },
    { label: "Contato", id: "contato", isSection: true },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <div className="bg-school-blue text-white p-3 rounded-lg">
              <GraduationCap className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-school-blue">Colégio OSE</h1>
              <p className="text-sm text-slate-600">Excelência em Educação</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className="text-slate-700 hover:text-school-blue transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={() => window.location.href = '/portal-aluno'}
              className="bg-school-green hover:bg-school-green/90 text-white"
            >
              Portal do Aluno
            </Button>
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
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className="block w-full text-left text-slate-700 hover:text-school-blue font-medium py-2"
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={() => window.location.href = '/portal-aluno'}
              className="w-full bg-school-green hover:bg-school-green/90 text-white"
            >
              Portal do Aluno
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
