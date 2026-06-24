"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "./scroll-reveal";
import {
  GitPullRequest,
  Database,
  Brain,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";

const steps = [
  {
    icon: GitPullRequest,
    title: "PR Opened",
    description:
      "Developer opens a pull request on GitHub. GraphPR picks it up instantly via webhook.",
    color: "text-sky-400",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/20",
  },
  {
    icon: Database,
    title: "Code Indexed",
    description:
      "Your codebase is chunked and embedded into Pinecone. Reviews have full architectural context.",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
  },
  {
    icon: Brain,
    title: "AI Reviews",
    description:
      "OpenRouter-powered analysis compares the diff against your entire codebase for deep, accurate feedback.",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  {
    icon: CheckCircle,
    title: "Review Posted",
    description:
      "A detailed, line-by-line review is posted directly on the PR. Your team sees it immediately.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
];

function FlowLine() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="absolute left-6 top-0 bottom-0 w-px">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-transparent origin-top"
      />
    </div>
  );
}

export function AnimatedFlow() {
  return (
    <section id="how-it-works" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-xs font-medium text-primary tracking-widest uppercase mb-4 block">
              How It Works
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-semibold tracking-tighter text-foreground mb-4">
              From PR to Review in Seconds
            </h2>
            <p className="text-muted-foreground text-lg max-w-[55ch] mx-auto leading-relaxed">
              Four steps. Zero manual review. Every pull request gets
              AI-powered feedback with full codebase understanding.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          <FlowLine />

          <div className="flex flex-col gap-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.15} direction="up">
                  <div className="flex gap-6 items-start group">
                    {/* Icon node */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-2xl ${step.bgColor} border ${step.borderColor} flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 ${step.color}`} weight="duotone" />
                    </motion.div>

                    {/* Content */}
                    <div className="pt-1">
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-1.5 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-[15px] max-w-[45ch]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
