import { useOutletContext } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { fetchLevelPokemon } from '../utils/api'

export default function Levels() {
  const { playerData, updateData } = useOutletContext()
  const { levelNumber } = useParams()

  const pokemonQueries = useQueries({
    queries: playerData.pokemon.map((id) => ({
      queryKey: ['pokemon', id],
      queryFn: () => fetchLevelPokemon(id),
      staleTime: Infinity
    }))
  })

  const pokemon = pokemonQueries
    .map(q => q.data)
    .filter(Boolean)

  function handleClick() {
    updateData({
      xp: playerData.xp + 1
    })
  }

  return (
    <div className="p-6">
      <h1 className="font-press-start text-2xl text-royal-blue mb-2">LEVEL {levelNumber}</h1>

      <p className="font-quantico text-dark-gray mb-6">XP: {playerData.xp}</p>

      <button className="border"
        onClick={handleClick}>
        increase xp
      </button>

      <div className="space-y-4">
        {pokemon.map((p) => (
          <div key={p.id} className="border p-3">
            <img src={p.sprite} alt={p.name} />
            <p>ID: {p.id}</p>
            <p>Name: {p.name}</p>
            <p>HP: {p.totalHP}</p>
            <p>Attack: {p.attack}</p>
            <p>Type: {p.type}</p>
          </div>
        ))}
      </div>
      
    </div>
    
  )
}