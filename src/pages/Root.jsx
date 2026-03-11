import { useState } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { loadData, saveData } from '../utils/sessionStorage'

export default function Root() {
  const [playerData, setPlayerData] = useState(() => loadData())
  const location = useLocation()

  function updateData(changes) {
    const newData = { ...playerData, ...changes }
    saveData(newData)
    setPlayerData(newData)
  }
    
  const onHome = location.pathname === "/home"

  return (
    <div className="flex flex-col h-screen bg-mint-white">

      <nav className="bg-royal-blue text-white flex items-center justify-between px-6 py-6">
        <NavLink
          to={onHome ? "/" : "/home"}
          className="font-press-start text-sm hover:text-yellow"
        >
          {onHome ? "< START" : "< HOME"}
        </NavLink>
      </nav>

      <div className="flex-1">
        <Outlet context={{ playerData, updateData }} />
      </div>

    </div>
  )
}