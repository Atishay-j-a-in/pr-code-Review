"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const diffLines = [
  { type: "context", code: "  async function reviewPR(prId: string) {" },
  { type: "context", code: "    const pr = await fetchPR(prId);" },
  { type: "deletion", code: "    const files = pr.files;" },
  { type: "addition", code: "    const files = await fetchPRFiles(prId);" },
  { type: "addition", code: "    const context = await indexCodebase(pr.repoId);" },
  { type: "context", code: "" },
  { type: "deletion", code: "    const review = await ai.review(files);" },
  { type: "addition", code: "    const review = await ai.review(files, {" },
  { type: "addition", code: "      context," },
  { type: "addition", code: "      rules: repo.reviewRules," },
  { type: "addition", code: "    });" },
  { type: "context", code: "    await postReview(prId, review);" },
  { type: "context", code: "  }" },
];

const reviewComments = [
  { line: 3, text: "Good: dynamic file fetching", color: "emerald" },
  { line: 4, text: "Context improves review accuracy", color: "emerald" },
  { line: 7, text: "Added codebase context for deeper analysis", color: "sky" },
];

export function CodeBlockAnimation() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showComments, setShowComments] = useState<number[]>([]);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const runAnimation = () => {
      setVisibleLines(0);
      setShowComments([]);
      setShowCheckmark(false);

      let lineIndex = 0;
      intervalRef.current = setInterval(() => {
        lineIndex++;
        setVisibleLines(lineIndex);

        const comment = reviewComments.find((c) => c.line === lineIndex);
        if (comment) {
          setShowComments((prev) => [...prev, lineIndex]);
        }

        if (lineIndex >= diffLines.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => setShowCheckmark(true), 400);
          setTimeout(runAnimation, 3000);
        }
      }, 180);
    };

    const timeout = setTimeout(runAnimation, 1000);
    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="relative w-full max-w-lg">
      {/* Window chrome */}
      <div className="rounded-t-xl bg-[#161618] border border-b-0 border-white/[0.06] px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-white/[0.08]" />
          <div className="w-3 h-3 rounded-full bg-white/[0.08]" />
          <div className="w-3 h-3 rounded-full bg-white/[0.08]" />
        </div>
        <span className="ml-2 text-xs text-muted-foreground/60 font-mono">
          review-pr.ts
        </span>
      </div>

      {/* Code area */}
      <div className="rounded-b-xl bg-[#0e0e10] border border-white/[0.06] p-4 font-mono text-[13px] leading-6 overflow-hidden min-h-[320px]">
        {diffLines.map((line, i) => {
          const isVisible = i < visibleLines;
          const prefix =
            line.type === "addition"
              ? "+"
              : line.type === "deletion"
                ? "-"
                : " ";
          const lineColor =
            line.type === "addition"
              ? "text-emerald-400"
              : line.type === "deletion"
                ? "text-red-400"
                : "text-white/30";
          const bgColor =
            line.type === "addition"
              ? "bg-emerald-500/[0.06]"
              : line.type === "deletion"
                ? "bg-red-500/[0.06]"
                : "";

          return (
            <div key={i} className="relative">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={
                  isVisible
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -10 }
                }
                transition={{ duration: 0.2 }}
                className={`flex ${bgColor} -mx-4 px-4`}
              >
                <span className="w-6 text-white/15 select-none text-right mr-3">
                  {prefix}
                </span>
                <span className={lineColor}>
                  {line.code || "\u00A0"}
                </span>
              </motion.div>

              {/* Review comment badges */}
              <AnimatePresence>
                {showComments.includes(i) && (
                  <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="absolute right-0 top-0 translate-x-full ml-3"
                  >
                    <div className="bg-emerald-500/[0.08] border border-emerald-500/20 rounded-lg px-3 py-1.5 text-[11px] text-emerald-400 whitespace-nowrap font-sans">
                      {
                        reviewComments.find((c) => c.line === i)
                          ?.text
                      }
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Review posted checkmark */}
        <AnimatePresence>
          {showCheckmark && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 12,
              }}
              className="mt-4 flex items-center gap-2 text-emerald-400"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sm font-sans font-medium">
                Review posted on PR
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
