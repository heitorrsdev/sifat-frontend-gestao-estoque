import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
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
        element: <Placeholder />,
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
