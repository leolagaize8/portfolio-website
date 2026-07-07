'use client'

import { useCallback } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProjectCard } from './project-card'
import type { Employer, Project } from '@/lib/data'

interface AutomationsBlockProps {
  items: { project: Project; employer: Employer }[]
  onProjectClick: (project: Project, employer: Employer) => void
}

const STEP = 400 // card width (380) + gap (20)

export function AutomationsBlock({ items, onProjectClick }: AutomationsBlockProps) {
  const N = items.length
  // Triple-buffer for seamless infinite loop
  const tripled = [...items, ...items, ...items]

  // Start at the middle copy so we can go left or right freely
  const xMV = useMotionValue(-(N * STEP))

  const move = useCallback((dir: 'left' | 'right') => {
    const current = xMV.get()
    const target = current + (dir === 'left' ? STEP : -STEP)

    animate(xMV, target, {
      type: 'spring',
      stiffness: 280,
      damping: 34,
      mass: 0.8,
      onComplete: () => {
        // Silently snap back to middle copy — invisible because copies are identical
        const val = xMV.get()
        if (val < -(2 * N - 1) * STEP) xMV.set(val + N * STEP)
        else if (val > -STEP) xMV.set(val - N * STEP)
      },
    })
  }, [N, xMV])

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

      {/* Carousel */}
      <div className="relative">
        {/* Left arrow — overlaps the first visible card */}
        <button
          onClick={() => move('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a5f] text-white shadow-lg transition-transform duration-150 hover:scale-105 active:scale-95"
        >
          <ChevronLeft size={18} strokeWidth={2} />
        </button>

        {/* Right arrow */}
        <button
          onClick={() => move('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a5f] text-white shadow-lg transition-transform duration-150 hover:scale-105 active:scale-95"
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>

        {/* Edge fade hints */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-[5] bg-gradient-to-r from-background/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-[5] bg-gradient-to-l from-background/60 to-transparent" />

        {/* Track */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-5 pl-4"
            style={{ x: xMV }}
          >
            {tripled.map(({ project, employer }, i) => (
              <div key={`${project.id}-${i}`} className="w-[380px] shrink-0">
                <ProjectCard
                  project={project}
                  employer={employer}
                  onClick={() => onProjectClick(project, employer)}
                  showEmployerLogo
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
