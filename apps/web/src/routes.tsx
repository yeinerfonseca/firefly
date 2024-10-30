import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from './App.tsx'

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
    element: <h1>Details</h1>,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
])
