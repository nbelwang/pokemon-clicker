import { useOutletContext, NavLink, Link} from 'react-router-dom'
import lockImage from '../assets/lock.png'
import smileImage from '../assets/smile.png'
import pokeballImage from '../assets/pokeball.svg'
import shopImage from '../assets/shop.svg'
import statsImage from '../assets/stats.svg'

export default function HomeLayout() {
  const { playerData } = useOutletContext()

  return (
    <div className="h-full p-4 sm:p-6 md:p-10 lg:p-20 flex flex-col items-center text-center">
      <h1 className="font-silkscreen font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-royal-blue mb-4">
        Select Level
      </h1>
      <p className="font-quantico text-sm sm:text-base md:text-lg text-dark-gray tracking-wider mb-6">
        Collect pokémon and advance through the levels to beat the final boss!
      </p>

      <div className="text-lg sm:text-xl md:text-2xl flex flex-wrap gap-4 sm:gap-6 mb-8 justify-center">
        {Array.from({ length: 5 }, (_, i) => i + 1).map(level => {
          const unlocked = level <= playerData.levelsUnlocked

          // Level 5
          if (level === 5) {
            if (unlocked) {
              return (
                <Link
                  key={level}
                  to={`/home/level/${level}`}
                  className={`w-25 h-25 flex items-center justify-center rounded-lg shadow font-silkscreen bg-red-300 border-2 border-royal-blue hover:brightness-95`}
                >
                  {level}
                </Link>
              )
            }

            return (
              <div
                key={level}
                className={`w-25 h-25 flex items-center justify-center rounded-lg shadow font-silkscreen bg-red-300 border-2 border-royal-blue`}
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
                className={`w-25 h-25 flex items-center justify-center rounded-lg shadow font-silkscreen bg-yellow border-2 border-royal-blue hover:brightness-95`}
              >
                {level}
              </Link>
            )
          }

          return (
            <div
              key={level}
              className="w-25 h-25 bg-powder-blue border-2 border-royal-blue flex items-center justify-center rounded-lg"
            >
              <img src={lockImage} alt="Lock Image" className="w-12 h-12" />
            </div>
          )
        })}
      </div>

      <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-9 font-quantico text-base sm:text-lg mt-4 justify-center">
        <NavLink to="/home/pokedex" className="font-silkscreen text-royal-blue mb-4 bg-powder-blue border-2 border-royal-blue px-8 py-4 rounded-lg flex items-center justify-center gap-3 hover:brightness-95 w-full sm:w-auto">
          <img src={pokeballImage} alt="Pokédex Image" className="w-7 h-7" />
          Pokédex
        </NavLink>
        
        <NavLink to="/home/shop" className="font-silkscreen text-royal-blue mb-4 bg-powder-blue border-2 border-royal-blue px-8 py-4 rounded-lg flex items-center justify-center gap-3 hover:brightness-95 w-full sm:w-auto">
          <img src={shopImage} alt="Shop Image" className="w-7 h-7" />
          Shop
        </NavLink>

        <NavLink to="/home/stats" className="font-silkscreen text-royal-blue mb-4 bg-powder-blue border-2 border-royal-blue px-8 py-4 rounded-lg flex items-center justify-center gap-3 hover:brightness-95 w-full sm:w-auto">
          <img src={statsImage} alt="Stats Image" className="w-6 h-6" />
          Stats
        </NavLink>
      </div>
    </div>
  )
}