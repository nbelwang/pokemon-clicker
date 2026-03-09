import { useOutletContext } from 'react-router-dom'

export default function Inventory({ caughtPokemon, typeMap}) {
  const { playerData, updateData } = useOutletContext()

  return (
    <div className="">
      <h1 className="font-quantico font-bold text-xl mb-2 text-royal-blue">My Pokémon</h1>

      <div className="space-y-4">
        {caughtPokemon.map((p) => (
          <div key={p.id} className="border p-3">
            <img src={p.sprite} alt={p.name} />
            <p>ID: {p.id}</p>
            <p>Name: {p.name}</p>
            <p>HP: {p.totalHP}</p>
            <p>Attack: {p.attack}</p>
            <p>Types: {p.types.join(", ")}</p>
            <p>
              Effective Against: {[...new Set(p.types.flatMap(type => typeMap[type] || []))].join(", ")}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}