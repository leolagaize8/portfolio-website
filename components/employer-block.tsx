'use client'

import { motion } from 'framer-motion'
import { ProjectCard } from './project-card'
import { cn } from '@/lib/utils'
import type { Employer, Project } from '@/lib/data'

interface EmployerBlockProps {
  employer: Employer
  onProjectClick: (project: Project) => void
}

const accentText = {
  purple: 'text-violet-600',
  orange: 'text-[#1e3a5f]',
} as const

function EmployerLogo({ employer }: { employer: Employer }) {
  const logo =
    employer.id === 'hexa-scale' ? (
      <img src="/hexa-logo.svg" alt="Hexa Scale" className="h-12 w-auto" />
    ) : (
      <div className="inline-flex items-center rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-black/[0.06]">
        <img src="/newfund-logo.png" alt="Newfund" className="h-9 w-auto" />
      </div>
    )

  if (employer.website) {
    return (
      <a href={employer.website} target="_blank" rel="noopener noreferrer" className="inline-flex transition-opacity hover:opacity-70">
        {logo}
      </a>
    )
  }
  return logo
}

export function EmployerBlock({ employer, onProjectClick }: EmployerBlockProps) {
  const looped = [...employer.projects, ...employer.projects]

  return (
    <div className="mb-24 last:mb-0">
      {/* Employer header — aligned with hero text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 px-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))]"
      >
        <div className="mb-3">
          <EmployerLogo employer={employer} />
        </div>
        <p className={cn('mb-1.5 font-mono text-[10px] uppercase tracking-widest font-medium', accentText[employer.color])}>
          {employer.subtitle}
        </p>
        {employer.context && (
          <p className="text-[13px] text-muted-foreground">{employer.context}</p>
        )}
        <div className="mt-6 h-px bg-border" />
      </motion.div>

      {/* Marquee */}
      <div className="overflow-hidden">
        <div className="marquee-track flex gap-5 pl-4">
          {looped.map((project, i) => (
            <div key={`${project.id}-${i}`} className="w-[380px] shrink-0">
              <ProjectCard
                project={project}
                employer={employer}
                onClick={() => onProjectClick(project)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
