import { createRoot } from 'react-dom/client'
// Loads design tokens (colors, typography, spacing) + Tailwind base styles
import '@/styles/index.css'
// Only needed if THIS prototype introduces new Tailwind classes not in src/:
// import './proto.css'
import { ProtoApp } from './ProtoApp'

createRoot(document.getElementById('root')!).render(<ProtoApp />)
