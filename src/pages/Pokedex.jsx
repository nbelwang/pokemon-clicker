import { useState } from "react"
import PokedexSearch from "../components/pokedex/PokedexSearch"
import PokedexDetail from "../components/pokedex/PokedexDetail"

export default function Pokedex() {
    const [selectedPokemon, setSelectedPokemon] = useState(null)

    return (
        <div className="h-full px-6 py-12 md:px-12 lg:px-24 pb-24">
            <h1 className="font-silkscreen font-black text-3xl mb-6 md:text-4xl lg:text-5xl text-royal-blue">
                POKÉDEX
            </h1>
            <div className="flex flex-col gap-y-12 md:grid md:gap-x-2 lg:gap-x-4 md:grid-cols-2">
                <div className="flex-1">
                    {/* Just the normal search stuff */}
                    <PokedexSearch onSelect={setSelectedPokemon} />
                </div>
                <div className="flex-1">
                    {/* Display PokedexDetail only if a Pokemon has been selected */}
                    <PokedexDetail pokemon={selectedPokemon} />
                </div>
            </div>
        </div>
    )
}
