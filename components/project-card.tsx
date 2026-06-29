'use client'

import { ArrowUpRight, Mail, Globe, FileText, Newspaper, Database, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'
import { categoryLabels } from '@/lib/data'
import type { Project, Employer } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { LucideIcon } from 'lucide-react'

type BadgeVariant = 'blue' | 'purple' | 'green' | 'amber'

const categoryBadgeVariant: Record<string, BadgeVariant> = {
  webapp: 'blue',
  automation: 'purple',
  'ai-agent': 'green',
  research: 'amber',
}

const employerTopBorder = {
  purple: 'border-t-violet-300',
  orange: 'border-t-orange-300',
} as const

const photoZoneBg = {
  purple: 'from-violet-50 via-slate-50 to-indigo-50',
  orange: 'from-orange-50 via-slate-50 to-amber-50',
} as const

type IconDef =
  | { type: 'cdn'; slug: string }
  | { type: 'local'; src: string }
  | { type: 'lucide'; icon: LucideIcon }
  | { type: 'text'; initials: string }

const toolIcons: Record<string, IconDef> = {
  'Next.js':       { type: 'cdn', slug: 'nextdotjs' },
  'N8N':           { type: 'cdn', slug: 'n8n' },
  'OpenAI':        { type: 'cdn', slug: 'anthropic' },
  'Claude':        { type: 'cdn', slug: 'anthropic' },
  'Perplexity':    { type: 'cdn', slug: 'perplexity' },
  'React':         { type: 'cdn', slug: 'react' },
  'Notion':        { type: 'cdn', slug: 'notion' },
  'Google Sheets': { type: 'cdn', slug: 'googlesheets' },
  'Gmail':         { type: 'cdn', slug: 'gmail' },
  'RSS':           { type: 'cdn', slug: 'rss' },
  'Vercel':        { type: 'cdn', slug: 'vercel' },
  'TypeScript':    { type: 'cdn', slug: 'typescript' },
  'Dust':          { type: 'local', src: '/dust.jpeg' },
  'Email':         { type: 'cdn', slug: 'gmail' },
  'Email digest':  { type: 'cdn', slug: 'gmail' },
  'SMTP':          { type: 'cdn', slug: 'gmail' },
  'Web scraping':  { type: 'lucide', icon: Globe },
  'Canva':         { type: 'cdn', slug: 'canva' },
  'PDF':           { type: 'lucide', icon: FileText },
  'PDF generation':{ type: 'lucide', icon: FileText },
  'News APIs':     { type: 'lucide', icon: Newspaper },
  'RSS / News APIs':{ type: 'lucide', icon: Newspaper },
  'CRM':           { type: 'lucide', icon: Database },
  'PhantomBuster': { type: 'local', src: '/phantombuster.png' },
  'FullEnrich':    { type: 'local', src: '/fullenrich.png' },
  'Lemlist':       { type: 'local', src: '/lemlist.png' },
  'SKILL.md':      { type: 'text', initials: 'SK' },
  'Recharts':      { type: 'text', initials: 'RC' },
  'RAG':           { type: 'text', initials: 'RAG' },
}

export function ToolIcon({ name }: { name: string }) {
  const def = toolIcons[name]

  return (
    <div
      title={name}
      className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-white shadow-sm"
    >
      {!def || def.type === 'text' ? (
        <span className="font-mono text-[8px] font-semibold text-muted-foreground">
          {def ? def.initials : name.slice(0, 2).toUpperCase()}
        </span>
      ) : def.type === 'lucide' ? (
        <def.icon size={13} strokeWidth={1.5} className="text-muted-foreground/60" />
      ) : def.type === 'local' ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={def.src} alt={name} className="h-4 w-4 object-contain" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.simpleicons.org/${def.slug}`}
          alt={name}
          className="h-4 w-4 object-contain"
        />
      )}
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  employer: Employer
  onClick: () => void
  showEmployerLogo?: boolean
}

export function ProjectCard({ project, employer, onClick, showEmployerLogo }: ProjectCardProps) {
  return (
    <button onClick={onClick} className="group h-full w-full text-left">
      <Card
        className={cn(
          'flex h-full flex-col overflow-hidden border-t-2 transition-all duration-300',
          employerTopBorder[employer.color],
          'hover:shadow-md hover:-translate-y-0.5',
        )}
      >
        <CardContent className="flex flex-1 flex-col p-0">
          {/* Photo zone */}
          <div className={cn(
            'relative flex h-40 items-center justify-center bg-gradient-to-br',
            photoZoneBg[employer.color],
          )}>
            <div className="flex flex-col items-center gap-2 opacity-30">
              <Monitor size={28} strokeWidth={1} />
            </div>
            {showEmployerLogo && (
              <div className="absolute top-2 right-2 flex items-center rounded-md bg-white/90 px-2 py-1 shadow-sm backdrop-blur-sm">
                {employer.id === 'hexa-scale' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="/hexa-logo.svg" alt="Hexa Scale" className="h-4 w-auto" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="/newfund-logo.png" alt="Newfund" className="h-3.5 w-auto" />
                )}
              </div>
            )}
          </div>

          {/* Header row */}
          <div className="flex items-start justify-between px-5 pt-4 pb-4">
            <Badge variant={categoryBadgeVariant[project.category]}>
              {categoryLabels[project.category]}
            </Badge>
            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
              className="mt-0.5 shrink-0 text-muted-foreground/60 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground/80"
            />
          </div>

          {/* Title + description */}
          <div className="flex flex-1 flex-col px-5 pb-5">
            <h3 className="mb-2 font-heading text-[17px] font-bold leading-snug tracking-tight text-foreground">
              {project.title}
            </h3>
            <p className="mb-5 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            {/* Stats */}
            <div className="mb-5 grid grid-cols-3 gap-3 rounded-lg bg-muted/60 px-4 py-3">
              {project.detail.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-mono text-[13px] font-semibold text-foreground">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 font-mono text-[9px] uppercase tracking-wide text-muted-foreground/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tool icons */}
            <div className="mt-auto flex flex-wrap gap-2">
              {project.apps.map((app) => (
                <ToolIcon key={app} name={app} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  )
}
