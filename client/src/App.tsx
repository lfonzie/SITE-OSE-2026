import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
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
import Services from "@/pages/services";
import Legacy from "@/pages/legacy";
import PortalAluno from "@/pages/portal-aluno";
import PortalPais from "./pages/portal-pais";
import Bilingue from "./pages/bilingue";
import Integral from "./pages/integral";
import CodeOSE from "./pages/code-ose";
import Amplia from "./pages/amplia";
import ListaMaterial from "./pages/lista-material";
import Editor from "@/pages/editor";
import NotFound from "@/pages/not-found";

function Router() {
  // Track page views when routes change
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
      <Route path="/editor" component={Editor} />
      <Route path="/bilingue" component={Bilingue} />
      <Route path="/integral" component={Integral} />
      <Route path="/code-ose" component={CodeOSE} />
      <Route path="/amplia" component={Amplia} />
      <Route path="/lista-material" component={ListaMaterial} />
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
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;