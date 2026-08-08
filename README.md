# Reliant Janitorial (reliantjanitorial.com)

React SPA with build time prerendering: every route ships as real static HTML
with its own title, meta description, H1, canonical, OG tags, and LocalBusiness
JSON-LD. No prerender worker needed. Sitemap and robots.txt are generated
automatically.

## 1. Before deploying

- `src/data.js` top of file: replace PHONE, phoneHref, and EMAIL in `BIZ`.
- That is the only required edit. All copy, industries, and towns also live in
  `src/data.js` if you want to tweak anything.

## 2. Supabase (lead capture)

1. In your Supabase project, enable the `pg_net` extension (Database > Extensions).
2. Open `supabase/migration.sql`, replace `<PROJECT-REF>` with your project ref,
   run it in the SQL editor.
3. Deploy the edge function:
   ```
   supabase functions deploy pushover-notify --no-verify-jwt
   supabase secrets set PUSHOVER_TOKEN=xxx PUSHOVER_USER=xxx
   ```

## 3. Deploy to Cloudflare Pages

- Push this folder to a Git repo, connect it in Cloudflare Pages.
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables:
  - `VITE_SUPABASE_URL` = https://YOUR-REF.supabase.co
  - `VITE_SUPABASE_ANON_KEY` = your anon key
- Point reliantjanitorial.com at the Pages project (Custom Domains tab).

If Supabase env vars are missing, the form shows the fallback error with the
phone number instead of silently failing.

## 4. Day one SEO checklist

1. Google Search Console: add reliantjanitorial.com (domain property),
   submit `https://reliantjanitorial.com/sitemap.xml`, then Request Indexing
   on the homepage and each industry page (11 URLs).
2. Bing Webmaster Tools: import from GSC (one click).
3. Google Business Profile: create "Reliant Janitorial" as a service area
   business (hide address, set the town list), category "Commercial cleaning
   service", link the site. This is the fastest ranking surface you have.
4. Consistent NAP: use the exact same name, phone, and site on GBP, Yelp,
   Facebook, and Nextdoor.

## Local dev

```
npm install
npm run dev      # dev server
npm run build    # client build + SSR build + prerender + sitemap
npm run preview  # serve dist
```

## SEO/GEO implementation notes (Aug 2026 spec)

**Crawler access.** No prerender service is used or needed. Every route is
static HTML at build time, so Googlebot, Bingbot, GPTBot, OAI-SearchBot,
ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Perplexity-User, and
Google-Extended all receive identical fully rendered HTML with zero redirects.
robots.txt explicitly allows each of them.

**Cloudflare settings that can silently break this (do these in the dashboard):**
1. Security > Bots: turn OFF "Bot Fight Mode" / "Block AI bots" for this zone,
   or the AI crawlers get blocked at the network level no matter what
   robots.txt says.
2. Turn OFF Cloudflare's "managed robots.txt" for this zone so it does not
   inject Disallow rules for ClaudeBot/GPTBot/Google-Extended on top of ours.
3. SSL/TLS > Edge Certificates: turn ON "Always Use HTTPS".

**Structured data.** Every page carries LocalBusiness JSON-LD (with @id).
Industry pages add Service schema, town pages add localized Service schema,
and the homepage adds FAQPage matching the visible FAQ section. No ratings or
review markup exists anywhere; do not add any until real Google reviews exist.
After deploy, run 4 URLs through Google's Rich Results Test (homepage, one
industry page, one town page, /services).

**Analytics.** Paste your GA4 measurement ID into GA4_ID in src/data.js.
Events fired: generate_lead (quote form success) and tel_click (any phone tap).
In GA4, create the AI referral segment: Admin > Data display > Channel groups >
create channel "AI Referrals" with rule Source matches regex:
chatgpt\.com|openai\.com|perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com|claude\.ai

**Deploy warning.** Always deploy via Git + Cloudflare Pages build (env vars
are baked in at build time). Do not drag-and-drop a locally built dist folder:
a build made without VITE_SUPABASE_* env vars ships a form that can only show
the phone fallback.

**Post-launch checks (needs the live site):** PageSpeed Insights on the top 5
pages (targets: LCP < 2.5s, INP < 200ms, CLS < 0.1; there are no images and
fonts use display swap, so lab scores should pass immediately), GSC sitemap
submission, and Rich Results Test screenshots.
