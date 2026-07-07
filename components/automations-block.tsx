'use client'

import { useRef, useCallback, useEffect } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProjectCard } from './project-card'
import type { Employer, Project } from '@/lib/data'

interface AutomationsBlockProps {
  items: { project: Project; employer: Employer }[]
  onProjectClick: (project: Project, employer: Employer) => void
}

const STEP = 400   // card width (380) + gap (20)
const SPEED = 65   // px/s auto-scroll speed

export function AutomationsBlock({ items, onProjectClick }: AutomationsBlockProps) {
  const N = items.length
  const tripled = [...items, ...items, ...items]

  const xMV = useMotionValue(-(N * STEP))
  const hoveredRef = useRef(false)
  const animatingRef = useRef(false)
  const rafRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)

  const normalize = useCallback(() => {
    const val = xMV.get()
    if (val < -(2 * N - 1) * STEP) xMV.set(val + N * STEP)
    else if (val > -STEP) xMV.set(val - N * STEP)
  }, [N, xMV])

  // Auto-scroll RAF loop
  useEffect(() => {
    const tick = (time: number) => {
      if (!hoveredRef.current && !animatingRef.current) {
        const dt = lastTimeRef.current ? (time - lastTimeRef.current) / 1000 : 0
        if (dt < 0.1) {
          xMV.set(xMV.get() - SPEED * dt)
          normalize()
        }
      }
      lastTimeRef.current = time
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [normalize, xMV])

  const move = useCallback((dir: 'left' | 'right') => {
    animatingRef.current = true
    const nearest = Math.round(xMV.get() / STEP) * STEP
    const target = nearest + (dir === 'left' ? STEP : -STEP)
    animate(xMV, target, {
      type: 'spring',
      stiffness: 280,
      damping: 34,
      mass: 0.8,
      onComplete: () => {
        normalize()
        animatingRef.current = false
      },
    })
  }, [normalize, xMV])

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
        <button
          onClick={() => move('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a5f] text-white shadow-lg transition-transform duration-150 hover:scale-105 active:scale-95"
        >
          <ChevronLeft size={18} strokeWidth={2} />
        </button>
        <button
          onClick={() => move('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a5f] text-white shadow-lg transition-transform duration-150 hover:scale-105 active:scale-95"
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-[5] bg-gradient-to-r from-background/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-[5] bg-gradient-to-l from-background/70 to-transparent" />

        {/* Track — pause on hover */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => { hoveredRef.current = true }}
          onMouseLeave={() => { hoveredRef.current = false }}
        >
          <motion.div className="flex gap-5 pl-4" style={{ x: xMV }}>
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
