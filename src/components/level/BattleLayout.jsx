import { useOutletContext } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function BattleLayout({ pokemon, hp, attack }) {
  const { playerData, updateData } = useOutletContext()
  const { levelNumber } = useParams()

  if (!pokemon) {
    return <div className="p-10">Level complete</div>
  }

  const maxHp = pokemon.hp
  const hpPercent = (hp / maxHp) * 100

  return (
    <div className="flex flex-col items-center gap-6 p-10">

      <h2 className="">{pokemon.name}</h2>
      <p className="">{pokemon.id}</p>


      <img
        src={pokemon.sprite}
        className="cursor-pointer"
        onClick={attack}
      />

      <div className="w-64 bg-gray-700 h-4 rounded">
        <div
          className="bg-green-500 h-4 rounded"
          style={{ width: `${hpPercent}%` }}
        />
      </div>

      <p className="">{hp} / {maxHp}</p>

    </div>
  )
}