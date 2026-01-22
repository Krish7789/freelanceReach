import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top navigation */}
      <Header />

      {/* Page content */}
      <main className="px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
