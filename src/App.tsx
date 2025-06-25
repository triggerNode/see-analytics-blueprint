
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TriggerNode from "./pages/TriggerNode";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import RealTime from "./pages/RealTime";
import FunnelsPage from "./pages/FunnelsPage";
import EconomyPage from "./pages/EconomyPage";
import RetentionPage from "./pages/RetentionPage";
import AbTestsPage from "./pages/AbTestsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/triggernode" element={<TriggerNode />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="realtime" element={<RealTime />} />
            <Route path="funnels" element={<FunnelsPage />} />
            <Route path="economy" element={<EconomyPage />} />
            <Route path="retention" element={<RetentionPage />} />
            <Route path="abtests" element={<AbTestsPage />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
