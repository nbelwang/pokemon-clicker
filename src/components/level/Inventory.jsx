import InventoryCard from './InventoryCard'

export default function Inventory({ caughtPokemon, activeCaughtIndex, setActiveCaught}) {

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="font-quantico font-bold text-xl mb-3 text-royal-blue">My Pokémon</h1>

      <div className="flex flex-col flex-1 gap-2 pr-3 overflow-y-auto min-h-0">
        {caughtPokemon.map((pokemon, index) => (
          <InventoryCard
            key={pokemon.id}
            pokemon={pokemon}
            index={index}
            activeCaughtIndex={activeCaughtIndex}
            setActiveCaught={setActiveCaught}
          />
        ))}
      </div>

    </div>
  )
}