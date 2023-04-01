import { createBrowserRouter } from 'react-router-dom';
import DigidexLayout from '../components/DigidexLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../views/Home';
import Digidex from '../views/Digidex';
import DigimonDetail from '../views/DigimonDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/digidex',
    element: (
      <ProtectedRoute>
        <DigidexLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ':id',
        element: <DigimonDetail />,
      },
      {
        path: '',
        element: <Digidex />,
      },
    ],
  },
]);
