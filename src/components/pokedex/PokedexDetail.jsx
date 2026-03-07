export default function PokedexDetail({ pokemon, className = '' }) {
    if (!pokemon) {
        return (
            <div className={`w-full h-full flex items-center justify-center ${className}`}>
                <p className="text-gray-500 font-quantico">No Pokémon selected</p>
            </div>
        )
    }

    const { name, sprites, types, stats, id } = pokemon

    return(
        <div className={`w-full h-full p-6 overflow-auto ${className}`}>
            <h2 className="font-press-start text-xl text-royal-blue mb-4 capitalize">
                {name} #{id}
            </h2>
            <img
                src={sprites.front_default}
                alt={name}
                className="mb-4 w-32 h-32"
            />
            <div className="mb-4">
                <h3 className="font-quantico font-semibold">Types</h3>
                <ul className="list-disc list-inside">
                    {types.map(t => (
                        <li key={t.slot} className="capitalize">
                            {t.type.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="font-quantico font-semibold">Stats</h3>
                <ul className="list-disc list-inside">
                    {stats.map(s => (
                        <li key={s.stat.name} className="capitalize">
                            {s.stat.name}: {s.base_stat}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}