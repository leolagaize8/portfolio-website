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
  flows?: Flow[]
  keyDecisions?: string
}

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  description: string
  apps: string[]
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
          keyDecisions:
            'Scoring logic lives in N8N, not in Git — the app sends companies and receives scores without knowing how they\'re computed. The thesis prompt can be tuned without a redeploy.\n\nDrip-feed sourcing to cut LinkedIn ban risk — PhantomBuster runs in batches of 10 (~150 companies/day) via a Vercel Cron windowed to Paris working hours, draining a 2,000-prospect queue over 10–14 days instead of hammering LinkedIn in one burst.\n\nThe re-engagement agent\'s reasoning lives in a SKILL.md in a connected GitHub repo: full step-by-step process, annotated gold-standard examples, counter-examples, and a mandatory self-critique loop. Confidence (high / medium / low) is a first-class output — "low" is expected when scraped data is too thin, not a prompt for hallucination.\n\nMigrated N8N from Airtable nodes to raw HTTP Request nodes against the Neon API, rebuilding every node\'s data references and writing a multi-pass JSON parser to survive imperfect LLM outputs.',
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
        id: 'deal-newsletter',
        title: 'Deal Flow Newsletter',
        category: 'automation',
        description:
          'Automated internal newsletter monitoring deal sources, filtering companies matching the investment thesis with Claude, and delivering a structured digest to the team.',
        apps: ['N8N', 'Claude', 'RSS', 'Email'],
        detail: {
          problem:
            'Tracking new companies matching the thesis required constant manual monitoring across multiple sources. The team had no reliable signal without dedicated time spent searching.',
          objective:
            'Create a zero-touch recurring pipeline that surfaces thesis-relevant companies from the web and delivers them directly to the team inbox on a set schedule.',
          pipeline: [
            { label: 'RSS / Sources' },
            { label: 'N8N' },
            { label: 'Claude filter' },
            { label: 'Email digest' },
          ],
          stats: [
            { value: 'Recurring', label: 'auto-scheduled' },
            { value: 'AI', label: 'thesis-fit filtering' },
            { value: 'Zero', label: 'manual steps' },
          ],
          stack: ['N8N', 'Claude', 'RSS feeds', 'SMTP'],
          solution:
            'Automated pipeline that monitors deal sources on a schedule, filters companies against the investment thesis using Claude, and delivers a structured digest. Replaced ad hoc manual monitoring entirely. The team receives a clean, scored list without opening a single browser tab.',
          images: [
            'Email digest - structured company list with thesis-fit scores',
            'N8N workflow - source monitoring and Claude filtering logic',
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
