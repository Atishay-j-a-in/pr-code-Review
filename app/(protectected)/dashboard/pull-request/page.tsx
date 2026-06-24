import type { Metadata } from "next";
import { requireAuth } from "@/features/auth/actions";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { PrList } from "@/features/dashboard/components/pr-list";
import { getUserInstallationId } from "@/features/github/server/installation";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Pull Requests - Dashboard",
};

export default async function DashboardPullRequestPage() {
  const session = await requireAuth();
  const installationId = await getUserInstallationId(session.user.id);

  const header = (
    <DashboardHeader
      title="Pull Requests"
      description="All pull requests that have been reviewed or are pending review."
    />
  );

  if (!installationId) {
    return (
      <>
        {header}
        <div className="flex flex-1 items-center justify-center p-6">
          <p className="text-sm text-muted-foreground">
            Connect the GitHub App first to see pull requests.
          </p>
        </div>
      </>
    );
  }

  const pullRequests = await prisma.pullRequest.findMany({
    where: { installationId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      repoFullName: true,
      prNumber: true,
      title: true,
      authorLogin: true,
      headSha: true,
      baseBranch: true,
      status: true,
      reviewComment: true,
      reviewedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const serializedPrs = pullRequests.map((pr) => ({
    ...pr,
    createdAt: pr.createdAt.toISOString(),
    updatedAt: pr.updatedAt.toISOString(),
    reviewedAt: pr.reviewedAt?.toISOString() ?? null,
  }));

  return (
    <>
      {header}
      <PrList pullRequests={serializedPrs} />
    </>
  );
}
