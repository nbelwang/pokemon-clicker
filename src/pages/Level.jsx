import { useOutletContext } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LevelLayout from '../components/level/LevelLayout'
import { fetchLevelPokemon, fetchTypesEffectiveAgainst } from '../utils/api'
import pokemonLevels from '../utils/pokemonLevels.json'

export default function Level() {
  const { playerData } = useOutletContext()
  const { levelNumber } = useParams()
  const [wildPokemonIds, setWildPokemonIds] = useState([]);
  
  // number of encounters per level  
  const wildPokemonPerLevel = {
    1: 5,
    2: 4,
    3: 3,
    4: 2
  }
  const numWild = wildPokemonPerLevel[levelNumber] || 0
  const allLevelPokemonIds = pokemonLevels[`level${levelNumber}`] || []
  
  useEffect(() => {
    const available = allLevelPokemonIds.filter(id => !playerData.pokemon.includes(id));
    const selected = [...available].sort(() => Math.random() - 0.5).slice(0, numWild);
    
    setWildPokemonIds(selected);
  }, [levelNumber]); // Triggers every time the URL param changes
  
  // fetch data for caught and wild pokemon 
  const allPokemonIds = [...new Set([...playerData.pokemon, ...wildPokemonIds])]

  const pokemonQueries = useQueries({
    queries: allPokemonIds.map((id) => ({
      queryKey: ['pokemon', id],
      queryFn: () => fetchLevelPokemon(id),
      staleTime: Infinity
    }))
  })

  // create type map to determine the types the pokemon are effective against
  const types = [...new Set(pokemonQueries.flatMap(q => q.data?.types || []))]

  const typeQueries = useQueries({
    queries: types.map((type) => ({
      queryKey: ['type', type],
      queryFn: () => fetchTypesEffectiveAgainst(type),
      staleTime: Infinity,
      enabled: !!types.length
    }))
  })  

  const isPokemonLoading = pokemonQueries.some(q => q.isLoading)
  const isTypesLoading = typeQueries.some(q => q.isLoading)
  
  if (isPokemonLoading || isTypesLoading) {
    return <div className="p-10 text-white">Loading...</div>
  }

  const pokemon = pokemonQueries.map(q => q.data).filter(Boolean)
  const caughtPokemon = pokemon.filter(p => playerData.pokemon.includes(p.id))
  const wildPokemon = pokemon.filter(p => wildPokemonIds.includes(p.id))

  const typeMap = Object.fromEntries(
    typeQueries
      .map(q => q.data)
      .filter(Boolean)
      .map(t => [t.type, t.effectiveAgainst])
  )

  return (
    <div className="flex flex-1 h-full min-h-0 overflow-hidden">

      <LevelLayout 
        key={levelNumber}
        caughtPokemon={caughtPokemon}
        wildPokemon={wildPokemon}
        typeMap={typeMap}
      />
      
    </div>
    
  )
}