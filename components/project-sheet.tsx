'use client'

import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { employerAvatarColors } from '@/lib/colors'
import { categoryLabels } from '@/lib/data'
import type { Project, Employer } from '@/lib/data'

interface ProjectSheetProps {
  project: Project
  employer: Employer
  open: boolean
  onClose: () => void
}

const categoryColors: Record<string, string> = {
  webapp: 'bg-blue-100 text-blue-700 border-blue-200',
  automation: 'bg-purple-100 text-purple-700 border-purple-200',
  'ai-agent': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  research: 'bg-amber-100 text-amber-700 border-amber-200',
}

export function ProjectSheet({ project, employer, open, onClose }: ProjectSheetProps) {
  const avatarColor = employerAvatarColors[employer.color]

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px]',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 duration-300',
          )}
        />

        <DialogPrimitive.Content
          className={cn(
            'fixed inset-y-0 right-0 z-50 flex w-full flex-col',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
            'duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          )}
          style={{ background: 'oklch(0.91 0.018 240)' }}
        >
          {/* Floating pill — centered at top */}
          <div className="pointer-events-none absolute top-4 left-1/2 z-20 -translate-x-1/2">
            <div className="pointer-events-auto flex h-11 items-center gap-3 rounded-2xl border border-border bg-card/90 px-5 shadow-sm backdrop-blur-md">
              <span className="text-[13px] text-muted-foreground">Projects</span>
              <span className="text-muted-foreground/30">/</span>
              <span className="text-[13px] font-medium text-foreground">{project.title}</span>
            </div>
          </div>

          {/* Floating X button — top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white shadow-md text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={16} strokeWidth={1.5} />
          </button>

          {/* Body */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-4xl px-8 pt-20 pb-12 lg:px-16">

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mb-10"
              >
                <DialogPrimitive.Title
                  className="mb-4 font-bold leading-tight tracking-tight"
                  style={{ fontFamily: 'var(--font-urbanist)', fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#1e3a5f' }}
                >
                  {project.title}
                </DialogPrimitive.Title>
                <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </motion.div>

              {/* Video (if available) or Stats */}
              {project.detail.videoUrl ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12 overflow-hidden rounded-2xl border border-border bg-black shadow-sm"
                >
                  <video src={project.detail.videoUrl} controls playsInline className="w-full" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12 grid grid-cols-3 gap-3"
                >
                  {project.detail.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white/70 px-4 py-6 text-center backdrop-blur-sm">
                      <span className="mb-1 font-bold text-[1.5rem] leading-none" style={{ color: '#1e3a5f', fontFamily: 'var(--font-urbanist)' }}>{stat.value}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground/60">{stat.label}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Sections */}
              <div className="space-y-12 mb-12">
                {[
                  { label: 'Problem', content: project.detail.problem },
                  { label: 'Objective', content: project.detail.objective },
                  { label: 'Solution', content: project.detail.solution },
                ].map(({ label, content }, i) => (
                  <motion.section
                    key={label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-px w-8 bg-[#1e3a5f]/30" />
                      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50">{label}</p>
                    </div>
                    <div className="space-y-4">
                      {content.split('\n\n').map((para, j) => (
                        <p key={j} className="text-[14px] leading-[1.9] text-muted-foreground">{para}</p>
                      ))}
                    </div>
                  </motion.section>
                ))}
              </div>

              {/* Flows — visual pipeline blocks */}
              {project.detail.flows && project.detail.flows.length > 0 && (
                <div className="mb-12 space-y-6">
                  {project.detail.flows.map((flow, i) => (
                    <motion.div
                      key={flow.label}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-2xl border border-border bg-white/50 p-6 backdrop-blur-sm"
                    >
                      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50">{flow.label}</p>
                      <div className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-2">
                        {flow.steps.map((step, j) => (
                          <React.Fragment key={step}>
                            <span className="rounded-xl border border-border bg-white/80 px-3 py-1.5 text-[12px] font-medium text-foreground shadow-sm">
                              {step}
                            </span>
                            {j < flow.steps.length - 1 && (
                              <ArrowRight size={11} className="shrink-0 text-muted-foreground/40" strokeWidth={1.5} />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {flow.description.split('\n\n').map((para, j) => (
                          <p key={j} className="text-[13px] leading-[1.85] text-muted-foreground">{para}</p>
                        ))}
                      </div>
                      {flow.imageUrl && (
                        <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-black">
                          <img src={flow.imageUrl} alt={flow.label} className="w-full opacity-90" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Standalone images — dashboard screenshots */}
              {project.detail.images && project.detail.images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12 space-y-4"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-px w-8 bg-[#1e3a5f]/30" />
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50">Dashboard & outputs</p>
                  </div>
                  {project.detail.images.map((src, i) => (
                    <div key={i} className="overflow-hidden rounded-2xl border border-border bg-white/30">
                      <img src={src} alt="" className="w-full" />
                    </div>
                  ))}
                </motion.div>
              )}

{/* Stats below text (only for projects with video) */}
              {project.detail.videoUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12 grid grid-cols-3 gap-3"
                >
                  {project.detail.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white/70 px-4 py-6 text-center backdrop-blur-sm">
                      <span className="mb-1 font-bold text-[1.5rem] leading-none" style={{ color: '#1e3a5f', fontFamily: 'var(--font-urbanist)' }}>{stat.value}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground/60">{stat.label}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              <div className="h-px bg-border/60 mb-10" />

              {/* Pipeline — hidden for projects with video (flows explained in text) */}
              {!project.detail.videoUrl && (
                <motion.section
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-10"
                >
                  <h3 className="mb-4 font-mono text-[1.15rem] font-normal leading-none tracking-tight" style={{ color: '#1e3a5f' }}>
                    Pipeline
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                    {project.detail.pipeline.map((step, i) => (
                      <React.Fragment key={step.label}>
                        <span className="rounded-xl border border-border bg-white/70 px-3 py-1.5 text-[12px] font-medium text-foreground shadow-sm">
                          {step.label}
                        </span>
                        {i < project.detail.pipeline.length - 1 && (
                          <ArrowRight size={11} className="shrink-0 text-muted-foreground/40" strokeWidth={1.5} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Stack */}
              <motion.section
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="pb-20"
              >
                <h3 className="mb-4 font-mono text-[1.15rem] font-normal leading-none tracking-tight" style={{ color: '#1e3a5f' }}>
                  Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.detail.stack.map((item) => (
                    <span key={item} className="rounded-xl border border-border bg-white/70 px-3 py-1.5 font-mono text-[11px] text-foreground shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.section>

            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
