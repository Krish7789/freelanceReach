import { Link } from "react-router-dom";
import { Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container-wide py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <Send className="h-4 w-4 text-accent-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">FreelanceReach</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Professional outreach for freelancers. Find businesses, send value-based emails.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-foreground">Product</h4>
              <Link to="/find-businesses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Find Businesses
              </Link>
              <Link to="/send-emails" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Send Emails
              </Link>
            
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-foreground">Account</h4>
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Log in
              </Link>
              <Link to="/signup" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FreelanceReach. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Privacy
            </span>
            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
