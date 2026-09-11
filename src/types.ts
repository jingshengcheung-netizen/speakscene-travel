export type Scene = {
  id: string
  title_zh: string
  title_en: string
  level: 'A2-B1'
  goal: string
  starter_line_en: string
  rubric_notes: string
  emoji: string
}

export type CoachReply = {
  rewrite: string
  tip: string
  phrases: [string, string, string]
  next_prompt: string
}

export type ChatTurn = {
  user: string
  coach: CoachReply
}

export type AppMode = 'demo' | 'live' | 'unknown'
