
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PricingPage from "./pages/Pricing";
import FeaturesPage from "./pages/Features";
import NursePricingPage from "./pages/NursePricing";
import ClientPricingPage from "./pages/ClientPricing";
import NurseFeatures from "./pages/NurseFeatures";
import ClientFeatures from "./pages/ClientFeatures";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/pricing/nurse" element={<NursePricingPage />} />
          <Route path="/pricing/client" element={<ClientPricingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/features/nurse" element={<NurseFeatures />} />
          <Route path="/features/client" element={<ClientFeatures />} />
          {/* Add more routes as needed */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
