import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import SchoolVolunteering from "./pages/SchoolVolunteering";
import HospitalInternships from "./pages/HospitalInternships";
import GetInvolved from "./pages/GetInvolved";
import Sponsor from "./pages/Sponsor";
import Donate from "./pages/Donate";
import Volunteer from "./pages/Volunteer";
import Children from "./pages/Children";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const queryClient = new QueryClient();

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    // global section observer for scroll-based transitions
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.classList.add("is-visible");
          else el.classList.remove("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    const sections = Array.from(document.querySelectorAll("section"));
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageWrapper>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route
              path="/programs/school-volunteering"
              element={<SchoolVolunteering />}
            />
            <Route
              path="/programs/hospital-internships"
              element={<HospitalInternships />}
            />
            <Route path="/programs/*" element={<Programs />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/get-involved/sponsor" element={<Sponsor />} />
            <Route path="/get-involved/donate" element={<Donate />} />
            <Route path="/get-involved/volunteer" element={<Volunteer />} />
            <Route path="/sponsor" element={<Sponsor />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/children" element={<Children />} />
            <Route path="/get-involved/*" element={<GetInvolved />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/samu" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
