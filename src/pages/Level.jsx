import { useOutletContext } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react'
import LevelLayout from '../components/level/LevelLayout'
import { fetchLevelPokemon, fetchTypesEffectiveAgainst } from '../utils/api'
import pokemonLevels from '../utils/pokemonLevels.json'

export default function Levels() {
  const { playerData, updateData } = useOutletContext()
  const { levelNumber } = useParams()
  
  // number of encounters per level  
  const wildPokemonPerLevel = {
    1: 5,
    2: 4,
    3: 3,
    4: 2
  }
  const numWild = wildPokemonPerLevel[levelNumber] || 0
  const allLevelPokemon = pokemonLevels[`level${levelNumber}`] || []

  // if wildPokemon is empty, grabs numWild amount of ids from allLevelPokemon only once
  const wildPokemon = useMemo(() => {
    if (playerData.wildPokemon?.length) return playerData.wildPokemon

    const selected = [...allLevelPokemon].sort(() => Math.random() - 0.5).slice(0, numWild)

    updateData({ wildPokemon: selected })

    return selected
  }, [allLevelPokemon, numWild, playerData.wildPokemon])
    
  // fetch data for caught and wild pokemon 
  const allPokemonIds = [...new Set([...playerData.pokemon, ...playerData.wildPokemon])]

  const pokemonQueries = useQueries({
    queries: allPokemonIds.map((id) => ({
      queryKey: ['pokemon', id],
      queryFn: () => fetchLevelPokemon(id),
      staleTime: Infinity
    }))
  })

  const pokemon = pokemonQueries.map(q => q.data).filter(Boolean)

  // create type map to determine the types the pokemon are effective against
  const types = [...new Set(pokemon.flatMap(p => p.types))]

  const typeQueries = useQueries({
    queries: types.map((type) => ({
      queryKey: ['type', type],
      queryFn: () => fetchTypesEffectiveAgainst(type),
      staleTime: Infinity,
      enabled: !!types.length
    }))
  })  
  
  const typeMap = Object.fromEntries(
    typeQueries
      .map(q => q.data)
      .filter(Boolean)
      .map(t => [t.type, t.effectiveAgainst])
  )

  return (
    <div className="">

      <LevelLayout 
        pokemon={pokemon}
        caughtPokemonIds={playerData.pokemon}
        wildPokemonIds={wildPokemon}
        typeMap={typeMap}
      />
      
    </div>
    
  )
}