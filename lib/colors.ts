import type { ProjectCategory } from './data'

export const categoryColors: Record<
  ProjectCategory,
  { badge: string; dot: string }
> = {
  webapp: {
    badge: 'text-blue-600 bg-blue-50 border-blue-100 dark:text-blue-400 dark:bg-blue-950/40 dark:border-blue-900/50',
    dot: 'bg-blue-500 dark:bg-blue-400',
  },
  automation: {
    badge: 'text-violet-600 bg-violet-50 border-violet-100 dark:text-violet-400 dark:bg-violet-950/40 dark:border-violet-900/50',
    dot: 'bg-violet-500 dark:bg-violet-400',
  },
  'ai-agent': {
    badge: 'text-emerald-700 bg-emerald-50 border-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/40 dark:border-emerald-900/50',
    dot: 'bg-emerald-500 dark:bg-emerald-400',
  },
  research: {
    badge: 'text-amber-700 bg-amber-50 border-amber-100 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-900/50',
    dot: 'bg-amber-500 dark:bg-amber-400',
  },
}

export const employerAvatarColors = {
  purple: 'bg-violet-50 text-violet-600 ring-1 ring-violet-100 dark:bg-violet-950/50 dark:text-violet-400 dark:ring-violet-900/50',
  orange: 'bg-orange-50 text-orange-600 ring-1 ring-orange-100 dark:bg-orange-950/50 dark:text-orange-400 dark:ring-orange-900/50',
} as const
