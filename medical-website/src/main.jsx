import { createRoot } from 'react-dom/client'
// CSS moved to index.html with preload to avoid render-blocking
import './vitals.ts'
import App from './App'

createRoot(document.getElementById('root')).render(<App />)
