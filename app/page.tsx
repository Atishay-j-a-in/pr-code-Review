import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { AnimatedFlow } from "@/components/landing/animated-flow";
import { Features } from "@/components/landing/features";
import { CTA } from "@/components/landing/cta";
import { FloatingParticles } from "@/components/landing/floating-particles";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <FloatingParticles />
      <Navbar />
      <main>
        <Hero />
        <AnimatedFlow />
        <Features />
        <CTA />
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Built for developers who ship fast.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
