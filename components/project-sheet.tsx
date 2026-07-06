'use client'

import React, { useState } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { categoryLabels } from '@/lib/data'
import type { Project, Employer } from '@/lib/data'

interface ProjectSheetProps {
  project: Project
  employer: Employer
  open: boolean
  onClose: () => void
}

function ImageCarousel({ images }: { images: string[] }) {
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState<boolean[]>(images.map(() => true))

  const validImages = images.filter((_, i) => loaded[i])

  if (images.length === 0 || validImages.length === 0) return null

  const realActive = Math.min(active, validImages.length - 1)

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-white/30">
      {/* Preload all images invisibly to detect broken ones */}
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="hidden"
          onError={() => setLoaded(prev => { const next = [...prev]; next[i] = false; return next })}
        />
      ))}

      <div className="flex h-[520px] items-center justify-center bg-white/20">
        <AnimatePresence mode="wait">
          <motion.img
            key={validImages[realActive]}
            src={validImages[realActive]}
            alt=""
            className="max-h-full max-w-full object-contain"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
      </div>

      {validImages.length > 1 && (
        <>
          <button
            onClick={() => setActive(i => (i - 1 + validImages.length) % validImages.length)}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white/90 text-muted-foreground shadow-sm transition-colors hover:text-foreground"
          >
            <ChevronLeft size={14} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => setActive(i => (i + 1) % validImages.length)}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white/90 text-muted-foreground shadow-sm transition-colors hover:text-foreground"
          >
            <ChevronRight size={14} strokeWidth={1.5} />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {validImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn('h-1.5 rounded-full transition-all', i === realActive ? 'w-4 bg-[#1e3a5f]' : 'w-1.5 bg-[#1e3a5f]/25')}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function ProjectSheet({ project, employer, open, onClose }: ProjectSheetProps) {
  const hasCarousel = project.detail.images && project.detail.images.length > 0

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

          {/* Floating X button */}
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
                  style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#1e3a5f' }}
                >
                  {project.title}
                </DialogPrimitive.Title>
                <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </motion.div>

              {/* Carousel — projects with images (shown before stats) */}
              {hasCarousel && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-10"
                >
                  <ImageCarousel images={project.detail.images!} />
                </motion.div>
              )}

              {/* Video (projects with video) */}
              {project.detail.videoUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12 overflow-hidden rounded-2xl border border-border bg-black shadow-sm"
                >
                  <video src={project.detail.videoUrl} controls playsInline className="w-full" />
                </motion.div>
              )}

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="mb-12 grid grid-cols-3 gap-3"
              >
                {project.detail.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white/70 px-4 py-6 text-center backdrop-blur-sm">
                    <span className="mb-1 font-bold text-[1.5rem] leading-none" style={{ color: '#1e3a5f', fontFamily: 'var(--font-poppins)' }}>{stat.value}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground/60">{stat.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Sections */}
              <div className="space-y-12 mb-12">
                {[
                  { label: 'Problem', content: project.detail.problem },
                  { label: 'Objective', content: project.detail.objective },
                  { label: 'Solution', content: project.detail.solution },
                ].filter(s => s.content).map(({ label, content }, i) => (
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
                    {label === 'Solution' && project.detail.overviewImageUrl && (
                      <div className="mb-6 overflow-hidden rounded-xl border border-border bg-black">
                        <img src={project.detail.overviewImageUrl} alt="Overview" className="w-full" />
                      </div>
                    )}
                    <div className="space-y-4">
                      {content.split('\n\n').map((para, j) => (
                        <p key={j} className="text-[14px] leading-[1.9] text-muted-foreground">{para}</p>
                      ))}
                    </div>
                  </motion.section>
                ))}
              </div>

              {/* Flows — visual pipeline blocks with inline screenshots */}
              {project.detail.flows && project.detail.flows.length > 0 && (
                <div className="mb-12 space-y-6">
                  {project.detail.flows.map((flow, i) => (
                    <motion.div
                      key={flow.label}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
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

              {/* Stats below text — video projects only */}
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
                      <span className="mb-1 font-bold text-[1.5rem] leading-none" style={{ color: '#1e3a5f', fontFamily: 'var(--font-poppins)' }}>{stat.value}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground/60">{stat.label}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              <div className="h-px bg-border/60 mb-10" />

              {/* Pipeline — hidden for projects with video or flows */}
              {!project.detail.videoUrl && (!project.detail.flows || project.detail.flows.length === 0) && (
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
                    {project.detail.pipeline!.map((step, i) => (
                      <React.Fragment key={step.label}>
                        <span className="rounded-xl border border-border bg-white/70 px-3 py-1.5 text-[12px] font-medium text-foreground shadow-sm">
                          {step.label}
                        </span>
                        {i < project.detail.pipeline!.length - 1 && (
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
                className="pb-32"
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
