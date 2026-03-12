import { useOutletContext } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import bgImage from '../../assets/background.png'
import spaceBg from '../../assets/spaceBg.jpg'
import LevelComplete from './LevelComplete'

export default function BattleLayout({ pokemon, attack, status, encounter }) {
  const { playerData } = useOutletContext()
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

      <p className='font-silkscreen text-white p-3'>encounter: {encounter}</p>
      
      <div className='flex flex-col flex-1 items-center pt-2'>

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

      <div className='flex gap-3 w-20 m-4 px-2 border-3 border-royal-blue rounded-md bg-yellow font-silkscreen text-royal-blue'>
        <p>XP </p>
        <p className=''>{playerData.xp}</p>
      </div>
      
    </div>
  )
}