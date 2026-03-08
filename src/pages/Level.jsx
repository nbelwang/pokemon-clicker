import { useOutletContext } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import LevelLayout from '../components/level/LevelLayout'

export default function Levels() {
  const { playerData, updateData } = useOutletContext()
  const { levelNumber } = useParams()
  const caughtPokemon = []
  const wildPokemon = []
  const timer = 0

  

  function handleClick() {
    updateData({
      xp: playerData.xp + 1
    })
  }

  return (
    <div className="p-6">
      <h1 className="font-press-start text-2xl text-royal-blue mb-2">LEVEL {levelNumber}</h1>

      <p className="font-quantico text-dark-gray mb-6">XP: {playerData.xp}</p>

      <button className="border"
        onClick={handleClick}>
        increase xp
      </button>

      <LevelLayout />

    </div>
    
  )
}