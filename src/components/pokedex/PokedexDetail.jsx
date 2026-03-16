import { useState, useEffect } from "react"

export default function PokedexDetail({ pokemon }) {
    const [pokemonDetails, setPokemonDetails] = useState(null)
    const [weaknesses, setWeaknesses] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        if (!pokemon) return

        async function fetchDetails() {
            setError("")
            setPokemonDetails(null)
            setWeaknesses([])
            try {
                // Fetch species details for descriptions
                const speciesRes = await fetch(
                    `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`,
                )
                if (!speciesRes.ok) throw new Error()
                const data = await speciesRes.json()
                setPokemonDetails(data)

                // Calculate weakness (pokeapi does not have a dedicated weaknesses array)
                const typePromises = pokemon.types.map((t) =>
                    fetch(t.type.url).then((res) => res.json()),
                )
                const typeData = await Promise.all(typePromises)

                const damageMultipliers = {}

                typeData.forEach((td) => {
                    td.damage_relations.double_damage_from.forEach((t) => {
                        damageMultipliers[t.name] =
                            (damageMultipliers[t.name] || 1) * 2
                    })
                    td.damage_relations.half_damage_from.forEach((t) => {
                        damageMultipliers[t.name] =
                            (damageMultipliers[t.name] || 1) * 0.5
                    })
                    td.damage_relations.no_damage_from.forEach((t) => {
                        damageMultipliers[t.name] = 0
                    })
                })

                // Filter out the types that deal > 1x damage
                const calculatedWeaknesses = Object.keys(
                    damageMultipliers,
                ).filter((t) => damageMultipliers[t] > 1)
                setWeaknesses(calculatedWeaknesses)
            } catch {
                setError("Pokemon details not found")
            }
        }

        fetchDetails()
    }, [pokemon])

    if (!pokemon) {
        return (
            <div className="h-full border-[3px] border-royal-blue rounded-4xl bg-white flex flex-col items-center justify-center px-8 py-12 md:p-8">
                <p className="text-dark-gray font-quantico text-xl">
                    No Pokemon selected
                </p>
            </div>
        )
    }

    // Calculations for stats and stuff
    const heightInInches = (pokemon.height * 10) / 2.54
    const feet = Math.floor(heightInInches / 12)
    const inches = Math.round(heightInInches % 12)
        .toString()
        .padStart(2, "0")
    const weightInLbs = ((pokemon.weight / 10) * 2.20462).toFixed(1)
    const hp = pokemon.stats?.find((s) => s.stat.name === "hp")?.base_stat
    const speciesText =
        pokemonDetails?.genera
            ?.find((g) => g.language.name === "en")
            ?.genus?.replace(" Pokémon", "") || "Unknown"

    // Colors for the types
    const getTypeColor = (type) => {
        const colors = {
            normal: "bg-[#A8A878]",
            fire: "bg-[#F08030]",
            water: "bg-[#6890F0]",
            electric: "bg-[#F8D030]",
            grass: "bg-[#78C850]",
            ice: "bg-[#98D8D8]",
            fighting: "bg-[#C03028]",
            poison: "bg-[#A040A0]",
            ground: "bg-[#E0C068]",
            flying: "bg-[#A890F0]",
            psychic: "bg-[#F85888]",
            bug: "bg-[#A8B820]",
            rock: "bg-[#B8A038]",
            ghost: "bg-[#705898]",
            dragon: "bg-[#7038F8]",
            dark: "bg-[#705848]",
            steel: "bg-[#B8B8D0]",
            fairy: "bg-[#EE99AC]",
        }
        return colors[type.toLowerCase()] || "bg-[#e2e2e2] text-gray-500"
    }

    return (
        <div className="h-fit bg-white border-[3px] border-royal-blue rounded-4xl p-8 lg:p-9 flex flex-col overflow-y-auto">
            {/* Top section with image/description */}
            <div className="flex flex-row flex-wrap gap-6 md:gap-10 mb-10 items-start pt-2">
                <div className="bg-[#f0f0f0] rounded-4xl w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 flex items-center justify-center shrink-0">
                    <img
                        src={
                            pokemon.sprites.other?.["official-artwork"]
                                ?.front_default || pokemon.sprites.front_default
                        }
                        alt={pokemon.name}
                        className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48  object-contain drop-shadow-lg"
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <h2 className="font-press-start text-black text-xl lg:text-2xl mb-2 md:mb-4 uppercase">
                        {pokemon.name}
                    </h2>
                    {pokemonDetails && (
                        <p className="font-quantico textx-lg lg:text-xl text-left text-dark-gray">
                            {pokemonDetails.flavor_text_entries
                                .find((e) => e.language.name === "en")
                                ?.flavor_text.replace(/\n|\f/g, " ")}
                        </p>
                    )}
                </div>
            </div>

            {/* hp/type/weaknesses */}
            <div className="flex flex-col gap-6 mb-10 font-quantico">
                <div className="flex flex-col gap-y-2 lg:grid lg:grid-cols-8 lg:justify-between">
                    <div className="col-span-2">
                        <p className="text-md md:text-lg">
                            <strong>Base HP:</strong> {hp}
                        </p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-md md:text-lg">
                            <strong>ATK:</strong> {pokemon.stats[1].base_stat}
                        </p>
                    </div>
                    <div className="col-span-4 flex flex-row gap-x-2">
                        <p className="text-md md:text-lg">
                            <strong>Type:</strong>
                        </p>
                        <div className="flex flex-row flex-wrap gap-2 h-fit">
                            {pokemon.types.map((t) => (
                                <p
                                    key={t.slot}
                                    className={`px-4 py-1 rounded text-sm md:text-md capitalize transition-colors ${getTypeColor(t.type.name)}`}
                                >
                                    {t.type.name}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-y-2 lg:flex-row lg:gap-x-2">
                    <p className="text-md md:text-lg">
                        <strong>Weaknesses:</strong>
                    </p>
                    <div className="flex flex-row flex-wrap gap-2">
                        {weaknesses.map((w) => (
                            <p
                                key={w}
                                className={`px-4 py-1 rounded text-sm md:text-md capitalize transition-colors ${getTypeColor(w)}`}
                            >
                                {w}
                            </p>
                        ))}
                        {weaknesses.length === 0 && (
                            <p className="text-gray-500 italic text-sm">None</p>
                        )}
                    </div>
                </div>
            </div>

            {/* 2 x 2 box of stats */}
            <div className="bg-[#f0f0f0] rounded-2xl px-4 py-6 flex flex-col gap-y-4 lg:grid lg:grid-cols-3">
                <p className="font-quantico text-md md:text-lg">
                    <strong>Height:</strong> {feet}' {inches}"
                </p>
                <p className="font-quantico text-md md:text-lg">
                    <strong>Weight:</strong> {weightInLbs} lbs
                </p>
                <p className="font-quantico text-md md:text-lg">
                    <strong>Species:</strong> {speciesText}
                </p>
            </div>

            {error && (
                <p className="text-salmon font-quantico mt-6 text-center">
                    {error}
                </p>
            )}
        </div>
    )
}
