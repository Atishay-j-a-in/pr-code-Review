"use client";

import { OverviewStats } from "./overview-stats";
import { RecentReviews } from "./recent-reviews";
import type { DashboardPullRequest } from "../lib/types";
import type { UsageSummary } from "@/features/billing/server/usage";

type OverviewPageProps = {
  stats: {
    total: number;
    reviewed: number;
    pending: number;
    failed: number;
  };
  recentPrs: DashboardPullRequest[];
  usage: UsageSummary;
};

export function OverviewPage({ stats, recentPrs, usage }: OverviewPageProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <OverviewStats
        total={stats.total}
        reviewed={stats.reviewed}
        pending={stats.pending}
        failed={stats.failed}
      />

      <div>
        <p className="text-xs text-muted-foreground mb-4">
          {usage.limit === null
            ? `${usage.used} reviews used this month (unlimited)`
            : `${usage.used} / ${usage.limit} reviews used this month`}
        </p>
      </div>

      <div>
        <h2 className="text-sm font-medium mb-3">Recent Reviews</h2>
        <RecentReviews pullRequests={recentPrs} />
      </div>
    </div>
  );
}
