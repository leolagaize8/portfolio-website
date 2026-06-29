'use client'

import { motion } from 'framer-motion'
import { ProjectCard } from './project-card'
import type { Employer, Project } from '@/lib/data'

interface AutomationsBlockProps {
  items: { project: Project; employer: Employer }[]
  onProjectClick: (project: Project, employer: Employer) => void
}

export function AutomationsBlock({ items, onProjectClick }: AutomationsBlockProps) {
  const looped = [...items, ...items]

  return (
    <div>
      {/* Subheader */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 px-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))]"
      >
        <p className="mb-4 font-mono text-[12px] font-medium text-muted-foreground">
          Automations & Tools
        </p>
        <div className="h-px bg-border" />
      </motion.div>

      {/* Marquee */}
      <div className="overflow-hidden">
        <div className="marquee-track flex gap-5 pl-4" style={{ animationDuration: '53s' }}>
          {looped.map(({ project, employer }, i) => (
            <div key={`${project.id}-${i}`} className="w-[380px] shrink-0">
              <ProjectCard
                project={project}
                employer={employer}
                onClick={() => onProjectClick(project, employer)}
                showEmployerLogo
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
