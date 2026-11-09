import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx';
import './index.css';
import { initGoogleAnalytics } from './services/analytics';
import { getGoogleClientId } from './services/googleAuth';

// Suporte e normalização para carregamento direto na raiz ou subrotas no GitHub Pages
if (typeof window !== 'undefined' && window.location.pathname && window.location.pathname !== '/' && !window.location.hash) {
  const pathName = window.location.pathname;
  if (!pathName.includes('.')) {
    window.location.replace(`${window.location.origin}${window.location.search}#${pathName}`);
  }
}

// Inicialização do Google Analytics 4 (Execução exclusiva no cliente/browser)
if (typeof window !== 'undefined') {
  initGoogleAnalytics();
}

// Register PWA Service Worker if supported
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.log('SW registration note:', err);
    });
  });
}

// Ativando o Armazenamento Persistente Seguro no Navegador do Cliente
if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
  navigator.storage.persist().then((isPersistent) => {
    if (isPersistent) {
      console.log("🔒 [NutrinK] Proteção Ativa: O navegador prometeu NUNCA apagar os dados do app automaticamente.");
    } else {
      console.log("⚠️ [NutrinK] O navegador recusou a persistência automática de dados.");
    }
  });
}

const googleClientId = getGoogleClientId();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <HashRouter>
        <App />
      </HashRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);
