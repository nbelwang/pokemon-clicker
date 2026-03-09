import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

import PokedexCard from './PokedexCard'

export default function PokedexSearch({ onSelect, className = '' }) {
  const { playerData } = useOutletContext()
  const [query, setQuery] = useState('')
  const [inventoryPokemon, setInventoryPokemon] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchInventory() {
      if (!playerData?.pokemon?.length) {
        setInventoryPokemon([])
        return
      }

      setLoading(true)
      try {
        const promises = playerData.pokemon.map(id =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
        )
        const data = await Promise.all(promises)
        setInventoryPokemon(data)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch Pokemon data')
      } finally {
        setLoading(false)
      }
    }

    fetchInventory()
  }, [playerData?.pokemon])

  const filteredPokemon = inventoryPokemon.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className={`p-6 w-full h-full flex flex-col ${className}`}>      
      <h1 className="font-press-start text-2xl text-royal-blue mb-6">Pokedex</h1>
      <div className="flex gap-2 mb-6 shrink-0">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search caught Pokemon..."
          className="bg-white border border-powder-blue rounded px-3 py-2 font-quantico w-full focus:outline-none focus:border-royal-blue "
        />
      </div>

      {error && <p className="text-salmon font-quantico mb-4">{error}</p>}
      {loading && <p className="text-royal-blue font-quantico mb-4">Loading pokedex...</p>}
      {/* If there is no pokemon in the player's inventory */}
      {!loading && inventoryPokemon.length === 0 && (
        <p className="text-gray-500 font-quantico mb-4">No Pokemon caught yet!</p>
      )}

      <div className="flex flex-row flex-wrap gap-4 overflow-y-auto min-h-0 flex-1 justify-center content-start">
        {filteredPokemon.map(p => (
          <PokedexCard
            key={p.id}
            name={p.name}
            frontSprite={p.sprites.front_default}
            types={p.types}
            stats={p.stats}
            isCaught={true}
            onClick={() => onSelect && onSelect(p)}
          />
        ))}
        {!loading && inventoryPokemon.length > 0 && filteredPokemon.length === 0 && query && (
          <p className="text-salmon font-quantico mb-4">No caught Pokemon found matching "{query}"</p>
        )}
      </div>
    </div>
  )
}