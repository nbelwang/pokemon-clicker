import { useParams } from 'react-router-dom'
import bgImage from '../../assets/background.png'
import spaceBg from '../../assets/spaceBg.jpg'
import LevelComplete from './LevelComplete'

export default function BattleLayout({ pokemon, attack, status, encounter }) {
  const { levelNumber } = useParams()
  const isBossLevel = levelNumber === "5";

  if (status === "finished") {
    return <LevelComplete />
  }

  if (!pokemon) {
    return <div className="p-10 font-quantico">Loading...</div>
  }

  const hpPercent = (pokemon.hp / pokemon.maxHp) * 100
  console.log(hpPercent)

  return (
    <div className="flex flex-col flex-1 gap-3 bg-cover bg-center"
         style={{ 
            backgroundImage: `url(${isBossLevel ? spaceBg : bgImage})` 
         }}>

      <div className='p-3'>
        <p className='font-silkscreen text-white'>encounter: {encounter}</p>
      </div>

      <div className='flex flex-col flex-1 items-center pt-8'>
        
        {/* nametag */}
        <div className="border-3 border-dark-gray rounded-lg p-2 mb-2 bg-white">
          <div className="flex items-end justify-between mb-1">
            <h1 className="font-silkscreen text-2xl">{pokemon.name}</h1>
            <p className="font-quantico mr-1">{pokemon.hp} / {pokemon.maxHp}</p>
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
      

    </div>
  )
}