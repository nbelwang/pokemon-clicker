import { useOutletContext } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Inventory from './Inventory'
import BattleLayout from './BattleLayout'
import { playerAttack, caughtPokemonAttack, wildPokemonAttack, handleTimeout } from '../../utils/LevelHelper';

export default function LevelLayout({ caughtPokemon, wildPokemon, typeMap, initialTime}) {
  const { playerData, updateData } = useOutletContext()
  const { levelNumber } = useParams()
  const [battleState, setBattleState] = useState(null);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [playerCaughtNewPokemon, setPlayerCaughtNewPokemon] = useState(false);
  const [showEffective, setShowEffective] = useState(false);
  const clicksThisBattleRef = useRef(0);
  const isBossLevel = levelNumber === "5";
  const timePercent = (timeLeft / initialTime) * 100;

  // initializes battle state once pokemon data has loaded
  useEffect(() => {
    if (!battleState && wildPokemon.length > 0) {
      clicksThisBattleRef.current = 0;
      setBattleState({
        wild: wildPokemon.map(p => ({ ...p, 
          hp: p.hp, 
          maxHp: p.hp, 
          alive: true 
        })),
        caught: caughtPokemon.map(p => ({ ...p, 
          hp: p.hp, 
          maxHp: p.hp, 
          alive: true 
        })),
        activeWildIndex: 0,
        activeCaughtIndex: 0,
        gainedXP: 0,
        status: "fighting"
      });
    }
  }, [wildPokemon, caughtPokemon, battleState]);

  // run timer 
  useEffect(() => {
    if (!battleState || battleState.status !== "fighting") return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [battleState?.status]);

  // watch for timeout 
  useEffect(() => {
    if (timeLeft <= 0 && battleState?.status === "fighting") {
      const { battleState: newState, resetTime } = handleTimeout(battleState, initialTime);
      setBattleState(newState);
      setTimeLeft(resetTime);
    }
  }, [timeLeft, battleState, initialTime]);

  const handlePlayerAttack = () => {
    clicksThisBattleRef.current += 1;
    setBattleState(prev => {
      if (prev.status !== "fighting") return prev;
      
      const next = playerAttack(prev, levelNumber, playerData.itemMultiplier);

      if (next.activeWildIndex !== prev.activeWildIndex || next.status === "finished") {
        setTimeLeft(initialTime);
      }
      return next;
    });
  };

  const handleCaughtAttack = () => {
    setBattleState(prev => {
      if (prev.status !== "fighting") return prev;

      const { state: next, superEffective } = caughtPokemonAttack(prev, typeMap, levelNumber);

      if (superEffective) {
        setShowEffective(true);
        setTimeout(() => setShowEffective(false), 1000);
      }

      if (next.activeWildIndex !== prev.activeWildIndex || next.status === "finished") {
        setTimeLeft(initialTime);
      }
      return next;
    });
  };

  const handleWildAttack = () => {
    setBattleState(prev => {
      if (prev.status !== "fighting") return prev;

      return wildPokemonAttack(prev, typeMap);
    });
  };

  // idle attack intervals 
  useEffect(() => {
    if (!battleState || battleState.status !== "fighting") return;
    
    const wildIntervalTime =
      levelNumber === "1" ? 3000 :
      levelNumber === "4" ? 1500 :
      2000;

    const wildInterval = setInterval(handleWildAttack, wildIntervalTime);
    const caughtInterval = setInterval(handleCaughtAttack, 2500);

    return () => {
      clearInterval(wildInterval);
      clearInterval(caughtInterval);
    };
  }, [battleState?.status, battleState?.activeWildIndex, battleState?.activeCaughtIndex]);

  // handles level completion or failure
  useEffect(() => {
    if (battleState?.status === "finished" || battleState?.status === "failed") {
      const caughtIds = battleState.caught.map(p => p.id);

      setPlayerCaughtNewPokemon(battleState.caught.length > caughtPokemon.length);

      if (battleState.status === "finished") {
        const nextLevelReached = Number(levelNumber) + 1;
        const newLevelsUnlocked = Math.max(playerData.levelsUnlocked, nextLevelReached);
        const newCaught = caughtIds.length - playerData.pokemon.length;

        const update = {
          pokemon: caughtIds,
          levelsUnlocked: newLevelsUnlocked,
          xp: playerData.xp + battleState.gainedXP,
          stats: {
            ...playerData.stats,
            pokemonCaught: (playerData.stats?.pokemonCaught ?? 0) + newCaught,
            totalWildEncounters: (playerData.stats?.totalWildEncounters ?? 0) + battleState.wild.length,
            totalClicks: (playerData.stats?.totalClicks ?? 0) + clicksThisBattleRef.current,
            totalXPEarned: (playerData.stats?.totalXPEarned ?? 0) + battleState.gainedXP
          }
        };

        if (isBossLevel) {
          update.stats.employment = "Computer Science Senior Instructor II";
        }

        updateData(update);
        clicksThisBattleRef.current = 0;
      } else if (battleState.status === "failed") {
        const encountersThisRun = battleState.activeWildIndex + 1;
        updateData({
          stats: {
            ...playerData.stats,
            totalWildEncounters: (playerData.stats?.totalWildEncounters ?? 0) + encountersThisRun,
            totalClicks: (playerData.stats?.totalClicks ?? 0) + clicksThisBattleRef.current
          }
        });
        clicksThisBattleRef.current = 0;
      }
    }
  }, [battleState?.status]);

  if (!battleState) return <div className="font-quantico text-xl font-bold">Loading...</div>;

  const activeWild = battleState.wild[battleState.activeWildIndex]
  const encounter = `${battleState.activeWildIndex + 1}/${battleState.wild.length}`

  return (
    <div className="flex flex-1 h-full min-h-0">

      <div className="w-1/3 p-2 pt-4 pl-3 bg-slate-blue flex flex-col h-full min-h-0">
        <Inventory 
          caughtPokemon={battleState.caught}
          activeCaughtIndex={battleState.activeCaughtIndex}
          setActiveCaught={(index) => setBattleState(prev => ({ ...prev, activeCaughtIndex: index }))}
        />
      </div>
      
      <div className="flex-1 flex flex-col h-full">
        <div className="bg-dark-gray p-3 flex items-center gap-3">
          <h1 className="font-quantico font-bold text-xl text-white pl-1">
            {isBossLevel ? "FINAL LEVEL" : `LEVEL ${levelNumber}`}
          </h1>

          {/* timer */}
          <div className="flex flex-1 items-center p-1 h-7 ml-10 bg-black rounded">
            <p className="font-quantico font-bold text-white px-1 pr-2">TIME</p>
            <div className="w-full rounded bg-white">
              <div
              className="bg-slate-blue rounded h-5 transition-all duration-1000 ease-linear"
              style={{ width: `${timePercent}%` }}
              />
            </div>
          </div>
          <p className='font-quantico font-bold text-white mr-2'>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </p>
        </div>

        <BattleLayout 
          pokemon={activeWild}
          attack={handlePlayerAttack}
          status={battleState.status}
          encounter={isBossLevel ? "FINAL BATTLE" : encounter}
          playerCaughtNewPokemon={playerCaughtNewPokemon}
          tempXP={playerData.xp + battleState.gainedXP}
          showEffective={showEffective}
        />
      </div>
    </div>
  )
}