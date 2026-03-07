import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

export default function PokedexCard(props) {
  return (
    <div
      className={`bg-white border border-powder-blue rounded-xl p-6 w-72 shadow ${props.onClick ? 'cursor-pointer hover:shadow-lg' : ''}`}
      onClick={props.onClick}
    >
        <div className="flex items-center justify-between mb-2">
        <h2 className="font-press-start text-sm text-dark-gray uppercase">{props.name}</h2>
        <span className={`font-quantico text-sm font-bold ${props.isCaught ? 'text-green' : 'text-salmon'}`}>
            {props.isCaught ? 'Caught' : 'Not Caught'}
        </span>
        </div>
        <img
        src={props.frontSprite}
        alt={props.name}
        className="w-35 h-35 mx-auto"
        />
        <div className="mt-2 font-quantico text-sm flex flex-col gap-1">
        <p>
            <span className="font-bold">Type: </span>
            {props.types.map(t => (
            <span key={t.type.name} className="bg-slate-blue text-dark-gray px-2 py-0.5 rounded mr-1 text-xs">
                {t.type.name}
            </span>
            ))}
        </p>
        <p><span className="font-bold">HP:</span> {props.stats[0].base_stat}</p>
        </div>
    </div>
  )
}