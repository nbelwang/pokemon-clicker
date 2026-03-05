import { Link } from 'react-router-dom'

export default function Start() {
  return (
    <div>
      <h1>Pokemon Clicker</h1>

      <h2>Dev Links</h2>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/home/levels/1">Level 1</Link></li>
        <li><Link to="/home/shop">Shop</Link></li>
        <li><Link to="/home/pokedex">Pokedex</Link></li>
        <li><Link to="/home/stats">Stats</Link></li>
      </ul>
    </div>
  )
}