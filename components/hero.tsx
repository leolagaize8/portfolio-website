'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const ROLES = ['startups', 'automations', 'tech', 'operating', 'backing builders', 'building']

function Typewriter() {
  const [text, setText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [waiting, setWaiting] = useState(false)

  useEffect(() => {
    if (waiting) return
    const current = ROLES[roleIndex]
    const speed = deleting ? 45 : 85

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1))
        } else {
          setWaiting(true)
          setTimeout(() => { setWaiting(false); setDeleting(true) }, 1600)
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1))
        } else {
          setDeleting(false)
          setRoleIndex((i) => (i + 1) % ROLES.length)
        }
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [text, deleting, roleIndex, waiting])

  return (
    <span style={{ color: '#1e3a5f' }}>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export function Hero() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center scroll-mt-20"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-12 px-8 pt-16 lg:gap-16 lg:px-16">

        {/* Left: content */}
        <div className="flex flex-1 flex-col">

          {/* I love typewriter */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 font-mono text-[13px] text-muted-foreground/60"
          >
            I love &quot;<Typewriter />&quot;
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 text-[clamp(2rem,3.6vw,3.6rem)] font-bold leading-[1.1] tracking-normal"
            style={{ color: '#1e3a5f', fontFamily: 'var(--font-urbanist)' }}
          >
            Building cool AI products for investment funds and their portcos.
          </motion.h1>

          {/* Sub text */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 max-w-md text-[15px] leading-[1.8] text-muted-foreground"
          >
            Final year ESCP MiM student. I spent my gap year in the tech ecosystem,
            working in two investment funds — as an investor and operator.
            I&apos;m always happy to connect — feel free to reach out.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3.5 text-[14px] font-medium text-foreground shadow-sm transition-all hover:shadow-md hover:border-foreground/20"
            >
              View my projects
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => document.getElementById('reach-out')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center rounded-xl px-6 py-3.5 text-[14px] font-medium text-background transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#1e3a5f' }}
            >
              Get in touch
            </button>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/40"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Hexa / Newfund — Paris
          </motion.div>
        </div>

        {/* Right: photo */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="hidden shrink-0 lg:block"
          style={{ width: 'min(28%, 360px)' }}
        >
          <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '3/4' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.jpg"
              alt="Leo Lagaize"
              className="h-full w-full object-cover"
              style={{ objectPosition: '50% 22%' }}
            />
            {/* Caption */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-5 pb-5 pt-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                Leo Lagaize · Hexa / Newfund
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
