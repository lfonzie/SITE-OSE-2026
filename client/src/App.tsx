import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { initAllTracking } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Services from "@/pages/services";
import PortalAluno from "@/pages/portal-aluno";
import PortalPais from "@/pages/portal-pais";
import NotFound from "@/pages/not-found";

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/servicos" component={Services} />
      <Route path="/portal-aluno" component={PortalAluno} />
      <Route path="/portal-pais" component={PortalPais} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize tracking when app loads
  useEffect(() => {
    initAllTracking();
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
