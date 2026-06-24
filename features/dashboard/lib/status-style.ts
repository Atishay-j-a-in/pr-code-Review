import { cn } from "@/lib/utils";

/** Background, border, and text colors for inline status badges. */
export const statusBadgeClass = {
  success:
    "border-emerald-500/25 bg-emerald-500/10 text-emerald-400",
  warning:
    "border-amber-500/25 bg-amber-500/10 text-amber-400",
  danger: "border-red-500/25 bg-red-500/10 text-red-400",
  info: "border-sky-500/25 bg-sky-500/10 text-sky-400",
  neutral: "border-white/[0.06] bg-white/[0.03] text-muted-foreground",
} as const;

/** Button variants for primary actions like "Install" or "Disconnect". */
export const statusButtonClass = {
  success:
    "bg-emerald-600 text-white hover:bg-emerald-500 focus-visible:ring-emerald-500/50",
  danger:
    "border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/15",
  warning:
    "border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/15",
} as const;

/**
 * Builds a complete className string for a small status badge pill.
 *
 * @param tone - Semantic color from `statusBadgeClass` keys.
 * @param className - Optional extra classes (e.g. `gap-1` when an icon is inside).
 * @returns A merged Tailwind class string ready for a `<span>`.
 */
export function statusBadge(
  tone: keyof typeof statusBadgeClass,
  className?: string
) {
  return cn(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
    statusBadgeClass[tone],
    className
  );
}
