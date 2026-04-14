import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ToastContainer } from 'react-toastify';
import { EstoqueProvider } from './contexts/EstoqueContext';
import 'react-toastify/dist/ReactToastify.css';
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
    <ToastContainer position="top-right" autoClose={3000} />
  </StrictMode>
);
