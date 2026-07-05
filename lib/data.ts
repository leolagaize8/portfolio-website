export type ProjectCategory = 'webapp' | 'automation' | 'ai-agent' | 'research'

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
  pipeline: PipelineStep[]
  stats: [StatItem, StatItem, StatItem]
  stack: string[]
  solution: string
  images: string[]
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
        title: 'Coverage',
        category: 'automation',
        description:
          'A market-coverage engine that reads external deal newsletters, filters them against the investment thesis, cross-checks every deal against the CRM, and emails the team a curated weekly digest backed by a live coverage dashboard.',
        apps: ['N8N', 'GPT-4.1', 'Google Sheets', 'Attio', 'Gmail'],
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
              steps: ['Gmail Trigger', 'Text Parser', 'GPT-4.1 Filter', 'Google Sheets', 'Attio Match', 'Stage Lookup'],
              imageUrl: '/coverage-n8n-avolta.png',
              description:
                'A resilient text parser handles Avolta\'s formatting quirks (quoted-printable breaks, starred vs. plain company headers), splits the newsletter into individual deals, and extracts amounts, tags, and dates. A GPT-4.1 pass then applies the thesis filter — keeping only clearly B2B software in the €2–25m range; dropping seed rounds, hardware, biotech, consumer, and anything outside the band.\n\nEvery kept deal is written to the Google Sheet, then cross-referenced against Attio: the workflow searches the CRM by company name, and on a match queries the deal-flow list to pull that company\'s current stage (Tracking, Unresponsive, Passed, Lost…). Each row is tagged in-CRM or not, and enriched with its stage.',
            },
            {
              label: 'Fusacq — M&A & Advised Operations',
              steps: ['Gmail Trigger', 'LLM Classify', 'LLM Extract', 'Loop + HTTP Scrape', 'GPT-4.1 Describe', 'Thesis Filter', 'Google Sheets', 'Attio Match'],
              imageUrl: '/coverage-n8n-fusacq.png',
              description:
                'A stricter, multi-stage pipeline. A first LLM classifies whether the email even contains a real deal (vs. agendas, webinars, directory noise). If it does, a second LLM extracts each deal, then the workflow loops over them — fetching each source article, generating a grounded deal + company description under explicit anti-hallucination rules, and running a per-deal thesis filter.\n\nLLMs are boxed in as narrow, single-purpose steps (classify → extract → describe → filter), each with strict JSON-only outputs — so failures stay isolated and debuggable, rather than one fragile do-everything prompt.',
            },
            {
              label: 'Weekly Digest & Dashboard',
              steps: ['Schedule Trigger', 'Google Sheets', 'GPT-4.1 Render', 'Apps Script PDF', 'Gmail'],
              imageUrl: '/coverage-n8n-reporting.png',
              description:
                'A scheduled workflow (Mondays, 5pm) reads the week\'s deals, computes the date window, and has GPT-4.1 render them into a fixed HTML email — normalizing company names, splitting Fundraising from Exits, deduplicating companies that appeared in both sources (keeping the richer Fusacq data), and writing a 2–3 line synthesis per deal.\n\nIt then calls a Google Apps Script endpoint that captures the live dashboard as a PDF, attaches it, and sends the Scale Reporting digest to the full team. The dashboard turns the raw log into coverage metrics: total deals seen, VC vs. M&A split, coverage rate, weekly volume chart, and breakdown by CRM stage.',
            },
          ],
          pipeline: [
            { label: 'Gmail' },
            { label: 'N8N Parse' },
            { label: 'GPT-4.1' },
            { label: 'Attio Match' },
            { label: 'Google Sheets' },
            { label: 'Weekly Digest' },
          ],
          stats: [
            { value: '192', label: 'deals tracked' },
            { value: '24%', label: 'CRM coverage' },
            { value: 'Weekly', label: 'auto-digest' },
          ],
          stack: ['N8N', 'GPT-4.1', 'Google Sheets', 'Google Apps Script', 'Attio API', 'Gmail'],
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
        title: 'Conference Sourcing Skill',
        category: 'ai-agent',
        description:
          'Reusable Claude skill that takes any trade show exhibitor list, scores each company against the investment thesis, and outputs a structured shortlist automatically.',
        apps: ['Claude', 'SKILL.md', 'Web scraping', 'N8N'],
        detail: {
          problem:
            'Manually reviewing exhibitor lists before trade shows was slow and inconsistent. Different people applied different criteria, and relevant targets were often missed or deprioritized.',
          objective:
            'Design a reusable Claude skill that turns any exhibitor list into a scored, thesis-filtered shortlist in minutes, pluggable into the broader sourcing workflow.',
          pipeline: [
            { label: 'Exhibitor list' },
            { label: 'Claude Skill' },
            { label: 'Score and filter' },
            { label: 'Sourcing output' },
          ],
          stats: [
            { value: 'Any event', label: 'as input' },
            { value: 'AI scoring', label: 'thesis-fit' },
            { value: 'Reusable', label: 'plug and play' },
          ],
          stack: ['Claude', 'SKILL.md framework', 'Web scraping', 'N8N'],
          solution:
            'Reusable SKILL.md that takes any conference exhibitor list, scores companies against the thesis, and returns a ranked shortlist. Plugged into the broader sourcing workflow so conference prep now takes minutes instead of hours. Any team member can trigger it with a single paste.',
          images: [
            'Skill input - raw exhibitor list from any trade show',
            'Output - ranked shortlist with thesis-fit rationale per company',
          ],
        },
      },
      {
        id: 'market-research',
        title: 'Bottom-Up Market Research',
        category: 'research',
        description:
          'Structured bottom-up market sizing methodology for live deal evaluation, mapping addressable markets from first principles to validate or challenge founder assumptions.',
        apps: ['Claude', 'Perplexity', 'React', 'Recharts'],
        detail: {
          problem:
            'Founder TAM claims are almost never stress-tested. Standard top-down market sizing accepts inflated figures at face value and rarely surfaces the real addressable opportunity.',
          objective:
            'Establish a repeatable, founder-independent methodology to size any market from first principles before conviction, generating deal-ready output that holds up under scrutiny.',
          pipeline: [
            { label: 'Sector mapping' },
            { label: 'Claude research' },
            { label: 'Perplexity data' },
            { label: 'React dashboard' },
          ],
          stats: [
            { value: 'Bottom-up', label: 'methodology' },
            { value: 'First principles', label: 'sizing' },
            { value: 'Deal-ready', label: 'output format' },
          ],
          stack: ['Claude', 'Perplexity', 'React', 'Recharts', 'Structured prompting'],
          solution:
            'Repeatable research process combining Claude and Perplexity for data gathering with a structured bottom-up sizing formula (unit economics × addressable units × penetration rate). Output is an interactive React dashboard built for deal review, showing scenario ranges and sensitivity to key assumptions.',
          images: [
            'Market sizing dashboard - TAM breakdown with scenario ranges',
            'Unit economics view - bottom-up build from first principles',
          ],
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
          images: [
            'Dust agent interface - natural language query with sourced answer',
            'Knowledge base structure - Notion docs indexed and searchable',
          ],
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
          images: [
            'Email output - structured KPI summary with metric highlights',
            'N8N workflow - threshold logic and scheduled trigger setup',
          ],
        },
      },
      {
        id: 'press-monitor',
        title: 'Press and Mentions Monitor',
        category: 'automation',
        description:
          'Automated tracker for press coverage and online mentions of the fund, its partners, and team members, filtered with Claude and delivered as a clean weekly digest.',
        apps: ['N8N', 'Claude', 'RSS', 'Email digest'],
        detail: {
          problem:
            'Tracking press mentions required constant manual searching with no reliable way to catch everything. Important coverage was often missed or found too late.',
          objective:
            'Build a fully automated media tracking system that covers all relevant channels and delivers clean, noise-free weekly digests to the team.',
          pipeline: [
            { label: 'RSS / Web' },
            { label: 'N8N monitor' },
            { label: 'Claude filter' },
            { label: 'Weekly digest' },
          ],
          stats: [
            { value: 'Automated', label: 'monitoring' },
            { value: 'Fund + team', label: 'coverage scope' },
            { value: 'Weekly', label: 'digest cadence' },
          ],
          stack: ['N8N', 'Claude', 'RSS feeds', 'Email digest'],
          solution:
            'Automated monitoring pipeline ingests RSS feeds and web sources, uses Claude to filter noise and assess relevance, then compiles a clean weekly digest. The team stays on top of media presence without any manual effort. Coverage scope includes the fund, all partners, and named team members.',
          images: [
            'Weekly digest email - curated mentions with relevance score',
            'Coverage scope view - sources monitored per entity',
          ],
        },
      },
    ],
  },
]
