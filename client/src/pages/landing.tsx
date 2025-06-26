import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { updateSEO } from "@/lib/seo";
import { ExternalLink, Shield, Users, Zap } from "lucide-react";

export default function Landing() {
  useEffect(() => {
    updateSEO({
      title: "Admin OSE - Sistema de Gerenciamento",
      description: "Acesse o sistema administrativo do Colégio OSE com segurança via Replit Auth.",
      keywords: "admin ose, sistema administrativo, colégio ose, replit auth"
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-school-orange via-school-brown to-orange-900">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-school-orange rounded-full flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2 font-headline">
                Admin OSE
              </h1>
              <p className="text-slate-600 font-body">
                Sistema de gerenciamento do Colégio OSE
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center text-slate-700">
                <Shield className="w-5 h-5 mr-3 text-school-orange" />
                <span className="font-body">Autenticação segura via Replit</span>
              </div>
              <div className="flex items-center text-slate-700">
                <Users className="w-5 h-5 mr-3 text-school-orange" />
                <span className="font-body">Acesso administrativo completo</span>
              </div>
              <div className="flex items-center text-slate-700">
                <Zap className="w-5 h-5 mr-3 text-school-orange" />
                <span className="font-body">Interface moderna e intuitiva</span>
              </div>
            </div>

            <Button
              onClick={() => window.location.href = "/api/login"}
              className="w-full bg-school-orange hover:bg-school-orange/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Fazer Login com Replit
            </Button>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-xs text-slate-500 font-body">
                Sistema protegido por autenticação Replit Auth
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}