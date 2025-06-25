import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (item: { id: string; isSection: boolean }) => {
    if (item.isSection) {
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      if (item.id.startsWith('http')) {
        window.open(item.id, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = item.id;
      }
    }
    setMobileMenuOpen(false);
  };

  const navigationItems = [
    { label: "Início", id: "/", isSection: false },
    { label: "Sobre", id: "sobre", isSection: true },
    { label: "Programas", id: "programas", isSection: true },
    { label: "Contato", id: "contato", isSection: true }
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
              <button
                key={index}
                onClick={() => handleNavigation(item)}
                className="text-slate-700 hover:text-school-orange font-medium"
              >
                {item.label}
              </button>
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
              <button
                key={index}
                onClick={() => handleNavigation(item)}
                className="block w-full text-left text-slate-700 hover:text-school-orange font-medium py-2"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}