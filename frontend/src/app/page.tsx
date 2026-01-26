import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Stats } from "@/components/landing/stats";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import Features from "@/components/landing/features";
import { HowKnotWorks } from "@/components/blocks/features-6";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <HowKnotWorks />
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
}
