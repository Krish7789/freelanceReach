import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Mail, Sparkles } from "lucide-react";

const Home = () => {
  const userName = localStorage.getItem("userName");

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold mb-2">
          Welcome{userName ? `, ${userName}` : ""} 👋
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Discover businesses, find verified contact emails, and send
          personalized outreach — all from one clean workflow.
        </p>
      </div>

      {/* Primary Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="border rounded-xl p-6 hover:shadow-sm transition">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Search className="h-5 w-5 text-accent" />
            </div>
            <h3 className="text-lg font-medium">Find Businesses</h3>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Search businesses by category and location using trusted directories
            or AI-powered discovery with email filtering.
          </p>

          <Link to="/find-businesses">
            <Button variant="accent">Start Searching</Button>
          </Link>
        </div>

        <div className="border rounded-xl p-6 hover:shadow-sm transition">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-accent" />
            </div>
            <h3 className="text-lg font-medium">Send Outreach Emails</h3>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Generate and send personalized outreach emails directly from your
            connected Gmail account — no copy-paste needed.
          </p>

          <Link to="/send-emails">
            <Button variant="outline">Compose Email</Button>
          </Link>
        </div>
      </div>

      {/* Getting Started */}
      <div className="border rounded-xl p-6 bg-secondary/30">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-medium">Getting Started</h3>
        </div>

        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Complete your profile to personalize outreach</li>
          <li>Find businesses and verify email availability</li>
          <li>Use AI to generate high-quality outreach emails</li>
          <li>Send emails directly from your Gmail account</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
