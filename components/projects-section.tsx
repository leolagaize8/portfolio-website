'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { employers } from '@/lib/data'
import type { Project, Employer } from '@/lib/data'
import { EmployerBlock } from './employer-block'
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

  return (
    <section id="projects" className="pt-24 pb-36 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 border-b border-border pb-8 px-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))]"
      >
        <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/40">02</p>
        <h2 className="font-mono text-[clamp(1.4rem,2.2vw,2rem)] font-normal leading-none tracking-tight" style={{ color: '#1e3a5f' }}>
          Projects
        </h2>
      </motion.div>

      <div>
        {employers.map((employer) => (
          <EmployerBlock
            key={employer.id}
            employer={employer}
            onProjectClick={(project) => openModal(project, employer)}
          />
        ))}
      </div>

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
