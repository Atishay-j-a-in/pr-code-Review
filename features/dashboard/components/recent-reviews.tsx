"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { statusBadge } from "../lib/status-style";
import type { DashboardPullRequest } from "../lib/types";
import { DASHBOARD_ROUTES } from "../lib/routes";

function getStatusTone(
  status: string
): "success" | "warning" | "info" | "danger" | "neutral" {
  switch (status) {
    case "reviewed":
      return "success";
    case "processing":
      return "info";
    case "pending":
      return "warning";
    case "review-limit-reached":
    case "failed":
      return "danger";
    default:
      return "neutral";
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "reviewed":
      return "Reviewed";
    case "processing":
      return "Processing";
    case "pending":
      return "Pending";
    case "review-limit-reached":
      return "Limit Reached";
    default:
      return status;
  }
}

type RecentReviewsProps = {
  pullRequests: DashboardPullRequest[];
};

export function RecentReviews({ pullRequests }: RecentReviewsProps) {
  if (pullRequests.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-white/[0.06] bg-card p-12">
        <p className="text-sm text-muted-foreground">
          No pull requests reviewed yet. Install the GitHub App and open a PR to
          get started.
        </p>
        <Button
          nativeButton={false}
          render={<Link href={DASHBOARD_ROUTES.github} />}
        >
          Go to GitHub App
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-white/[0.06] hover:bg-transparent">
            <TableHead>Pull Request</TableHead>
            <TableHead>Repository</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="text-right">Reviewed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pullRequests.map((pr) => (
            <TableRow key={pr.id} className="border-white/[0.04]">
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">
                    #{pr.prNumber} {pr.title}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {pr.headSha.slice(0, 7)}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {pr.repoFullName}
              </TableCell>
              <TableCell>
                <span className={statusBadge(getStatusTone(pr.status))}>
                  {getStatusLabel(pr.status)}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {pr.authorLogin ?? "—"}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {pr.reviewedAt
                  ? formatDistanceToNow(new Date(pr.reviewedAt), {
                      addSuffix: true,
                    })
                  : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
