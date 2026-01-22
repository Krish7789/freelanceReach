import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FindBusinesses from "./pages/FindBusinesses";
import SendEmails from "./pages/SendEmails";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Index from "./pages/Index";
import AppLayout from "@/components/layout/AppLayout";

const queryClient = new QueryClient();

/* 🔐 Route Guard */
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = !!localStorage.getItem("token");
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          
          {/* PUBLIC ROUTES */}
          <Route path="/index" element={<Index />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* PROTECTED ROUTES WITH LAYOUT */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* HOME */}
            <Route path="/" element={<Home />} />

            {/* APP PAGES */}
            <Route path="/find-businesses" element={<FindBusinesses />} />
            <Route path="/send-emails" element={<SendEmails />} />
          </Route>

          {/* FALLBACK */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
