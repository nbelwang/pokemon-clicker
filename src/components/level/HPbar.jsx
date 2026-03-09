import { useOutletContext } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function HPbar() {
  const { playerData, updateData } = useOutletContext()
  const { levelNumber } = useParams()

  return (
    <div className="p-6">
      <h1 className="font-quantico">hp bar</h1>
    </div>
  )
}