'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProjectCard } from './project-card'
import type { Employer, Project } from '@/lib/data'

interface AutomationsBlockProps {
  items: { project: Project; employer: Employer }[]
  onProjectClick: (project: Project, employer: Employer) => void
}

const STEP = 400 // card width (380) + gap (20)

export function AutomationsBlock({ items, onProjectClick }: AutomationsBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [maxOffset, setMaxOffset] = useState(0)

  const updateMax = useCallback(() => {
    if (!containerRef.current || !trackRef.current) return
    setMaxOffset(Math.max(0, trackRef.current.scrollWidth - containerRef.current.offsetWidth))
  }, [])

  useEffect(() => {
    updateMax()
    const ro = new ResizeObserver(updateMax)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [updateMax])

  const move = (dir: 'left' | 'right') => {
    setOffset(prev =>
      dir === 'right'
        ? Math.min(prev + STEP, maxOffset)
        : Math.max(prev - STEP, 0)
    )
  }

  const atStart = offset <= 0
  const atEnd = offset >= maxOffset
  const showButtons = maxOffset > 0

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
        <div className="flex items-center justify-between">
          <p className="font-mono text-[12px] font-medium text-muted-foreground">
            Automations & Tools
          </p>
          {showButtons && (
            <div className="flex gap-2">
              <button
                onClick={() => move('left')}
                disabled={atStart}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-all duration-150 hover:bg-accent disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={15} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => move('right')}
                disabled={atEnd}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-all duration-150 hover:bg-accent disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <ChevronRight size={15} strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>
        <div className="mt-4 h-px bg-border" />
      </motion.div>

      {/* Carousel */}
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-5 pl-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))]"
          animate={{ x: -offset }}
          transition={{ type: 'spring', stiffness: 300, damping: 34, mass: 0.8 }}
        >
          {items.map(({ project, employer }) => (
            <div key={project.id} className="w-[380px] shrink-0">
              <ProjectCard
                project={project}
                employer={employer}
                onClick={() => onProjectClick(project, employer)}
                showEmployerLogo
              />
            </div>
          ))}
          {/* Trailing space to mirror leading padding */}
          <div className="w-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))] shrink-0" />
        </motion.div>
      </div>
    </div>
  )
}
