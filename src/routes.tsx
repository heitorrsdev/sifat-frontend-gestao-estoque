import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { Faturamento } from './pages/Faturamento';
import { Produtos } from './pages/Produtos';
import { Cadastro } from './pages/Cadastro';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Produtos />,
      },
      {
        path: '/faturamento',
        element: <Faturamento />,
      },
      {
        path: '/cadastro',
        element: <Cadastro />,
      },
      {
        path: '/editar/:id',
        element: <Cadastro />,
      },
    ],
  },
]);
