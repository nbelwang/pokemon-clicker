import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { loadData, saveData } from '../utils/sessionStorage'

export default function HomeLayout() {
  const [playerData, setPlayerData] = useState(() => loadData())

  function updateData(changes) {
    const newData = { ...playerData, ...changes }
    saveData(newData)
    setPlayerData(newData)
  }

  return (
    <div className="min-h-screen bg-cream">
      <nav className="bg-royal-blue text-white flex items-center justify-between px-6 py-3">
        <NavLink to="/" className="font-press-start text-sm tracking-wide hover:text-yellow">
          ← HOME
        </NavLink>
        <div className="flex gap-6 font-quantico text-base">
          <NavLink to="/home/pokedex" className={({ isActive }) => isActive ? 'text-yellow underline' : 'hover:text-yellow'}>
            Pokédex
          </NavLink>
          <NavLink to="/home" end className={({ isActive }) => isActive ? 'text-yellow underline' : 'hover:text-yellow'}>
            Levels
          </NavLink>
          <NavLink to="/home/shop" className={({ isActive }) => isActive ? 'text-yellow underline' : 'hover:text-yellow'}>
            Shop
          </NavLink>
          <NavLink to="/home/stats" className={({ isActive }) => isActive ? 'text-yellow underline' : 'hover:text-yellow'}>
            Stats
          </NavLink>
        </div>
        <div className="bg-cream text-dark-gray font-press-start text-xs px-3 py-1 rounded">
          XP: {playerData.xp}
        </div>
      </nav>
      <Outlet context={{ playerData, updateData }} />
    </div>
  )
}