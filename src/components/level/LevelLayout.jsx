import { useOutletContext } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Inventory from './Inventory'
import BattleLayout from './BattleLayout'

export default function LevelLayout({ caughtPokemon, wildPokemon, typeMap, timer, multiplier}) {
  const { playerData, updateData } = useOutletContext()
  const { levelNumber } = useParams()
  
  const [wildIndex, setWildIndex] = useState(0)
  const [wildHp, setWildHp] = useState([])

  useEffect(() => {
    if (!wildPokemon.length) return

    const initialHp = Object.fromEntries(
      wildPokemon.map(p => [p.id, p.hp])
    )
    setWildHp(initialHp)
  }, [wildPokemon])

  const currentWildPokemon = wildPokemon[wildIndex]

  function attackWildPokemon() {
    if (!currentWildPokemon) return

    setWildHp(prev => {
      const newHp = (prev[currentWildPokemon.id] ?? 0) - 20

      const updated = {
        ...prev,
        [currentWildPokemon.id]: newHp
      }

      if (newHp <= 0) {
        let nextIndex = wildIndex + 1
        while (nextIndex < wildPokemon.length && (updated[wildPokemon[nextIndex].id] ?? 0) <= 0) {
          nextIndex++
        }
        setWildIndex(nextIndex)
      }
      console.log(updated)
      return updated
    })
  }

  return (
    <div className="flex">

      <div className="w-1/3 p-4 bg-slate-blue">
        <Inventory 
          caughtPokemon={caughtPokemon}
          typeMap={typeMap}
        />
      </div>
      
      <div className="flex-1">
        <div className="bg-dark-gray p-3">
          <h1 className="font-quantico font-bold text-xl text-white pl-1">LEVEL {levelNumber}</h1>
          {/* timer */}
        </div>

        <BattleLayout 
          pokemon={currentWildPokemon}
          hp={wildHp[currentWildPokemon?.id]}
          attack={attackWildPokemon}
        />

        {/* multiplier */}
        {/* xp */}

      </div>
      
      
     
    </div>
  )
}