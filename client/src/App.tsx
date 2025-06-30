import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { initAllTracking } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import { setupFavicons } from "./lib/favicon";
import { setupCSP } from "./lib/security";
import { addSchoolSchema } from "./lib/seo";
import { preloadResources, initLazyLoading } from "./lib/performance";
import { snippetManager } from "./lib/custom-snippets";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/home";
import EducacaoInfantil from "@/pages/educacao-infantil";
import Fundamental1 from "@/pages/fundamental-1";
import Fundamental2 from "@/pages/fundamental-2";
import EnsinoMedio from "@/pages/ensino-medio";
import Professores from "@/pages/professores";
import Services from "./pages/services";
import Legacy from "./pages/legacy";
import AlbumOSE from "./pages/albumose";
import ProvaBolsas from "./pages/prova-bolsas";
import Links from "./pages/links";
import Dash from "./pages/dash";
import Admin from "./pages/admin";
import PortalAluno from "@/pages/portal-aluno";
import PortalPais from "./pages/portal-pais";
import Bilingue from "@/pages/bilingue";
import Integral from "./pages/integral";
import CodeOSE from "./pages/code-ose";
import Amplia from "@/pages/amplia";
import SocioEmocional from "@/pages/socioemocional";
import ListaMaterial from "@/pages/lista-material";
import Arvore from "./pages/arvore";
import Isaac from "@/pages/isaac";
import MissaoValores from "@/pages/missao-valores";
import NossaEstrutura from "@/pages/nossa-estrutura";
import Agendamento from "@/pages/agendamento";
import NotFound from "@/pages/not-found";
import CV from "@/pages/cv";
import { AuthProvider } from "./contexts/AuthContext";
import TestUChat from "@/pages/test-uchat";
import AgendaEdu from "@/pages/agendaedu";
import Plurall from "@/pages/plurall";
import Landing from "@/pages/landing";
import { useAuth } from "@/hooks/useAuth";
import { lazy } from "react";

function Router() {
  // Track page views when routes change
  useAnalytics();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      {/* Public routes available to all users */}
      {/* Novas rotas conforme solicitado */}
      <Route path="/legado" component={Legacy} />
      <Route path="/missao" component={MissaoValores} />
      <Route path="/estrutura" component={NossaEstrutura} />
      <Route path="/infantil" component={EducacaoInfantil} />
      <Route path="/efi" component={Fundamental1} />
      <Route path="/efii" component={Fundamental2} />
      <Route path="/em" component={EnsinoMedio} />
      <Route path="/bilingue" component={Bilingue} />
      <Route path="/code" component={CodeOSE} />
      <Route path="/integralflex" component={Integral} />
      <Route path="/amplia" component={Amplia} />

      {/* Rotas antigas mantidas para compatibilidade */}
      <Route path="/educacao-infantil" component={EducacaoInfantil} />
      <Route path="/fundamental-1" component={Fundamental1} />
      <Route path="/fundamental-2" component={Fundamental2} />
      <Route path="/ensino-medio" component={EnsinoMedio} />
      <Route path="/professores" component={Professores} />
      <Route path="/services" component={Services} />
      <Route path="/legacy" component={Legacy} />
      <Route path="/albumose" component={AlbumOSE} />
      <Route path="/prova-bolsas" component={ProvaBolsas} />
      <Route path="/links" component={Links} />
      <Route path="/portal-aluno" component={PortalAluno} />
      <Route path="/portal-pais" component={PortalPais} />
      <Route path="/integral" component={Integral} />
      <Route path="/code-ose" component={CodeOSE} />
      <Route path="/socioemocional" component={SocioEmocional} />
      <Route path="/lista-material" component={ListaMaterial} />
      <Route path="/arvore" component={Arvore} />
      <Route path="/isaac" component={Isaac} />
      <Route path="/missao-valores" component={MissaoValores} />
      <Route path="/agendamento" component={Agendamento} />
      <Route path="/dash" component={Dash} />
      <Route path="/cv" component={CV} />
      <Route path="/test-uchat" component={TestUChat} />
      <Route path="/agendaedu" component={AgendaEdu} />
      <Route path="/plurall" component={Plurall} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize all systems when app loads
  useEffect(() => {
    // Analytics and tracking
    initAllTracking();

    // SEO and metadata
    setupFavicons();
    addSchoolSchema();

    // Security
    setupCSP();

    // Performance optimizations
    preloadResources();
    initLazyLoading();

    // Custom snippets
    snippetManager.executeSnippets();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;