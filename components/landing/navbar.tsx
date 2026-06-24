"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MagneticButton } from "./magnetic-button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 overflow-hidden rounded-lg">
            <Image
              src="/logo2.png"
              alt="GraphPR logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
            Graph<span className="text-primary">PR</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
          >
            Sign in
          </Link>
          <MagneticButton strength={0.2}>
            <Link
              href="/sign-in"
              className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity active:scale-[0.98]"
            >
              Get Started
            </Link>
          </MagneticButton>
        </div>
      </nav>
    </motion.header>
  );
}
