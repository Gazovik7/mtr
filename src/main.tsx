import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Missing #root element');
}

if (container.innerHTML.trim().length > 0) {
  hydrateRoot(container, <App />, { onRecoverableError: () => {} });
} else {
  createRoot(container).render(<App />);
}
