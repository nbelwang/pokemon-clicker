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
        attack: p.attack/10,
        sprite: p.sprite,
        types: p.types,
        alive: true
      })),
      caught: caughtPokemon.map(p => ({
        id: p.id,
        name: p.name,
        hp: p.hp,
        maxHp: p.hp,
        attack: p.attack/10,  
        sprite: p.sprite,
        types: p.types,
        alive: true
      })),
      activeWildIndex: 0,
      activeCaughtIndex: 0,
      status: "fighting"
    })
  }, [wildPokemon])

  useEffect(() => {
    if (battleState.status !== "finished") return

    const caughtIds = battleState.caught.map(p => p.id)

    updateData({
      pokemon: caughtIds
    })

  }, [battleState.status])

  const activeWild = battleState.wild[battleState.activeWildIndex]
  const encounter = `${battleState.activeWildIndex + 1}/${battleState.wild.length}`

  function playerAttack() {
    setBattleState(prev => {
      const next = { ...prev } // make a copy of the state to edit 

      const wild = [...next.wild]
      const caught = [...next.caught]
      const target = { ...wild[next.activeWildIndex] }

      target.hp -= 20 //eventually apply multiplier here 

      if (target.hp <= 0) {
        target.hp = 0
        target.alive = false

        caught.push({
          ...target,
          alive: false
        })
      }

      wild[next.activeWildIndex] = target
      next.wild = wild
      next.caught = caught

      if (!target.alive) {
        handleWildFaint(next)
      }
      return next
    })
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
    <div className="flex flex-1 h-full min-h-0">

      <div className="w-1/3 p-2 pt-4 pl-3 bg-slate-blue flex flex-col h-full min-h-0">
        <Inventory 
          caughtPokemon={battleState.caught}
          activeCaughtIndex={battleState.activeCaughtIndex}
          setActiveCaught={setActiveCaught}
        />
      </div>
      
      <div className="flex-1 flex flex-col h-full">
        <div className="bg-dark-gray p-3">
          <h1 className="font-quantico font-bold text-xl text-white pl-1">LEVEL {levelNumber}</h1>
          {/* timer */}
        </div>

        {/* if level 5, show the boss battle page lol */}

        <BattleLayout 
          pokemon={activeWild}
          attack={playerAttack}
          status={battleState.status}
          encounter={encounter}
        />

        {/* multiplier */}
        {/* xp */}

      </div>
      
      
     
    </div>
  )
}