import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

export default {
  content: ['./src/**/**/*.{js,ts,jsx,tsx,mdx}'],
  daisyui: {
    themes: ['winter'],
  },
  theme: {
  },
  plugins: [daisyui],
} satisfies Config
