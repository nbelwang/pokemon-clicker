import { useState, useEffect } from 'react'

export default function PokedexDetail({ pokemon, className = '' }) {
    const [pokemonDetails, setPokemonDetails] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!pokemon) return;

        async function searchPokemon() {
            setError('')
            setPokemonDetails(null)
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`)
                if (!res.ok) throw new Error()
                const data = await res.json()
                setPokemonDetails(data)
            } catch {
                setError('Pokemon not found')
            }
        }

        searchPokemon()
    }, [pokemon])

    if (!pokemon) {
        return (
            <div className={`w-full h-full flex items-center justify-center ${className}`}>
                <p className="text-gray-500 font-quantico">No Pokemon selected</p>
            </div>
        )
    }

    return(
        <div className={`w-full h-full p-6 overflow-auto ${className}`}>
            <div className="flex">
                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="mb-4 w-32 h-32 rounded-3xl border-2 border-royal-blue"
                />
                <div className="grid-cols-1 ml-5">
                    <h2 className="font-press-start text-xl text-royal-blue mb-4 capitalize">
                        {pokemon.name} #{pokemon.id}
                    </h2>
                    {pokemonDetails && (
                        <p className="font-quantico mb-4 leading-relaxed">
                            {pokemonDetails.flavor_text_entries
                                .find(e => e.language.name === 'en')
                                ?.flavor_text.replace(/\n|\f/g, ' ')
                            }
                        </p>
                    )}
                    {error && (
                        <p className="text-salmon font-quantico mb-4">{error}</p>
                    )}
                </div>
            </div>
            <div className="mb-4">
                <h3 className="font-quantico font-semibold">Types</h3>
                <ul className="list-disc list-inside">
                    {pokemon.types.map(t => (
                        <li key={t.slot} className="capitalize">
                            {t.type.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="font-quantico font-semibold">Stats</h3>
                <ul className="list-disc list-inside">
                    {pokemon.stats.map(s => (
                        <li key={s.stat.name} className="capitalize">
                            {s.stat.name}: {s.base_stat}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}