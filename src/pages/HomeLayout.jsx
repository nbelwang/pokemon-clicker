import { useOutletContext, NavLink, Link} from 'react-router-dom'

import lockImage from '../assets/lock.png'
import smileImage from '../assets/smile.png'
import pokeballImage from '../assets/pokeball.svg'
import shopImage from '../assets/shop.svg'
import statsImage from '../assets/stats.svg'

export default function HomeLayout() {
  const { playerData } = useOutletContext()

  return (
    <div className="min-h-screen p-40">
      <h1 className="font-silkscreen font-bold text-5xl text-royal-blue mb-4">
        Select Level
      </h1>
      <p className="font-quantico text-dark-gray mb-6">Collect pokémon and advance through the levels to beat the final boss!</p>

      <div className="text-2xl flex gap-4 flex-wrap mb-10">
        {Array.from({ length: 5 }, (_, i) => i + 1).map(level => {
          const unlocked = level <= playerData.levelsUnlocked

          // Level 5
          if (level === 5) {
            if (unlocked) {
              return (
                <Link
                  key={level}
                  to={`/home/level/${level}`}
                  className={`w-22 h-22 flex items-center justify-center rounded-lg shadow font-silkscreen bg-red-300 border-2 border-royal-blue hover:brightness-95`}
                >
                  {level}
                </Link>
              )
            }

            return (
              <div
                key={level}
                className={`w-22 h-22 flex items-center justify-center rounded-lg shadow font-silkscreen bg-red-300 border-2 border-royal-blue`}
              >
                <img src={smileImage} alt="Lock Image" className="w-12 h-12" />
              </div>
            )
          }

          // Levels 1-4
          if (unlocked) {
            return (
              <Link
                key={level}
                to={`/home/level/${level}`}
                className={`w-22 h-22 flex items-center justify-center rounded-lg shadow font-silkscreen bg-yellow border-2 border-royal-blue hover:brightness-95`}
              >
                {level}
              </Link>
            )
          }

          return (
            <div
              key={level}
              className="w-22 h-22 bg-powder-blue border-2 border-royal-blue flex items-center justify-center rounded-lg"
            >
              <img src={lockImage} alt="Lock Image" className="w-12 h-12" />
            </div>
          )
        })}
      </div>

      <div className="flex gap-6 font-quantico text-lg">
        <NavLink to="/home/pokedex" className="font-silkscreen text-royal-blue mb-4 hover:text-black bg-powder-blue border-2 border-royal-blue px-6 py-3 rounded-lg flex items-center gap-3 hover:brightness-95">
          <img src={pokeballImage} alt="Pokédex Image" className="w-6 h-6" />
          Pokédex
        </NavLink>
        
        <NavLink to="/home/shop" className="font-silkscreen text-royal-blue mb-4 hover:text-black bg-powder-blue border-2 border-royal-blue px-6 py-3 rounded-lg flex items-center gap-3 hover:brightness-95  ">
          <img src={shopImage} alt="Shop Image" className="w-6 h-6" />
          Shop
        </NavLink>

        <NavLink to="/home/stats" className="font-silkscreen text-royal-blue mb-4 hover:text-black bg-powder-blue border-2 border-royal-blue px-6 py-3 rounded-lg flex items-center gap-3 hover:brightness-95">
          <img src={statsImage} alt="Stats Image" className="w-6 h-6" />
          Stats
        </NavLink>
      </div>
    </div>
  )
}