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
    { label: "Início", id: "/", isSection: false },
    { label: "Sobre", id: "sobre", isSection: true },
    { label: "Programas", id: "programas", isSection: true },
    { label: "Professores", id: "/professores", isSection: false },
    { label: "Contato", id: "contato", isSection: true },
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
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className="text-slate-700 hover:text-school-orange transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={() => window.location.href = '/portal-aluno'}
              className="bg-school-brown hover:bg-school-brown/90 text-white"
            >
              Portal do Aluno
            </Button>
            <Button 
              onClick={() => window.location.href = '/editor'}
              variant="outline"
              className="border-school-orange text-school-orange hover:bg-school-orange hover:text-white"
            >
              Editor
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
                className="block w-full text-left text-slate-700 hover:text-school-orange font-medium py-2"
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={() => window.location.href = '/portal-aluno'}
              className="w-full bg-school-brown hover:bg-school-brown/90 text-white mb-2"
            >
              Portal do Aluno
            </Button>
            <Button 
              onClick={() => window.location.href = '/editor'}
              variant="outline"
              className="w-full border-school-orange text-school-orange hover:bg-school-orange hover:text-white"
            >
              Editor
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}