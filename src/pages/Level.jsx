import { useOutletContext, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const TOTAL_LEVELS = 5

export default function Levels() {
  const { playerData } = useOutletContext()
  const { levelNumber } = useParams()

  return (
    <div className="p-6">
      <h1 className="font-press-start text-2xl text-royal-blue mb-2">LEVEL {levelNumber}</h1>
    </div>
  )
}