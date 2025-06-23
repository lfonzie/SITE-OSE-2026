import { useState } from "react";
import { pageBuilder } from "@/lib/drag-drop-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Upload, FileText } from "lucide-react";

export default function PageImporter() {
  const [importData, setImportData] = useState("");
  const [exportData, setExportData] = useState("");

  const handleImport = () => {
    if (importData.trim()) {
      const success = pageBuilder.importPage(importData);
      if (success) {
        alert("Página importada com sucesso!");
        setImportData("");
      } else {
        alert("Erro ao importar página. Verifique o formato do JSON.");
      }
    }
  };

  const handleExport = () => {
    const currentPage = pageBuilder.getCurrentPage();
    if (currentPage) {
      const data = pageBuilder.exportPage(currentPage.id);
      setExportData(data);
    } else {
      alert("Selecione uma página para exportar.");
    }
  };

  const handleExportHomepage = () => {
    // Create homepage structure based on authentic OSE content
    const homepageStructure = {
      id: "home_ose_template",
      name: "Página Inicial - Colégio OSE (Autêntica)",
      slug: "home",
      components: [
        {
          id: "hero_section",
          type: "section",
          content: { 
            title: "Tradição Secular de Ensino: Celebrando 100 Anos" 
          },
          styles: {
            backgroundColor: "#ff6600",
            color: "white",
            padding: "80px 20px",
            textAlign: "center"
          },
          position: { x: 0, y: 0, width: 100, height: 500 }
        },
        {
          id: "hero_subtitle",
          type: "text",
          content: { 
            text: "<h2>A OSE desenvolve-se a partir de um diferencial que poucos colégios no Brasil possuem:</h2><h3><strong>Tradição e uma rica história.</strong></h3>" 
          },
          styles: {
            fontSize: "20px",
            textAlign: "center",
            color: "white",
            margin: "20px 0"
          },
          position: { x: 0, y: 100, width: 100, height: 150 }
        },
        {
          id: "hero_description",
          type: "text",
          content: { 
            text: "<p>Educando com excelência há mais de 100 anos em Sorocaba. Com base em valores éticos e formação integral, preparamos gerações para o sucesso e a cidadania.</p>" 
          },
          styles: {
            fontSize: "18px",
            textAlign: "center",
            color: "white",
            margin: "20px 0"
          },
          position: { x: 0, y: 250, width: 100, height: 100 }
        },
        {
          id: "cta_button",
          type: "button",
          content: { 
            text: "CONHEÇA NOSSO LEGADO",
            link: "#legacy",
            target: "_self"
          },
          styles: {
            backgroundColor: "white",
            color: "#ff6600",
            padding: "15px 30px",
            borderRadius: "8px",
            fontWeight: "bold"
          },
          position: { x: 0, y: 350, width: 100, height: 60 }
        },
        {
          id: "legacy_section",
          type: "section",
          content: { 
            title: "100 Anos de Excelência Educacional" 
          },
          styles: {
            backgroundColor: "#f8f9fa",
            padding: "60px 20px",
            textAlign: "center"
          },
          position: { x: 0, y: 500, width: 100, height: 400 }
        }
      ],
      seo: {
        title: "Colégio OSE - Escola Particular em Sorocaba | Colégio OSE",
        description: "OSE: Educando com excelência há mais de 100 anos em Sorocaba. Com base em valores éticos e formação integral, preparamos gerações para o sucesso e a cidadania.",
        keywords: "colégio sorocaba, escola particular sorocaba, tradição secular ensino, OSE 100 anos"
      },
      status: "draft" as const,
      lastModified: new Date()
    };
    
    setExportData(JSON.stringify(homepageStructure, null, 2));
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center">
            <Upload size={16} className="mr-2" />
            Importar Página
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            placeholder="Cole o JSON da página aqui..."
            value={importData}
            onChange={(e) => setImportData(e.target.value)}
            rows={6}
          />
          <Button 
            onClick={handleImport}
            className="w-full"
            disabled={!importData.trim()}
          >
            Importar Página
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center">
            <Download size={16} className="mr-2" />
            Exportar Página
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex space-x-2">
            <Button 
              onClick={handleExport}
              variant="outline"
              className="flex-1"
            >
              Exportar Atual
            </Button>
            <Button 
              onClick={handleExportHomepage}
              variant="outline"
              className="flex-1"
            >
              <FileText size={16} className="mr-1" />
              Template Homepage
            </Button>
          </div>
          
          {exportData && (
            <Textarea
              value={exportData}
              readOnly
              rows={8}
              className="font-mono text-xs"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}