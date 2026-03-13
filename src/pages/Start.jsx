import { Link } from 'react-router-dom'
import bgImage from '../assets/background.png'
import titleImage from '../assets/title.png'

export default function Start() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}>

      <img src={titleImage} alt="title text" className="w-full h-auto" />

      <div className="flex flex-col gap-4 w-60 mb-30">
        <Link
          to="/home"
          className="bg-yellow border-4 border-royal-blue font-press-start text-dark-gray text-center py-4 px-6 rounded-lg shadow hover:brightness-95"
        >
          PLAY
        </Link>
        <Link
          to="/home/stats"
          className="bg-powder-blue border-4 border-royal-blue font-press-start text-dark-gray text-center py-4 px-6 rounded-lg shadow hover:brightness-95"
        >
          STATS
        </Link>
      </div>
    </div>
  )
}