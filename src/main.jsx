import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeLayout from './pages/HomeLayout'
import Start from './pages/Start'
import Root from './pages/Root'
import Level from './pages/Level'
import Shop from './pages/Shop'
import Pokedex from './pages/Pokedex'
import Stats from './pages/Stats'
import './index.css'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  { path: '/', element: <Start /> },
  {
    path: '/home',
    element: <Root />,
    children: [
      { index: true, element: <HomeLayout /> },
      { path: 'level/:levelNumber', element: <Level /> },
      { path: 'shop', element: <Shop /> },
      { path: 'pokedex', element: <Pokedex /> },
      { path: 'stats', element: <Stats /> },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)