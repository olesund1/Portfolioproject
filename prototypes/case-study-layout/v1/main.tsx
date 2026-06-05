import { createRoot } from 'react-dom/client'
// Loads design tokens (colors, typography, spacing) + Tailwind base styles
import '@/styles/index.css'
// Scans this prototype's TSX files for Tailwind classes not present in src/
import './proto.css'
import { ProtoApp } from './ProtoApp'

createRoot(document.getElementById('root')!).render(<ProtoApp />)
