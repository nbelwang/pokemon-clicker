export default function ReleaseModal({ pokemonName, onConfirm, onCancel }) {
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <div 
        className="bg-white rounded-xl p-6 max-w-sm w-full mx-auto flex flex-col items-center text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-press-start text-sm text-dark-gray mb-4 leading-6">
          Release {pokemonName}?
        </h3>
        <p className="font-quantico text-sm text-dark-gray mb-6">
          Are you sure you want to release this Pokémon? This action cannot be undone.
        </p>
        <div className="flex gap-4 w-full justify-center">
          <button 
            onClick={onCancel}
            className="cursor-pointer px-4 py-2 bg-powder-blue hover:bg-slate-blue text-dark-gray font-quantico font-bold rounded transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="cursor-pointer px-4 py-2 bg-salmon hover:bg-red-600 text-white font-quantico font-bold rounded transition-colors"
          >
            Release
          </button>
        </div>
      </div>
    </div>
  )
}
