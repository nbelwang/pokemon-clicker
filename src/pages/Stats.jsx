import { useOutletContext } from 'react-router-dom'

export default function Stats() {
    const { playerData } = useOutletContext()

    return (
      <div className="h-full px-6 py-12 md:px-12 lg:px-50 lg:py-25 pb-24">
        <h1 className="font-silkscreen font-black text-3xl mb-6 md:text-4xl lg:text-5xl text-royal-blue">
          Stats
        </h1>

        <div className="border border-royal-blue w-full grid grid-cols-[1fr_auto] sm:grid-cols-[10fr_2fr] min-w-0">

          {/* Row 1 */}
          <div className="contents group">
            <div className="bg-white p-3 sm:p-6 border-r border-b border-royal-blue group-hover:bg-cream min-w-0">
              <p className="text-md md:text-lg lg:text-xl font-quantico">Job</p>
            </div>
            <div className="bg-white p-3 sm:p-6 text-right border-b border-royal-blue group-hover:bg-cream min-w-fit">
              <p className="text-md md:text-lg lg:text-xl font-quantico whitespace-nowrap">{playerData.stats.employment}</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="contents group">
            <div className="bg-white p-3 sm:p-6 border-r border-b border-royal-blue group-hover:bg-cream min-w-0">
              <p className="text-md md:text-lg lg:text-xl font-quantico">Total Clicks</p>
            </div>
            <div className="bg-white p-3 sm:p-6 text-right border-b border-royal-blue group-hover:bg-cream min-w-fit">
              <p className="text-md md:text-lg lg:text-xl font-quantico whitespace-nowrap">{playerData.stats?.totalClicks ?? 0}</p>
            </div>
          </div>

          <div className="contents group">
            <div className="bg-white p-3 sm:p-6 border-r border-b border-royal-blue group-hover:bg-cream min-w-0">
              <p className="text-md md:text-lg lg:text-xl font-quantico">Total XP Earned</p>
            </div>
            <div className="bg-white p-3 sm:p-6 text-right border-b border-royal-blue group-hover:bg-cream min-w-0">
            <p className="text-md md:text-lg lg:text-xl font-quantico">{playerData.stats?.totalXPEarned ?? 0}</p>
            </div>
          </div>

          <div className="contents group">
            <div className="bg-white p-3 sm:p-6 border-r border-b border-royal-blue group-hover:bg-cream min-w-0">
              <p className="text-md md:text-lg lg:text-xl font-quantico">Total XP Spent</p>
            </div>
            <div className="bg-white p-3 sm:p-6 text-right border-b border-royal-blue group-hover:bg-cream min-w-0">
            <p className="text-md md:text-lg lg:text-xl font-quantico">{playerData.stats?.totalXPSpent ?? 0}</p>
            </div>
          </div>

          <div className="contents group">
            <div className="bg-white p-3 sm:p-6 border-r border-b border-royal-blue group-hover:bg-cream min-w-0">
              <p className="text-md md:text-lg lg:text-xl font-quantico">Pokemon Caught</p>
            </div>
            <div className="bg-white p-3 sm:p-6 text-right border-b border-royal-blue group-hover:bg-cream min-w-0">
              <p className="text-md md:text-lg lg:text-xl font-quantico">{playerData.stats?.pokemonCaught ?? 0}</p>
            </div>
          </div>

          <div className="contents group">
            <div className="bg-white p-3 sm:p-6 border-r border-royal-blue group-hover:bg-cream min-w-0">
              <p className="text-md md:text-lg lg:text-xl font-quantico">Wild Pokemon Encounters</p>
            </div>
            <div className="bg-white p-3 sm:p-6 text-right border-royal-blue group-hover:bg-cream min-w-0">
              <p className="text-md md:text-lg lg:text-xl font-quantico">{playerData.stats?.totalWildEncounters ?? 0}</p>
            </div>
          </div>



        </div>

      </div>
    )
  }