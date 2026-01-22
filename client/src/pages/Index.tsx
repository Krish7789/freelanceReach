import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Mail, CheckCircle, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
          
          <div className="container-tight relative py-24 md:py-32">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8 animate-fade-in">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Professional Outreach for Freelancers
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Find Businesses.{' '}
                <span className="text-gradient">Reach Out Professionally.</span>
              </h1>

              {/* Subheadline */}
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Discover real businesses. When emails aren’t available, we show the best possible contact method like website or phone.
</p>

              {/* CTA */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Link to="/signup">
                  <Button variant="hero" size="xl" className="group">
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="xl">
                    Log in
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28 border-t border-border">
          <div className="container-tight">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                How it works
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                Three simple steps to professional business outreach
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/30 border border-border/50 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent mb-5">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Find Businesses
                </h3>
                <p className="text-muted-foreground">
                  Search by country, city, and industry to discover businesses that match your expertise.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/30 border border-border/50 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent mb-5">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Craft Your Message
                </h3>
                <p className="text-muted-foreground">
                  Create personalized, value-focused emails that resonate with potential clients.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/30 border border-border/50 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent mb-5">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Send & Track
                </h3>
                <p className="text-muted-foreground">
                  Send emails in batches and monitor delivery status in real-time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-primary">
          <div className="container-tight text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Ready to grow your freelance business?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/70 max-w-xl mx-auto">
              Join freelancers who are connecting with businesses professionally.
            </p>
            <div className="mt-10">
              <Link to="/signup">
                <Button variant="accent" size="xl" className="group">
                  Start Free Today
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
