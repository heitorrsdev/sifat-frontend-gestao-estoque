import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { Faturamento } from './pages/Faturamento';
import { Produtos } from './pages/Produtos';
import Placeholder from './pages/placeholder';

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
        element: <Placeholder />,
      },
      {
        path: '/editar/:id',
        element: <Placeholder />,
      },
    ],
  },
]);
