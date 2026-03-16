import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ReleaseModal from './ReleaseModal'

export default function PokedexCard(props) {
  const { playerData, updateData } = useOutletContext() || {}
  const [showModal, setShowModal] = useState(false)

  const handleRemoveClick = (e) => {
    e.stopPropagation()
    setShowModal(true)
  }

  const confirmRemove = (e) => {
    e.stopPropagation()
    if (playerData && updateData && props.id) {
      updateData({ pokemon: playerData.pokemon.filter(id => id !== props.id) })
    }
    setShowModal(false)
  }

  const cancelRemove = (e) => {
    e.stopPropagation()
    setShowModal(false)
  }

  return (
    <>
      <div
        className="relative bg-white border border-powder-blue rounded-xl p-4 w-full md:w-xs flex shadow shrink-0 cursor-pointer hover:shadow-lg"
        onClick={props.onClick}
      >
          {props.isCaught && props.id && (
            <button
              onClick={handleRemoveClick}
              className="absolute top-3.5 right-3 text-powder-blue cursor-pointer hover:text-salmon transition-colors z-10"
              title="Remove from inventory"
            >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
        <img
          src={props.frontSprite}
          alt={props.name}
          className="w-24 h-24 mr-3 bg-powder-blue rounded-2xl"
        />
        <div className="font-quantico flex flex-col gap-1">
          <h2 className="font-press-start text-sm text-dark-gray uppercase">{props.name}</h2>
          <p className="text-sm"><span className="font-bold">HP:</span> {props.stats[0].base_stat}</p>
          <p className="text-sm"><span className="font-bold">ATK:</span> {props.stats[1].base_stat}</p>
          <p className="text-sm">
              <span className="font-bold">Type: </span>
              {props.types.map(t => (
              <span key={t.type.name} className="bg-powder-blue text-dark-gray px-1 py-0.2 rounded mr-1 text-xs">
                  {t.type.name}
              </span>
              ))}
          </p>
        </div>
      </div>

      {showModal && (
        <ReleaseModal 
          pokemonName={props.name} 
          onConfirm={confirmRemove} 
          onCancel={cancelRemove} 
        />
      )}
    </>
  )
}