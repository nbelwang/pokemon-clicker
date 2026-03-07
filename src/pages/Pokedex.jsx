import PokedexSearch from '../components/pokedex/PokedexSearch'
import PokedexDetail from '../components/pokedex/PokedexDetail'

export default function Pokedex() {
  return (
    <div className="flex flex-row m-5">
      <PokedexSearch className="grow"/>
      <PokedexDetail className="grow"/>
    </div>
  )
}