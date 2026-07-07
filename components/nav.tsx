'use client'

import Link from 'next/link'
import { motion, useScroll, useSpring } from 'framer-motion'

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export function Nav() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-6">
      <div className="relative flex h-13 w-full max-w-2xl items-center justify-center gap-1 overflow-hidden rounded-2xl border border-border bg-card/90 px-5 shadow-sm backdrop-blur-md">

        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mr-auto font-mono text-[13px] font-semibold tracking-tight text-[#1e3a5f] transition-colors hover:text-[#1e3a5f]/70"
        >
          Leo Lagaize
        </button>

        {/* Nav links */}
        <button
          onClick={() => scrollTo('about-me')}
          className="inline-flex h-8 items-center rounded-lg px-3.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          About
        </button>
        <button
          onClick={() => scrollTo('projects')}
          className="inline-flex h-8 items-center rounded-lg px-3.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Projects
        </button>

        {/* Get in touch — CTA button */}
        <button
          onClick={() => scrollTo('reach-out')}
          className="ml-2 inline-flex h-8 items-center rounded-lg bg-[#1e3a5f] px-4 text-[13px] font-medium text-white transition-opacity hover:opacity-80"
        >
          Get in touch
        </button>

        {/* Scroll progress — bottom edge of pill */}
        <motion.div
          style={{ scaleX, transformOrigin: '0%' }}
          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1e3a5f]"
        />

      </div>
    </header>
  )
}
