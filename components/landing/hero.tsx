"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { MagneticButton } from "./magnetic-button";
import { ScrollReveal } from "./scroll-reveal";
import { CodeBlockAnimation } from "./code-block-animation";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/[0.03]" />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="flex flex-col gap-8">
            {/* Badge */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-4 py-1.5 w-fit">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                  AI-Powered Reviews
                </span>
              </div>
            </ScrollReveal>

            {/* Heading */}
            <ScrollReveal direction="up" delay={0.2}>
              <h1 className="text-4xl md:text-[3.5rem] font-heading font-semibold tracking-tighter leading-[1.05] text-foreground">
                Your AI Code Reviewer{" "}
                <span className="text-muted-foreground">
                  on Every Pull Request
                </span>
              </h1>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal direction="up" delay={0.35}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-[50ch]">
                GraphPR indexes your entire codebase, then uses AI to review
                every PR with full context. Not just diffs — it understands
                your architecture.
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <MagneticButton strength={0.15}>
                  <Link
                    href="/sign-in"
                    className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-medium text-sm hover:opacity-90 transition-all active:scale-[0.98]"
                  >
                    Install on GitHub
                    <ArrowRight
                      weight="bold"
                      className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </MagneticButton>

                <MagneticButton strength={0.15}>
                  <a
                    href="#how-it-works"
                    className="group inline-flex items-center gap-2 border border-border bg-background px-7 py-3.5 rounded-full font-medium text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all active:scale-[0.98]"
                  >
                    <MagnifyingGlass className="w-4 h-4" />
                    See How It Works
                  </a>
                </MagneticButton>
              </div>
            </ScrollReveal>

            {/* Trust line */}
            <ScrollReveal direction="up" delay={0.6}>
              <p className="text-xs text-muted-foreground/60 mt-2">
                Free for open source repos. No credit card required.
              </p>
            </ScrollReveal>
          </div>

          {/* Right: Animated code block */}
          <ScrollReveal direction="right" delay={0.4} className="relative">
            <div className="relative">
              {/* Glow behind */}
              <div className="absolute -inset-4 bg-primary/[0.04] rounded-3xl blur-2xl" />
              <div className="relative">
                <CodeBlockAnimation />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
