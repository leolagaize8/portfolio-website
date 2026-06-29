'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import type { Project, Employer } from '@/lib/data'

interface ScaleSourcingFeatureProps {
  project: Project
  employer: Employer
  onOpen: () => void
}

const pipelineSteps = [
  { tool: 'Search',      action: 'Find target companies\nin Sales Navigator' },
  { tool: 'Extract',     action: 'Pull profiles\nautomatically' },
  { tool: 'AI Scoring',  action: 'Score & qualify\neach company' },
  { tool: 'Review',      action: 'Team reviews\ntop matches' },
  { tool: 'Enrich',      action: 'Enrich contact\ndata automatically' },
  { tool: 'Outreach',    action: 'Automated campaigns\nlaunched on Lemlist' },
]

function FullWidthPipeline() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const advance = (step: number) => {
      const isLast = step === pipelineSteps.length - 1
      timer = setTimeout(() => {
        const next = (step + 1) % pipelineSteps.length
        setActiveStep(next)
        advance(next)
      }, isLast ? 3000 : 1600)
    }

    advance(0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex items-start">
      {pipelineSteps.map((step, i) => (
        <div key={step.tool} className="flex flex-1 items-start">
          {/* Step */}
          <div className="flex flex-1 flex-col items-center gap-3 px-2">
            {/* Node */}
            <div className="relative flex h-10 w-10 items-center justify-center">
              {i === activeStep && (
                <motion.div
                  key={`ring-${activeStep}`}
                  className="absolute inset-0 rounded-full border border-blue-400/40"
                  initial={{ scale: 0.8, opacity: 1 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                />
              )}
              <motion.div
                className="h-3.5 w-3.5 rounded-full"
                animate={{
                  backgroundColor:
                    i === activeStep
                      ? '#60a5fa'
                      : i < activeStep
                      ? 'rgba(255,255,255,0.35)'
                      : 'rgba(255,255,255,0.10)',
                  scale: i === activeStep ? 1.3 : 1,
                  boxShadow:
                    i === activeStep
                      ? '0 0 14px 4px rgba(96,165,250,0.55)'
                      : 'none',
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>

            {/* Tool name */}
            <motion.p
              className="text-center text-[13px] font-semibold leading-tight"
              animate={{
                color:
                  i === activeStep
                    ? 'rgba(255,255,255,0.95)'
                    : i < activeStep
                    ? 'rgba(255,255,255,0.35)'
                    : 'rgba(255,255,255,0.18)',
              }}
              transition={{ duration: 0.35 }}
            >
              {step.tool}
            </motion.p>

            {/* Action */}
            <motion.p
              className="whitespace-pre-line text-center font-mono text-[10px] leading-[1.6]"
              animate={{
                color:
                  i === activeStep
                    ? 'rgba(255,255,255,0.45)'
                    : 'rgba(255,255,255,0.12)',
              }}
              transition={{ duration: 0.35 }}
            >
              {step.action}
            </motion.p>

          </div>

          {/* Connector */}
          {i < pipelineSteps.length - 1 && (
            <div className="relative mt-[18px] h-px flex-[0_0_40px] shrink-0 sm:flex-[0_0_64px]">
              <div className="absolute inset-0 bg-white/8" />
              <motion.div
                className="absolute inset-y-0 left-0 bg-blue-400/50"
                animate={{ width: i < activeStep ? '100%' : '0%' }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              />
              <AnimatePresence>
                {i === activeStep - 1 && (
                  <motion.div
                    key={`p-${i}-${activeStep}`}
                    className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-blue-400"
                    style={{ boxShadow: '0 0 8px 3px rgba(96,165,250,0.6)' }}
                    initial={{ left: '0%', opacity: 0 }}
                    animate={{ left: '85%', opacity: [0, 1, 0.7, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.42, ease: 'easeIn' }}
                  />
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function ScaleSourcingFeature({ project, onOpen }: ScaleSourcingFeatureProps) {
  return (
    <div className="relative overflow-hidden bg-[#0d1f38]">
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px]" />

      <div className="relative px-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))] pt-20 pb-14">

        {/* Top: two columns */}
        <div className="mb-16 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* Left: content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-8 font-mono text-[11px] uppercase tracking-widest text-white/25">
              Hexa Scale · Operating System
            </p>

            <h3 className="mb-5 font-heading text-[clamp(3rem,5.5vw,5rem)] font-extrabold leading-[0.9] tracking-tight text-white">
              Scale<br />Sourcing
            </h3>

            <p className="mb-10 max-w-[420px] text-[14px] leading-[1.85] text-white/55">
              {project.description}
            </p>

            {/* Stat */}
            <div className="flex items-baseline gap-5">
              <span
                className="font-heading text-[clamp(3rem,4.5vw,4rem)] font-extrabold leading-none"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                1,400+
              </span>
              <span className="max-w-[180px] text-[13px] leading-snug text-white/45">
                companies sourced and outreached
              </span>
            </div>
          </motion.div>

          {/* Right: video — centered */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <div className="group relative w-full aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5" />

              {/* Corner decorations */}
              <div className="absolute left-4 top-4 h-5 w-5 border-l border-t border-white/15" />
              <div className="absolute right-4 top-4 h-5 w-5 border-r border-t border-white/15" />
              <div className="absolute bottom-4 left-4 h-5 w-5 border-b border-l border-white/15" />
              <div className="absolute bottom-4 right-4 h-5 w-5 border-b border-r border-white/15" />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/8 backdrop-blur-sm transition-all group-hover:border-white/30 group-hover:bg-white/12">
                  <Play size={20} className="ml-1 text-white/50 transition-colors group-hover:text-white/75" strokeWidth={1.5} fill="currentColor" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/20">
                  Demo coming soon
                </span>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Full-width pipeline — spans below both columns */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 h-px bg-white/8" />

          <FullWidthPipeline />

          <div className="mt-10 flex justify-end">
            <button
              onClick={onOpen}
              className="group inline-flex items-center gap-2.5 border border-white/20 px-5 py-2.5 text-[12px] font-medium text-white/60 transition-all hover:border-white/50 hover:text-white"
            >
              View project
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
