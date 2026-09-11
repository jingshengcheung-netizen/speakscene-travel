import { useEffect, useState } from 'react'
import { PracticeChat } from './components/PracticeChat.tsx'
import { SceneList } from './components/SceneList.tsx'
import { getScene } from './data/scenes.ts'
import { fetchCoachStatus } from './lib/api.ts'
import type { AppMode } from './types.ts'

export default function App() {
  const [mode, setMode] = useState<AppMode>('unknown')
  const [sceneId, setSceneId] = useState<string | null>(null)
  const scene = sceneId ? getScene(sceneId) : undefined

  useEffect(() => {
    let alive = true
    void fetchCoachStatus().then((next) => {
      if (alive) setMode(next)
    })
    return () => {
      alive = false
    }
  }, [])

  if (scene) {
    return (
      <PracticeChat
        scene={scene}
        mode={mode}
        onBack={() => setSceneId(null)}
      />
    )
  }

  return <SceneList mode={mode} onPick={setSceneId} />
}
