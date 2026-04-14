import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { Placeholder } from './pages/placeholder';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Placeholder />,
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
