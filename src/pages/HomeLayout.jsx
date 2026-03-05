import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { loadData, saveData } from '../utils/sessionStorage'

export default function HomeLayout() {
  const [playerData, setPlayerData] = useState(() => loadData())
  const navigate = useNavigate()

  function updateData(changes) {
    // TODO: merge `changes` into playerData, save to sessionStorage, update state
    // hint: const newData = { ...playerData, ...changes }
    // then saveData(newData) and setPlayerData(newData)
  }

  return (
    <div>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/home/pokedex">Pokédex</NavLink>
        <NavLink to="/home/shop">Shop</NavLink>
        <NavLink to="/home/stats">Stats</NavLink>
        <span>XP: {playerData.xp}</span>
      </nav>
      <Outlet context={{ playerData, updateData }} />
    </div>
  )
}