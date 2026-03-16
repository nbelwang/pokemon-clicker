import { useOutletContext } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchLevelPokemon, fetchTypesEffectiveAgainst } from '../utils/api'
import LevelLayout from '../components/level/LevelLayout'
import pokemonLevels from '../utils/pokemonLevels.json'
import hessFace from '../assets/smilehess.png'

const BOSS_DATA = {
  id: 'final-boss', 
  name: 'ROB HESS',
  hp: 494,
  maxHp: 494,
  attack: 400, 
  sprite: hessFace, 
  types: [],
};

const LEVEL_CONFIG = {
  1: { numWild: 1, timeLimit: 60 },  // in seconds
  2: { numWild: 2, timeLimit: 30 },
  3: { numWild: 3, timeLimit: 30 },
  4: { numWild: 2, timeLimit: 30 },
  5: { numWild: 1, timeLimit: 120 }, 
};

export default function Level() {
  const { playerData } = useOutletContext()
  const { levelNumber } = useParams()
  const [wildPokemonIds, setWildPokemonIds] = useState([]);

  const isBossLevel = levelNumber === "5";
  
  const config = LEVEL_CONFIG[levelNumber] || { numWild: 0, timeLimit: 60 };
  const numWild = config.numWild; // number of encounters per level  
  const timeLimit = config.timeLimit;
  
  // set the wildPokemonIds every time level changes
  useEffect(() => {
    if (isBossLevel) {
      setWildPokemonIds([]);
      return;
    }

    const allLevelPokemonIds = pokemonLevels[`level${levelNumber}`] || []
    const available = allLevelPokemonIds.filter(id => !playerData.pokemon.includes(id));
    const selected = [...available].sort(() => Math.random() - 0.5).slice(0, numWild);
    
    setWildPokemonIds(selected);
  }, [levelNumber]); 
  
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
    return <div className="p-10 font-quantico">Loading...</div>
  }

  const pokemon = pokemonQueries.map(q => q.data).filter(Boolean)
  const caughtPokemon = pokemon.filter(p => playerData.pokemon.includes(p.id))
  const wildPokemon = isBossLevel 
      ? [BOSS_DATA] 
      : pokemon.filter(p => wildPokemonIds.includes(p.id));

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
        initialTime={timeLimit}
      />
      
    </div>
    
  )
}