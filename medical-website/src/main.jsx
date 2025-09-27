import { createRoot } from 'react-dom/client'
import './vitals.ts'
import App from './App'
import stylesHref from './index.css?url'

function mountStylesheet() {
  if (typeof document === 'undefined') return;
  if (document.querySelector('link[data-app-style="main"]')) return;

  const preload = document.createElement('link');
  preload.rel = 'preload';
  preload.as = 'style';
  preload.href = stylesHref;
  preload.setAttribute('data-app-style', 'main-preload');
  document.head.appendChild(preload);

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = stylesHref;
  stylesheet.media = 'print';
  stylesheet.setAttribute('data-app-style', 'main');
  stylesheet.onload = () => {
    stylesheet.media = 'all';
  };
  document.head.appendChild(stylesheet);
}

mountStylesheet();

createRoot(document.getElementById('root')).render(<App />)
