import { useState } from 'react'
import PokedexSearch from '../components/pokedex/PokedexSearch'
import PokedexDetail from '../components/pokedex/PokedexDetail'

export default function Pokedex() {
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  return (
    <div className="flex flex-row m-5">
      {/* Just the normal search stuff */}
      <PokedexSearch className="grow" onSelect={setSelectedPokemon} />
      {/* Display PokedexDetail only if a Pokemon has been slected */}
      <PokedexDetail className="grow" pokemon={selectedPokemon}/>
    </div>
  )
}