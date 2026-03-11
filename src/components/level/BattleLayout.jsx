
export default function BattleLayout({ pokemon, attack, status }) {

  if (status === "finished") {
    return <div className="p-10">Level Complete</div>
  }

  if (!pokemon) {
    return <div className="p-10">Loading...</div>
  }

  const hpPercent = (pokemon.hp / pokemon.maxHp) * 100

  return (
    <div className="flex flex-col items-center gap-3 pt-15">

      {/* nametag */}
      <div className="border-3 border-dark-gray rounded-lg p-2 bg-white">
        <div className="flex items-end justify-between mb-1">
          <h1 className="font-silkscreen text-2xl">{pokemon.name}</h1>
          <p className="font-quantico mr-1">{pokemon.hp} / {pokemon.maxHp}</p>
        </div>
        <div className="flex items-center w-110 p-1 h-7 bg-dark-gray rounded">
          <p className="font-quantico font-bold text-yellow pr-1">HP </p>
          <div className="w-full rounded bg-white">
            <div
            className="bg-salmon rounded h-5"
            style={{ width: `${hpPercent}%` }}
            />
          </div>
        </div>
      </div>

      <img
        src={pokemon.sprite}
        className="cursor-pointer h-110 w-110"
        onClick={attack}
      />

    </div>
  )
}