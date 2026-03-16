import InventoryCard from './InventoryCard'

export default function Inventory({ caughtPokemon, activeCaughtIndex, setActiveCaught, caughtPulse}) {
  const hasPokemon = caughtPokemon && caughtPokemon.length > 0;

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="font-quantico font-bold text-xl mb-3 text-royal-blue">My Pokémon</h1>

      <div className="flex flex-col flex-1 gap-2 pr-3 overflow-y-auto min-h-0">
        {!hasPokemon ? (
          <div className='flex flex-col gap-3 font-quantico text-black'> 
            <p>Click on the wild pokemon before it runs away!</p>
            <p>If you defeat it, it is yours.</p>
            <p>Your pokemon will deal damage automatically.</p>
          </div>
        ) : (
          caughtPokemon.map((pokemon, index) => (
            <InventoryCard
              key={pokemon.id}
              pokemon={pokemon}
              index={index}
              activeCaughtIndex={activeCaughtIndex}
              setActiveCaught={setActiveCaught}
              pulse={caughtPulse && index === activeCaughtIndex}
            />
          ))
        )}
      </div>

    </div>
  )
}