import { useOutletContext } from 'react-router-dom'

export default function Stats() {
    const { playerData } = useOutletContext()

    return (
      <div className="h-full p-4 sm:p-6 md:p-10 lg:p-20">
        <h1 className="font-silkscreen font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-royal-blue mb-4">
          Stats
        </h1>

        <div className="border border-royal-blue w-full grid grid-cols-[1fr_auto] sm:grid-cols-[10fr_2fr] min-w-0">

          {/* Row 1 */}
          <div className="contents group">
            <div className="bg-white p-3 sm:p-6 border-r border-b border-royal-blue group-hover:bg-yellow-200 min-w-0">
              <p className="text-sm sm:text-xl font-quantico truncate">Job</p>
            </div>
            <div className="bg-white p-3 sm:p-6 text-right border-b border-royal-blue group-hover:bg-yellow-200 min-w-fit">
              <p className="text-sm sm:text-xl font-quantico whitespace-nowrap">{playerData.stats.employment}</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="contents group">
            <div className="bg-white p-3 sm:p-6 border-r border-b border-royal-blue group-hover:bg-yellow-200 min-w-0">
              <p className="text-sm sm:text-xl font-quantico truncate">Total Clicks</p>
            </div>
            <div className="bg-white p-3 sm:p-6 text-right border-b border-royal-blue group-hover:bg-yellow-200 min-w-fit">
              <p className="text-sm sm:text-xl font-quantico whitespace-nowrap">676767676767</p>
            </div>
          </div>

          <div className="contents group">
            <div className="bg-white p-3 sm:p-6 border-r border-b border-royal-blue group-hover:bg-yellow-200 min-w-0">
              <p className="text-sm sm:text-xl font-quantico truncate">Total XP Earned</p>
            </div>
            <div className="bg-white p-3 sm:p-6 text-right border-b border-royal-blue group-hover:bg-yellow-200 min-w-0">
              <p className="text-sm sm:text-xl font-quantico">14000</p>
            </div>
          </div>

          <div className="contents group">
            <div className="bg-white p-3 sm:p-6 border-r border-b border-royal-blue group-hover:bg-yellow-200 min-w-0">
              <p className="text-sm sm:text-xl font-quantico truncate">Total XP Spent</p>
            </div>
            <div className="bg-white p-3 sm:p-6 text-right border-b border-royal-blue group-hover:bg-yellow-200 min-w-0">
              <p className="text-sm sm:text-xl font-quantico">200</p>
            </div>
          </div>

          <div className="contents group">
            <div className="bg-white p-3 sm:p-6 border-r border-b border-royal-blue group-hover:bg-yellow-200 min-w-0">
              <p className="text-sm sm:text-xl font-quantico truncate">Pokemon Caught</p>
            </div>
            <div className="bg-white p-3 sm:p-6 text-right border-b border-royal-blue group-hover:bg-yellow-200 min-w-0">
              <p className="text-sm sm:text-xl font-quantico">17</p>
            </div>
          </div>

          <div className="contents group">
            <div className="bg-white p-3 sm:p-6 border-r border-royal-blue group-hover:bg-yellow-200 min-w-0">
              <p className="text-sm sm:text-xl font-quantico truncate">Wild Pokemon Fled</p>
            </div>
            <div className="bg-white p-3 sm:p-6 text-right border-royal-blue group-hover:bg-yellow-200 min-w-0">
              <p className="text-sm sm:text-xl font-quantico">38</p>
            </div>
          </div>



        </div>

      </div>
    )
  }