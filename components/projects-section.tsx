'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { employers } from '@/lib/data'
import type { Project, Employer } from '@/lib/data'
import { ScaleSourcingFeature } from './scale-sourcing-feature'
import { AutomationsBlock } from './automations-block'
import { ProjectSheet } from './project-sheet'

export function ProjectsSection() {
  const [modalData, setModalData] = useState<{ project: Project; employer: Employer } | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openModal = (project: Project, employer: Employer) => {
    setModalData({ project, employer })
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setTimeout(() => setModalData(null), 300)
  }

  const hexaEmployer = employers[0]
  const scaleSourcing = hexaEmployer.projects[0] // id: 'scale-sourcing'

  const automationItems = [
    ...hexaEmployer.projects.slice(1).map((p) => ({ project: p, employer: hexaEmployer })),
    ...employers[1].projects.map((p) => ({ project: p, employer: employers[1] })),
  ]

  return (
    <section id="projects" className="pt-6 pb-36 scroll-mt-20">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-5 border-b border-border pb-4 px-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))]"
      >
        <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/40">02</p>
        <h2 className="font-mono text-[clamp(1.4rem,2.2vw,2rem)] font-normal leading-none tracking-tight" style={{ color: '#1e3a5f' }}>
          Projects
        </h2>
      </motion.div>

      {/* Featured Project label */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-5 px-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))]"
      >
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] font-semibold text-[#1e3a5f]/70">
          Featured Project
        </p>
        <div className="h-px bg-border" />
      </motion.div>

      {/* Scale Sourcing — featured */}
      <div className="mb-16 mx-auto max-w-7xl px-8 lg:px-16">
        <ScaleSourcingFeature
          project={scaleSourcing}
          employer={hexaEmployer}
          onOpen={() => openModal(scaleSourcing, hexaEmployer)}
        />
      </div>

      {/* Automations & Tools label */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-5 px-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))]"
      >
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] font-semibold text-[#1e3a5f]/70">
          Automations & Tools
        </p>
        <div className="h-px bg-border" />
      </motion.div>

      {/* Automations carousel */}
      <AutomationsBlock
        items={automationItems}
        onProjectClick={openModal}
      />

      {modalData && (
        <ProjectSheet
          project={modalData.project}
          employer={modalData.employer}
          open={isOpen}
          onClose={closeModal}
        />
      )}
    </section>
  )
}
