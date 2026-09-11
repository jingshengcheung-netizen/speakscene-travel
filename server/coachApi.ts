import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { asCoachReply } from '../src/lib/coach.ts'
import { getScene } from '../src/data/scenes.ts'
import type { ChatTurn, CoachReply } from '../src/types.ts'

export type CoachEnv = {
  OPENAI_API_KEY?: string
  OPENAI_BASE_URL?: string
  OPENAI_MODEL?: string
}

function readSystemPrompt(): string {
  return readFileSync(resolve(process.cwd(), 'prompts/coach-system.txt'), 'utf8')
}

function sceneBlock(sceneId: string): string {
  const scene = getScene(sceneId)
  if (!scene) throw new Error('Unknown scene.')
  return [
    `Scene id: ${scene.id}`,
    `Title: ${scene.title_en} / ${scene.title_zh}`,
    `Level: ${scene.level}`,
    `Goal: ${scene.goal}`,
    `Opening line (scene partner): ${scene.starter_line_en}`,
    `Rubric notes: ${scene.rubric_notes}`,
  ].join('\n')
}

function historyBlock(history: ChatTurn[]): string {
  if (!history.length) return '(No previous learner turns.)'
  return history
    .map((turn, index) => {
      return [
        `Turn ${index + 1}`,
        `Learner: ${turn.user}`,
        `Your rewrite: ${turn.coach.rewrite}`,
        `Your next_prompt: ${turn.coach.next_prompt}`,
      ].join('\n')
    })
    .join('\n\n')
}

function extractJson(text: string): unknown {
  const trimmed = text.trim()
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/)
  const raw = fenced?.[1] ?? trimmed
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start === -1 || end === -1) {
    throw new Error('The model did not return JSON.')
  }
  return JSON.parse(raw.slice(start, end + 1))
}

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw.trim()) return {}
  return JSON.parse(raw)
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

export function hasLiveKey(env: CoachEnv): boolean {
  return Boolean(env.OPENAI_API_KEY?.trim())
}

export async function completeCoachReply(
  env: CoachEnv,
  input: { sceneId: string; history: ChatTurn[]; userMessage: string },
): Promise<CoachReply> {
  const apiKey = env.OPENAI_API_KEY?.trim()
  if (!apiKey) throw new Error('Missing OPENAI_API_KEY.')

  const scene = getScene(input.sceneId)
  if (!scene) throw new Error('Unknown scene.')
  const userMessage = input.userMessage.trim()
  if (!userMessage) throw new Error('Please write a reply first.')

  const baseUrl = (env.OPENAI_BASE_URL?.trim() || 'https://api.openai.com/v1').replace(
    /\/+$/,
    '',
  )
  const model = env.OPENAI_MODEL?.trim() || 'gpt-4o-mini'

  const system = [
    readSystemPrompt().trim(),
    '',
    sceneBlock(scene.id),
    '',
    'Earlier turns:',
    historyBlock(input.history.slice(-6)),
  ].join('\n')

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.6,
      messages: [
        { role: 'system', content: system },
        {
          role: 'user',
          content: `Learner's latest English (or mixed) line:\n${userMessage}`,
        },
      ],
    }),
  })

  const payload = (await response.json().catch(() => null)) as {
    error?: { message?: string }
    choices?: Array<{ message?: { content?: string } }>
  } | null

  if (!response.ok) {
    throw new Error(payload?.error?.message || `Model request failed (${response.status}).`)
  }

  const content = payload?.choices?.[0]?.message?.content
  if (!content) throw new Error('The model returned an empty reply.')
  return asCoachReply(extractJson(content))
}

export async function handleCoachRequest(
  req: IncomingMessage,
  res: ServerResponse,
  env: CoachEnv,
): Promise<void> {
  const url = req.url?.split('?')[0] ?? ''

  if (req.method === 'GET' && (url === '/api/status' || url.endsWith('/api/status'))) {
    sendJson(res, 200, {
      mode: hasLiveKey(env) ? 'live' : 'demo',
      model: env.OPENAI_MODEL?.trim() || 'gpt-4o-mini',
    })
    return
  }

  if (req.method === 'POST' && (url === '/api/chat' || url.endsWith('/api/chat'))) {
    if (!hasLiveKey(env)) {
      sendJson(res, 503, {
        error: 'No API key configured. The app should use Demo mode.',
      })
      return
    }

    try {
      const body = (await readJsonBody(req)) as {
        sceneId?: string
        history?: ChatTurn[]
        userMessage?: string
      }
      const reply = await completeCoachReply(env, {
        sceneId: body.sceneId ?? '',
        history: Array.isArray(body.history) ? body.history : [],
        userMessage: body.userMessage ?? '',
      })
      sendJson(res, 200, { reply })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Coach request failed.'
      sendJson(res, 400, { error: message })
    }
    return
  }
}

export function attachCoachApi(
  middlewares: { use: (fn: (req: IncomingMessage, res: ServerResponse, next: () => void) => void) => void },
  env: CoachEnv,
): void {
  middlewares.use((req, res, next) => {
    const url = req.url?.split('?')[0] ?? ''
    if (!url.startsWith('/api/')) {
      next()
      return
    }
    void handleCoachRequest(req, res, env).catch((error: unknown) => {
      const message = error instanceof Error ? error.message : 'Server error.'
      sendJson(res, 500, { error: message })
    })
  })
}
