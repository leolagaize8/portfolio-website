'use client'

import { useState, useEffect, useRef } from 'react'

export function Background() {
  const [pos, setPos] = useState({ x: -999, y: -999 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY })
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Static base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.91_0.018_240)] via-[oklch(0.93_0.012_235)] to-[oklch(0.91_0.018_240)]" />

      {/* Cursor spotlight */}
      <div
        className="absolute transition-opacity duration-300"
        style={{
          left: pos.x,
          top: pos.y,
          width: 600,
          height: 600,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(99,102,241,0.18) 30%, rgba(147,197,253,0.08) 55%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(12px)',
        }}
      />
    </div>
  )
}
