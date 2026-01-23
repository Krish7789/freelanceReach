import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Mail, Send, Sparkles, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

/* ---------------------- TYPES ---------------------- */
type SelectedBusiness = {
  name: string;
  category: string;
  website: string;
  email: string;
};

/* ---------------------- COMPONENT ---------------------- */
const SendEmails = () => {
  const navigate = useNavigate();

  const [toEmail, setToEmail] = useState("");
  const [gmailConnected, setGmailConnected] = useState(false);

  const [business, setBusiness] = useState<SelectedBusiness | null>(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    api
      .get(`/gmail/status/${userId}`)
      .then((res) => {
        setGmailConnected(Boolean(res.data.connected));
      })
      .catch(() => {
        setGmailConnected(false);
      });
  }, []);

  useEffect(() => {
  if (!localStorage.getItem("token")) {
    navigate("/login");
  }
}, []);


  /* ---------------- LOAD SELECTED BUSINESS ---------------- */
  useEffect(() => {
    const stored = localStorage.getItem("selectedBusinesses");
    if (!stored) return;

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length === 0) return;

    const b = parsed[0];
    setBusiness(b);
    setToEmail(b.email);

    // Default editable draft
    setSubject(`Regarding collaboration with ${b.name}`);
    setBody(
      `Hi ${b.name},

I hope you’re doing well.

I came across your business and wanted to reach out to explore a potential collaboration.

Best regards,
`,
    );
  }, []);

  const connectGmail = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please login first");
      return;
    }

    window.location.href = `https://freelancereach.onrender.com/auth/google?state=${userId}`;
  };

  const disconnectGmail = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      await api.post("/gmail/disconnect", { userId });

      toast.success("Gmail disconnected. Please reconnect.");

      // 🔥 THIS LINE FIXES YOUR ISSUE
      setGmailConnected(false);
    } catch {
      toast.error("Failed to disconnect Gmail");
    }
  };

  /* ---------------- GENERATE EMAIL (AI) ---------------- */
  const generateEmailWithAI = async () => {
    if (!business) return;

    const profileRaw = localStorage.getItem("profile");

    try {
      setIsGenerating(true);

      const res = await api.post("/emails/generate", {
        business,

        sender: {
          name: localStorage.getItem("userName"),
          role: "Software Developer",
        },
        intent:
          "Introduce myself as a software developer and propose collaboration to improve their website or IT services. Suggest a call.",
      });

      setSubject(res.data.subject);
      setBody(res.data.body);

      toast.success("AI-generated email ready");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to generate email with AI",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  /* ---------------- SEND EMAIL ---------------- */
  const sendEmail = async () => {
    // 🚫 Prevent double execution
    if (isSending) return;

    if (!business) return;

    if (!subject || !body) {
      toast.error("Subject and body are required");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const normalizedBody = body
      .replace(/\r\n/g, "\n") // normalize Windows line endings
      .replace(/\n{3,}/g, "\n\n") // max 1 empty line
      .trim();
    const finalBody = `
Hi ${business.name},

${normalizedBody}

Best regards,
Krish Kumar
Software Developer
`.trim();

    try {
      setIsSending(true);

      await api.post("/gmail/send", {
        userId,
        to: toEmail,
        subject,
        body: normalizedBody,
      });

      toast.success("Email sent successfully");
      navigate("/send-emails");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Email sending failed");
    } finally {
      setIsSending(false);
    }
  };

  /* ---------------- EMPTY STATE ---------------- */
  if (!business) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No business selected</h2>
            <Button onClick={() => navigate("/find-businesses")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Find Businesses
            </Button>
          </div>
        </main>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <Card>
            <CardHeader>
              {gmailConnected ? (
                <Button variant="outline" onClick={disconnectGmail}>
                  Disconnect Gmail
                </Button>
              ) : (
                <Button variant="outline" onClick={connectGmail}>
                  Connect Gmail
                </Button>
              )}

              <CardTitle>Send Email</CardTitle>
              <CardDescription>
                Outreach to <b>{business.name}</b>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* TO */}
              <Input
                placeholder="Recipient email"
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
              />

              {/* SUBJECT */}
              <Input
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              {/* AI GENERATE BUTTON */}
              <Button
                variant="outline"
                onClick={generateEmailWithAI}
                disabled={isGenerating}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate Email with AI"}
              </Button>

              {/* BODY */}
              <Textarea
                rows={12}
                placeholder="Email body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />

              {/* SEND */}
              <div className="flex justify-end">
                <Button
                  onClick={sendEmail}
                  disabled={isSending}
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  {isSending ? "Sending..." : "Send Email"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SendEmails;
