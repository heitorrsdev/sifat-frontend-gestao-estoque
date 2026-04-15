import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { EstoqueProvider } from './contexts/EstoqueContext';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Falha crítica: Elemento 'root' não encontrado no DOM.");
}

createRoot(rootElement).render(
  <StrictMode>
    <EstoqueProvider>
      <RouterProvider router={router} />
    </EstoqueProvider>
  </StrictMode>
);
