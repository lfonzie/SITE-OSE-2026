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
    // Create a sample homepage structure for the existing site
    const homepageStructure = {
      id: "home_template",
      name: "Página Inicial - Colégio OSE",
      slug: "home",
      components: [
        {
          id: "hero_section",
          type: "section",
          content: { 
            title: "Colégio OSE - 100 Anos de Tradição" 
          },
          styles: {
            backgroundColor: "#ff7f00",
            color: "white",
            padding: "80px 20px",
            textAlign: "center"
          },
          position: { x: 0, y: 0, width: 100, height: 400 }
        },
        {
          id: "hero_text",
          type: "text",
          content: { 
            text: "<h1>Formando cidadãos críticos há 100 anos</h1><p>Educação de qualidade desde 1924</p>" 
          },
          styles: {
            fontSize: "24px",
            textAlign: "center",
            color: "white"
          },
          position: { x: 0, y: 100, width: 100, height: 200 }
        },
        {
          id: "cta_button",
          type: "button",
          content: { 
            text: "Conheça Nossos Programas",
            link: "#programas",
            target: "_self"
          },
          styles: {
            backgroundColor: "#8b4513",
            color: "white",
            padding: "15px 30px",
            borderRadius: "8px"
          },
          position: { x: 0, y: 300, width: 100, height: 50 }
        }
      ],
      seo: {
        title: "Colégio OSE - Tradição Secular de Ensino desde 1924 | Sorocaba",
        description: "100 anos de excelência educacional em Sorocaba. Educação Infantil, Fundamental e Ensino Médio.",
        keywords: "colégio sorocaba, escola sorocaba, educação infantil"
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