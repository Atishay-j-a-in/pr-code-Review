"use client";

import { GitPullRequest, CheckCircle, Clock, Warning } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type StatItem = {
  label: string;
  value: number;
  icon: React.ElementType;
  tone: "info" | "success" | "warning" | "danger";
};

const toneStyles = {
  info: "border-sky-500/15 bg-sky-500/[0.06] text-sky-400",
  success:
    "border-emerald-500/15 bg-emerald-500/[0.06] text-emerald-400",
  warning:
    "border-amber-500/15 bg-amber-500/[0.06] text-amber-400",
  danger: "border-red-500/15 bg-red-500/[0.06] text-red-400",
} as const;

type OverviewStatsProps = {
  total: number;
  reviewed: number;
  pending: number;
  failed: number;
};

export function OverviewStats({
  total,
  reviewed,
  pending,
  failed,
}: OverviewStatsProps) {
  const stats: StatItem[] = [
    { label: "Total PRs", value: total, icon: GitPullRequest, tone: "info" },
    { label: "Reviewed", value: reviewed, icon: CheckCircle, tone: "success" },
    { label: "Pending", value: pending, icon: Clock, tone: "warning" },
    { label: "Failed", value: failed, icon: Warning, tone: "danger" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={cn(
              "flex items-center gap-4 rounded-2xl border p-5 transition-colors",
              toneStyles[stat.tone]
            )}
          >
            <div className="flex-shrink-0">
              <Icon className="size-5" weight="duotone" />
            </div>
            <div>
              <p className="text-2xl font-semibold tracking-tight font-mono">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
