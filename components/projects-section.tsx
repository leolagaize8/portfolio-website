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
    <section id="projects" className="pt-12 pb-36 scroll-mt-20">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 border-b border-border pb-6 px-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))]"
      >
        <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/40">02</p>
        <h2 className="font-mono text-[clamp(1.4rem,2.2vw,2rem)] font-normal leading-none tracking-tight" style={{ color: '#1e3a5f' }}>
          Projects
        </h2>
      </motion.div>

      {/* Scale Sourcing — featured */}
      <div className="mb-20">
        <ScaleSourcingFeature
          project={scaleSourcing}
          employer={hexaEmployer}
          onOpen={() => openModal(scaleSourcing, hexaEmployer)}
        />
      </div>

      {/* Automations & Tools */}
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
