"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { ScrollReveal } from "./scroll-reveal";
import { MagneticButton } from "./magnetic-button";

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-5xl font-heading font-semibold tracking-tighter text-foreground mb-5 leading-[1.1]">
              Stop Reviewing Code Blindly
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-[48ch] mx-auto">
              Install GraphPR on your GitHub repo. Your first AI review
              is live in under two minutes.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-col items-center gap-6">
              <MagneticButton strength={0.15}>
                <Link
                  href="/sign-in"
                  className="group relative inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium text-[15px] hover:brightness-110 transition-all active:scale-[0.98]"
                >
                  {/* Pulse ring */}
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-primary/20"
                    animate={{
                      scale: [1, 1.12],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                  Install GraphPR — Free
                  <ArrowRight
                    weight="bold"
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </MagneticButton>

              <p className="text-xs text-muted-foreground/40">
                Powered by OpenRouter{" "}
                <span className="mx-1">&middot;</span> Pinecone{" "}
                <span className="mx-1">&middot;</span> GitHub App
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
