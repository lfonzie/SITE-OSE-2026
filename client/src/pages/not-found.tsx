import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  useEffect(() => {
    document.title = "Página não encontrada - a OSE";
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-school-orange" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">404</h1>
          <h2 className="text-xl font-semibold text-slate-700 mb-4">Página não encontrada</h2>
          <p className="text-slate-600 mb-6">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Link to="/">
            <Button className="bg-school-orange hover:bg-school-orange/90 text-white">
              <Home className="mr-2" size={16} />
              Voltar ao Início
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}