import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "motion/react"
import bgImage from '../../assets/background.png'
import spaceBg from '../../assets/spacebg.jpg'
import LevelComplete from './LevelComplete'
import StatDisplay from './StatDisplay'

export default function BattleLayout({ pokemon, attack, status, encounter, playerCaughtNewPokemon, tempXP, showEffective, wildPulse }) {
  const { levelNumber } = useParams()
  const [showResult, setShowResult] = useState(false);
  const isBossLevel = levelNumber === "5";
  const battleActive = status === "fighting";

  useEffect(() => {
    if (status === "finished" || status === "failed") {
      const timer = setTimeout(() => {
        setShowResult(true);
      }, 1700); 
      return () => clearTimeout(timer);
    }
  }, [status]);

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
        <div className='flex flex-col flex-1 items-center justify-center relative mt-5'>

          {/* effective! */}
          <AnimatePresence>
            {showEffective && (
              <motion.p
                key="effective"
                className="absolute -top-10 left-1/2 -translate-x-1/2 font-silkscreen text-xl text-yellow"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Effective!
              </motion.p>
            )}
          </AnimatePresence>

          {/* nametag */}
          <AnimatePresence mode="wait">
            {pokemon && (
              <motion.div
                key={pokemon.id} 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="border-3 border-dark-gray rounded-lg p-2 mb-4 bg-white relative"
              >
                <h1 className="font-silkscreen text-3xl mb-1">{pokemon.name}</h1>
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
              </motion.div>
            )}
          </AnimatePresence>
        
          {/* pokemon sprite */}
          <AnimatePresence mode="wait">
            <motion.img
              key={pokemon.id}
              src={pokemon.sprite}
              className="cursor-pointer h-120"
              onClick={attack}

              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1, scale: wildPulse ? 0.93 : 1 }}
              exit={{ y: 200, opacity: 0 }}

              whileTap={{ scale: 0.9 }}

              transition={{ type: "spring", stiffness: 180, damping: 17 }}
            />
          </AnimatePresence>
        </div>
      )}

      {/* xp and multiplier */}
      { battleActive && 
        <StatDisplay tempXP={tempXP}/>
      }

      <div className="flex flex-col flex-1 items-center justify-center relative">
        {showResult && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
          >
            <LevelComplete
              status={status}
              playerCaughtNewPokemon={playerCaughtNewPokemon}
            />
          </motion.div>
        )}
      </div>

    </div>
  )
}