import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

export default function PokedexSearch() {
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
    <div className="p-6">
      <h1 className="font-press-start text-2xl text-royal-blue mb-6">Pokedex</h1>

      <div className="flex gap-2 mb-6">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && searchPokemon()}
          placeholder="Search Pokemon..."
          className="bg-white border border-powder-blue rounded px-3 py-2 font-quantico w-64 focus:outline-none focus:border-royal-blue"
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
        <div className="bg-white border border-powder-blue rounded-xl p-6 w-72 shadow">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-press-start text-sm text-dark-gray uppercase">{pokemon.name}</h2>
            <span className={`font-quantico text-sm font-bold ${isCaught ? 'text-green' : 'text-salmon'}`}>
              {isCaught ? 'Caught' : 'Not Caught'}
            </span>
          </div>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-28 h-28 mx-auto"
          />
          <div className="mt-2 font-quantico text-sm flex flex-col gap-1">
            <p>
              <span className="font-bold">Type: </span>
              {pokemon.types.map(t => (
                <span key={t.type.name} className="bg-slate-blue text-dark-gray px-2 py-0.5 rounded mr-1 text-xs">
                  {t.type.name}
                </span>
              ))}
            </p>
            <p><span className="font-bold">HP:</span> {pokemon.stats[0].base_stat}</p>
          </div>
        </div>
      )}
    </div>
  )
}