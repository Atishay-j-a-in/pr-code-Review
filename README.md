# GraphPR

AI-powered code review for every pull request. GraphPR indexes your codebase, watches for new PRs via GitHub webhooks, and posts AI-generated reviews directly on the PR — with full architectural context, not just blind diffs.

## How It Works

```
Developer opens PR
       |
       v
GitHub Webhook  -->  /api/github/webhook
       |
       v
Inngest Event  -->  reviewPullRequest function
       |
       +--> Fetch PR file diffs from GitHub API
       +--> Chunk diffs and store in Pinecone vector DB
       +--> Search repo-sync namespace for codebase context
       +--> Generate review via OpenRouter AI
       +--> Post review comment on the GitHub PR
       +--> Save review to database
```

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components)
- **Auth:** better-auth with GitHub OAuth
- **Database:** PostgreSQL via Prisma 7.8
- **Vector DB:** Pinecone (codebase indexing + PR context search)
- **AI:** OpenRouter (flexible model selection)
- **Async Jobs:** Inngest (webhook -> review pipeline)
- **Billing:** Razorpay (free/pro tiers)
- **UI:** shadcn/ui, Tailwind CSS v4, Phosphor Icons

## Project Structure

```
app/
  (auth)/                  # Unauthenticated routes (sign-in)
  (protectected)/          # Authenticated routes (dashboard)
    dashboard/
      page.tsx             # Overview — stats, recent reviews
      repos/page.tsx       # Repository list with sync status
      pull-request/page.tsx # All pull requests with filters
      github/page.tsx      # GitHub App install/disconnect
      settings/page.tsx    # Profile and subscription management
  api/
    auth/[...all]/         # better-auth catch-all
    github/
      webhook/             # PR webhook receiver
      callback/            # GitHub App install callback
      repos/               # Paginated repo list endpoint
    inngest/               # Inngest serve endpoint

features/
  ai/                      # OpenRouter client setup
  auth/                    # Auth actions, guards, user menu
  billing/                 # Razorpay subscription, usage limits
  dashboard/               # Shell, sidebar, nav, types, status styles
  github/                  # Installation management, repo fetching
  inngest/                 # Inngest client + functions
  pinecone/                # Pinecone client singleton
  repo-sync/               # Full codebase indexing pipeline
  reviews/                 # PR review generation + posting
  settings/                # User settings server logic
```

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd pr-code-reviewer
pnpm install
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL=postgres

# Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

# GitHub OAuth (from GitHub settings > Developer settings > OAuth Apps)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# GitHub App (from GitHub settings > Developer settings > GitHub Apps)
GITHUB_APP_ID=
GITHUB_APP_NAME=
GITHUB_APP_PRIVATE_KEY=
GITHUB_WEBHOOK_SECRET=
NEXT_PUBLIC_GITHUB_PUBLIC_LINK=

# AI
OPENROUTER_API_KEY=

# Vector DB
PINECONE_API=
PINECONE_INDEX=

# Billing (optional)
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_PLAN_ID=
RAZORPAY_WEBHOOK_SECRET=

# Inngest
INNGEST_DEV=1
```

### 3. Set up the database

```bash
pnpm db:generate
pnpm db:migrate
```

### 4. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Set up ngrok (for GitHub webhooks)

GitHub webhooks need a public URL. Use ngrok during development:

```bash
ngrok http 3000
```

Update `BETTER_AUTH_URL` and add the ngrok URL to `next.config.ts` under `allowedDevOrigins`.

## Database Schema

- **User** — GitHub OAuth profile, plan, subscription status
- **Session / Account / Verification** — better-auth internals
- **GithubInstallation** — Links users to their GitHub App installation
- **PullRequest** — Stores every PR received via webhook (status, review, timestamps)
- **RepoSync** — Tracks which repos have been indexed into Pinecone

## Key Features

- **Automatic PR Reviews** — Every PR on connected repos gets an AI review instantly
- **Full Codebase Context** — Sync your repo into Pinecone for reviews that understand your architecture
- **Review Dashboard** — Filter and search all pull requests by status, author, or repo
- **Usage Tracking** — Free tier (5 reviews/month) with Pro upgrade via Razorpay
- **GitHub App** — One-click install, zero config, works on any repo

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm lint` | Run ESLint |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:migrate` | Run database migrations |
