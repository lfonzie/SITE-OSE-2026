import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
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
import { queryClient } from "./lib/queryClient";
import Home from "@/pages/home";
import EducacaoInfantil from "@/pages/educacao-infantil";
import Fundamental1 from "@/pages/fundamental-1";
import Fundamental2 from "@/pages/fundamental-2";
import EnsinoMedio from "@/pages/ensino-medio";
import Professores from "@/pages/professores";
import Services from "./pages/services";
import Legacy from "./pages/legacy";
import Dash from "./pages/dash";
import Admin from "./pages/admin";
import PortalAluno from "@/pages/portal-aluno";
import PortalPais from "@/pages/portal-pais";
import Bilingue from "./pages/bilingue";
import Integral from "./pages/integral";
import CodeOSE from "./pages/code-ose";
import Amplia from "@/pages/amplia";
import SocioEmocional from "@/pages/socioemocional";
import ListaMaterial from "@/pages/lista-material";
import Arvore from "./pages/arvore";
import Isaac from "@/pages/isaac";
import MissaoValores from "@/pages/missao-valores";
import Agendamento from "@/pages/agendamento";
import NotFound from "@/pages/not-found";
import CV from "@/pages/cv";

function Router() {
  useAnalytics();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/educacao-infantil" component={EducacaoInfantil} />
      <Route path="/fundamental-1" component={Fundamental1} />
      <Route path="/fundamental-2" component={Fundamental2} />
      <Route path="/ensino-medio" component={EnsinoMedio} />
      <Route path="/professores" component={Professores} />
      <Route path="/services" component={Services} />
      <Route path="/legacy" component={Legacy} />
      <Route path="/portal-aluno" component={PortalAluno} />
      <Route path="/portal-pais" component={PortalPais} />
      <Route path="/bilingue" component={Bilingue} />
      <Route path="/integral" component={Integral} />
      <Route path="/code-ose" component={CodeOSE} />
      <Route path="/amplia" component={Amplia} />
      <Route path="/socioemocional" component={SocioEmocional} />
      <Route path="/lista-material" component={ListaMaterial} />
      <Route path="/arvore" component={Arvore} />
      <Route path="/isaac" component={Isaac} />
      <Route path="/missao-valores" component={MissaoValores} />
      <Route path="/agendamento" component={Agendamento} />
      <Route path="/cv" component={CV} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    initAllTracking();
    setupFavicons();
    addSchoolSchema();
    setupCSP();
    preloadResources();
    initLazyLoading();
    snippetManager.executeSnippets();
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;