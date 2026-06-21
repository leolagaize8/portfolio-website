'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Mail } from 'lucide-react'

const ROLES = ['automations', 'tech', 'startups', 'operating', 'venture capital', 'building']
const EMAIL = 'leo.lagaize@hexa.com'
const LINKEDIN_URL = 'https://www.linkedin.com/in/leolagaize/'

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
          setTimeout(() => {
            setWaiting(false)
            setDeleting(true)
          }, 1600)
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
      className="relative flex min-h-[calc(100vh-56px)] items-center justify-center scroll-mt-14"
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">

        {/* Emoji avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7"
        >
          <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border border-border bg-white/80 shadow-lg backdrop-blur-sm" style={{ outline: '3px solid rgba(30,58,95,0.12)', outlineOffset: '3px' }}>
            <span className="text-[64px] leading-none select-none">👨🏽‍💻</span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 font-heading text-[clamp(3rem,7vw,5.5rem)] font-bold leading-none tracking-tight"
          style={{ color: '#1e3a5f' }}
        >
          Leo Lagaize
        </motion.h1>

        {/* Typewriter */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-7 text-[1.25rem] text-foreground/70"
        >
          I love &quot;<Typewriter />&quot;
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-9 max-w-lg text-[15px] leading-[1.85] text-muted-foreground"
        >
          Welcome to my page! Here you&apos;ll find some of my projects across startups, automation, and shipping things.
          I&apos;m always happy to connect — feel free to reach out.
        </motion.p>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 flex items-center gap-3"
        >
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/80 text-foreground/50 shadow-sm backdrop-blur-sm transition-all hover:scale-105 hover:text-foreground"
          >
            <Linkedin size={16} strokeWidth={1.5} />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/80 text-foreground/50 shadow-sm backdrop-blur-sm transition-all hover:scale-105 hover:text-foreground"
          >
            <Mail size={16} strokeWidth={1.5} />
          </a>
        </motion.div>

        {/* Paris indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-7 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/50"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          Based in Paris
        </motion.div>
      </div>
    </section>
  )
}
