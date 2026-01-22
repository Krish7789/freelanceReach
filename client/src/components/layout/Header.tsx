import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Send, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userName = localStorage.getItem("userName") || "";
  const userInitial = userName.charAt(0).toUpperCase();

  const isLoggedIn = !!localStorage.getItem("token");

  /* ---------------- LOGO CLICK ---------------- */
  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate("/"); // Home
    } else {
      navigate("/index"); // Public landing
    }
  };

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container-wide flex h-16 items-center justify-between">
        {/* Logo */}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <Send className="h-4 w-4 text-accent-foreground" />
          </div>
          <span className="text-lg font-semibold">FreelanceReach</span>
        </div>

        {/* Desktop Nav */}
        {isLoggedIn && (
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/">
              <Button
                variant={location.pathname === "/" ? "secondary" : "ghost"}
                size="sm"
              >
                Home
              </Button>
            </Link>

            <Link to="/find-businesses">
              <Button
                variant={
                  location.pathname === "/find-businesses"
                    ? "secondary"
                    : "ghost"
                }
                size="sm"
              >
                Find Businesses
              </Button>
            </Link>

            <Link to="/send-emails">
              <Button
                variant={
                  location.pathname === "/send-emails" ? "secondary" : "ghost"
                }
                size="sm"
              >
                Send Emails
              </Button>
            </Link>
          </nav>
        )}

        {/* Desktop Actions */}
        {isLoggedIn && (
  <div className="hidden md:flex items-center gap-3">
    {/* Avatar */}
    <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-semibold">
      {userInitial || "U"}
    </div>

    {/* Logout */}
    <Button variant="ghost" size="sm" onClick={handleLogout}>
      Log out
    </Button>
  </div>
)}


        {/* Mobile Menu Button */}
        
        {isLoggedIn && (
          <button
            className="md:hidden p-2 hover:bg-secondary rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && isLoggedIn && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-wide py-4 flex flex-col gap-2">
            <div className="flex items-center gap-3 px-2 py-2">
  <div className="h-9 w-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold">
    {userInitial || "U"}
  </div>
  <span className="text-sm font-medium">
    {userName || "User"}
  </span>
</div>

            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Home
              </Button>
            </Link>

            <Link
              to="/find-businesses"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button variant="ghost" className="w-full justify-start">
                Find Businesses
              </Button>
            </Link>

            <Link to="/send-emails" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Send Emails
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              Log out
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
