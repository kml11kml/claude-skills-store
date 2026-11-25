# Priced Pain Finder — Product Summaries (for the store builder)

Source of truth: each skill's `README.md` and `SKILL.md` in `~/workspace/daily-skills/`, plus a directory listing for the file lists. All dollar amounts, complaints, worked-example outputs and limits below are copied from those files. **Nothing is invented.**

**Do not add anywhere on the store:** earnings, testimonials, user counts, reviews, sales numbers, or any claim of guaranteed savings. None exist in the sources.

## Store-wide facts

- **Store:** Priced Pain Finder
- **Price:** $9 one-time per skill (all nine).
- **Payment:** USDT TRC20 direct sale only — no fake checkout, no card form.
- **Wallet (TRC20):** `TJ55nFLqS6uJ8hxE41QP4ZqEKzWJP51gez`
- **Buy flow:** customer sends USDT → sends the tx hash via Instagram DM (@agent2027boutique) → hash is verified on-chain → download link is delivered.
- **All skills:** version 0.1.0, MIT licence, stdlib-only Python, no network, no credentials. Exception: MCP Setup Kit's servers need Node.js 18+ with `npx` (its scripts are stdlib-only Python).
- **Rate freshness:** rates inside the skills are snapshots read in November 2026 (GitHub 2026-11-12; Copilot/Vercel/Notion November 2026; Cursor, Supabase, Cloudflare, Figma, MCP gateway prices November 2026). Keep each product's "verify rates before relying on them" wording.
- **Known source gap:** the READMEs still say "Buy the skill here on Gumroad" in their Quick start sections — Cursor Bill Guard and Cloudflare Bill Guard (the Supabase, Figma and MCP READMEs have no Gumroad line). The store overrides that with the USDT flow above. The README text was not changed; render the store's USDT flow, not the Gumroad line.
- **Known source gap (2026-11-25 batch):** MCP Setup Kit's complaint evidence is second-hand via independent review sites documenting the repricing criticism — no verbatim Reddit user quote of the form "I pay $X for MCP and still…" was found, and the kit does not claim otherwise.
- **Known source gap:** Copilot Credit Guard and Vercel Bill Guard have no explicit "Files" table in their READMEs. Their "What's inside" lists were built from the actual files on disk (verified by directory listing) plus the README/SKILL.md descriptions.
- **Known source gap:** Notion Exit Kit's README has no Gumroad badge / version badge, unlike the other three. No version badge was invented for it.

---

## 1. Actions Cost Cutter — `actions-cost-cutter` — cost-guard — $9

**Tagline:** Cut your GitHub Actions bill before you pay it.

**The problem:** A developer posted a year of GitHub Actions metered usage climbing from $0.04/month in January to $109.68 in November 2026 and asked, "What's the solution for this? Github Actions really getting expensive." The rate behind it: a macOS minute costs $0.062 — 10.3x a Linux minute at $0.006 — and 5,000 macOS minutes a month is $310. A GitHub Team plan's $18 of included compute covers 3,000 Linux minutes but only about 290 macOS minutes.

**What it does:**

- Prices a month of runner minutes at GitHub's published rates (read 2026-11-12) and applies the plan allowance ($12 Free, $18 Pro/Team, $300 Enterprise Cloud) to show the real overage — the actual bill.
- Audits `.github/workflows/*.yml` for 10 waste patterns: macOS runners, missing path filters, no concurrency cancel, no dependency cache, full clones, no timeout, 90-day artifact retention, sub-hourly cron schedules, macOS matrix legs, Windows runners.
- Applies fixes in saving order: split macOS jobs to Linux, slow down schedules, add path filters and concurrency, add caching, cap timeouts and retention.
- Re-prices the new minute mix and reports before vs after in dollars.

**What's inside:**

- `SKILL.md` — the skill itself: rates table, the 4-step workflow, the 10 audit rules, the fix order.
- `skill.yaml` — skill metadata (name, version 0.1.0, description).
- `scripts/actions_cost.py` — stdlib-only Python. `estimate` prices a month; `audit` scans workflows. No network, no credentials.
- `LICENSE` — MIT.

**Worked example (real output):** A build job running 25 minutes on `macos-latest`, 40 runs a month — 1,000 macOS minutes on a Team plan. Before: gross $62.00, overage (your bill) $44.00. The audit found 18 findings (3 high, 8 medium, 7 low), led by the macOS runner and a cron firing every 30 minutes (1,440 runs a month). After the fix — lint and tests moved to Linux, only the Apple-platform build kept on macOS (800 Linux + 200 macOS minutes): gross $17.20, overage $0.00. That is $44.80 a month of gross spend removed and the whole overage gone — from one workflow split. Your repo's numbers will differ; the skill prices yours, not this example's.

**Honest limits:**

- The estimator prices minutes you give it. It cannot read GitHub billing and cannot see your real invoice.
- Rates are GitHub's published rates read 2026-11-12. GitHub changes them; verify before relying on them.
- Public repositories are free on standard runners — this skill is for private repositories and larger runners.
- Self-hosted runners carry no GitHub per-minute charge, but the machines themselves still cost money; the skill does not price that side.
- The skill cuts a CI bill. It does not guarantee any saving and it never changes billing settings or spends money.
- No earnings are promised. The $44.00 example is the output of the included script on the stated minute counts, not a promise for your repo.

**Buy note:** $9 one-time, USDT TRC20 direct sale. Send $9 USDT to `TJ55nFLqS6uJ8hxE41QP4ZqEKzWJP51gez`, DM the tx hash to @agent2027boutique on Instagram, the hash is verified on-chain, then the download link is delivered.


---

## 2. Copilot Credit Guard — `copilot-credit-guard` — cost-guard — $9

**Tagline:** Stop burning your GitHub Copilot allowance.

**The problem:** On 1 June 2026 GitHub Copilot stopped being flat-rate. Pro still costs $10/month — but that $10 now buys 1,500 AI Credits, not unlimited premium requests. One team's historical $500.35 month recalculated to an estimated $5,290.92 under token metering, and a single 20-minute session burned 16% of a whole month's allowance. A single agentic coding session was estimated at $30–$40 in credits — three to four times a Pro subscriber's entire monthly allotment.

**What it does:**

- Estimates before you start — price one interaction or a whole multi-turn session in credits and dollars, with its share of your monthly allowance.
- Picks the model by the job — Haiku for routine edits, Sonnet for bug fixes, Opus only when the cheaper model fails, with the per-turn credit cost of each.
- Tracks the burn — a local ledger records every session; `status` shows month-to-date spend, remaining credits, daily pace, and the projected run-out date.
- Answers the upgrade question — Pro vs Pro+ vs Max for your actual monthly need, including the 4,400-credit breakeven where Pro+ finally wins.
- Uses what stays free — code completions and Next Edit Suggestions are unlimited and never billed; the skill steers routine work toward them.

**What's inside:**

- `SKILL.md` — the full skill: billing rules, estimate-first workflow, model-by-job table, burn tracking, plan comparison.
- `scripts/copilot_credit_guard.py` — stdlib-only Python: `estimate`, `session`, `record`, `status`, `plan` commands. Local ledger, no network, no credentials.
- `skill.yaml` — skill metadata (name, version 0.1.0, description).
- `LICENSE` — MIT.
- `README.md` — product page text with worked examples.

**Worked example (real output):** The same 20-turn session (50k input tokens per turn, 80% cached, 8k output per turn), priced on three models: Haiku 4.5 — 108.0 credits ($1.08), 7.2% of a Pro month; Sonnet 5.5 — 208.0 credits ($2.08), 13.9% of a Pro month; Opus 5.5 — 416.0 credits ($4.16), 27.7% of a Pro month. The same work, 4x the price, decided by one model pick. And the plan question for a 2,500-credit month: Pro $10/mo covers 1,500 credits, extra $10.00, total $20.00/mo; Pro+ $39/mo covers 7,000 credits, extra $0.00, total $39.00/mo. Verdict: Pro + pay-as-you-go extra credits is cheaper than Pro+. Rule of thumb: Pro+ beats Pro once a month needs more than 4,400 credits.

**Honest limits:**

- The guard works off a local ledger of token counts you record. It cannot see GitHub billing, your real credit balance, or your usage page — check those on GitHub before paying for anything.
- Rates in the script are GitHub's published per-token prices as read in November 2026; GitHub changes them, so verify on the models and pricing page and edit the `RATES` table when they move.
- Annual Pro/Pro+ subscribers stay on the old premium-request billing until their plan expires.
- This skill reduces surprise bills. It does not guarantee any saving, and it never executes a payment or changes your plan.

**Buy note:** $9 one-time, USDT TRC20 direct sale. Send $9 USDT to `TJ55nFLqS6uJ8hxE41QP4ZqEKzWJP51gez`, DM the tx hash to @agent2027boutique on Instagram, the hash is verified on-chain, then the download link is delivered.

---

## 3. Vercel Bill Guard — `vercel-bill-guard` — billing — $9

**Tagline:** Stop your $20 Pro plan becoming a $602 bill.

**The problem:** Vercel Pro costs $20 a month — and that is not a cap. In February 2026 a developer posted a $602.21 bill for six lightweight Next.js projects in one monorepo — $601.52 of it was build minutes (79 hours), because every git push rebuilt all six projects. In June 2026 a DDoS attack turned another developer's account into a $23,000 bill, and a student got a $3,200 version of the same story. None were billing errors.

**What it does:**

- Audits the repo before you deploy — finds every Vercel project, flags missing `ignoreCommand`, lists cron jobs, and projects the monthly build bill from your real push rate in git history.
- Prices the build pattern on every machine tier — Basic $0.007, Standard $0.014, Enhanced $0.028, Turbo $0.105 per minute, Elastic $0.0035 per CPU-minute — so the machine choice is a visible decision, not a default discovered on the invoice.
- Generates the `ignoreCommand` — the exact snippet for a project's `vercel.json` that stops a push rebuilding projects it did not touch.
- Prices bandwidth and Fluid compute — transfer over the 1 TB included at $0.15/GB, invocations, Active CPU and provisioned memory, with the rule that idle time waiting on I/O counts as billable.
- Names the dashboard settings that matter — Spend Management's $200 alert-only budget, Pause Production Deployments as the only real stop, Attack Challenge Mode and the WAF before a spike, and the Build Machines setting where Turbo hides.

**What's inside:**

- `SKILL.md` — the full skill: billing rules that matter, the 5-step audit/price/fix/re-check workflow.
- `scripts/vercel_bill_guard.py` — stdlib-only Python: `audit`, `estimate`, `ignore`, `bandwidth`, `functions` commands. Local, no network, no credentials.
- `skill.yaml` — skill metadata (name, version 0.1.0, description).
- `LICENSE` — MIT.
- `README.md` — product page text with worked examples.

**Worked example (real output):** A 6-project monorepo, 4 pushes a day, 3-minute builds — 2,160 build minutes a month, priced on every machine tier: Basic $15.12, Standard $30.24, Enhanced $60.48, Turbo $226.80. The same work, 7.5x the price, decided by one machine setting. With `ignoreCommand` — only the project a push actually touched rebuilds — the same pattern drops to 360 minutes a month: Standard cost $5.04 instead of $30.24. Bandwidth: 1,500 GB in a month is 476 GB over the 1 TB included — $71.40. Functions: 2,500,000 invocations (1,500,000 over the 1M included) = $0.90, Active CPU 40.0 hrs = $4.61, provisioned memory 900.0 GB-hrs = $5.72, Fluid compute total $11.23.

**Honest limits:**

- The skill prices usage from your local repo and Vercel's published rates as read in November 2026. It cannot see your Vercel billing page, your real usage, or your spend settings — check Settings > Usage and Settings > Billing in the dashboard before paying for anything.
- Git history counts commits, not pushes; the audit treats the commit rate as a push proxy and says so.
- Vercel changed build pricing in September 2026 (builds that had been free on paid teams started billing per minute) and can change rates again — verify on vercel.com/pricing and edit the rates in the script.
- Attack Challenge Mode, the WAF, and Pause Production Deployments are dashboard settings this skill cannot change for you.
- This skill reduces surprise bills. It does not guarantee any saving, and it never executes a payment or changes your Vercel plan or settings.

**Buy note:** $9 one-time, USDT TRC20 direct sale. Send $9 USDT to `TJ55nFLqS6uJ8hxE41QP4ZqEKzWJP51gez`, DM the tx hash to @agent2027boutique on Instagram, the hash is verified on-chain, then the download link is delivered.

---

## 4. Notion Exit Kit — `notion-exit-kit` — migration — $9

**Tagline:** Leave Notion without losing your databases.

**The problem:** You pay $10–$20 per seat every month for Notion. You press Export, you get a zip — and your workspace doesn't come with it. Databases come out as flat CSVs of one view. Relations become plain-text titles. Formulas become frozen numbers. Your board, calendar and timeline views don't export at all. Comments aren't in the Markdown export. And users who paid for a full year have reported being locked out of their own workspaces when they tried to downgrade. A 10-person team on Business ($20/seat/month billed yearly) pays at least $2,400 a year.

**What it does:**

- Audits your export — reads the real Notion export zip (including the zip-inside-a-zip shape, `Export-<id>-Part-1.zip`) and inventories pages, databases, rows and relations.
- Rebuilds a clean vault — strips the 32-character Notion ID from every filename and rewrites internal links, so the pages open directly in Obsidian or any Markdown tool.
- Rebuilds your databases in SQLite — one table per database, plus a `pages` table and a `relations` table that links database rows back to the pages they pointed at.
- Tells you what is lost, honestly — a loss report lists views, formula logic, comments and permissions as gone for good, and flags every relation it could not resolve, so nothing fails silently.

**What's inside:**

- `SKILL.md` — the full step-by-step skill: export, audit, rebuild relations, rebuild views, save formulas, cancel, verify.
- `scripts/notion_exit.py` — the audit/rebuild script (stdlib only, tested with `--selftest`). No API key, no account access, no network.
- `skill.yaml` — skill metadata (name, version 0.1.0, description).
- `LICENSE` — MIT.

**Worked example (real output):** A small test export — 2 pages (`Projects`, `Design`) and a `Tasks` database with 2 rows whose `Project` column points at the `Design` page. Real output: Pages: 2, Databases: 1, Rows: 2, Relations resolved: 2, Unresolved: 0. Vault: `out/vault`. SQLite: `out/notion_exit.sqlite`. Report: `out/loss-report.md`. The vault holds clean files — `Projects.md` links to `Design.md`, not to "Design bbbb….md". The SQLite database holds the `tasks` table and a `relations` table with both rows linked back to the `Design` page. The loss report reads: what survived — pages 2 (Markdown, links rewritten to clean names), databases 1 with 2 rows now in `notion_exit.sqlite`, relations resolved back to pages 2. What is lost for good — views (board/calendar/gallery/timeline layouts are rendering instructions, not stored data; only the rows survive), formula and rollup logic (the CSV holds the value the formula computed at export time, not the formula), comments (not in a Markdown & CSV export at all — only in the HTML export), permissions and sharing (a Notion-side setting, does not export).

**Honest limits:**

- It works from the export file. It cannot recover what Notion did not export: views, formula logic, comments (unless you ran the HTML export), permissions, synced-block links.
- It cannot bypass an export disabled by a workspace owner, and it cannot recover other people's private pages.
- It does not use the Notion API — there is no export endpoint, and walking the block tree is throttled at about 3 requests per second.
- If a database shows fewer rows than Notion showed, the export was filtered by the view you exported. Switch the current view to an unfiltered table and re-export.
- Notion prices quoted here are public list prices as of November 2026 — verify them on Notion's pricing page.

**Buy note:** $9 one-time, USDT TRC20 direct sale. Send $9 USDT to `TJ55nFLqS6uJ8hxE41QP4ZqEKzWJP51gez`, DM the tx hash to @agent2027boutique on Instagram, the hash is verified on-chain, then the download link is delivered.

---

## 5. Cursor Bill Guard — `cursor-bill-guard` — cost-guard — $9

**Tagline:** Stop your $20 Cursor Pro plan becoming a $1,400 hour.

**The problem:** Cursor Pro costs $20 a month — and that is not a cap. In June 2025 Cursor replaced Pro's 500 fast requests a month with $20 of model usage billed at API prices, plus on-demand overage once the pool runs out. In June 2026 a team posted on r/cursor that asking the agent to tag 87 tasks burned $1,400 in one hour (~$16 a task); Cursor's CEO refunded it personally two days later. A Pro subscriber on Hacker News had his $20 pool vanish in 4 days on silent on-demand billing: $42.12 of on-demand usage, about $60 in ~2.5 weeks, refund denied. Another developer woke up on June 19 to $130 in overnight charges while the editor was not even open. In September 2026 Ultra users reported paying $200 for $125 of usage at Cursor's own published rates.

**What it does:**

- Estimates before a big run — one request or a whole bulk job (`--tasks N`) at November 2026 provider list prices, with a warning above $20 and a yes required above $2 or your cap; the same request costs $2.25 on Opus, $0.66 on Sonnet, $0.45 on Haiku at the token counts in the worked example.
- Tracks both usage pools — Cursor Models (Composer/Grok, included allowance) separately from Other Models (Claude/GPT/Gemini at API rates), so you can see which pool a run actually drains and how much on-demand spend has started.
- Caps daily and per-task spend — defaults $10/day and $5/task, monthly cap $20 (legacy Pro); edit them in `~/.cursor-bill-guard/config.json` to match your plan.
- Brakes runaway loops and bulk jobs — 3 identical failures in a day stops retries; bulk jobs are split into batches of 5–10 with a dashboard check after the first batch.
- Names the dashboard settings that matter — the on-demand toggle and spend limit on legacy plans, Auto Top-up off plus the monthly additional usage limit on X Subscription plans, spend alerts at $10 and $25, and the subagent-model setting that stops Auto spawning premium-model subagents you did not pick.

**What's inside:**

- `SKILL.md` — the full skill: plan generations, dashboard limits, estimate-first workflow, caps, loop brakes, model-by-job pricing.
- `scripts/cursor_bill_guard.py` — stdlib-only Python: `estimate`, `record`, `check`, `status`, `fail` commands. Local ledger, no network, no credentials.
- `skill.yaml` — skill metadata (name, version 0.1.0, description).
- `LICENSE` — MIT.
- `README.md` — product page text with worked examples.

**Worked example (real output):** The $1,400-hour pattern, priced before it runs — 87 tasks on Opus at 200k input / 50k output tokens each: cost per request $2.25, bulk job 87 tasks x $2.25 = $195.75, with the warning "bulk total above $20 - get a yes before running it." The same 87 tasks on Haiku: $0.45 per request, $39.15 total. One ordinary Sonnet request (120k input / 20k output): $0.66. The ledger after recording two runs: today $0.66 spent / $10.00 daily cap (9.34 left); this month $0.66 spent / $20.00 monthly cap (19.34 left). A $48 bulk estimate is blocked by both caps before it runs: "BLOCKED by task cap + daily cap - stop and ask the user, do not find a way around it." And the loop brake: after 3 identical failures in a day — "STOP - 3 identical failures today. Do not retry the same thing."

**Honest limits:**

- The guard works off a local ledger of token counts you record. It cannot see your Cursor billing page, your real usage, your dashboard percentages, or your spend settings — check the dashboard before paying for anything.
- Cursor's dashboard percentages and its usage export do not always reconcile at published API rates (Ultra users reported $200 for $125 of usage), so if the meter and the math disagree, trust the invoice.
- No skill, hook, or script can cap a Cursor model call or change your dashboard settings — only the spend limit / on-demand toggle / Auto Top-up setting in the dashboard stops the meter, and Cursor's own docs warn enforcement is not instant.
- Rates are provider API list prices from November 2026. Cursor changed its pricing in June 2025 and again on 12 October 2026 — verify current pricing at cursor.com/pricing and edit the rates in the script.
- This skill reduces surprise bills. It does not guarantee any saving, and it never executes a payment or changes your Cursor plan or settings.

**Buy note:** $9 one-time, USDT TRC20 direct sale. Send $9 USDT to `TJ55nFLqS6uJ8hxE41QP4ZqEKzWJP51gez`, DM the tx hash to @agent2027boutique on Instagram, the hash is verified on-chain, then the download link is delivered.

---

## 6. MCP Setup Kit — `mcp-setup-kit` — setup — $9

**Tagline:** Four free MCP servers for Claude Code — $0 per call, no hosted gateway.

**The problem:** Hosted MCP gateways meter every tool call. Composio Pro is $29/month with tool calls at $0.0003 each past the free allowance, and its 2026 switch to usage-based billing drew criticism for large cost increases at production volume. Arcade's Team plan is $25/month plus $0.01 per tool call. Smithery charged $10/month for hosted MCP — then shut the hosted service down on October 31, 2026. Paid MCP servers on the market run $19–$149/month. A looping agent multiplies every per-call price.

**What it does:**

- Wires four free MCP servers that run on your own machine for $0 per call — Context7 (library docs), Playwright (browser), GitHub (repos, issues, PRs), Filesystem (one folder you choose) — with one `.mcp.json` config file.
- Verifies every server before you open Claude Code — a self-check script validates the JSON, confirms each command is on PATH, flags placeholder tokens, and confirms the filesystem folder exists; exit 0 means ready.
- Caps per-call spend before it bills — a per-tool cost ledger (`record`/`status`, exit code 2 on a cap hit) for the day you add a billed server, with example caps from verified November 2026 per-call prices (Exa search $0.007/call, Reddit reads $0.0015/read).
- Names when hosted MCP is still worth paying for — shared OAuth, audit logs, per-user permissions, or a tool that only exists as a hosted endpoint.

**What's inside:**

- `SKILL.md` — the skill: install steps, verification, cost caps, honest limits.
- `skill.yaml` — skill metadata (name `mcp-setup-kit`, version 0.1.0).
- `scripts/mcp_setup_check.py` — validates `.mcp.json`: JSON, commands on PATH, tokens, folders, placeholders.
- `scripts/mcp_cost_cap.py` — per-tool cost ledger: `record` and `status`, exit code 2 on a cap hit.
- `examples/.mcp.json` — ready-to-copy config for the four free servers.
- `examples/.mcp.json.broken` — broken config used to prove the checker catches real mistakes.
- `examples/cost_caps.json` — example monthly caps with verified November 2026 per-call prices.
- `LICENSE` — MIT.
- `README.md` — product page text with worked examples.

**Worked example (real output):** The fixture config in `examples/.mcp.json` was checked on November 25, 2026 (Node v24.22.1, Python 3.12.3). As shipped it contains a placeholder token, and the checker catches it: "FAIL: env var GITHUB_PERSONAL_ACCESS_TOKEN is not set", "FAIL: placeholder left in env.GITHUB_PERSONAL_ACCESS_TOKEN" — Result: 4 server(s), 2 failure(s), 0 warning(s), NOT READY. With a real token set, the same config passes: 4 server(s), 0 failure(s), 0 warning(s), READY. A deliberately broken config fails exactly where it should: 4 failure(s) — no command, missing folder, nonexistent binary, missing token. The cost-cap ledger: 100 Exa searches recorded at $0.007/call = $0.7000 of a $5.00 cap (14%); recording 700 more hits $5.6000 of $5.00 — "CAP HIT: exa-search reached $5.6000 of $5.00 — stop using this tool until next month or raise the cap deliberately."

**Honest limits:**

- This kit wires four local servers. It does not replace a managed gateway's OAuth, audit logs, team permissions, or uptime SLA.
- The check script verifies config, binaries, tokens, and folders. It cannot prove a server will answer correctly, and it cannot verify remote (HTTP) servers' auth or billing — those are flagged as warnings.
- The cost ledger only knows what you record. It cannot see real vendor billing, and a cap that is never recorded against is no cap at all.
- The four servers are free to run. Claude Code itself is a paid product, and the GitHub API has its own free-tier rate limits. The kit needs Node.js 18+ with `npx` and Python 3.9+ for the check script.
- Prices were checked November 25, 2026; MCP pricing changes fast — verify the live pricing page before budgeting. The complaint evidence is second-hand via independent review sites documenting the repricing criticism — no verbatim Reddit user quote of the form "I pay $X for MCP and still…" was found, and this kit does not claim otherwise.
- This skill saves the hosted-gateway subscription. It does not guarantee any saving and it never executes a payment.

**Buy note:** $9 one-time, USDT TRC20 direct sale. Send $9 USDT to `TJ55nFLqS6uJ8hxE41QP4ZqEKzWJP51gez`, DM the tx hash to @agent2027boutique on Instagram, the hash is verified on-chain, then the download link is delivered.

---

## 7. Supabase Bill Guard — `supabase-bill-guard` — billing — $9

**Tagline:** Stop the $25 Pro plan turning into a $100+ bill.

**The problem:** Supabase Pro costs $25/month. Until it doesn't. Every project bills its own compute 24/7, and egress, disk, storage and auth MAU meter on top. A solo dev on Pro at $25/month cancelled — and was still charged $22.85 that night for compute on 4 idle projects. Support's answer: "We charge in hindsight." A November 2026 complaint scan (17 signals, Trustpilot + Reddit) reports users charged $300+ when expecting $25/month for "ghost compute", and Pro users getting bills of $100–300+ from egress, compute or storage overages. A Threads user posted a Supabase invoice totalling $164.52 in November 2026. The trap: the Spend Cap is on by default on Pro — but it does not cover compute, PITR or log drains. The bill can keep growing while the cap is on.

**What it does:**

- Audits — copy 8 numbers per project from your Supabase dashboard (Usage page + Upcoming Invoice). No API key, no credentials, nothing leaves your machine.
- Projects — a tested Python script turns the snapshot into a projected month-end bill, line by line, with flow meters projected from the day of the cycle.
- Fixes cheapest first — idle projects, egress, oversized compute tiers, PITR ($100/mo) and log drains ($60/mo each) ranked by estimated monthly saving.
- Names the Spend Cap gap — the cap is on by default on Pro but does not cover compute, PITR or log drains; the estimate shows exactly how much bills even with the cap on.

**What's inside:**

- `SKILL.md` — the full skill: audit steps, drivers table, fixes, guardrails.
- `skill.yaml` — skill metadata (name, version, description, keywords).
- `scripts/supabase_bill_guard.py` — stdlib-only Python estimator (`estimate` / `--json`). No API key, no account access, no network.
- `examples/usage-snapshot.json` — realistic 3-project fixture used in the worked example.
- `README.md` — product page text with worked examples and the verified pricing table.
- `LICENSE` — MIT.

**Worked example (real output):** Fixture: a Pro org on day 12 of 30 — `prod` on Medium compute with 12 GB disk, a `staging` project on Micro, and a forgotten `old-experiment` project nobody uses. Projected month-end bill: Pro plan base $25.00, compute `prod` (Medium) $60.00, disk overage `prod` $0.50, compute `staging` (Micro) $10.00, compute `old-experiment` (Micro) $10.00, egress overage (projected) $13.05, compute credit −$10.00 — PROJECTED TOTAL $108.55. That is $83.55 OVER the $25 Pro sticker price — 4.3x the headline. Warnings: idle project `old-experiment` still pays $10.00/mo for compute; Spend Cap gap — $70.00/mo of this estimate bills even with the cap on. Cheapest fixes first: cut egress ($13.05/mo at stake), pause or delete idle project `old-experiment` ($10.00/mo). All fixes applied: up to $23.05/mo at stake. More tests, all passing: clean single Micro project on day 20 projects $25.00 exactly; large tier + PITR + 2 log drains on day 5 projects $347.75 with 3 fixes worth $270/mo.

**Honest limits:**

- This is an estimate from the numbers you paste in, using published November 2026 rates. It is not your invoice. Supabase's Upcoming Invoice on the Billing page is the authority; taxes, credits, billing-cycle timing and later pricing changes are not modelled.
- The script cannot see your real billing or your dashboard and never calls the Supabase API — no credentials needed, nothing secret leaves your machine.
- Early-month projections are rough forecasts: traffic spikes and bots move egress and MAU faster than a straight line. Re-run weekly.
- It reduces surprise bills. It does not guarantee any saving, never executes a payment, and cannot pause, delete or downgrade anything for you — those clicks are yours, deliberately.
- Pricing used (verified 2026-11-25): Pro $25/mo + $10 compute credit (one Micro); compute Micro $10, Small $15, Medium $60, Large $110, XL $210 up to 16XL $3,730; disk 8 GB included then $0.125/GB; egress 250 GB then $0.09/GB; MAU 100,000 then $0.00325 each; PITR $100/mo, log drains $60/mo each. Re-check supabase.com/pricing before relying on these rates.

**Buy note:** $9 one-time, USDT TRC20 direct sale. Send $9 USDT to `TJ55nFLqS6uJ8hxE41QP4ZqEKzWJP51gez`, DM the tx hash to @agent2027boutique on Instagram, the hash is verified on-chain, then the download link is delivered.

---

## 8. Cloudflare Bill Guard — `cloudflare-bill-guard` — billing — $9

**Tagline:** Stop your $5 Workers plan becoming a $2,129 invoice.

**The problem:** Workers Paid costs $5 a month — and that is not a cap. Everything above the included amounts is metered, uncapped, and billed per unit. A hobbyist running a non-commercial project on Workers and D1 got a $2,129 bill against an expected budget of ~$20/month — an unindexed GROUP BY query scanned ~877,000 rows to return 30, an unintended loop ran it ~315,000 times, and 1.44 trillion rows were read in a single cycle (October invoice $529.88, November invoice $1,599.12). A budget alert fired once at $37 and did nothing to stop it. After a $953.74 courtesy credit, $645.38 was still due — on top of the $529.88 already paid. A developer posted a ~$35,000 Cloudflare bill for a side project with 81 users — KV writes 3.13B ($15,635), KV reads 16.62B ($8,306), Durable Object storage writes 4.01B ($3,962), KV list operations 574M ($2,870). Bots hammering a public D1 lookup produced a $300 D1 bill in days. The cause: D1 bills rows scanned, not rows returned — and a budget alert is not a brake. Cloudflare shipped real Spend Management on November 13, 2026, but only for Workers and Durable Objects. D1, R2 and KV still have no hard spending cap.

**What it does:**

- Audits the repo before you deploy — finds every `wrangler.toml`, lists D1/KV/R2 bindings, flags cron triggers (a 1-minute cron is 43,200 invocations a month with zero traffic), and checks schema files for a missing `CREATE INDEX`.
- Prices the month from your real dashboard usage — Workers requests and CPU time, D1 rows read/written and storage, R2 storage and Class A/B operations, KV reads/writes/deletes/lists and storage — at Cloudflare's published November 2026 rates, with R2's whole-GB / whole-million rounding applied the way Cloudflare does it.
- Projects the month-end total mid-month — rate meters scale with days, storage levels do not, so a day-10 snapshot becomes a month-end number while there is still time to fix the query.
- Prices any single D1 query — rows scanned per run × runs per day, with the scan amplification that makes D1 bills explode, and a reality check against the real $2,129 invoice.
- Sets the cap that actually stops the meter — the exact Spend Management setup (dashboard path and `cf billing spend-policies create` command) for Workers and Durable Objects, plus the per-product usage notifications that are the only defence for D1, R2 and KV, which have no hard cap.

**What's inside:**

- `SKILL.md` — the full skill: billing rules that matter, the 6-step audit/price/project/query/cap workflow.
- `scripts/cloudflare_bill_guard.py` — stdlib-only Python: `audit`, `estimate`, `project`, `d1-scan`, `d1-check`, `cap` commands. Local, no network, no credentials.
- `skill.yaml` — skill metadata (name, version 0.1.0, description).
- `examples/usage-snapshot.json` — the full-month usage fixture used in the worked example.
- `examples/wrangler-fixture/wrangler.toml` and `schema.sql` — fixture Worker project for the audit.
- `LICENSE` — MIT.
- `README.md` — product page text with worked examples.

**Worked example (real output):** A hobby project's full month of usage (45M Worker requests, 900B D1 rows read, 40 GB in R2, 40M KV reads), priced by the included script: Workers subtotal $18.50 ($5.00 base + $10.50 requests + $3.00 CPU time), D1 subtotal $875.00 (900B rows read), R2 subtotal $19.35, KV subtotal $22.50 — estimated month total $935.35 (before tax). Dominant driver: D1 subtotal is 94% of the bill. The same usage, seen on day 10 instead of after the invoice, projects to a $2,884.05 month-end total. One query, priced before it ships — the pattern from the $2,129 post-mortem (877,000 rows scanned to return 30, 10,500 runs a day): 315,000 runs/month, 276,255,000,000 rows read/month, scan amplification 29,233x, D1 rows-read cost $251.25/month (plus the $5 Workers base). Checked against the real invoice, the script prices the reported 1,447,580,203,670 rows read at $1,422.58, against the invoiced D1 rows-read line of $1,447.58 — $25.00 below the invoice, exactly the 25B included allowance.

**Honest limits:**

- The skill prices usage from a snapshot you paste from the dashboard and Cloudflare's published rates as read in November 2026. It cannot see your Cloudflare billing page, your real usage, or your spend settings — check Billing > Billable Usage and Billing > Spend limits in the dashboard before paying for anything.
- The estimate is a floor, not a ceiling: it subtracts each included allowance once, and against the real $2,129 case it lands $25.00 below the invoiced D1 line.
- Spend limits exist only for Workers and Durable Objects; D1, R2 and KV have no hard cap.
- Durable Objects are not priced by the script — their meter is separate.
- Rates change — verify on developers.cloudflare.com. This skill reduces surprise bills. It does not guarantee any saving, and it never executes a payment or changes your Cloudflare plan or settings.

**Buy note:** $9 one-time, USDT TRC20 direct sale. Send $9 USDT to `TJ55nFLqS6uJ8hxE41QP4ZqEKzWJP51gez`, DM the tx hash to @agent2027boutique on Instagram, the hash is verified on-chain, then the download link is delivered.

---

## 9. Figma Seat Guard — `figma-seat-guard` — cost-guard — $9

**Tagline:** Stop paying for Figma seats nobody uses.

**The problem:** Figma bills per paid seat, and a seat can be added without an admin ever approving it. In October 2026 a user on the Figma Community forum was hit with a "Billing adjustments – additional Seat updates $15.48" charge because opening a file that needed a higher seat type upgraded their Collab seat to a Full seat. In another forum thread, Figma's own support team confirmed new editors are charged after they start interacting with a design file — and that a team would otherwise be billed for all 32 seats on its list. A November 2026 Threads post shows the same pattern in real numbers: a third Full seat for "Barry" at $16, a $36 one-time charge, a $40 renewal. Guides tracking the complaints report users hit with bills of hundreds to $1,000s+ from this one behaviour, and over 100 Trustpilot complaints about confusing Figma billing.

**What it does:**

- Audits your member list — reads a CSV you export from Admin > Members and flags every paid seat that is not earning its price.
- Catches auto-upgrades — flags Full seats that were upgraded from free View seats, the exact trap in the forum complaints.
- Finds dead seats — any paid seat with no file opened in 90 days and zero edits.
- Estimates the waste in dollars — monthly and yearly totals from Figma's published November 2026 seat prices (Professional Full $20/mo monthly / $16 annual, Dev $15/$12, Collab $5/$3; Organization Full $55; Enterprise Full $90; View free).
- Stops it recurring — step-by-step: default seat to Viewer-Restricted, seat approval to manual, upgrade email notifications on, and a monthly 10-minute re-audit routine.

**What's inside:**

- `SKILL.md` — the full skill: seat prices, export steps, audit, downgrade steps, the seat-change routine.
- `skill.yaml` — skill metadata (name, version 0.1.0, description).
- `scripts/figma_seat_guard.py` — stdlib-only Python auditor (`audit` / `prices` commands).
- `examples/members-example.csv` — the 12-member fixture used in the worked example.
- `LICENSE` — MIT.
- `README.md` — product page text with worked examples and complaint sources.

**Worked example (real output):** The included fixture is a realistic 12-person team on Professional monthly billing (6 Full, 2 Dev, 2 Collab, 2 View). Actual output from running the script on 25 November 2026: Members audited: 12. Current monthly cost: $160. Confirmed waste: $60/month ($720/year). Needs review: $20/month (up to $240/year more). Waste: Carla Diaz — Full seat, $20/mo, last opened 120d ago, 0 edits/90d; Dan Kim — Full seat, $20/mo, last opened 95d ago, 0 edits/90d; Gina Park — Dev seat, $15/mo, last opened 110d ago, 0 edits/90d; Ivy Chen — Collab seat, $5/mo, last opened 100d ago, 0 edits/90d. Review: Eva Novak — Full seat, $20/mo, upgraded from a free View seat, 1 edit/90d. The same fixture on annual billing: $126/mo cost, $47/mo waste ($564/year). On Organization annual: $390/mo cost, $140/mo waste ($1,680/year). The math was hand-checked: 6 × $20 + 2 × $15 + 2 × $5 = $160; waste $20 + $20 + $15 + $5 = $60.

**Honest limits:**

- The skill audits a member list you export by hand. It does not connect to Figma, cannot see your real billing or invoices, and cannot change any seat for you — every downgrade is a click you make in Figma.
- The 90-day inactivity rule is a heuristic. A designer on leave will look like waste — always check with the person before downgrading.
- Prices are Figma's published November 2026 prices, baked into the script. Figma changed its seat model on 11 March 2025 (the old "$15/editor" price is retired); verify current prices at figma.com/pricing and update the `PRICES` table when they change.
- Downgrading stops future charges; it does not refund past ones. Figma states it will not issue prorated refunds for downgrades, though support has removed mistaken charges as a courtesy in the cases cited above — worth asking, not guaranteed.
- This skill finds wasted seats. It does not guarantee any saving: your real saving depends on your plan, billing cycle, and whether downgraded seats are reassigned.

**Buy note:** $9 one-time, USDT TRC20 direct sale. Send $9 USDT to `TJ55nFLqS6uJ8hxE41QP4ZqEKzWJP51gez`, DM the tx hash to @agent2027boutique on Instagram, the hash is verified on-chain, then the download link is delivered.