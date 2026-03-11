import { useOutletContext } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Inventory from './Inventory'
import BattleLayout from './BattleLayout'

export default function LevelLayout({ caughtPokemon, wildPokemon, typeMap, timer, multiplier}) {
  const { playerData, updateData } = useOutletContext()
  const { levelNumber } = useParams()
  
  const [battleState, setBattleState] = useState({
    wild: [],
    caught: [],
    activeWildIndex: 0,
    activeCaughtIndex: 0,
    status: "idle" // idle | fighting | finished
  })

  useEffect(() => {
    if (!wildPokemon.length || !caughtPokemon.length) return

    setBattleState({
      wild: wildPokemon.map(p => ({
        id: p.id,
        name: p.name,
        hp: p.hp,
        maxHp: p.hp,
        sprite: p.sprite,
        types: p.types,
        alive: true
      })),
      caught: caughtPokemon.map(p => ({
        id: p.id,
        name: p.name,
        hp: p.hp,
        maxHp: p.hp,
        sprite: p.sprite,
        types: p.types,
        alive: true
      })),
      activeWildIndex: 0,
      activeCaughtIndex: 0,
      status: "fighting"
    })
  }, [wildPokemon, caughtPokemon])

  const activeWild = battleState.wild[battleState.activeWildIndex]
  const activeCaught = battleState.caught[battleState.activeCaughtIndex]

  console.log(activeWild)
  console.log(activeCaught)

  function playerAttack() {
    setBattleState(prev => {
      const next = { ...prev } // make a copy of the state to edit 

      const wild = [...next.wild]
      const target = { ...wild[next.activeWildIndex] }

      target.hp -= 20 //eventually apply multiplier here 

      if (target.hp <= 0) {
        target.hp = 0
        target.alive = false
      }

      wild[next.activeWildIndex] = target
      next.wild = wild

      if (!target.alive) {
        handleWildFaint(next)
      }
      return next
    })

    //update playerData.pokemon if pokemon has fainted 

  }

  function handleWildFaint(state) {
    let nextIndex = state.activeWildIndex + 1

    if (nextIndex >= state.wild.length) {
      state.status = "finished"
      return
    }

    state.activeWildIndex = nextIndex
  }

  function setActiveCaught(activeCaughtIndex) {
    setBattleState(prev => ({
      ...prev,
      activeCaughtIndex
    }))
  }

  return (
    <div className="flex flex-1 h-full">

      <div className="w-1/3 p-2 pt-4 pl-3 bg-slate-blue flex flex-col">
        <Inventory 
          caughtPokemon={battleState.caught}
          activeCaughtIndex={battleState.activeCaughtIndex}
          setActiveCaught={setActiveCaught}
        />
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="bg-dark-gray p-3">
          <h1 className="font-quantico font-bold text-xl text-white pl-1">LEVEL {levelNumber}</h1>
          {/* timer */}
        </div>

        <BattleLayout 
          pokemon={activeWild}
          attack={playerAttack}
          status={battleState.status}
        />

        {/* multiplier */}
        {/* xp */}

      </div>
      
      
     
    </div>
  )
}