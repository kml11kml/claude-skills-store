# Priced Pain Finder — Skill-Store Design Research
**Date:** 2026-11-25 (checked live, ~08:45 UTC / 12:15 Tehran)
**Purpose:** Imitate STRUCTURE, STYLE and MOTION only from the most-visited skill stores. Never copy their copyrighted text, images, logos or brand assets verbatim, and never claim their products or numbers as ours.
**Method:** `browser.search` + `browser.open` on each store's real pages (text fetch). Text fetch strips CSS/JS, so animation *timing/easing* could NOT be directly observed — motion notes below are labelled **observed** (visible in page structure: carousels, tabs, video previews, count-up stat blocks) vs **inferred** (standard pattern for that element, needs a live-browser check before build). No SimilarWeb/Ahrefs traffic data was available to this agent; "most-visited" ranking below rests on each site's own self-reported catalog/install counts and on third-party roundups that cite them — not on independently verified traffic.

## Stores checked (live, 2026-11-25)

| Store | URL checked | What it is | Self-reported scale (as shown on the site itself, 2026-11-25) |
|---|---|---|---|
| skills.sh (Vercel) | https://skills.sh/ | Open agent-skills directory + install leaderboard, CLI `npx skills add` | All-Time leaderboard total 1,551,257 (header on homepage); #1 `find-skills` 4.5M installs; #2–3 ~1.7M |
| hotskills.dev | https://hotskills.dev/ | Skills ranked by GitHub stars + 7-day growth | #1 repo 332.4k stars, +5k stars in 7 days; leaderboard "Showing 100 of 1,000 repositories" |
| aiskill.market | https://aiskill.market/ | Curated Claude Code marketplace, free, no account | 5,418 skills indexed, updated hourly; 151+ agents, 113+ workflows, 152+ loops; install in 60s |
| claudemarketplaces.com (CCM) | https://claudemarketplaces.com/ | Directory of skills/plugins/MCP servers, ranked by installs, refreshed daily | Category counts on homepage, e.g. Frontend & UI Code 2,491; Backend & APIs 1,850 |
| skillstore.io | https://skillstore.io/skills | Agent-readable marketplace, security-scored, signed install packs | 5,827 skills (homepage count; browse pages showed 690 / 533 on filtered views — count varies by filter, do not quote a single number) |
| PromptBase | https://promptbase.com/ | Prompt + agent-skill marketplace (paid, per-item) | "Access 350k AI prompts"; homepage claims 4.9★, 46,000+ reviews, 540,000+ users, 228 online now (site's own claims, unverified) |
| Whop | https://whop.com/ (+ https://whop.com/discover/) | Creator-commerce platform + Discover marketplace | Discover page returned empty text ("no posts yet") via text fetch — layout NOT verifiable this way; homepage + product pages + brand guidelines used instead. Review roundups cite 27,000+ businesses (unverified here) |
| Gumroad | https://gumroad.com/ | Creator storefront + Discover marketplace | Homepage live; /discover timed out on fetch — Discover grid NOT verifiable this run. Homepage shows a live earnings ticker: "$1,931,244 … earned … last week" (site's own figure) |

Other directories found in roundups (not opened in full, for completeness): ClaudeSkills.info (42,828+ skills, per Geekflare), SkillsMP (3.8M+ SKILL.md files), Smithery (25,355+), claudeskills.info / AgentSkill.club (3,736+), awesome-claude-code lists. Source: https://geekflare.com/guides/find-claude-code-skills/

## Per-store findings

### 1. skills.sh — https://skills.sh/
- **Template/layout:** Single-column leaderboard IS the homepage. No marketing hero at all: title "The Agent Skills Directory" + "Skills Leaderboard", search box, three tabs, then a numbered ranked list (rank, skill name, repo `owner/repo`, install count). Extremely dense, developer-first.
- **Typography:** Plain system sans, small sizes; hierarchy comes from rank numbers and bold install counts, not display type. Monospace implied for repo slugs / install commands (CLI-first audience).
- **Colour:** Not verifiable from text fetch; Vercel house style is black/white minimal. Do NOT assume a palette — treat as "near-monochrome, count is the colour".
- **Motion:** **Observed:** tab switching All Time / Trending (24h) / Hot (content swaps, no page reload). **Inferred:** row hover highlight + count formatting; no hero animation exists to copy.
- **Product-card structure:** One-line row, not a card: `rank · skill-name · owner/repo · installs` (+ verified badge icon on some rows). Grouped roll-ups: "+5 more from mattpocock/skills (7.5M total)".
- **Search/filter:** Single "Search skills..." box at top; tabs are the only filter on the homepage (All Time / Trending 24h / Hot). Per-skill pages show installs, GitHub stars, last update, copies of install command in last 90 days (per agentcraft.dev, 2026-11-14 check).
- **Pricing display:** None — everything free / install-count is the price signal. The "price" is social proof (installs).
- **Takeaway:** Ranking + install count as the primary trust signal; tabs for time windows.

### 2. hotskills.dev — https://hotskills.dev/
- **Template/layout:** Editorial leaderboard homepage. Eyebrow "AI AGENT SKILLS, IN THE OPEN", big display headline "Good skills. Getting *hotter.*", one-line subhead, a "Connect your AI" MCP prompt box (copy-paste code block), then "THE MOST STARRED" hero card (#1 repo, huge star count) followed by the numbered leaderboard (100 of 1,000). Sponsored suggestion cards and "Hot pick" / "Hot newsletter" promo cards are interleaved every ~8–10 rows.
- **Typography:** Large bold display headline with italic accent word; rank numbers large; star counts bold. Body small and dense in list rows.
- **Colour:** Not verifiable from text fetch (no palette source found). Layout suggests light, editorial, news-site feel.
- **Motion:** **Observed:** rank-change arrows (▲/▼/NEW) next to rows — movement is *data* motion, not CSS. **Inferred:** hover lift on rows; the interleaved promo cards suggest a staggered scroll reveal.
- **Product-card structure:** Row: `rank · avatar (40px) · owner/repo · 1-line description · +X% over 7 days · ★ count · Heat score (e.g. 8.5)`. Detail/search pages add: category tag (Engineering/Security/Writing…), skill path (`plugins/…/skills/…`), repo stars, check status.
- **Search/filter:** Dedicated search page https://hotskills.dev/search/ — filters: result type, check status, skill category, skill tag, observed agent integration; "Page 1 · 50 results shown".
- **Pricing display:** None — free directory; "Heat" + star-growth % are the value metrics.
- **Takeaway:** Growth % over 7 days + rank arrows = the most imitable "hotness" signal in the whole set. Interleaved promo/sponsored slots inside a list.

### 3. aiskill.market — https://aiskill.market/
- **Template/layout:** Classic marketplace landing: top stat strip ("5,418 skills indexed · updated hourly · 100% Claude Code compatible"), huge hero headline, search-first subhead, 4–5 big count-up stats (5,418 skills / 151+ agents / 113+ workflows / 152+ loops / 60s to install), "Browse by channel" (6 channels), "Six ways to power up Claude" channel cards, numbered 3-step "Install in 60 seconds" (Find → Copy → Run & ship) with a terminal mockup (dark code panel, `$ npx aiskill add …` → `✓ installed in 0.9s`), weekly-drop email capture, comparison table vs competitors, FAQ, creator/monetisation section ("From Idea to Active Income in 3 Steps", "15 minutes to publish").
- **Typography:** Very large bold hero headline, short punchy lines; stats in huge numerals.
- **Colour:** Not verifiable from text fetch. Copy tone is confident/comparative ("Quality Over Quantity", "Not 34,000+ unfiltered alternatives").
- **Motion:** **Observed:** stat-block counts (numbers are the animated element — count-up on scroll is the standard implementation); terminal typing mockup (line-by-line reveal). **Inferred:** scroll reveals per section, channel-card hover lift.
- **Product-card structure (from /llms-full.txt + About):** Every skill page shows install count, quality score, verification status; 3-step verification (automated scan → manual review → test install). Channels: Skills / Agents / Workflows / Loops / Designs / ClawHub.
- **Search/filter:** Hero search + Browse all https://aiskill.market/browse (browse page itself returned almost no text via fetch — JS-rendered; search/filter behaviour there NOT verifiable this run), plus time-ranked lists e.g. /skills/last30days.
- **Pricing display:** "$0 / Forever Free" as a stat; no per-item price (free catalog). Monetisation is framed as creator income, not buyer price.
- **Takeaway:** The best full-funnel template in the set: stats → channels → 3-step install with terminal demo → email capture → comparison table → FAQ. Copy the *structure*, write our own copy.

### 4. claudemarketplaces.com — https://claudemarketplaces.com/
- **Template/layout:** "Find the best tools for Claude Code" hero (one line + subhead "ranked by real installs and refreshed every day"), sponsored/featured strip (3 featured tools with logos), "Recently added" horizontal row (avatar + name + 1-line description + date "Nov 25"), then ranked lists split by type (Top Skills by installs, Top MCP Servers by stars, Top Plugins by stars), category pill cloud with counts (Frontend & UI Code 2,491 …), FAQ accordion at the bottom.
- **Typography:** Clean sans; rank numbers + bold install/star counts; category pills are small caps-like chips.
- **Colour:** Not verifiable from text fetch; layout is light, GitHub-avatar-driven (faces/logos carry the colour).
- **Motion:** **Observed:** "Recently added" reads as a horizontal scroll/carousel row; category pills as a wrap cloud. **Inferred:** card hover lift, FAQ accordion expand.
- **Product-card structure:** Row/card: `avatar (GitHub) · name · owner/repo · 1–2 line description · installs OR stars` (skills ranked by installs, MCP/plugins by stars — two different proof metrics, labelled).
- **Search/filter:** Category pills with counts act as the filter nav; separate ranked lists per item type (skill vs MCP vs plugin).
- **Pricing display:** None — free directory; installs/stars are the currency.
- **Takeaway:** Split rankings by item type + category pills with counts + "Recently added" freshness row. FAQ at the foot of the homepage answers "what is a skill / plugin / marketplace" — good SEO + trust pattern.

### 5. skillstore.io — https://skillstore.io/skills
- **Template/layout:** Browse-first, no hero on the browse page: "Build your own pack" banner at top (curate favourites → install with one command, "Create a pack" CTA), total count ("5,827 skills"), then a vertical list of skill cards. Detail pages are long-form: title, version, safety verdict, security-audit section with versioned report + citation (BibTeX-style), "Compare variants" (multiple authors of the same skill, ranked by evidence score), "What You Can Build", "Try These Prompts", FAQ, Developer Details (licence, version).
- **Typography:** Plain sans; scores are the visual anchor (large numerals).
- **Colour:** Risk/safety colour coding is structural: Safe / Medium Risk / High Risk badges + numeric score (e.g. "Safe 90", "Safe 83", "Medium Risk 65"). Do not copy exact badge colours — use our own palette for the same *idea*.
- **Motion:** **Observed:** none visible in text fetch. **Inferred:** minimal — this is a dense, trust-first UI; motion would be limited to hover + score-bar fill.
- **Product-card structure:** `📦 icon · slug · Risk badge + Score (0–100) · Title (plain-language outcome, e.g. "Track Long Tasks With a Portable State Ledger") · by author · 1–2 line problem statement · Supports: Claude Codex Code(CC) · Install button · "N installable variants · Compare"`.
- **Search/filter:** Query params visible in fetched URLs: `?category=productivity&tools=claude&sort=recommended` — filters by category, tool, sort (recommended). Sort + category + tool are the three filter axes.
- **Pricing display:** None — free; the "price" is the safety/score signal. Also has an agent-readable layer: /llms.txt, MCP endpoint, signed manifests — "built for agents, not only browsers".
- **Takeaway:** Trust-first card: numeric quality/safety score + risk badge + problem-first title + "compare variants". The "Build your own pack" (bundle) banner is a strong upsell pattern for our store (bundle 5 skills → one price).

### 6. PromptBase — https://promptbase.com/
- **Template/layout:** Marketplace homepage, visual-first: top nav (Marketplace / Create / Hire / Sell / Explore), hero "Prompt Marketplace" + "Access 350k AI prompts…", trending-search chips (dashboard, gta, trading, kdp, love), trust strip (4.9★, 46,000+ reviews, 540,000+ users, "228 online now"), Featured horizontal video carousel (autoplay muted video thumbnails, model tag e.g. "Claude Code" on each tile), "Just published" live ticker (title + @creator + "6m ago", duplicated — marquee loop), "Trending Prompts" numbered Top-30 list (rank + model icon + thumbnail + title + price), category tiles (Video, Apps & Games, Print & Sell…), "Most Popular This Month / On Sale / Newest" rails, Select subscription banner ($14 first month, then $19/mo, 10 picks/mo), press-logo strip ("Featured in" The Verge, WIRED, Fast Company, TechCrunch…).
- **Typography:** Bold compact sans; prices in bold; rank numbers large in the Trending list.
- **Colour:** Light, white background, black text; model tags carry small brand-coloured icons. No palette extracted (text fetch).
- **Motion:** **Observed:** featured video tiles autoplay (muted .webm previews — motion IS the product preview); "Just published" ticker is a duplicated marquee (same 12 items twice = infinite loop); carousel chevron on Featured row. **Inferred:** hover-to-play / hover zoom on tiles, horizontal scroll-snap on rails.
- **Product-card structure:** Tile: `video/image thumbnail (square) · model tag (Claude Code / Midjourney / ChatGPT Image…) · title · $price · @creator` (+ ★5.0 on some, "Select" badge on subscription-eligible items, strikethrough + sale price on discounted items, e.g. "-25% $4.99 $3.74").
- **Search/filter:** Trending-search chips under the hero; category tiles; model filter (each card carries its model); separate rails (Trending / Most Popular This Month / On Sale / Newest).
- **Pricing display:** The clearest paid-pricing pattern in the set: **large bold $X.99 per tile** (mostly $2.99–$9.99; specialist Claude items $19.99–$34.99), strikethrough original + % off for sales, "Select" badge for subscription-included items, subscription banner anchoring $19/mo vs per-item prices. Per reviews: sellers set prices from $2.99; new sellers cap $19.99, rising to $99.99 after 500 sales; 20% marketplace fee.
- **Takeaway:** The #1 model for OUR store's paid cards: thumbnail + model tag + title + bold price + @creator, plus a live "just published" marquee and a numbered Trending Top-N list. Video/motion preview on hover is the highest-impact motion pattern observed anywhere.

### 7. Whop — https://whop.com/ (homepage + brand guidelines)
- **Template/layout (homepage):** Full-viewport centred hero (display headline + 2-button row: orange CTA + ghost), then feature grid (Payments / Ads / Trading / Accounts / Cards / Communication — icon + title + 1 line), API/checkout section, "Deploy a business instantly", featured-customer story, mission footer. Product pages (from search results): title, price, member count, description, "Customer reviews" with star average + count (e.g. 4.8, 77 ratings; 5.0, 4 ratings), Product Offer block.
- **Typography (verified from brand guidelines https://brand.whop.com/ + https://stylr.dev/styles/whop):** Display: Acid Grotesk (custom geometric, 56–128px hero, line-height 1.00, letter-spacing −0.03em); UI/body: Inter 14–20px; code: Geist Mono 13–14px. Rule: never use Inter at display sizes; never use the display face for UI.
- **Colour (verified):** Ember Orange #FA4616 (primary, "Whop Orange" / Vermilion) + hard shadow #B62600; canvas #F9F9F9, card #FFFFFF, ink #202020, slate #646464, silver border #E1E4E8, obsidian #0A0A0A (dark code panels only). Flat — no gradients, no soft shadows. Secondary palette: Indigo, Cerulean, Chartreuse (used sparingly).
- **Motion:** **Observed:** none in text fetch. **Inferred from design-system notes:** flat/sticker feel, hard 3px offset shadow on primary CTA (not a soft shadow); phone mockups floating on canvas. No count-up/marquee observed — Whop's motion is restraint + one hard-shadow press effect (button "presses" down on click).
- **Product-card structure (Discover/product pages):** price first, member count, star rating + review count. No sales count shown on the product pages fetched.
- **Search/filter:** Discover marketplace with categories; not verifiable via text fetch this run.
- **Pricing display:** Large price at top of product page ("$20", "$49"); checkout fee framing on marketing pages (2.7% + $0.30, no monthly fee). Subscription vs one-off variants exist per product.
- **Takeaway:** The single-accent-colour discipline: ONE saturated colour, used only for the primary action; everything else near-monochrome. Hard offset shadow instead of soft shadow = a distinctive, cheap-to-build motion/press cue. **Do not copy #FA4616 or Acid Grotesk for our brand** — take the *rule* (one accent, one display face, flat surfaces), pick our own accent.

### 8. Gumroad — https://gumroad.com/ (homepage + design spec)
- **Template/layout (homepage):** Playful editorial landing: "Sell anything / Make your own road / Sell to anyone / Sell anywhere" feature sections with flat illustrations, a "Start Small → Get Better Together → Learn Quickly" stepped diagram with arrows, live earnings ticker ("$1,931,244 … earned … last week"), creator testimonial cards (photo + name + what they sell + quote), "Unlimited possibilities / Discover the best-selling products" CTA, email capture footer.
- **Typography (verified via https://stylr.dev/styles/gumroad):** ABC Favorit (proprietary) — substitute: a rounded geometric sans (e.g. Inter / General Sans / Outfit) at 16px/500 body, 18px/500 card titles, 30–36px/500 feature headings.
- **Colour (verified):** Canvas Cream #F4F4F0, Paper White #FFFFFF, Ink Black #000000, Graphite #242423, Hairline #D1D5DC; accents used sparingly: Coin Pink #FF90E8, Highlight Yellow #FFC900, Lime #F1F333, Vermillion #DC341E.
- **Motion:** **Observed:** none in text fetch; illustrations + arrows suggest a hand-drawn, step-by-step reveal. **Inferred:** floating pink-coin mascot, gentle float on illustrations; no heavy animation — the playfulness is in colour + illustration, not motion.
- **Product-card structure (verified spec):** White tile, 1px hairline border, 16px radius, NO shadow; thumbnail → title (18px/500) → price (16px/500 black); 32px grid gap on cream canvas. Product pages: cover image, title, price (incl. strikethrough sale price, e.g. ~~$5~~ $3.75 + "Thanksgiving 2026 Sale 25% off"), "Includes: 1 file · … · 15.0 KB", description, reviews.
- **Search/filter:** Discover marketplace browsable by category; products rank by sales, ratings, recency (per review roundup). Pay-what-you-want pricing ("$5+") is a Gumroad-native pattern.
- **Pricing display:** Bold black price under the title; sale = strikethrough + new price + sale label; "Includes: N files · size" line under price; discount codes with expiry.
- **Takeaway:** Cream canvas + white hairline-bordered tiles + NO shadows + one black filled button is the warmest, simplest store system in the set — the best base for a small store that must look pro without a design team. Sale-price pattern (strikethrough + % label) is directly reusable.

## Ranked patterns to imitate (structure/style/motion only)

1. **Trending / leaderboard with time-window tabs + growth %** — skills.sh (All Time / Trending 24h / Hot) + hotskills.dev (+X% over 7 days, ▲/▼/NEW arrows, Heat score). *Source: https://skills.sh/, https://hotskills.dev/* — Our version: "Trending today / this week / all-time" tabs on home; each skill row shows installs + 7-day % change. This is the cheapest trust signal we have.
2. **Paid product tile: thumbnail + model tag + title + bold price + creator + sale strikethrough** — PromptBase + Gumroad. *Source: https://promptbase.com/, https://gumroad.com/* — Our version: square cover (own art, never theirs), "Claude Code" tag, skill title, **$9** bold, "Includes: SKILL.md + …" line, strikethrough + % badge when on sale. Price is always the same visual weight as the title.
3. **Hero stat strip + 3-step install with terminal demo** — aiskill.market. *Source: https://aiskill.market/* — Our version: own counts only (skills live, installs, avg install time — only numbers we can truly count), then Find → Pay (USDT) → Install in 60s, with a dark terminal panel showing the real install command and a typing/reveal animation. Never reuse their 5,418 / 60s / "60X faster" claims.
4. **One-accent discipline + hard offset shadow on the primary CTA** — Whop. *Source: https://whop.com/, https://brand.whop.com/, https://stylr.dev/styles/whop* — Our version: pick OUR OWN accent (see §Colour below, not #FA4616), use it only for the primary buy/install button, flat surfaces, hard 3px offset shadow that "presses" on click, 24px card radius / 8px button radius.
5. **Trust-first card: numeric score + risk/safety badge + problem-first title + compare variants** — skillstore.io. *Source: https://skillstore.io/skills* — Our version: each skill shows a "Pain score" (our own metric: $ amount in the complaint + complaint volume — must be real, sourced, and labelled as our estimate), a "Verified" badge only when we actually tested it, and a problem-first title ("Stop paying $X/mo for …"). Never invent a score.
6. **"Just published" live marquee + numbered Trending Top-N list** — PromptBase. *Source: https://promptbase.com/* — Our version: a duplicated-loop marquee of our own newest skills (title + time ago), and a numbered Top-10 trending list on the homepage. Cheap motion, high freshness signal.
7. **Cream canvas + white hairline tiles, no shadows** — Gumroad. *Source: https://gumroad.com/, https://stylr.dev/styles/gumroad* — Our version: warm off-white page, white cards, 1px hairline border, 16px radius, 32px grid gaps. If we go dark instead, keep the same rule (one surface colour + hairline border, no soft shadows).
8. **Category pills with counts + split rankings by type** — claudemarketplaces.com. *Source: https://claudemarketplaces.com/* — Our version: pill cloud (Trading, Cost, Writing, Coding, …) each with a real count; separate lists for Skills vs Bundles ("Packs" — cf. skillstore's "Build your own pack").
9. **Video/motion preview on hover** — PromptBase featured carousel (muted autoplay .webm tiles). *Source: https://promptbase.com/* — Our version (phase 2, not launch): short silent screen-recording loop on hover for each skill card, showing the skill running in Claude Code. Do not ship autoplaying video at launch on Cloudflare Pages without checking bandwidth cost.
10. **Live earnings/social-proof ticker + creator stories** — Gumroad ("$X earned last week") + Whop (featured customer). *Source: https://gumroad.com/, https://whop.com/* — Our version: ONLY with real numbers (USDT received, verified tx count) — show "0 sales yet" honestly or omit the ticker until the first sale. Never fake it.

## Recommended colour / typography system (for Priced Pain Finder — our own, not theirs)

- **Direction:** Warm light theme (Gumroad cream base + Whop single-accent discipline). Dark code/terminal panels only for install demos (Whop/Skillstore pattern).
- **Palette (proposed, original):**
  - Canvas: #FAF7F2 (warm off-white, own value — close in spirit to Gumroad cream, not the same hex)
  - Surface / card: #FFFFFF, border hairline #E3E0D8, radius 16px (cards) / 24px (feature blocks)
  - Ink: #1A1A18, secondary text #5C5A54
  - **Accent (pick one, use ONLY for primary CTA + price emphasis): #0E7A5F (deep "painkiller" green — money saved, distinct from Whop orange #FA4616 and Gumroad pink) — or, if green feels off-brand, #1D4ED8 blue. Decide once, then never use the accent decoratively.**
  - Accent press shadow: darker shade of the same accent, hard 3px offset (Whop rule, own colour)
  - Success/verified badge: accent green; warning: #B45309 amber; danger: #B91C1C — use only for real status
  - Dark panel: #111110 with #E8E6E1 text, monospace for terminal
- **Typography (free / open, no proprietary faces):**
  - Display/headlines: "Sora" or "General Sans" (free) — bold, tight tracking (−0.03em), 48–72px hero, 32px section heads, line-height 1.0–1.1. (Whop uses Acid Grotesk — proprietary; do NOT use it. Gumroad uses ABC Favorit — proprietary; do NOT use it.)
  - UI/body: Inter 14–16px/400, 500 for labels, 600 for prices and buttons (Whop's secondary face — Inter is open, fine to use)
  - Code/terminal: "JetBrains Mono" or system monospace 13–14px (Whop uses Geist Mono — same idea, open alternative)
  - Scale: hero 56–72px → section 32px → card title 18px/500 → body 16px/400 → meta 13–14px/500
- **Motion system (cheap, Cloudflare-Pages-friendly — CSS only, no JS lib at launch):**
  - Count-up numbers on stat strip (IntersectionObserver, 800ms, ease-out) — aiskill pattern
  - Scroll reveal: fade + 12px translateY, 200ms stagger per card, `prefers-reduced-motion` respected
  - Card hover: translateY(−2px) + border darkens; NO soft shadow (Gumroad rule)
  - Primary CTA: hard-shadow press (translateY(2px) + shadow collapses) on :active — Whop pattern
  - "Just published" marquee: CSS keyframes translateX(−50%), duplicated list, pause on hover — PromptBase pattern
  - Rank arrows ▲/▼ colour-coded (green up / red down) — hotskills pattern
  - Trending tabs: instant content swap + underline slide — skills.sh pattern
  - Phase 2 only: hover video preview (muted loop) — PromptBase pattern

## Page-structure outline

### Home (`/`)
1. Sticky top nav: wordmark (own logo) · Browse · Trending · Bundles · How it works · Search box (right) · "Sell / Submit" link
2. Hero: eyebrow ("Claude Code skills, priced by the pain they kill") · H1 (own copy, short) · subhead (one line: what a skill is + install time) · 2 buttons: primary "Browse skills" (accent, hard shadow) + ghost "How install works" · search input embedded in hero (Gumroad/aiskill pattern)
3. Stat strip (count-up, only real numbers): skills live · installs · avg install time · USDT paid out / sales — omit any metric that is still zero or show it honestly
4. Trending tabs: Today / This week / All-time — ranked list (skills.sh + hotskills pattern), each row: rank, cover thumb, title, tag, installs, 7-day %
5. "Just published" marquee (PromptBase pattern)
6. Category pills with counts (CCM pattern) → filter the grid below without reload
7. Skill grid (Gumroad tiles + PromptBase pricing): cover, Claude Code tag, title, 1-line pain statement, $price bold, "Includes: …" line, Buy/Install button on hover
8. "How it works — 3 steps" with terminal demo (aiskill pattern): Find → Pay USDT → Install in 60s; dark terminal panel with real command + copy button
9. Bundle / Pack banner (skillstore pattern): "Build your own pack — 5 skills, one price"
10. Why-us / trust section: verification checklist (what we actually test), USDT payment explainer (send → tx hash via Instagram DM → verify on-chain → download link), FAQ accordion (CCM pattern)
11. Email capture: "The weekly drop — 5 new skills" (aiskill pattern)
12. Footer: minimal links, no fake press logos, no fake testimonials

### Product page (`/skills/<slug>`)
1. Breadcrumb: Home / Category / Title
2. Left: cover image/video preview (phase 2: hover loop); Right: title, 1-line pain statement, **price large + sale strikethrough if discounted**, "Includes" list (files, size), model tag (Claude Code), version, last updated, installs, Pain score (labelled as our estimate, with source link to the complaint), Verified badge (only if tested)
3. Primary CTA: "Buy — $9 USDT" (accent, hard shadow) + secondary "Copy install command" + payment steps (USDT TRC20 address shown only at checkout step, hash → Instagram DM → verify → link)
4. Tabs/sections: What it does · What you get (file list) · How to install (terminal steps) · The pain it kills (the original complaint, quoted with source link — amounts must be real) · FAQ · Reviews (only real ones; empty state "No reviews yet" if none)
5. "Compare variants / You may also need" — related skills grid (skillstore compare pattern, our own items only)
6. Trust footer: refund policy (state it plainly), licence note, "no account needed" if true

### Browse / search (`/browse`)
- Search box + filters (skillstore axes): Category · Tool (Claude Code) · Sort (Recommended / Most installed / Newest / Price low→high) · tag chips
- Result count ("N skills") + grid of the same tiles as home; empty state with a clear message, never fake results

## What could NOT be verified (gaps — do not build on these)
- **Motion/animation timing, easing, hover physics:** text fetch strips CSS/JS. All motion notes above marked "inferred" need a live-browser visual check before build (parent: arrange a browser pass on https://promptbase.com/, https://aiskill.market/ and https://whop.com/ and note actual transitions).
- **Whop Discover layout:** https://whop.com/discover/ returned empty text ("no posts yet"); product-card grid, search and filter behaviour there are unverified.
- **Gumroad Discover grid:** https://gumroad.com/discover timed out on fetch; Discover ranking/filter behaviour unverified (homepage + design spec verified instead).
- **aiskill.market /browse search & filters:** page returned almost no text (JS-rendered); its search/filter UX is unverified.
- **Traffic / "most-visited" ranking:** no SimilarWeb/Ahrefs or analytics data was available. The order in this report follows self-reported catalog/install counts + third-party roundups, not verified visits. Do not quote any store as "#1 most visited" in our marketing.
- **Colour palettes for skills.sh, hotskills.dev, aiskill.market, claudemarketplaces.com, skillstore.io, PromptBase:** not extractable from text fetch (no design-spec source found for them this run). Only Whop and Gumroad palettes are hex-verified (via brand guidelines / stylr.dev). Treat other stores' colours as "light, near-monochrome, proof-numbers carry the colour" — do not assert hex values for them.
- **PromptBase / Whop / Gumroad sales & review numbers** quoted above are the sites' own claims as fetched today; they were not independently verified and must not be repeated as our facts.
- **Skillstore browse count** fluctuates by filter (5,827 on the unfiltered view vs 690/533 on filtered fetches) — quote it only as "several thousand, filter-dependent" or not at all.
