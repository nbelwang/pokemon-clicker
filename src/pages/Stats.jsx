export default function Stats() {
    return (
      <div className="min-h-screen p-40">
        <h1 className="font-silkscreen font-bold text-5xl text-royal-blue mb-4">
          Stats
        </h1>

        <div className="border border-royal-blue inline-grid grid-cols-[10fr_2fr] max-w-3xl">

          {/* Row 1 */}
          <div className="contents group">
            <div className="bg-white p-6 border-r border-b border-royal-blue group-hover:bg-yellow-200">
              <p className="text-xl font-quantico">Levels Earned</p>
            </div>
            <div className="bg-white p-6 text-right border-b border-royal-blue group-hover:bg-yellow-200">
              <p className="text-xl font-quantico">4/5</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="contents group">
            <div className="bg-white p-6 border-r border-b border-royal-blue group-hover:bg-yellow-200">
              <p className="text-xl font-quantico ">Total Clicks</p>
            </div>
            <div className="bg-white p-6 text-right border-b border-royal-blue group-hover:bg-yellow-200">
              <p className="text-xl font-quantico">676767676767</p>
            </div>
          </div>

          <div className="contents group">
            <div className="bg-white p-6 border-r border-b border-royal-blue group-hover:bg-yellow-200">
              <p className="text-xl font-quantico">Total XP Earned</p>
            </div>
            <div className="bg-white p-6 text-right border-b border-royal-blue group-hover:bg-yellow-200">
              <p className="text-xl font-quantico">14000</p>
            </div>
          </div>

          <div className="contents group">
            <div className="bg-white p-6 border-r border-b border-royal-blue group-hover:bg-yellow-200">
              <p className="text-xl font-quantico">Total XP Spent</p>
            </div>
            <div className="bg-white p-6 text-right border-b border-royal-blue group-hover:bg-yellow-200">
              <p className="text-xl font-quantico">200</p>
            </div>
          </div>

          <div className="contents group">
            <div className="bg-white p-6 border-r border-b border-royal-blue group-hover:bg-yellow-200">
              <p className="text-xl font-quantico ">Pokemon Caught</p>
            </div>
            <div className="bg-white p-6 text-right border-b border-royal-blue group-hover:bg-yellow-200">
              <p className="text-xl font-quantico">17</p>
            </div>
          </div>

          <div className="contents group">
            <div className="bg-white p-6 border-r border-royal-blue group-hover:bg-yellow-200">
              <p className="text-xl font-quantico ">Wild Pokemon Fled</p>
            </div>
            <div className="bg-white p-6 text-right border-royal-blue group-hover:bg-yellow-200">
              <p className="text-xl font-quantico">38</p>
            </div>
          </div>



        </div>

      </div>
    )
  }