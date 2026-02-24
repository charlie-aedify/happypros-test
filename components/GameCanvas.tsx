'use client'

import { useEffect, useRef } from 'react'

export default function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<import('phaser').Game | null>(null)

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return

    // Dynamic import keeps Phaser out of the SSR bundle
    import('@/game/config').then(({ createGame }) => {
      if (containerRef.current && !gameRef.current) {
        gameRef.current = createGame(containerRef.current)
      }
    })

    return () => {
      gameRef.current?.destroy(true)
      gameRef.current = null
    }
  }, [])

  return (
    <div
      id="game-container"
      ref={containerRef}
      style={{ width: '100vw', height: '100vh', display: 'flex',
               alignItems: 'center', justifyContent: 'center' }}
    />
  )
}
