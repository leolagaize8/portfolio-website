'use client'

import Link from 'next/link'
import { motion, useScroll, useSpring } from 'framer-motion'

export function Nav() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-6">
      <div className="relative flex h-13 w-full max-w-2xl items-center justify-center gap-1 overflow-hidden rounded-2xl border border-border bg-card/90 px-5 shadow-sm backdrop-blur-md">

        {/* Logo */}
        <Link
          href="/"
          className="mr-auto font-mono text-[13px] font-semibold tracking-tight text-foreground transition-colors hover:text-foreground/70"
        >
          Leo Lagaize
        </Link>

        {/* Nav links */}
        <Link
          href="#about-me"
          className="inline-flex h-8 items-center rounded-lg px-3.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          About
        </Link>
        <Link
          href="#projects"
          className="inline-flex h-8 items-center rounded-lg px-3.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Projects
        </Link>

        {/* Get in touch — CTA button */}
        <Link
          href="#reach-out"
          className="ml-2 inline-flex h-8 items-center rounded-lg bg-foreground px-4 text-[13px] font-medium text-background transition-opacity hover:opacity-80"
        >
          Get in touch
        </Link>

        {/* Scroll progress — bottom edge of pill */}
        <motion.div
          style={{ scaleX, transformOrigin: '0%' }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1e3a5f]"
        />

      </div>
    </header>
  )
}
