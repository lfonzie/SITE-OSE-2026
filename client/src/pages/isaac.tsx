import { useEffect } from "react";
import UChatWidget from "@/components/uchat-widget";
import { updateSEO } from "@/lib/seo";
import Navigation from "@/components/navigation";
import WhyOSESection from "@/components/why-ose-section";
import ContactSection from "@/components/contact-section";
import { CreditCard, ExternalLink, FileText, Calculator, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Isaac() {
  useEffect(() => {
    updateSEO({
      title: "Portal ISAAC - Colégio OSE",
      description: "Acesse o portal ISAAC para gestão acadêmica e administrativa completa.",
      keywords: "isaac, portal acadêmico, gestão escolar, sistema educacional"
    });
  }, []);

  const handleAccessPortal = () => {
    window.open('https://isaac.com.br/meu-isaac', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              Portal <span className="text-school-orange">ISAAC</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Sistema integrado de gestão acadêmica e administrativa do Colégio OSE.
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800">Acesso ao Sistema</CardTitle>
              <CardDescription>
                Portal completo para gestão de informações acadêmicas e administrativas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Button 
                  onClick={handleAccessPortal}
                  className="bg-school-orange hover:bg-school-orange/90 text-white px-8 py-3"
                >
                  Acessar Portal ISAAC
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
      <UChatWidget />
    </div>
  );
}
