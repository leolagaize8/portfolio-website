'use client'

import { motion } from 'framer-motion'

const experiences = [
  {
    initials: 'HS',
    logo: '/logo-hexa-shape.svg',
    logoBg: 'bg-white',
    color: 'bg-purple-100 text-purple-700',
    role: 'Software Investor',
    company: 'Hexa',
    period: 'Jan 2026 to present',
    tag: 'Internship',
  },
  {
    initials: 'NF',
    logo: '/logo-newfund.png',
    logoBg: 'bg-white',
    color: 'bg-orange-100 text-orange-700',
    role: 'VC Operating Analyst',
    company: 'Newfund',
    period: 'Jun – Dec 2025',
    tag: 'Internship',
  },
  {
    initials: 'NT',
    logo: '/logo-noa.png',
    logoBg: 'bg-white',
    color: 'bg-sky-100 text-sky-700',
    role: 'Operations',
    company: 'Noa Technologies',
    period: 'Jul 2024 – Apr 2025',
    tag: 'Freelance',
  },
  {
    initials: 'WB',
    logo: '/logo-warwick.jpg',
    logoBg: 'bg-white',
    color: 'bg-red-100 text-red-700',
    role: 'Fundraising Lead',
    company: 'Warwick Boring',
    period: 'Oct 2021 – Oct 2023',
    tag: 'Student venture',
  },
  {
    initials: 'ST',
    logo: '/logo-stellantis.jpeg',
    logoBg: 'bg-[#1e3a9f]',
    color: 'bg-blue-100 text-blue-700',
    role: 'Business Analyst',
    company: 'Stellantis',
    period: 'Jul – Dec 2022',
    tag: 'Internship',
  },
]

export function AboutSection() {
  return (
    <section id="about-me" className="scroll-mt-24 pt-6 pb-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 border-b border-border pb-4"
        >
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/40">01</p>
          <h2 className="font-mono text-[clamp(1.4rem,2.2vw,2rem)] font-normal leading-none tracking-tight" style={{ color: '#1e3a5f' }}>
            About
          </h2>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Left: bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <p className="mb-6 text-[13px] font-medium text-muted-foreground/50 uppercase tracking-widest font-mono">Now</p>
            <div className="space-y-5 text-[14px] leading-[1.85] text-muted-foreground">
              {[
                "I'm a final-year MIM student at ESCP. Alongside my studies, I've always found myself pulled towards building things — first with a student team, where we raised €200k to design, build and ship a tunnel boring machine to Vegas for a competition organised by The Boring Company, then worked part-time as an operator at Noa Technologies, a SF startup.",
                "During my gap year, I went deeper into tech and investing. At Newfund (seed VC), I worked as an operating analyst, working directly with founders on operating missions and shipping automations across portfolio companies. I then joined Hexa Scale on the investment side — sourcing, analysing opportunities, and running due diligence on European vertical SaaS. Along the way, I took the initiative to build Scale Sourcing: an AI-powered platform that streamlines the sourcing process, rates opportunities, and automates outreach. It's now used by the entire team.",
                "I'm now looking to keep working at the frontier — across operations, product, strategy, and automation — in environments where things move fast and building actually matters.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Right: experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <p className="mb-6 text-[13px] font-medium text-muted-foreground/50 uppercase tracking-widest font-mono">Background</p>
            <div className="space-y-1">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-4 rounded-xl px-3 py-4 transition-colors hover:bg-muted/50"
                >
                  <div className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl ${exp.logo ? exp.logoBg : exp.color} border border-border`}>
                    {exp.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={exp.logo} alt={exp.company} className="h-full w-full object-contain p-1" />
                    ) : (
                      <span className="font-mono text-[11px] font-bold">{exp.initials}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-medium text-foreground">{exp.role}</p>
                      <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[9px] text-muted-foreground/60">{exp.tag}</span>
                    </div>
                    <p className="text-[12px] text-muted-foreground">{exp.company}</p>
                  </div>
                  <p className="shrink-0 font-mono text-[11px] text-muted-foreground/50">{exp.period}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
