import { useOutletContext, NavLink, Link} from 'react-router-dom'

export default function HomeLayout() {
  const { playerData } = useOutletContext()

  return (
    <div className="min-h-screen p-40">
      <h1 className="font-silkscreen font-bold text-5xl text-royal-blue mb-4">
        Select Level
      </h1>
      <p className="font-quantico text-dark-gray mb-6">Collect pokémon and advance through the levels to beat the final boss!</p>

      <p className="font-quantico text-dark-gray mb-6">XP: {playerData.xp}</p> 

      <div className="flex gap-4 flex-wrap mb-10">
        {Array.from({ length: 5 }, (_, i) => i + 1).map(level => {
          const unlocked = level <= playerData.levelsUnlocked

          if (unlocked) {
            return (
              <Link
                key={level}
                to={`/home/level/${level}`}
                className={`w-16 h-16 flex items-center justify-center rounded-lg shadow font-silkscreen bg-yellow`}
              >
                {level}
              </Link>
            )
          }

          return (
            <div
              key={level}
              className="w-16 h-16 bg-powder-blue flex items-center justify-center rounded-lg opacity-60"
            >
              🔒
            </div>
          )
        })}
      </div>

      <div className="flex gap-6 font-quantico text-lg">
        <NavLink to="/home/pokedex" className="hover:text-royal-blue">
          Pokédex
        </NavLink>
        
        <NavLink to="/home/shop" className="hover:text-royal-blue">
          Shop
        </NavLink>

        <NavLink to="/home/stats" className="hover:text-royal-blue">
          Stats
        </NavLink>
      </div>
    </div>
  )
}