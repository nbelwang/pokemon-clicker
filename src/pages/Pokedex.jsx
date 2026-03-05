import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

export default function Pokedex() {
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

  return (
    <div>
      <h1>Pokédex</h1>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && searchPokemon()}
        placeholder="Name or ID"
      />
      <button onClick={searchPokemon}>Search</button>

      {error && <p>{error}</p>}

      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Poke ID (for dev only?): {pokemon.id}</p>
          <p>Type: {pokemon.types.map(t => t.type.name).join(', ')}</p>
          <p>HP: {pokemon.stats[0].base_stat}</p>
          <p>{playerData.pokemon.includes(pokemon.id) ? '✅ Caught' : '❌ Not Caught'}</p>
        </div>
      )}
    </div>
  )
}