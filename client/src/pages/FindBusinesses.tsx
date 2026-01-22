import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Mail } from "lucide-react";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

type AIBusiness = {
  businessName: string;
  category: string;
  website: string;
  email: string;
};

const FindBusinesses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [showDirectories, setShowDirectories] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiResults, setAiResults] = useState<AIBusiness[]>([]);

  const directories = [
    {
      name: "Hotfrog",
      getUrl: (c: string) =>
        `https://www.hotfrog.com/search/1/${encodeURIComponent(c)}`,
    },
    {
      name: "Yelp",
      getUrl: (c: string, l: string) =>
        `https://www.yelp.com/search?find_desc=${encodeURIComponent(
          c
        )}&find_loc=${encodeURIComponent(l)}`,
    },
    {
      name: "Yellow Pages",
      getUrl: (c: string, l: string) =>
        `https://www.yellowpages.com/search?search_terms=${encodeURIComponent(
          c
        )}&geo_location_terms=${encodeURIComponent(l)}`,
    },
    {
      name: "Foursquare",
      getUrl: (c: string, l: string) =>
        `https://foursquare.com/explore?mode=url&near=${encodeURIComponent(
          l
        )}&q=${encodeURIComponent(c)}`,
    },
  ];

  /* ---------------- HANDLERS ---------------- */

  const handleShowDirectories = () => {
    setShowDirectories(true);
    setAiResults([]);
  };

  const handleAISearch = async () => {
    try {
      setLoadingAI(true);
      setShowDirectories(false);
      setAiResults([]);

      const res = await api.post("/ai/businesses-with-email", {
        category,
        location,
      });

      if (!res.data?.businesses?.length) {
        toast({
          title: "No results",
          description: "No businesses with emails found",
          variant: "destructive",
        });
        return;
      }

      setAiResults(res.data.businesses);

      toast({
        title: "AI Search Complete",
        description: `Found ${res.data.count} businesses`,
      });
    } catch {
      toast({
        title: "AI Search Failed",
        description: "Could not fetch AI businesses",
        variant: "destructive",
      });
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSendEmail = (business: AIBusiness) => {
    const formattedBusiness = {
      name: business.businessName,
      category: business.category,
      website: business.website,
      email: business.email,
    };

    localStorage.setItem(
      "selectedBusinesses",
      JSON.stringify([formattedBusiness])
    );

    navigate("/send-emails");
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Find Businesses</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Discover businesses using directories or AI-powered email search.
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4 flex flex-col gap-3 sm:flex-row">
          <Input
            placeholder="Business category (e.g. Restaurant)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          
          <Input
            placeholder="City (e.g. London)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          
          <Button disabled={!category || !location} onClick={handleShowDirectories}>
            Show Directories
          </Button>
          <Button
            variant="secondary"
            disabled={!category || !location || loadingAI}
            onClick={handleAISearch}
          >
            {loadingAI ? "Searching..." : "Use AI"}
          </Button>
        </CardContent>
      </Card>
<div className="mt-8 space-y-6 text-sm text-muted-foreground">
  <div>
    <h3 className="font-medium text-foreground mb-2">How it works</h3>
    <ul className="list-disc list-inside space-y-1">
      <li>Enter a business category and city</li>
      <li>Browse trusted directories to find businesses</li>
      <li>If you are unable to find emails, use AI-powered search</li>
      <li>Select a business and send a personalized outreach email</li>
    </ul>
  </div>

  <div className="bg-muted/40 p-4 rounded-md">
    <p>
      <strong>Can’t find an email?</strong> Some directories don’t list contact
      details. Use the AI option to discover businesses with publicly available
      email addresses.
    </p>
  </div>

  <div className="text-xs">
    🔒 We only use publicly available business information. No private or
    personal emails are collected.
  </div>
</div>

      {showDirectories && (
        <div className="grid gap-4 mb-8">
          {directories.map((dir) => (
            <Card key={dir.name}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{dir.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse {category} businesses in {location}
                  </p>
                </div>
                <a
                  href={dir.getUrl(category, location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-accent"
                >
                  Visit <ExternalLink className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {aiResults.length > 0 && (
        <Card>
          <CardContent className="p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th>Business</th>
                  <th>Category</th>
                  <th>Website</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {aiResults.map((b, idx) => (
                  <tr key={idx} className="border-b">
                    <td>{b.businessName}</td>
                    <td>{b.category}</td>
                    <td>
                      <a
                        href={b.website}
                        target="_blank"
                        className="text-accent"
                      >
                        Visit
                      </a>
                    </td>
                    <td className="flex items-center gap-3">
                      {b.email}
                      <button
                        onClick={() => handleSendEmail(b)}
                        title="Send Email"
                        className="text-accent hover:opacity-80"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FindBusinesses;
