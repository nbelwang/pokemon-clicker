import { useOutletContext } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Inventory from './Inventory'
import BattleLayout from './BattleLayout'

export default function LevelLayout({ pokemon, caughtPokemonIds, wildPokemonIds, typeMap, timer, multiplier}) {
  const { playerData, updateData } = useOutletContext()
  const { levelNumber } = useParams()

  const caughtPokemon = pokemon.filter(p => caughtPokemonIds.includes(p.id))
  const wildPokemon = pokemon.filter(p => wildPokemonIds.includes(p.id))

  return (
    <div className="flex">

      <div className="w-1/3 p-4 bg-slate-blue">
        <Inventory 
          caughtPokemon={caughtPokemon}
          typeMap={typeMap}
        />
      </div>
      
      <div className="flex-1">
        <div className="bg-dark-gray p-3">
          <h1 className="font-quantico font-bold text-xl text-white pl-1">LEVEL {levelNumber}</h1>
          {/* timer */}
        </div>

        <BattleLayout 
          wildPokemon={wildPokemon}
          typeMap={typeMap}
        />

        {/* multiplier */}
        {/* xp */}

      </div>
      
      
     
    </div>
  )
}