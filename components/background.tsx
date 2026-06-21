'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function Background() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 280,
        y: (e.clientY / window.innerHeight - 0.5) * 280,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const spring = (factor: number) => ({
    type: 'spring' as const,
    stiffness: 40,
    damping: 20,
    x: mouse.x * factor,
    y: mouse.y * factor,
  })

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{ x: mouse.x * 1, y: mouse.y * 1 }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
        className="absolute -left-40 -top-20 h-[550px] w-[550px] rounded-full bg-blue-200/70 blur-[100px]"
      />
      <motion.div
        animate={{ x: mouse.x * -0.8, y: mouse.y * -0.8 }}
        transition={{ type: 'spring', stiffness: 35, damping: 22 }}
        className="absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-indigo-200/60 blur-[100px]"
      />
      <motion.div
        animate={{ x: mouse.x * 1.3, y: mouse.y * 0.7 }}
        transition={{ type: 'spring', stiffness: 45, damping: 18 }}
        className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-sky-100/80 blur-[90px]"
      />
      <motion.div
        animate={{ x: mouse.x * -0.6, y: mouse.y * 1.2 }}
        transition={{ type: 'spring', stiffness: 30, damping: 25 }}
        className="absolute right-1/3 top-0 h-[300px] w-[300px] rounded-full bg-blue-100/60 blur-[80px]"
      />
    </div>
  )
}
