import { useEffect, useRef, useState, type FormEvent } from 'react'
import { buildDemoReply } from '../data/demoCoach.ts'
import { requestLiveCoach } from '../lib/api.ts'
import type { AppMode, ChatTurn, Scene } from '../types.ts'
import { CoachReplyCard } from './CoachReplyCard.tsx'
import { Button } from './ui/Button.tsx'
import { Textarea } from './ui/Textarea.tsx'

type Props = {
  scene: Scene
  mode: AppMode
  onBack: () => void
}

export function PracticeChat({ scene, mode, onBack }: Props) {
  const [turns, setTurns] = useState<ChatTurn[]>([])
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usedDemoFallback, setUsedDemoFallback] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [turns, busy, error])

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const userMessage = draft.trim()
    if (!userMessage || busy) return

    setBusy(true)
    setError(null)

    try {
      const coach =
        mode === 'live' && !usedDemoFallback
          ? await requestLiveCoach({
              sceneId: scene.id,
              history: turns,
              userMessage,
            }).catch((liveError: unknown) => {
              const message =
                liveError instanceof Error ? liveError.message : '在线教练暂时不可用。'
              setError(`${message} 已改用演示回复，你可以继续练习。`)
              setUsedDemoFallback(true)
              return buildDemoReply(scene, userMessage, turns.length)
            })
          : buildDemoReply(scene, userMessage, turns.length)

      setTurns((current) => [...current, { user: userMessage, coach }])
      setDraft('')
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : '发送失败，请再试一次。')
    } finally {
      setBusy(false)
    }
  }

  function resetScene() {
    setTurns([])
    setDraft('')
    setError(null)
    setUsedDemoFallback(false)
  }

  const usingDemo = mode !== 'live' || usedDemoFallback

  return (
    <div className="mx-auto flex h-dvh w-full max-w-3xl flex-col px-4 sm:px-6">
      <header className="shrink-0 border-b border-line/80 bg-paper/90 py-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs tracking-wide text-sea uppercase">
              {scene.emoji} {scene.title_en}
            </p>
            <h1 className="font-serif text-2xl text-ink sm:text-3xl">{scene.title_zh}</h1>
            <p className="mt-1 text-sm text-ink-soft">
              {scene.level} · {scene.goal}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="ghost" onClick={onBack}>
              返回场景
            </Button>
            <Button variant="ghost" onClick={resetScene} disabled={busy || turns.length === 0}>
              重新开始
            </Button>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto py-4">
      <p
        className="rounded-2xl border border-dashed border-line bg-ticket/70 px-3 py-2 text-xs text-ink-soft sm:text-sm"
        role="status"
      >
        {usingDemo ? '演示模式：脚本教练回复，可多轮继续。' : '在线教练：按系统提示即时批改。'}
        用英语回复对方即可。
      </p>

        <PartnerLine
          text={scene.starter_line_en}
          hint="用英语回应：表明身份或需求，不会也先写出来。"
        />

        {turns.map((turn) => (
          <div key={`${turn.user}-${turn.coach.rewrite}`} className="flex flex-col gap-5">
            <UserLine text={turn.user} />
            <CoachReplyCard reply={turn.coach} />
          </div>
        ))}

        {busy && (
          <p className="rounded-2xl border border-line bg-sand/40 px-4 py-3 text-sm text-ink-soft" role="status">
            教练正在批改这一轮…
          </p>
        )}

        {error && (
          <p className="rounded-2xl border border-stamp/30 bg-[#fff4ef] px-4 py-3 text-sm text-stamp" role="alert">
            {error}
          </p>
        )}

        {turns.length === 0 && !busy && (
          <p className="text-sm text-ink-soft">
            还没有练习轮次。先回应对方的第一句，发送后会看到完整教练卡。
          </p>
        )}
        <div ref={endRef} className="h-1" />
      </div>

      <form
        onSubmit={onSubmit}
        className="mb-4 shrink-0 rounded-3xl border border-line bg-ticket p-3 shadow-[0_12px_40px_-24px_rgba(26,39,68,0.65)]"
      >
        <label htmlFor="learner-line" className="mb-2 block text-sm font-medium text-ink">
          你的英语回复
        </label>
        <Textarea
          id="learner-line"
          value={draft}
          maxLength={500}
          placeholder="例如：Here is my passport. I would like a window seat."
          onChange={(event) => setDraft(event.target.value)}
          disabled={busy}
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-ink-soft">中文界面，英语练习。最多 500 字。</p>
          <Button type="submit" variant="ticket" disabled={busy || !draft.trim()}>
            {busy ? '批改中…' : '发送本轮'}
          </Button>
        </div>
      </form>
    </div>
  )
}

function PartnerLine({ text, hint }: { text: string; hint: string }) {
  return (
    <section className="rounded-3xl border border-sea/20 bg-[#f3f7f6] px-4 py-3.5 sm:px-5">
      <p className="text-xs font-medium tracking-wide text-sea uppercase">对方 · Scene partner</p>
      <p className="mt-1.5 font-serif text-lg leading-relaxed text-ink">{text}</p>
      <p className="mt-2 text-sm text-ink-soft">{hint}</p>
    </section>
  )
}

function UserLine({ text }: { text: string }) {
  return (
    <section className="ml-auto max-w-[92%] rounded-3xl bg-ink px-4 py-3 text-paper sm:max-w-[80%]">
      <p className="text-[11px] tracking-wide text-sand uppercase">你 · Learner</p>
      <p className="mt-1 whitespace-pre-wrap text-[15px] leading-relaxed">{text}</p>
    </section>
  )
}
