'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -70])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -35])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 50])

  return (
    <section ref={sectionRef} id="about-me" className="scroll-mt-20">
      <div className="flex min-h-[600px] items-center">

        {/* Left: text */}
        <div className="flex-1 px-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))] py-20 pr-10">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 border-b border-border pb-7"
          >
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/40">01</p>
            <h2 className="font-mono text-[clamp(1.4rem,2.2vw,2rem)] font-normal leading-none tracking-tight" style={{ color: '#1e3a5f' }}>
              About
            </h2>
          </motion.div>

          {/* Bio */}
          <div className="max-w-xl space-y-5 text-[14px] leading-[1.85] text-muted-foreground">
            {[
              "I'm a final-year MIM student at ESCP. Alongside my studies, I've always found myself pulled towards building things—first with a student team, where we raised €200k to design, build and ship a tunnel boring machine to Vegas for a competition organised by The Boring Company, then worked part-time as an operator at Noa Technologies, a SF startup.",
              "During my gap year, I went deeper into tech and investing. At Newfund (seed VC), I worked as an operating analyst, working directly with founders on operating missions and shipping automations across portfolio companies. I then joined Hexa Scale on the investment side—sourcing, analysing opportunities, and running due diligence on European vertical SaaS. Along the way, I took the initiative to build Scale Sourcing: an AI-powered platform that streamlines the sourcing process, rates opportunities, and automates outreach. It's now used by the entire team.",
              "I'm now looking to keep working at the frontier—across operations, product, strategy, and automation—in environments where things move fast and building actually matters.",
              "Outside of work, I'm usually near the ocean—around Antibes, where I grew up, or somewhere further out. I free dive and scuba dive. It's where I find the most elegant systems ever built, and a good reminder that there's a world outside the laptop.",
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Right: photo cluster */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hidden w-[44%] shrink-0 items-center justify-start pl-6 lg:flex"
        >
          <div className="relative h-[550px] w-[550px]">

            {/* Diving — top left */}
            <motion.div
              style={{ y: y1 }}
              whileHover={{ scale: 1.06, rotate: -4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="absolute top-0 left-0 z-10 h-[230px] w-[230px] cursor-pointer overflow-hidden rounded-full ring-[3px] ring-background"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/profile-1.jpg" alt="" className="h-full w-full object-cover object-center" />
            </motion.div>

            {/* Sunset — bottom right */}
            <motion.div
              style={{ y: y3 }}
              whileHover={{ scale: 1.06, rotate: 4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="absolute bottom-0 right-0 z-10 h-[230px] w-[230px] cursor-pointer overflow-hidden rounded-full ring-[3px] ring-background"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/profile-2.jpg" alt="" className="h-full w-full object-cover object-center" />
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
