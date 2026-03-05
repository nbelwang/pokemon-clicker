import { Link } from 'react-router-dom'

export default function Start() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-8">
      <h1 className="font-press-start text-4xl text-royal-blue drop-shadow-md">
        Pokémon Clicker
      </h1>

      <div className="flex flex-col gap-4 w-48">
        <Link
          to="/home"
          className="bg-yellow font-press-start text-dark-gray text-sm text-center py-3 px-6 rounded-lg shadow hover:brightness-95"
        >
          PLAY
        </Link>
        <Link
          to="/home/stats"
          className="bg-powder-blue font-press-start text-dark-gray text-sm text-center py-3 px-6 rounded-lg shadow hover:brightness-95"
        >
          STATS
        </Link>
      </div>
    </div>
  )
}