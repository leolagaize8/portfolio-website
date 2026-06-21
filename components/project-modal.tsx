'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { categoryColors, employerAvatarColors } from '@/lib/colors'
import { categoryLabels } from '@/lib/data'
import type { Project, Employer } from '@/lib/data'

interface ProjectModalProps {
  project: Project
  employer: Employer
  open: boolean
  onClose: () => void
}

export function ProjectModal({ project, employer, open, onClose }: ProjectModalProps) {
  const colors = categoryColors[project.category]
  const avatarColor = employerAvatarColors[employer.color]

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="flex max-h-[88vh] flex-col">
        {/* Fixed header */}
        <DialogHeader className="shrink-0 pr-8">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[10px] font-semibold',
                avatarColor
              )}
            >
              {employer.initials}
            </div>
            <div className="min-w-0">
              <DialogTitle className="mb-1.5 text-[14px]">{project.title}</DialogTitle>
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px]',
                  colors.badge
                )}
              >
                <span className={cn('h-1 w-1 shrink-0 rounded-full', colors.dot)} />
                {categoryLabels[project.category]}
              </span>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable body */}
        <div className="mt-6 min-h-0 flex-1 space-y-8 overflow-y-auto">
          <Section label="Problem">
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {project.detail.problem}
            </p>
          </Section>

          <Section label="Pipeline">
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
              {project.detail.pipeline.map((step, i) => (
                <React.Fragment key={step.label}>
                  <span className="rounded-lg border border-border bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-foreground">
                    {step.label}
                  </span>
                  {i < project.detail.pipeline.length - 1 && (
                    <ArrowRight size={11} className="shrink-0 text-muted-foreground/40" strokeWidth={1.5} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </Section>

          <Section label="At a glance">
            <div className="grid grid-cols-3 gap-2.5">
              {project.detail.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center rounded-xl border border-border bg-card px-3 py-4 text-center"
                >
                  <span className="font-mono text-[13px] font-semibold text-foreground">
                    {stat.value}
                  </span>
                  <span className="mt-1 font-mono text-[10px] leading-tight text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          <Section label="Stack">
            <div className="flex flex-wrap gap-1.5">
              {project.detail.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-border bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </Section>

          <Section label="Solution">
            <p className="pb-2 text-[13px] leading-relaxed text-muted-foreground">
              {project.detail.solution}
            </p>
          </Section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="mb-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground/50">
        {label}
      </p>
      {children}
    </section>
  )
}
