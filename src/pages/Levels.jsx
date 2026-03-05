import { useOutletContext, Link } from 'react-router-dom'

const TOTAL_LEVELS = 5

export default function Levels() {
  const { playerData } = useOutletContext()

  return (
    <div className="p-6">
      <h1 className="font-press-start text-2xl text-royal-blue mb-2">Select Level</h1>
      <p className="font-quantico text-dark-gray mb-6">Collect pokémon and advance through the levels to beat the final boss!</p>

      <div className="flex gap-4 flex-wrap mb-10">
        {Array.from({ length: TOTAL_LEVELS }, (_, i) => i + 1).map(level => {
          const unlocked = playerData.levelsUnlocked.includes(level)
          return unlocked ? (
            <Link
              key={level}
              to={`/home/levels/${level}`}
              className="w-16 h-16 bg-yellow font-press-start text-dark-gray text-lg flex items-center justify-center rounded-lg shadow hover:brightness-95"
            >
              {level}
            </Link>
          ) : (
            <div
              key={level}
              className="w-16 h-16 bg-powder-blue font-press-start text-dark-gray text-lg flex items-center justify-center rounded-lg shadow opacity-60"
            >
              🔒
            </div>
          )
        })}
      </div>
    </div>
  )
}