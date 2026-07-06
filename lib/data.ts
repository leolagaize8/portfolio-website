export type ProjectCategory = 'webapp' | 'automation' | 'ai-agent' | 'research' | 'claude-skill'

export interface StatItem {
  value: string
  label: string
}

export interface PipelineStep {
  label: string
}

export interface Flow {
  label: string
  steps: string[]
  description: string
  imageUrl?: string
}

export interface ProjectDetail {
  problem: string
  objective: string
  pipeline?: PipelineStep[]
  stats: [StatItem, StatItem, StatItem]
  stack: string[]
  solution: string
  images?: string[]
  videoUrl?: string
  overviewImageUrl?: string
  flows?: Flow[]
}

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  description: string
  apps: string[]
  clientLogo?: string
  thumbnailUrl?: string
  detail: ProjectDetail
}

export interface Employer {
  id: string
  name: string
  initials: string
  color: 'purple' | 'orange'
  subtitle: string
  website?: string
  context?: string
  notableCompanies?: string[]
  projects: Project[]
}

export const categoryLabels: Record<ProjectCategory, string> = {
  webapp: 'Web App',
  automation: 'Automation',
  'ai-agent': 'AI Agent',
  'claude-skill': 'Claude Skill',
  research: 'Research',
}

export const employers: Employer[] = [
  {
    id: 'hexa-scale',
    name: 'Hexa Scale',
    initials: 'HS',
    color: 'purple',
    subtitle: 'Investment arm · Vertical B2B SaaS · €5–20M majority stakes',
    website: 'https://www.hexa.com/',
    context: 'Hexa is a leading European startup studio — 50 companies built, 3 unicorns, including companies like Aircall, Front, Spendesk, Swan and Yousign. Worked at Hexa Scale, the small cap PE investment arm: €5–20M majority investments in vertical B2B SaaS, with the goal to transform them operationally and help them become leaders in their niche. Worked across sourcing, analysis and due diligence — and took the initiative to build the fund as AI-native.',
    projects: [
      {
        id: 'scale-sourcing',
        title: 'Scale Sourcing',
        category: 'webapp',
        description:
          'A full-stack sourcing OS that unifies scraping, AI scoring, email enrichment, outreach, and CRM into a single interface — replacing a fragmented workflow spread across five disconnected tools.',
        apps: ['Next.js', 'N8N', 'PhantomBuster', 'OpenAI', 'Attio', 'FullEnrich', 'Lemlist'],
        detail: {
          problem:
            'The team ran outbound sourcing across PhantomBuster, Lemlist, FullEnrich, N8N, and LLMs — each with its own context, forcing constant copy-paste and back-and-forth. No shared pipeline, no single source of truth, and no automated loop to bring tracked companies back into active conversations.',
          objective:
            'Build a multi-user sourcing platform — designed, built, and shipped solo during my internship at Hexa Scale — that collapses every step of outbound deal sourcing into one interface: one shared database, one pipeline, one source of truth. In production, used daily by the full investment team. 30,000+ companies centralized.',
          solution:
            'Scale Sourcing unifies scraping, AI scoring, enrichment, outreach, and CRM across two automated pipelines — a scoring flow for net-new prospects, and a follow-up loop that re-activates dormant targets straight from the CRM.',
          flows: [
            {
              label: 'Flow 1 — Scoring Pipeline',
              steps: ['Sales Navigator', 'PhantomBuster', 'Dedup', 'AI Scoring', 'Human Review', 'FullEnrich', 'Lemlist / Attio'],
              description:
                'I paste a Sales Navigator search URL into the app and tag it (geography, size, vertical). Two chained PhantomBuster agents run: the first exports results into structured rows; the second scrapes each company page for descriptions and firmographics.\n\nOn import, every company is deduplicated globally against the full database on a normalized LinkedIn URL — not per-user, so the shared pipeline stays one source of truth. Only genuinely new companies are inserted.\n\nThe batch is POSTed to an N8N webhook where a Loop Over Items runs each company through an LLM prompt calibrated on the investment thesis, scoring it 1–10 with a rationale, summary, and confidence flag. Results write back and companies surface on the Review page sorted best-first.\n\nThe analyst rejects off-thesis companies and, for the keepers, attaches the CEO and the sourcing signal (a fundraise, a key hire). FullEnrich resolves the CEO\'s email and qualified companies are pushed into a Lemlist sequence or the Attio CRM.',
            },
            {
              label: 'Flow 2 — Follow-Up Loop',
              steps: ['Attio CRM', 'Tracking', 'Unresponsive', 'AI Agent', 'Human Review', 'Lemlist'],
              description:
                'A second pipeline that re-activates dormant targets straight from the CRM — branching directly off the Attio deal flow to recontact companies set aside months ago.\n\nTracking: companies in the deal flow for 6+ months that were never recontacted (typically too early at first contact). Each carries a reason that automatically routes it to the matching Lemlist campaign.\n\nUnresponsive: ~1,350 companies stuck in the Unresponsive stage for 90+ days. A re-engagement agent pulls each company\'s data from Attio, scrapes its website, analyzes its positioning, and drafts a personalized intro. The analyst reviews and edits it in the app before it launches into Lemlist.\n\nThe agent runs as a scheduled Claude Code Routine on cloud infrastructure — triggered by a daily cron or an HTTP webhook from the webapp — so the whole team drives one shared agent through the UI.',
            },
          ],
          pipeline: [
            { label: 'Sales Navigator' },
            { label: 'PhantomBuster' },
            { label: 'N8N' },
            { label: 'OpenAI Scoring' },
            { label: 'FullEnrich' },
            { label: 'Lemlist' },
          ],
          stats: [
            { value: '30,000+', label: 'companies centralized' },
            { value: 'Multi-user', label: 'auth + isolation' },
            { value: '2 flows', label: 'automated' },
          ],
          stack: [
            'Next.js',
            'TypeScript',
            'Neon Postgres',
            'Better Auth',
            'N8N',
            'PhantomBuster',
            'OpenAI',
            'Attio',
            'FullEnrich',
            'Lemlist',
            'Vercel',
          ],
          images: [],
          videoUrl: '/scale-sourcing-demo.mp4',
        },
      },
      {
        id: 'coverage',
        title: 'Market Deal Coverage',
        category: 'automation',
        description:
          'A market-coverage engine that reads external deal newsletters, filters them against the investment thesis, cross-checks every deal against the CRM, and emails the team a curated weekly digest backed by a live coverage dashboard.',
        apps: ['N8N', 'LLM', 'Google Sheets', 'Attio', 'Gmail'],
        thumbnailUrl: '/coverage-email-thumb.png',
        detail: {
          problem:
            'The team relied on manually reading several VC and M&A newsletters to stay on top of the market — inconsistent, time-consuming, and impossible to measure. There was no systematic way to know which deals hitting the market were already tracked in the CRM, and which were being missed entirely.',
          objective:
            'Build an autonomous coverage engine that ingests deal newsletters from two sources, filters them against the investment thesis, cross-references every deal against the Attio CRM, and delivers a curated weekly digest — turning raw market noise into a measurable coverage KPI.',
          solution:
            'Three N8N workflows (40+ nodes) handle ingestion, CRM cross-referencing, and weekly reporting. Two source-specific parsers handle different newsletter formats; both converge on one schema, one Google Sheet, and one Attio-matching pattern. A Monday evening cron assembles the week\'s deals into a professional HTML digest and sends it to the full team.',
          overviewImageUrl: '/coverage-n8n-overview.png',
          flows: [
            {
              label: 'Avolta — VC Rounds & Exits',
              steps: ['Gmail Trigger', 'Text Parser', 'LLM Filter', 'Google Sheets', 'Attio Match', 'Stage Lookup'],
              imageUrl: '/coverage-n8n-avolta.png',
              description:
                'A resilient text parser handles Avolta\'s formatting quirks (quoted-printable breaks, starred vs. plain company headers), splits the newsletter into individual deals, and extracts amounts, tags, and dates. A LLM pass then applies the thesis filter — keeping only clearly B2B software in the €2–25m range; dropping seed rounds, hardware, biotech, consumer, and anything outside the band.\n\nEvery kept deal is written to the Google Sheet, then cross-referenced against Attio: the workflow searches the CRM by company name, and on a match queries the deal-flow list to pull that company\'s current stage (Tracking, Unresponsive, Passed, Lost…). Each row is tagged in-CRM or not, and enriched with its stage.',
            },
            {
              label: 'Fusacq — M&A & Advised Operations',
              steps: ['Gmail Trigger', 'LLM Classify', 'LLM Extract', 'Loop + HTTP Scrape', 'LLM Describe', 'Thesis Filter', 'Google Sheets', 'Attio Match'],
              imageUrl: '/coverage-n8n-fusacq.png',
              description:
                'A stricter, multi-stage pipeline. A first LLM classifies whether the email even contains a real deal (vs. agendas, webinars, directory noise). If it does, a second LLM extracts each deal, then the workflow loops over them — fetching each source article, generating a grounded deal + company description under explicit anti-hallucination rules, and running a per-deal thesis filter.\n\nLLMs are boxed in as narrow, single-purpose steps (classify → extract → describe → filter), each with strict JSON-only outputs — so failures stay isolated and debuggable, rather than one fragile do-everything prompt.',
            },
            {
              label: 'Weekly Digest & Dashboard',
              steps: ['Schedule Trigger', 'Google Sheets', 'LLM Render', 'Apps Script PDF', 'Gmail'],
              imageUrl: '/coverage-n8n-reporting.png',
              description:
                'A scheduled workflow (Mondays, 5pm) reads the week\'s deals, computes the date window, and has LLM render them into a fixed HTML email — normalizing company names, splitting Fundraising from Exits, deduplicating companies that appeared in both sources (keeping the richer Fusacq data), and writing a 2–3 line synthesis per deal.\n\nIt then calls a Google Apps Script endpoint that captures the live dashboard as a PDF, attaches it, and sends the Scale Reporting digest to the full team. The dashboard turns the raw log into coverage metrics: total deals seen, VC vs. M&A split, coverage rate, weekly volume chart, and breakdown by CRM stage.',
            },
          ],
          pipeline: [
            { label: 'Gmail' },
            { label: 'N8N Parse' },
            { label: 'LLM' },
            { label: 'Attio Match' },
            { label: 'Google Sheets' },
            { label: 'Weekly Digest' },
          ],
          stats: [
            { value: '192', label: 'deals tracked' },
            { value: '24%', label: 'CRM coverage' },
            { value: 'Weekly', label: 'auto-digest' },
          ],
          stack: ['N8N', 'LLM', 'Google Sheets', 'Google Apps Script', 'Attio API', 'Gmail'],
          images: [
            '/coverage-email-p1.png',
            '/coverage-email-p2.png',
            '/coverage-email-p3.png',
            '/coverage-dashboard-stats.png',
            '/coverage-dashboard-stages.png',
          ],
        },
      },
      {
        id: 'conference-sourcing',
        title: 'Conference Sourcing Skills',
        category: 'claude-skill',
        description:
          'A suite of 2 Claude Code skills that automate the full conference sourcing workflow — finding relevant trade shows by sector and geography, scraping exhibitor lists from any format, and scoring each company against the investment thesis.',
        apps: ['Claude', 'SKILL.md', 'LLM', 'Google Sheets', 'Web scraping'],
        thumbnailUrl: '/conference-sourcing-thumb.png',
        detail: {
          problem:
            'Sales Navigator was the primary sourcing channel — reliable but limited to companies with an active LinkedIn presence. Trade shows and professional exhibitions are a complementary goldmine: B2B SaaS companies actively exhibit to reach buyers, which maps directly onto PE deal targets. But processing exhibitor lists was entirely manual — hundreds of company names, googled one by one, filtered inconsistently. One event could take half a day. Most were skipped entirely.',
          objective:
            'Build a system of reusable Claude Code skills to automate the full conference sourcing pipeline — from discovering relevant events by sector and country, to extracting exhibitor lists from any format, to scoring every company against the investment thesis — so any team member can process a trade show in minutes.',
          solution:
            'Three chained Claude Code skills, each handling one stage of the pipeline. Together they turn a sector and a city into a scored, thesis-filtered shortlist with no manual work.\n\nThe system handles any exhibitor list format: public HTML pages, JavaScript-rendered catalogues (via Airtop headless browser), PDFs, or manual pastes. Scoring runs in two passes to keep costs near zero: a keyword filter first eliminates obvious non-fits (hardware manufacturers, associations, freight forwarders), then GPT-4o-mini scores the remainder at ~$0.02 per 200 companies, with a 0 / 0.5 / 1 rating and a rationale for each.',
          flows: [
            {
              label: '/setup-exhibitor-sourcing — One-time Setup',
              steps: ['Check jq + npx', 'Write API keys to ~/.zshrc', 'Install Linkup MCP', 'Install Google Sheets MCP', 'Install Exa MCP', 'Deploy skills to ~/.claude/commands'],
              description: 'A one-command setup skill that configures the full environment: checks system dependencies (jq, npx), writes the required API keys to the shell profile, installs the three MCP servers (Linkup for web search, Google Sheets for export, Exa for semantic search), and copies the skills into ~/.claude/commands. Ends with a status table confirming every component.',
            },
            {
              label: '/find-events — Event Discovery',
              steps: ['Sector + city input', 'Linkup deep search (2024–2027)', 'Exhibitor page check', 'Accessibility rating', 'Tier classification', 'Google Sheet tracker'],
              description: 'Given a sector and/or city, this skill runs 4–6 parallel Linkup MCP deep searches across 2024–2027 editions — past events are often more useful than future ones because their exhibitor lists are already published.\n\nFor each event found, the skill fetches the exhibitor page and classifies it: public (scrapable now), signup required, JS-only (handled by Airtop in the next skill), PDF download, or not found. It also checks whether exhibitor descriptions are available — events with descriptions allow more precise LLM scoring.\n\nResults are tiered (Tier 1 = pure software event, Tier 2 = vertical event with tech, Tier 3 = generalist salon) and exported to a Google Sheet with an Events tab and a pre-structured Exhibitors tab ready for /extract-exhibitors.',
            },
            {
              label: '/extract-exhibitors — Scraping & Scoring',
              steps: ['Airtop browser scrape', 'Pagination handling', 'Keyword exclusion pass', 'GPT-4o-mini scoring', 'Google Sheet export'],
              description: 'Takes an event URL or PDF and extracts the full exhibitor list with the maximum available data — company name, website, description, category, country — using Airtop (handles JavaScript, pagination, and "Load more" buttons). Falls back to WebFetch, Linkup, or manual paste if needed.\n\nScoring runs in two passes. Pass 1 is free: a keyword filter instantly flags hardware manufacturers, associations, media, freight forwarders, and other non-fits as note 0. Pass 2 sends the remaining companies to GPT-4o-mini in batches of 50, which scores each 0 / 0.5 / 1 against the investment thesis using name, URL, and description together. Cost: ~$0.02 per 200 exhibitors.\n\nResults (note 1 and 0.5 only) are pushed into the Exhibitors tab of the existing Google Sheet, and the Events tab is updated with extraction status and SaaS count.',
            },
          ],
          stats: [
            { value: '2 skills', label: 'chained pipeline' },
            { value: '2-pass', label: 'scoring system' },
            { value: '~$0.02', label: 'per 200 companies' },
          ],
          stack: ['Claude Code', 'SKILL.md', 'Linkup MCP', 'Airtop', 'GPT-4o-mini', 'Google Sheets', 'Exa'],
        },
      },
      {
        id: 'market-research',
        title: 'Bottom-Up Market Research',
        category: 'research',
        description:
          'A 6-step methodology to map any French market from scratch using public APIs and MCPs — extracting every active company, enriching with financials and company objects, classifying by sub-activity, and sizing the addressable opportunity in-house.',
        apps: ['Claude', 'N8N', 'Web scraping', 'Google Sheets'],
        thumbnailUrl: '/datagouv.png',
        detail: {
          problem:
            'Market sizing was either outsourced to expensive external consultants or done through clunky manual processes — scraping websites, copy-pasting data, stitching together disconnected APIs. The result was slow, costly, and hard to reproduce. With MCP servers available directly in Claude Code, the same depth of analysis can now be done in-house in hours: pulling structured data from government registries, enriching it with financial and descriptive data, and mapping the full market from first principles.',
          objective:
            'Build a repeatable, bottom-up methodology to map any French sector — identifying every active company, collecting their financials and legal data, segmenting by sub-activity, and sizing the addressable opportunity — entirely within Claude Code using MCPs, with no external cost for the base extraction.',
          solution:
            'A 6-step pipeline built around the free DataGouv API and the INPI API, orchestrated by Claude Code. The process goes from NAF code identification all the way to sub-activity classification and website enrichment, producing a structured dataset ready for deal analysis.\n\nThe base extraction is free and covers 46 columns per company. The 10,000-result API cap is bypassed by querying all 102 French departments separately and deduplicating by SIREN. INPI enrichment adds the company\'s stated business object for segmentation. Website lookup runs through an N8N + Linkup workflow at ~€0.05 per company.',
          flows: [
            {
              label: 'Step 1 — NAF Code Identification',
              steps: ['Sector input', 'Claude NAF lookup', 'Adjacent codes check'],
              description: 'Start by identifying all NAF codes that cover the target sector — including adjacent ones. A sector is rarely captured by a single code. In private security for example, alarm system installers sit under 80.20Z while surveillance is 80.10Z. Missing adjacent codes means missing a slice of the market.',
            },
            {
              label: 'Step 2 — Full Market Extraction via DataGouv API',
              steps: ['API Recherche Entreprises', '102 departments queried', 'SIREN deduplication', '46-column CSV'],
              description: 'The DataGouv Recherche Entreprises API is free, requires no API key, and returns up to 46 columns per company — including SIREN, revenue, headcount bracket, legal form, address, directors, and collective agreement.\n\nThe API caps at 10,000 results per query. The workaround: query each of France\'s 102 departments separately, then deduplicate by SIREN. A retry script with exponential backoff handles 429 rate limit errors. The output is a single deduplicated CSV covering the full national market.',
            },
            {
              label: 'Step 3 — Data Cleaning & Filtering',
              steps: ['Remove sole traders (EI)', 'Remove associations & public entities', 'IDCC convention analysis'],
              description: 'Filter out entities that won\'t buy software: sole traders, associations, public bodies, and SCIs. The collective agreement code (IDCC) is a strong signal to confirm sector relevance — companies under the sector-specific IDCC are the confirmed core market. Useful to check data coverage before going further.',
            },
            {
              label: 'Step 4 — INPI Enrichment (Objet Social)',
              steps: ['INPI API auth', 'Objet social per SIREN', 'Incremental save', 'Retry on 401/429'],
              description: 'The NAF code is identical for every company in the sector. The objet social — retrieved from the INPI RNE API — gives the actual stated activity: human surveillance, cash-in-transit, airport security, telecoms monitoring, etc. This is what makes sub-activity segmentation possible.\n\nThe API is limited to 10,000 requests/day and tokens expire, so the script saves progress incrementally in a JSON file and handles automatic re-authentication on 401 errors. About 30% of small companies return 404 — normal, as many are not registered in the commercial registry.',
            },
            {
              label: 'Step 5 — Sub-activity Classification',
              steps: ['Frequency analysis on objet social', 'Regex by category', '80–90% coverage', 'LLM pass for edge cases'],
              description: 'Classify companies into sub-activities using regex on the objet social — not a per-company LLM call, which would be slow and expensive. Regulated sectors use standardised vocabulary, so regex covers 80–90% of companies and typically 97%+ of total revenue. An optional LLM batch pass handles the ambiguous ~10%.',
            },
            {
              label: 'Step 6 — Website Enrichment via N8N + Linkup',
              steps: ['N8N workflow', 'Linkup deep search per company', 'URL extraction', 'Google Sheet output'],
              description: 'Websites are not captured in official registries. An N8N workflow reads the filtered company list, runs a Linkup deep search per company name, extracts the first result that isn\'t Pappers/Infogreffe/Societe.com, and writes the URL back to the sheet. Cost: ~€0.05 per company. Only run on relevant companies — not on the full 15,000-company base.',
            },
          ],
          stats: [
            { value: '46 cols', label: 'per company' },
            { value: '6 steps', label: 'repeatable process' },
            { value: '~€0', label: 'base extraction' },
          ],
          stack: ['Claude Code', 'MCP DataGouv', 'API INPI', 'N8N', 'Linkup', 'Google Sheets'],
        },
      },
    ],
  },
  {
    id: 'newfund',
    name: 'Newfund',
    initials: 'NF',
    color: 'orange',
    subtitle: '$400M AuM · Venture Capital · Paris & San Francisco',
    website: 'https://newfundcap.com/',
    context: 'Newfund is a transatlantic seed VC fund — $400M AuM, investing from pre-seed to Series A across France and the US. Worked as an operating analyst, embedded directly with portfolio founders — automating processes and building internal tools across 15+ missions.',
    projects: [
      {
        id: 'summer-report',
        title: 'Summer Report Automation',
        category: 'automation',
        description:
          'Automated production of seasonal performance reports, from data pull to PDF formatting and distribution. Replaced a fully manual recurring process.',
        apps: ['N8N', 'Google Sheets', 'Claude', 'Canva'],
        clientLogo: '/logo-camping-car-park-trimmed.png',
        detail: {
          problem:
            'Seasonal reports were produced entirely by hand - data collected across multiple spreadsheets, manually formatted, then distributed to different stakeholders. Each cycle took significant time and was prone to errors.',
          objective:
            'Eliminate all manual steps in the seasonal reporting cycle, from data extraction to final PDF distribution, with zero human intervention once triggered.',
          pipeline: [
            { label: 'Google Sheets' },
            { label: 'N8N' },
            { label: 'Claude format' },
            { label: 'PDF report' },
          ],
          stats: [
            { value: 'Seasonal', label: 'cadence' },
            { value: 'Automated', label: 'data pull' },
            { value: '0 manual', label: 'formatting steps' },
          ],
          stack: ['N8N', 'Google Sheets', 'Claude', 'PDF generation'],
          solution:
            'Automated full report production pulls data from Sheets, formats it via Claude into a structured narrative, generates a clean PDF, and distributes it to stakeholders. A process that previously required hours of manual work now runs on schedule with a single trigger.',
          images: [
            'Generated PDF report - structured seasonal performance summary',
            'N8N workflow - data pull, formatting, and distribution pipeline',
          ],
        },
      },
      {
        id: 'knowledge-agent',
        title: 'Internal Knowledge Agent',
        category: 'ai-agent',
        description:
          'AI agent deployed on Dust to make internal knowledge instantly queryable, onboarding docs, processes, and operational know-how answered via natural language.',
        apps: ['Dust', 'Claude', 'Notion', 'RAG'],
        clientLogo: '/logo-camping-car-park-trimmed.png',
        thumbnailUrl: '/knowledge-agent-thumb.png',
        detail: {
          problem:
            'Internal knowledge was scattered across Notion pages and held by specific individuals. Onboarding took time, recurring questions went to the same people, and no one had a reliable way to find process documentation quickly.',
          objective:
            'Make institutional knowledge instantly queryable for the whole team via natural language, removing single-person dependencies for operational questions.',
          pipeline: [
            { label: 'Notion docs' },
            { label: 'Dust ingestion' },
            { label: 'Claude LLM' },
            { label: 'Team query' },
          ],
          stats: [
            { value: 'Instant', label: 'knowledge retrieval' },
            { value: 'RAG', label: 'architecture' },
            { value: 'Full team', label: 'access' },
          ],
          stack: ['Dust', 'Claude', 'Notion', 'Internal docs', 'RAG'],
          solution:
            'Dust agent connected to the full internal knowledge base. Team members type questions in natural language and get accurate, sourced answers in seconds. Onboarding time dropped, recurring questions stopped landing in Slack, and process documentation became genuinely useful.',
        },
      },
      {
        id: 'kpi-alerts',
        title: 'Automated KPI Alerts',
        category: 'automation',
        description:
          'Scheduled automation that reads KPI and alert data from Google Sheets and sends structured email updates to stakeholders automatically.',
        apps: ['N8N', 'Google Sheets', 'Gmail', 'Claude'],
        clientLogo: '/logo-camping-car-park-trimmed.png',
        thumbnailUrl: '/kpi-alerts-thumb.png',
        detail: {
          problem:
            'Operational KPIs lived in Google Sheets but required manual checking and forwarding. Stakeholders were not consistently kept in the loop, and urgent threshold breaches could go unnoticed.',
          objective:
            'Guarantee that the right stakeholders receive structured, actionable KPI updates automatically, triggered by schedule or threshold breach.',
          pipeline: [
            { label: 'Google Sheets' },
            { label: 'N8N trigger' },
            { label: 'Claude summary' },
            { label: 'Auto email' },
          ],
          stats: [
            { value: 'Scheduled', label: 'trigger cadence' },
            { value: 'Threshold', label: 'alert logic' },
            { value: 'Zero', label: 'manual steps' },
          ],
          stack: ['N8N', 'Google Sheets API', 'Gmail', 'Claude'],
          solution:
            'N8N workflow reads KPI data from Sheets on a schedule, uses Claude to generate a clean structured summary with context, and sends it to the right stakeholders. Threshold logic triggers immediate alerts when key metrics go out of range. Manual copy-paste reporting eliminated entirely.',
        },
      },
    ],
  },
]
