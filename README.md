# SpeakScene Travel

Text-first English conversation coach for Chinese speakers practicing life and travel scenes.

Pick a scene, reply in English, and get a structured coach card:

1. A natural rewrite of your last turn
2. One grammar or vocabulary tip
3. Three high-value phrases
4. The next prompt that continues the scene

## What this MVP is

- A small browser app (Vite + React) with **10 hardcoded travel scenes**
- Chinese UI labels; conversation practice in English
- **Demo mode** with scripted coach replies when no API key is set
- Optional **live coach** via any OpenAI-compatible Chat Completions API
- A checked-in system prompt at [`prompts/coach-system.txt`](prompts/coach-system.txt)

## What this MVP is not

- Not a native or mobile app
- No voice input or speech playback
- No accounts, auth, payments, or saved history on a server
- Not a full curriculum, placement test, or spaced-repetition product
- Not medical, legal, or emergency advice — the doctor/emergency scenes are language practice only

## Run locally

Need Node.js 20+.

```bash
npm install
npm run dev
```

Open the URL Vite prints (default `http://127.0.0.1:4521`).

Leave `OPENAI_API_KEY` empty to use Demo mode. You can select a scene and practice multiple turns without any network model.

### Live coach (optional)

Copy [`.env.example`](.env.example) to `.env` and set:

| Variable | Default | Meaning |
| --- | --- | --- |
| `OPENAI_API_KEY` | _(empty)_ | If missing, the app stays in Demo mode |
| `OPENAI_BASE_URL` | `https://api.openai.com/v1` | OpenAI-compatible base URL |
| `OPENAI_MODEL` | `gpt-4o-mini` | Chat model name |

Restart `npm run dev` after changing env vars. The Vite server reads the key and calls `${OPENAI_BASE_URL}/chat/completions`. The browser never sees the key.

If a live request fails, that turn falls back to a Demo reply so you can keep practicing.

### Production-style preview

```bash
npm run build
npm run preview
```

Preview uses the same port and the same `/api/status` + `/api/chat` endpoints.

## Project layout

```
prompts/coach-system.txt   # coach system prompt (used by the live API)
src/data/scenes.ts         # 10 scenes: id, titles, level, goal, starter, rubric
src/data/demoCoach.ts      # scripted Demo-mode replies
server/coachApi.ts         # OpenAI-compatible proxy used by Vite
```

## License

MIT. See [LICENSE](LICENSE).
