'use client'

import { motion } from 'framer-motion'
import { Mail, Linkedin, ArrowUpRight } from 'lucide-react'

const EMAIL = 'leo.lagaize@hexa.com'
const LINKEDIN_URL = 'https://www.linkedin.com/in/leolagaize/'

const contacts = [
  {
    label: 'Email',
    value: 'leo.lagaize@hexa.com',
    href: `mailto:${EMAIL}`,
    icon: Mail,
    description: 'Best way to reach me',
  },
  {
    label: 'LinkedIn',
    value: '/in/leolagaize',
    href: LINKEDIN_URL,
    icon: Linkedin,
    description: 'Connect with me',
  },
]

export function ReachOutSection() {
  return (
    <section id="reach-out" className="scroll-mt-20">
      <div className="mx-auto max-w-5xl px-6 pt-24 pb-32">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 border-b border-border pb-8"
        >
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/40">03</p>
          <h2 className="font-mono text-[clamp(1.4rem,2.2vw,2rem)] font-normal leading-none tracking-tight" style={{ color: '#1e3a5f' }}>
            Reach out
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="mb-4 font-heading text-[clamp(1.8rem,3vw,2.6rem)] font-light leading-tight tracking-tight text-foreground">
              Let&apos;s connect.
            </h3>
            <p className="mb-6 text-[14px] leading-[1.85] text-muted-foreground">
              Whether you want to talk about a project, an opportunity, or just exchange ideas around AI, automation, or startups — I&apos;m always happy to chat. Feel free to reach out directly.
            </p>
            <p className="text-[13px] text-muted-foreground/60">
              I typically respond within 24 hours.
            </p>
          </motion.div>

          {/* Right: contact cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {contacts.map((contact, i) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.label === 'LinkedIn' ? '_blank' : undefined}
                rel={contact.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 4 }}
                className="group flex items-center justify-between rounded-xl border border-border bg-card px-6 py-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background">
                    <contact.icon size={16} strokeWidth={1.5} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-foreground">{contact.label}</p>
                    <p className="font-mono text-[11px] text-muted-foreground/60">{contact.value}</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="text-muted-foreground/30 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground/60"
                />
              </motion.a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
