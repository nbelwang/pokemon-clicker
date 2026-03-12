import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

export default function PokedexCard(props) {
  return (
    <div
      className={`bg-white border border-powder-blue rounded-xl p-6 grow flex shadow ${props.onClick ? 'cursor-pointer hover:shadow-lg ' : ''}`}
      onClick={props.onClick}
    >
        <img
          src={props.frontSprite}
          alt={props.name}
          className="w-24 h-24 mr-5 bg-powder-blue"
        />
        <div className="font-quantico text-sm flex flex-col gap-1">
          <h2 className="font-press-start text-sm text-dark-gray uppercase">{props.name}</h2>
          <p><span className="font-bold">ATK:</span> {props.stats[1].base_stat}</p>
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