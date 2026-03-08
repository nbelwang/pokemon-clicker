import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

import PokedexCard from './PokedexCard'

export default function PokedexSearch({ onSelect, className = '' }) {
  const { playerData } = useOutletContext()
  const [query, setQuery] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState('')

  async function searchPokemon() {
    setError('')
    setPokemon(null)
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setPokemon(data)
    } catch {
      setError('Pokemon not found')
    }
  }

  const isCaught = pokemon && playerData.pokemon.includes(pokemon.id)

  return (
    <div className={`p-6 w-full h-full ${className}`}>      
      <h1 className="font-press-start text-2xl text-royal-blue mb-6">Pokedex</h1>
      <div className="flex gap-2 mb-6">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && searchPokemon()}
          placeholder="Search Pokemon..."
          className="bg-white border border-powder-blue rounded px-3 py-2 font-quantico w-64 focus:outline-none focus:border-royal-blue w-full"
        />
        <button
          onClick={searchPokemon}
          className="bg-royal-blue text-white font-quantico px-4 py-2 rounded hover:brightness-110"
        >
          Search
        </button>
      </div>

      {error && <p className="text-salmon font-quantico mb-4">{error}</p>}

      {pokemon && (
        // Pokemon Mini Card Display
        <PokedexCard
          name = {pokemon.name}
          frontSprite = {pokemon.sprites.front_default}
          types = {pokemon.types}
          stats = {pokemon.stats}
          isCaught = {isCaught}
          onClick={() => onSelect && onSelect(pokemon)}
        />
      )}
    </div>
  )
}