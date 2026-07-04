'use client'

import React, { useState } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'
import { X, ArrowRight, ChevronLeft, ChevronRight, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'
import { categoryColors, employerAvatarColors } from '@/lib/colors'
import { categoryLabels } from '@/lib/data'
import type { Project, Employer } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

interface ProjectSheetProps {
  project: Project
  employer: Employer
  open: boolean
  onClose: () => void
}

type BadgeVariant = 'blue' | 'purple' | 'green' | 'amber'

const categoryBadgeVariant: Record<string, BadgeVariant> = {
  webapp: 'blue',
  automation: 'purple',
  'ai-agent': 'green',
  research: 'amber',
}

const sectionVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function ProjectSheet({ project, employer, open, onClose }: ProjectSheetProps) {
  const avatarColor = employerAvatarColors[employer.color]
  const [imageIndex, setImageIndex] = useState(0)
  const images = project.detail.images

  const prev = () => setImageIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setImageIndex((i) => (i + 1) % images.length)

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px]',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
            'duration-300',
          )}
        />

        {/* Full-page panel sliding from right */}
        <DialogPrimitive.Content
          className={cn(
            'fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-background shadow-2xl',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
            'duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          )}
        >
          {/* Sticky header */}
          <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className={cn('flex h-7 w-7 items-center justify-center rounded-lg font-mono text-[10px] font-semibold', avatarColor)}>
                {employer.initials}
              </div>
              <span className="text-[12px] text-muted-foreground">{employer.name}</span>
              <span className="text-muted-foreground/30">/</span>
              <Badge variant={categoryBadgeVariant[project.category]}>
                {categoryLabels[project.category]}
              </Badge>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <X size={15} strokeWidth={1.5} />
              <span className="sr-only">Close</span>
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-4xl px-6 py-12 lg:px-12">

              {/* Title + description */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mb-10"
              >
                <DialogPrimitive.Title className="mb-4 text-[clamp(2rem,4vw,3rem)] font-light leading-tight tracking-tight text-foreground">
                  {project.title}
                </DialogPrimitive.Title>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="mb-10 grid grid-cols-3 gap-3"
              >
                {project.detail.stats.map((stat) => (
                  <Card key={stat.label} className="flex flex-col items-center justify-center px-4 py-6 text-center">
                    <span className="font-mono text-[16px] font-semibold text-foreground">{stat.value}</span>
                    <span className="mt-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground/60">{stat.label}</span>
                  </Card>
                ))}
              </motion.div>

              {/* Content sections */}
              <div className="space-y-10 mb-10">
                {[
                  { label: 'Problem', content: project.detail.problem },
                  { label: 'Objective', content: project.detail.objective },
                  { label: 'Solution', content: project.detail.solution },
                ].map(({ label, content }, i) => (
                  <motion.section
                    key={label}
                    custom={i}
                    variants={sectionVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <SectionLabel>{label}</SectionLabel>
                    <p className="text-[14px] leading-[1.9] text-muted-foreground">{content}</p>
                  </motion.section>
                ))}
              </div>

              {/* Image carousel */}
              {images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-10"
                >
                  <Card className="overflow-hidden">
                    <div className="relative flex aspect-video items-center justify-center bg-muted/30">
                      <div className="flex flex-col items-center gap-3 px-12 text-center">
                        <div className="rounded-xl border border-border bg-background p-3 shadow-sm">
                          <Monitor size={18} className="text-muted-foreground/40" strokeWidth={1.5} />
                        </div>
                        <p className="max-w-xs text-[12px] leading-relaxed text-muted-foreground">
                          {images[imageIndex]}
                        </p>
                        <p className="font-mono text-[10px] text-muted-foreground/30">Screenshot placeholder</p>
                      </div>

                      {images.length > 1 && (
                        <>
                          <button
                            onClick={prev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition-colors hover:text-foreground"
                          >
                            <ChevronLeft size={14} strokeWidth={1.5} />
                          </button>
                          <button
                            onClick={next}
                            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition-colors hover:text-foreground"
                          >
                            <ChevronRight size={14} strokeWidth={1.5} />
                          </button>
                        </>
                      )}
                    </div>

                    {images.length > 1 && (
                      <div className="flex justify-center gap-1.5 py-3">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setImageIndex(i)}
                            className={cn(
                              'h-1.5 rounded-full transition-all duration-200',
                              i === imageIndex ? 'w-5 bg-foreground/50' : 'w-1.5 bg-border hover:bg-muted-foreground/30',
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </Card>
                </motion.div>
              )}

              <div className="space-y-10 pb-20">
                <div className="h-px bg-border" />

                {/* Pipeline */}
                <motion.section
                  custom={3}
                  variants={sectionVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <SectionLabel>Pipeline</SectionLabel>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                    {project.detail.pipeline.map((step, i) => (
                      <React.Fragment key={step.label}>
                        <span className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-[11px] text-foreground shadow-sm">
                          {step.label}
                        </span>
                        {i < project.detail.pipeline.length - 1 && (
                          <ArrowRight size={11} className="shrink-0 text-muted-foreground/40" strokeWidth={1.5} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </motion.section>

                {/* Stack */}
                <motion.section
                  custom={4}
                  variants={sectionVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <SectionLabel>Stack</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    {project.detail.stack.map((item) => (
                      <Badge key={item} variant="secondary" className="font-mono text-[11px]">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </motion.section>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 font-mono text-[9.5px] uppercase tracking-[0.15em] text-muted-foreground/50">
      {children}
    </p>
  )
}
