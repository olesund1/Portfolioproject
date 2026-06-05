import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const PROTO = process.env.PROTO

if (!PROTO) {
  throw new Error(
    '[proto] PROTO env variable is required.\n' +
    'Usage: PROTO=feature-name/v1 npm run proto\n' +
    'Example: PROTO=case-study-filter/v1 npm run proto'
  )
}

const protoDir = path.resolve(__dirname, 'prototypes', PROTO)
const srcDir   = path.resolve(__dirname, 'src')

export default defineConfig({
  // Vite resolves index.html from this directory — the prototype folder
  root: protoDir,
  base: '/',
  // Serve static assets (images, fonts) from the repo root's public/ directory.
  // Required because moving `root` away from the repo root breaks Vite's default
  // publicDir resolution — without this, /images/* paths return 404 in prototypes.
  publicDir: path.resolve(__dirname, 'public'),

  plugins: [
    // Mirror the production config exactly — both plugins are required
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      // @ resolves to the production src/ so all design system imports
      // work identically inside a prototype as they do in production
      '@': srcDir,
    },
  },

  // Mirror the production config for asset handling
  assetsInclude: ['**/*.svg', '**/*.csv'],

  server: {
    port: 5174,  // keep separate from the production dev server (5173)
    open: true,
  },

  build: {
    // Prototype builds go to prototypes/[feature]/[version]/dist/
    // — never into the production dist/
    outDir: path.resolve(protoDir, 'dist'),
    emptyOutDir: true,
  },
})
