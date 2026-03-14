import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import bgImage from '../../assets/background.png'
import spaceBg from '../../assets/spaceBg.jpg'
import LevelComplete from './LevelComplete'
import StatDisplay from './StatDisplay'

export default function BattleLayout({ pokemon, attack, status, encounter, playerCaughtNewPokemon, tempXP, showEffective }) {
  const { levelNumber } = useParams()
  const [showResult, setShowResult] = useState(false);
  const isBossLevel = levelNumber === "5";
  const battleActive = status === "fighting";

  useEffect(() => {
    if (status === "finished" || status === "failed") {
      const timer = setTimeout(() => {
        setShowResult(true);
      }, 2000); // 2 second delay

      return () => clearTimeout(timer);
    }
  }, [status]);

  if (showResult) {
    return (
      <LevelComplete
        status={status}
        playerCaughtNewPokemon={playerCaughtNewPokemon}
      />  
    )
  }

  if (!pokemon) {
    return <div className="p-10 font-quantico">Loading...</div>
  }

  const hpPercent = (pokemon.hp / pokemon.maxHp) * 100

  return (
    <div className="relative flex flex-col flex-1 gap-3"
      style={{
        backgroundImage: `url(${isBossLevel ? spaceBg : bgImage})`,
        backgroundSize: isBossLevel ? "cover" : "120%",
        backgroundPosition: isBossLevel ? "center" : "bottom center",
      }}>

      <p className='font-silkscreen text-white p-3'>encounter: {encounter}</p>

      {battleActive && (
        <div className='flex flex-col flex-1 items-center justify-center relative'>

        {showEffective && (
          <p className="absolute -top-4 font-silkscreen text-xl text-yellow animate-bounce">
            Effective!
          </p>
        )}

        {/* nametag */}
        <div className="border-3 border-dark-gray rounded-lg p-2 mb-2 bg-white">
          <h1 className="font-silkscreen text-2xl mb-1">{pokemon.name}</h1>
          <div className="flex items-end justify-between mb-1 mr-1">
            <p className="font-quantico">Type: {isBossLevel ? "Human" : pokemon.types.join(", ")}</p>
            <p className="font-quantico">{pokemon.hp.toFixed(1)} / {pokemon.maxHp}</p>
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
          className="cursor-pointer h-110"
          onClick={attack}
        />
      </div>
      )}

      {/* xp and multiplier */}
      { battleActive && 
        <StatDisplay tempXP={tempXP}/>
      }

    </div>
  )
}