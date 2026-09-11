import type { CoachReply } from '../types.ts'

const BLOCKS = [
  { key: 'rewrite', label: '更自然的说法', en: 'Natural rewrite' },
  { key: 'tip', label: '语法 / 词汇提示', en: 'One tip' },
  { key: 'phrases', label: '高价值表达', en: 'Three phrases' },
  { key: 'next_prompt', label: '继续场景', en: 'Next prompt' },
] as const

export function CoachReplyCard({ reply }: { reply: CoachReply }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-ticket shadow-[0_10px_30px_-18px_rgba(26,39,68,0.45)]">
      <header className="flex items-center justify-between border-b border-dashed border-line bg-sand/50 px-4 py-2.5 sm:px-5">
        <p className="font-serif text-base text-ink">教练反馈</p>
        <p className="text-xs tracking-wide text-ink-soft uppercase">Coach</p>
      </header>

      <ol className="divide-y divide-line/80">
        {BLOCKS.map((block, index) => (
          <li key={block.key} className="px-4 py-3.5 sm:px-5">
            <p className="mb-1.5 flex flex-wrap items-baseline gap-x-2 text-xs text-ink-soft">
              <span className="font-medium text-sea">{index + 1}. {block.label}</span>
              <span>{block.en}</span>
            </p>
            {block.key === 'phrases' ? (
              <ul className="space-y-1.5 text-[15px] leading-relaxed">
                {reply.phrases.map((phrase) => (
                  <li key={phrase} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-stamp" />
                    <span>{phrase}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-ink">
                {block.key === 'rewrite' ? reply.rewrite : block.key === 'tip' ? reply.tip : reply.next_prompt}
              </p>
            )}
          </li>
        ))}
      </ol>
    </article>
  )
}
