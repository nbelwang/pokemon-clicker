import { useOutletContext, NavLink, Link} from 'react-router-dom'
import lockImage from '../assets/lock.png'
import smileImage from '../assets/smile.png'
import pokeballImage from '../assets/pokeball.svg'
import shopImage from '../assets/shop.svg'
import statsImage from '../assets/stats.svg'

export default function HomeLayout() {
  const { playerData } = useOutletContext()

  return (
    <div className="h-full px-6 py-12 md:px-12 lg:px-24 lg:py-35 pb-20">
      <h1 className="font-silkscreen font-black text-3xl mb-6 md:text-4xl lg:text-5xl text-royal-blue">
        Select Level
      </h1>
      <p className="font-quantico text-dark-gray text-lg lg:text-xl mb-12">
        Collect pokémon and advance through the levels to beat the final boss!
      </p>

      <div className="text-2xl md:text-3xl flex flex-wrap gap-4 md:gap-6 mb-12">
        {Array.from({ length: 5 }, (_, i) => i + 1).map(level => {
          const unlocked = level <= playerData.levelsUnlocked

          // Level 5
          if (level === 5) {
            if (unlocked) {
              return (
                <Link
                  key={level}
                  to={`/home/level/${level}`}
                  className={`w-25 h-25 md:w-35 md:h-35 flex items-center justify-center rounded-lg shadow font-silkscreen bg-red-300 border-2 border-royal-blue hover:brightness-95`}
                >
                  {level}
                </Link>
              )
            }

            return (
              <div
                key={level}
                className={`w-25 h-25 md:w-35 md:h-35 flex items-center justify-center rounded-lg shadow font-silkscreen bg-red-300 border-2 border-royal-blue`}
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
                className={`w-25 h-25 md:w-35 md:h-35 flex items-center justify-center rounded-lg shadow font-silkscreen bg-yellow border-2 border-royal-blue hover:brightness-95`}
              >
                {level}
              </Link>
            )
          }

          return (
            <div
              key={level}
              className="w-25 h-25 md:w-35 md:h-35 bg-powder-blue border-2 border-royal-blue flex items-center justify-center rounded-lg"
            >
              <img src={lockImage} alt="Lock Image" className="w-12 h-12" />
            </div>
          )
        })}
      </div>

      <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-9 font-quantico text-md md:text-xl">
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