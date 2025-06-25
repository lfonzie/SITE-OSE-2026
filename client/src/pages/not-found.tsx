import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { updateSEO } from "@/lib/seo";

export default function NotFound() {
  useEffect(() => {
    updateSEO({
      title: "Página não encontrada - Colégio OSE",
      description: "A página que você procura não foi encontrada. Retorne à página inicial do Colégio OSE.",
      keywords: "erro 404, página não encontrada"
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-school-orange mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Página não encontrada
          </h1>
          <p className="text-slate-600 mb-6">
            Desculpe, não conseguimos encontrar a página que você está procurando.
          </p>
          <Link href="/">
            <Button className="bg-school-orange hover:bg-school-orange/90 text-white">
              <Home className="mr-2 h-4 w-4" />
              Voltar ao início
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
