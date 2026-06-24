"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";
import {
  Database,
  Plugs,
  Brain,
  ChartBar,
} from "@phosphor-icons/react/dist/ssr";

const features = [
  {
    icon: Database,
    title: "Full Codebase Context",
    description:
      "Syncs your entire repository into a vector database. Reviews are not blind diffs — they understand your architecture, patterns, and conventions.",
    size: "large" as const,
    color: "text-sky-400",
    bgColor: "bg-sky-500/10",
  },
  {
    icon: Plugs,
    title: "One-Click Install",
    description:
      "Install the GitHub App on any repo. Every PR gets reviewed automatically. Zero config, zero YAML files.",
    size: "small" as const,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
  },
  {
    icon: Brain,
    title: "AI-Powered Deep Review",
    description:
      "Catches bugs, security issues, and design problems that static linters miss. Powered by OpenRouter with model flexibility.",
    size: "small" as const,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: ChartBar,
    title: "Review Dashboard",
    description:
      "Track every review across all your repositories. Search, filter, and monitor code quality trends over time. Never lose visibility.",
    size: "large" as const,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const Icon = feature.icon;
  const isLarge = feature.size === "large";

  return (
    <ScrollReveal
      delay={index * 0.12}
      direction="up"
      className={isLarge ? "md:col-span-2" : ""}
    >
      <motion.div
        whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="group relative h-full p-8 md:p-10 rounded-[2rem] bg-card border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-500"
        style={{ perspective: "800px" }}
      >
        {/* Spotlight effect on hover */}
        <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.03),transparent_40%)]" />

        <div className="relative z-10">
          <div
            className={`w-12 h-12 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6`}
          >
            <Icon className={`w-6 h-6 ${feature.color}`} weight="duotone" />
          </div>

          <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground mb-3">
            {feature.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-[15px] max-w-[48ch]">
            {feature.description}
          </p>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </ScrollReveal>
  );
}

export function Features() {
  return (
    <section className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-xs font-medium text-primary tracking-widest uppercase mb-4 block">
              Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-semibold tracking-tighter text-foreground mb-4">
              Built for How You Actually Ship
            </h2>
            <p className="text-muted-foreground text-lg max-w-[55ch] leading-relaxed">
              Everything you need to automate code reviews, without
              the complexity of configuring rules.
            </p>
          </div>
        </ScrollReveal>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
