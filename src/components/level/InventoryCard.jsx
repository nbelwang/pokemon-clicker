export default function InventoryCard({pokemon, index, activeCaughtIndex, setActiveCaught}) {
  const hpPercent = (pokemon.hp / pokemon.maxHp) * 100
  const isActive = index === activeCaughtIndex
  const isAlive = pokemon.alive

  function handleClick() {
    if (!isAlive) return
    setActiveCaught(index)
  }

  return (
    <div
      className={`border-3 rounded-lg flex p-3 gap-4  
                  ${!isAlive
                      ? "border-powder-blue bg-powder-blue cursor-not-allowed opacity-75" 
                      : isActive
                        ? "border-yellow border-8 bg-cream cursor-pointer"
                        : "border-royal-blue bg-white cursor-pointer hover:bg-gray-100"
                }`}
      onClick={handleClick}
    >

      <img className="h-30 w-30" src={pokemon.sprite} alt={pokemon.name} />
      
      <div className="flex flex-col w-full gap-2 mt-3 mr-1">
        <p className="font-silkscreen text-lg">{pokemon.name}</p>

        <div className="flex items-end justify-between">
          <p className="font-quantico">Type: {pokemon.types.join(", ")}</p>
          <p className="font-quantico">{pokemon.hp} / {pokemon.maxHp}</p>
        </div>

        <div className="flex items-center w-full p-1 h-7 bg-dark-gray rounded">
          <p className="font-quantico font-bold text-yellow pr-1">HP </p>
          <div className="w-full rounded bg-white">
            <div
            className={`rounded h-5 ${isActive? "bg-green" : "bg-light-green"}`}
            style={{ width: `${hpPercent}%` }}
            />
          </div>
        </div>
      </div>

    </div>
  )
}