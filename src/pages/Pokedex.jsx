import { useState } from "react"
import PokedexSearch from "../components/pokedex/PokedexSearch"
import PokedexDetail from "../components/pokedex/PokedexDetail"

export default function Pokedex() {
    const [selectedPokemon, setSelectedPokemon] = useState(null)

    return (
        <div className="flex flex-1 flex-col h-full min-h-0 overflow-hidden px-6 py-12 md:px-12 lg:px-24 pb-24">
            <h1 className="font-silkscreen font-black text-3xl mb-6 md:text-4xl lg:text-5xl text-royal-blue">
                POKÉDEX
            </h1>
            <div className="flex flex-1 h-full gap-6">
                <div className="w-1/2">
                    <PokedexSearch onSelect={setSelectedPokemon} />
                </div>
                <div className="flex-1">
                    <PokedexDetail pokemon={selectedPokemon} />
                </div>
            </div>
           
        </div>
    )
}
