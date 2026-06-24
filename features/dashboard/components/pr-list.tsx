"use client";

import { useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { statusBadge } from "../lib/status-style";
import type { DashboardPullRequest } from "../lib/types";

type Filter = "all" | "reviewed" | "pending" | "processing" | "failed";

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

type PrListProps = {
  pullRequests: DashboardPullRequest[];
};

export function PrList({ pullRequests }: PrListProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const counts = useMemo(() => {
    const map: Record<Filter, number> = {
      all: pullRequests.length,
      reviewed: 0,
      pending: 0,
      processing: 0,
      failed: 0,
    };
    for (const pr of pullRequests) {
      if (pr.status === "reviewed") map.reviewed++;
      else if (pr.status === "pending") map.pending++;
      else if (pr.status === "processing") map.processing++;
      else map.failed++;
    }
    return map;
  }, [pullRequests]);

  const visiblePrs = useMemo(() => {
    const query = search.toLowerCase();
    return pullRequests.filter((pr) => {
      if (filter !== "all" && pr.status !== filter) return false;
      if (
        query &&
        !pr.title.toLowerCase().includes(query) &&
        !pr.repoFullName.toLowerCase().includes(query) &&
        !String(pr.prNumber).includes(query)
      )
        return false;
      return true;
    });
  }, [pullRequests, filter, search]);

  let rows;
  if (visiblePrs.length === 0) {
    rows = (
      <TableRow>
        <TableCell colSpan={5} className="text-center text-muted-foreground">
          No pull requests found.
        </TableCell>
      </TableRow>
    );
  } else {
    rows = visiblePrs.map((pr) => (
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
          {formatDistanceToNow(new Date(pr.createdAt), { addSuffix: true })}
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          value={filter}
          onValueChange={(value) => setFilter(value as Filter)}
        >
          <TabsList>
            <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
            <TabsTrigger value="reviewed">
              Reviewed ({counts.reviewed})
            </TabsTrigger>
            <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
            <TabsTrigger value="processing">
              Processing ({counts.processing})
            </TabsTrigger>
            <TabsTrigger value="failed">Failed ({counts.failed})</TabsTrigger>
          </TabsList>
        </Tabs>
        <Input
          placeholder="Search pull requests..."
          className="max-w-xs"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/[0.06] hover:bg-transparent">
              <TableHead>Pull Request</TableHead>
              <TableHead>Repository</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="text-right">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{rows}</TableBody>
        </Table>
      </div>
    </div>
  );
}
