import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from './app.tsx'
import DetailsPage from './pages/details/page.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/catalog',
    element: <h1>Catalog</h1>,
  },
  {
    path: '/catalog/:id',
    element: <DetailsPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
])
