import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeLayout from './pages/HomeLayout'
import Start from './pages/Start'
import Levels from './pages/Levels'
import Level from './pages/Level'
import Shop from './pages/Shop'
import Pokedex from './pages/Pokedex'
import Stats from './pages/Stats'
import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <Start /> },
  {
    path: '/home',
    element: <HomeLayout />,
    children: [
      { index: true, element: <Levels /> },
      { path: 'levels/:levelNumber', element: <Level /> },
      { path: 'shop', element: <Shop /> },
      { path: 'pokedex', element: <Pokedex /> },
      { path: 'stats', element: <Stats /> },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)