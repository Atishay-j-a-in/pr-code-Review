import { requireAuth } from "@/features/auth/actions";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { OverviewPage } from "@/features/dashboard/components/overview-page";
import { getUserInstallationId } from "@/features/github/server/installation";
import { getUsageSummary } from "@/features/billing/server/usage";
import { prisma } from "@/lib/db";

export default async function DashboardOverviewPage() {
  const session = await requireAuth();
  const installationId = await getUserInstallationId(session.user.id);

  const usage = await getUsageSummary(session.user.id);

  if (!installationId) {
    return (
      <>
        <DashboardHeader
          title="Overview"
          description="Your AI code review activity at a glance."
        />
        <div className="flex flex-1 items-center justify-center p-6">
          <p className="text-sm text-muted-foreground">
            Connect the GitHub App to see your review overview.
          </p>
        </div>
      </>
    );
  }

  const [total, reviewed, pending, failed, recentPrs] = await Promise.all([
    prisma.pullRequest.count({ where: { installationId } }),
    prisma.pullRequest.count({ where: { installationId, status: "reviewed" } }),
    prisma.pullRequest.count({ where: { installationId, status: "pending" } }),
    prisma.pullRequest.count({
      where: {
        installationId,
        status: { in: ["review-limit-reached", "failed"] },
      },
    }),
    prisma.pullRequest.findMany({
      where: { installationId },
      orderBy: { createdAt: "desc" },
      take: 10,
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
    }),
  ]);

  const serializedPrs = recentPrs.map((pr) => ({
    ...pr,
    createdAt: pr.createdAt.toISOString(),
    updatedAt: pr.updatedAt.toISOString(),
    reviewedAt: pr.reviewedAt?.toISOString() ?? null,
  }));

  return (
    <>
      <DashboardHeader
        title="Overview"
        description="Your AI code review activity at a glance."
      />
      <OverviewPage
        stats={{ total, reviewed, pending, failed }}
        recentPrs={serializedPrs}
        usage={usage}
      />
    </>
  );
}
