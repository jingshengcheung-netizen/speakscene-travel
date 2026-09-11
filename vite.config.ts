import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { attachCoachApi, type CoachEnv } from './server/coachApi.ts'

const PORT = 4521

export default defineConfig(({ mode }) => {
  const loaded = loadEnv(mode, process.cwd(), '')
  const env: CoachEnv = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || loaded.OPENAI_API_KEY,
    OPENAI_BASE_URL: process.env.OPENAI_BASE_URL || loaded.OPENAI_BASE_URL,
    OPENAI_MODEL: process.env.OPENAI_MODEL || loaded.OPENAI_MODEL,
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'speakscene-coach-api',
        configureServer(server) {
          attachCoachApi(server.middlewares, env)
        },
        configurePreviewServer(server) {
          attachCoachApi(server.middlewares, env)
        },
      },
    ],
    server: {
      host: '127.0.0.1',
      port: PORT,
      strictPort: true,
    },
    preview: {
      host: '127.0.0.1',
      port: PORT,
      strictPort: true,
    },
  }
})
