import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import FindBusinesses from "./pages/FindBusinesses";
import SendEmails from "./pages/SendEmails";
import NotFound from "./pages/NotFound";

import AppLayout from "@/components/layout/AppLayout";

const queryClient = new QueryClient();

/* 🔐 AUTH GUARD */
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* 🌍 PUBLIC ROUTES */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🧠 APP LAYOUT (ROUTES MUST EXIST FIRST) */}
          <Route element={<AppLayout />}>
            {/* 🔐 PROTECTED PAGES */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/find-businesses"
              element={
                <ProtectedRoute>
                  <FindBusinesses />
                </ProtectedRoute>
              }
            />

            <Route
              path="/send-emails"
              element={
                <ProtectedRoute>
                  <SendEmails />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* ❌ FALLBACK */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
