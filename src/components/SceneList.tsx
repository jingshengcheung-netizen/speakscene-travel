import { SCENES } from '../data/scenes.ts'
import type { AppMode } from '../types.ts'

type Props = {
  mode: AppMode
  onPick: (sceneId: string) => void
}

export function SceneList({ mode, onPick }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12">
      <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="mb-2 text-xs font-medium tracking-[0.22em] text-sea uppercase">
            SpeakScene Travel
          </p>
          <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
            旅行场景里练英语
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-soft">
            选一个真实出行场景，用英语回复对方。教练会给出更自然的说法、一条语法或词汇提示、三句高价值表达，以及下一条场景提示。
          </p>
        </div>
        <ModeBadge mode={mode} />
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {SCENES.map((scene, index) => (
          <li key={scene.id}>
            <button
              type="button"
              onClick={() => onPick(scene.id)}
              className="group flex h-full w-full flex-col rounded-3xl border border-line bg-ticket p-4 text-left shadow-[0_8px_24px_-20px_rgba(26,39,68,0.7)] transition hover:-translate-y-0.5 hover:border-sea/40 hover:shadow-[0_16px_30px_-18px_rgba(26,39,68,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea sm:p-5"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <span className="text-2xl" aria-hidden>
                  {scene.emoji}
                </span>
                <span className="rounded-full bg-sand px-2.5 py-1 text-[11px] font-medium tracking-wide text-ink-soft">
                  {String(index + 1).padStart(2, '0')} · {scene.level}
                </span>
              </div>
              <h2 className="font-serif text-2xl text-ink">{scene.title_zh}</h2>
              <p className="mt-0.5 text-sm text-sea">{scene.title_en}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{scene.goal}</p>
              <p className="mt-4 text-sm font-medium text-stamp group-hover:underline">
                开始练习 →
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ModeBadge({ mode }: { mode: AppMode }) {
  if (mode === 'unknown') {
    return (
      <p className="rounded-2xl border border-dashed border-line bg-ticket/80 px-4 py-3 text-sm text-ink-soft">
        正在检查教练模式…
      </p>
    )
  }

  if (mode === 'live') {
    return (
      <p className="max-w-xs rounded-2xl border border-sea/30 bg-ticket px-4 py-3 text-sm leading-relaxed text-ink-soft">
        <span className="font-medium text-sea">在线教练</span>
        <br />
        已连接 OpenAI 兼容接口，回复会按场景即时生成。
      </p>
    )
  }

  return (
    <p className="max-w-xs rounded-2xl border border-stamp/25 bg-ticket px-4 py-3 text-sm leading-relaxed text-ink-soft">
      <span className="font-medium text-stamp">演示模式</span>
      <br />
      未配置 API Key。界面可用，教练回复为脚本示例。
    </p>
  )
}
