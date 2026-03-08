import { useState, useEffect } from 'react'

export default function PokedexDetail({ pokemon, className = '' }) {
    const [pokemonDetails, setPokemonDetails] = useState(null)
    const [weaknesses, setWeaknesses] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        if (!pokemon) return;

        async function fetchDetails() {
            setError('')
            setPokemonDetails(null)
            setWeaknesses([])
            try {
                // Fetch species details for descriptions
                const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`)
                if (!speciesRes.ok) throw new Error()
                const data = await speciesRes.json()
                setPokemonDetails(data)

                // Calculate weakness (pokeapi does not have a dedicated weaknesses array)
                const typePromises = pokemon.types.map(t => fetch(t.type.url).then(res => res.json()))
                const typeData = await Promise.all(typePromises)

                const damageMultipliers = {}
                
                typeData.forEach(td => {
                    td.damage_relations.double_damage_from.forEach(t => {
                        damageMultipliers[t.name] = (damageMultipliers[t.name] || 1) * 2
                    })
                    td.damage_relations.half_damage_from.forEach(t => {
                        damageMultipliers[t.name] = (damageMultipliers[t.name] || 1) * 0.5
                    })
                    td.damage_relations.no_damage_from.forEach(t => {
                        damageMultipliers[t.name] = 0
                    })
                })

                // Filter out the types that deal > 1x damage
                const calculatedWeaknesses = Object.keys(damageMultipliers).filter(t => damageMultipliers[t] > 1)
                setWeaknesses(calculatedWeaknesses)

            } catch {
                setError('Pokemon details not found')
            }
        }

        fetchDetails()
    }, [pokemon])

    if (!pokemon) {
        return (
            <div className={`mt-6 w-full h-full border-[3px] border-royal-blue rounded-4xl bg-white flex flex-col items-center justify-center p-8 ${className}`}>
                <p className="text-gray-500 font-quantico text-xl">No Pokemon selected</p>
            </div>
        )
    }

    // Calculations for stats and stuff
    const heightInInches = (pokemon.height * 10) / 2.54;
    const feet = Math.floor(heightInInches / 12);
    const inches = Math.round(heightInInches % 12).toString().padStart(2, '0');
    const weightInLbs = ((pokemon.weight / 10) * 2.20462).toFixed(1);
    const hp = pokemon.stats?.find(s => s.stat.name === 'hp')?.base_stat;
    const speciesText = pokemonDetails?.genera?.find(g => g.language.name === 'en')?.genus?.replace(' Pokémon', '') || 'Unknown';

    // Colors for thep types
    const getTypeColor = (type) => {
        const colors = {
            normal: 'bg-[#A8A878]', fire: 'bg-[#F08030]', water: 'bg-[#6890F0]',
            electric: 'bg-[#F8D030]', grass: 'bg-[#78C850]', ice: 'bg-[#98D8D8]',
            fighting: 'bg-[#C03028]', poison: 'bg-[#A040A0]', ground: 'bg-[#E0C068]',
            flying: 'bg-[#A890F0]', psychic: 'bg-[#F85888]', bug: 'bg-[#A8B820]',
            rock: 'bg-[#B8A038]', ghost: 'bg-[#705898]', dragon: 'bg-[#7038F8]',
            dark: 'bg-[#705848]', steel: 'bg-[#B8B8D0]', fairy: 'bg-[#EE99AC]',
        };
        return colors[type.toLowerCase()] || 'bg-[#e2e2e2] text-gray-500';
    };

    return(
        <div className={`w-full h-full bg-white border-[3px] border-royal-blue rounded-4xl p-8 lg:p-10 flex flex-col overflow-auto ${className}`}>
            {/* Top section with image/description */}
            <div className="flex flex-col lg:flex-row gap-6 md:gap-10 mb-10 items-center lg:items-start">
                <div className="bg-[#f0f0f0] rounded-4xl w-48 h-48 md:w-56 md:h-56 flex items-center justify-center shrink-0">
                    <img
                        src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-lg"
                    />
                </div>
                <div className="flex flex-col justify-center max-w-xl text-center lg:text-left mt-4">
                    <h2 className="font-press-start text-[1.75rem] tracking-[0.15em] text-black mb-6 uppercase">
                        {pokemon.name}
                    </h2>
                    {pokemonDetails && (
                        <p className="font-quantico text-[1.1rem] leading-relaxed text-gray-800 text-left">
                            {pokemonDetails.flavor_text_entries
                                .find(e => e.language.name === 'en')
                                ?.flavor_text.replace(/\n|\f/g, ' ')
                            }
                        </p>
                    )}
                </div>
            </div>

            {/* hp/type/weaknesses */}
            <div className="flex flex-col gap-6 mb-10 font-quantico text-[1.1rem]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-12 md:gap-20">
                    <div className="flex items-center min-w-40">
                        <span className="font-bold text-black mr-2">Base HP :</span>
                        <span className="font-bold text-black">{hp}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
                        <span className="font-bold text-black">Type</span>
                        <div className="flex gap-2">
                            {pokemon.types.map(t => (
                                <span key={t.slot} className={`px-4 py-1 rounded text-sm capitalize font-bold text-black transition-colors ${getTypeColor(t.type.name)}`}>
                                    {t.type.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-12 md:gap-20">
                    <div className="flex items-center min-w-40">
                        <span className="font-bold text-black">Weaknesses</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
                        <div className="flex gap-2 flex-wrap">
                            {weaknesses.map(w => (
                                <span key={w} className={`px-4 py-1 rounded text-sm capitalize font-bold text-black transition-colors ${getTypeColor(w)}`}>
                                    {w}
                                </span>
                            ))}
                            {weaknesses.length === 0 && (
                                <span className="text-gray-500 italic text-sm">None</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2 x 2 box of stats */}
            <div className="bg-[#f0f0f0] rounded-4xl p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 font-quantico text-[1.1rem] text-black">
                <div className="flex flex-col gap-6">
                    <p><span className="font-bold mr-4">Height:</span> {feet}' {inches}"</p>
                    <p><span className="font-bold mr-4">Weight:</span> {weightInLbs} lbs</p>
                </div>
                <div className="flex flex-col gap-6">
                    <p><span className="font-bold mr-4">Species:</span> {speciesText}</p>
                    <p className="text-black leading-relaxed">Some more random info I will replace later</p>
                </div>
            </div>

            {error && (
                <p className="text-salmon font-quantico mt-6 text-center">{error}</p>
            )}
        </div>
    )
}