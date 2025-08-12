import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuoteProvider } from "@/contexts/QuoteContext";
// Public pages
import Index from "./pages/Index"
import Products from "./pages/Products"
import Services from "./pages/Services"
import About from "./pages/About"
import Contact from "./pages/Contact"
import QuoteRequest from "./pages/QuoteRequest"
import Terms from "./pages/Terms"
import NotFound from "./pages/NotFound"


// Admin pages
import AdminLogin from "./pages/admin/Login"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminProducts from "./pages/admin/Products"
import AdminQuotes from "./pages/admin/Quotes"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <QuoteProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote-request" element={<QuoteRequest />} />
          <Route path="/terms" element={<Terms />} />

          {/* Admin Routes */}
          <Route path="/admin-portal/login" element={<AdminLogin />} />
          <Route path="/admin-portal" element={<AdminDashboard />} />
          <Route path="/admin-portal/products" element={<AdminProducts />} />
          <Route path="/admin-portal/products/new" element={<AdminProducts />} />
          <Route path="/admin-portal/products/:id/edit" element={<AdminProducts />} />
          <Route path="/admin-portal/quotes" element={<AdminQuotes />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </QuoteProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
