import { useState } from 'react'
import PokedexSearch from '../components/pokedex/PokedexSearch'
import PokedexDetail from '../components/pokedex/PokedexDetail'

export default function Pokedex() {
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  return (
    <div className="flex flex-col lg:flex-row gap-5 p-5 h-[calc(100vh-100px)]">
      {/* Just the normal search stuff */}
      <PokedexSearch className="flex-1 min-w-0" onSelect={setSelectedPokemon} />
      {/* Display PokedexDetail only if a Pokemon has been selected */}
      <PokedexDetail className="flex-1 min-w-0" pokemon={selectedPokemon}/>
    </div>
  )
}