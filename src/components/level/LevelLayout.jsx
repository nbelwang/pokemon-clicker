import { useOutletContext } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Inventory from './Inventory'
import BattleLayout from './BattleLayout'

const processWildState = (state) => {
  const activeWild = state.wild[state.activeWildIndex];

  if (activeWild.hp > 0) return state;

  // if wild pokemon has fainted, update battle state
  const updatedWild = [...state.wild];
  const faintedPokemon = { ...activeWild, hp: 0, alive: false };
  updatedWild[state.activeWildIndex] = faintedPokemon;

  // add to caught list
  const updatedCaught = [...state.caught, faintedPokemon];

  const nextWildIndex = state.activeWildIndex + 1;
  const isFinished = nextWildIndex >= state.wild.length;

  return {
    ...state,
    wild: updatedWild,
    caught: updatedCaught,
    activeWildIndex: isFinished ? state.activeWildIndex : nextWildIndex,
    status: isFinished ? "finished" : state.status,
  };
};

export default function LevelLayout({ caughtPokemon, wildPokemon, typeMap, timer, multiplier}) {
  const { playerData, updateData } = useOutletContext()
  const { levelNumber } = useParams()
  const [battleState, setBattleState] = useState(null);
  const isBossLevel = levelNumber === "5";

  useEffect(() => {
    // ONLY initialize if there is no state yet, and there is data
    if (!battleState && wildPokemon.length > 0) {
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
        status: "fighting"
      });
    }
  }, [wildPokemon, caughtPokemon, battleState]);

  // handles level complete
  useEffect(() => {
    if (battleState?.status === "finished") {
      const caughtIds = battleState.caught.map(p => p.id);

      const nextLevelReached = Number(levelNumber) + 1;
      const newLevelsUnlocked = Math.max(playerData.levelsUnlocked, nextLevelReached);
      
      updateData({ 
        pokemon: caughtIds,
        levelsUnlocked: newLevelsUnlocked 
      });
    }
  }, [battleState?.status]);

  if (!battleState) return <div>Loading...</div>;

  const activeWild = battleState.wild[battleState.activeWildIndex]
  const encounter = `${battleState.activeWildIndex + 1}/${battleState.wild.length}`

  function playerAttack() {
    if (battleState.status === "finished") return;

    setBattleState((prev) => {
      const next = { ...prev };
      const wild = [...next.wild];
      const target = { ...wild[next.activeWildIndex] };

      target.hp -= 10; // apply multiplier later
      wild[next.activeWildIndex] = target;
      next.wild = wild;

      return processWildState(next);
    });
  }

  function setActiveCaught(activeCaughtIndex) {
    setBattleState(prev => ({
      ...prev,
      activeCaughtIndex
    }))
  }

  return (
    <div className="flex flex-1 h-full min-h-0">

      <div className="w-1/3 p-2 pt-4 pl-3 bg-slate-blue flex flex-col h-full min-h-0">
        <Inventory 
          caughtPokemon={battleState.caught}
          activeCaughtIndex={battleState.activeCaughtIndex}
          setActiveCaught={setActiveCaught}
        />
      </div>
      
      <div className="flex-1 flex flex-col h-full">
        <div className="bg-dark-gray p-3">
          <h1 className="font-quantico font-bold text-xl text-white pl-1">
            {isBossLevel ? "FINAL LEVEL" : `LEVEL ${levelNumber}`}
          </h1>

          {/* timer */}
        </div>

        {/* if level 5, show the boss battle page lol */}

        <BattleLayout 
          pokemon={activeWild}
          attack={playerAttack}
          status={battleState.status}
          encounter={isBossLevel ? "FINAL BATTLE" : encounter}
        />

        {/* multiplier */}
        {/* xp */}

      </div>
      
      
     
    </div>
  )
}