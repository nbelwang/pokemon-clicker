
// used on Level page but can probably be reused elsewhere if needed
export async function fetchLevelPokemon(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await res.json()

    return {
        id: data.id,
        name: data.name,
        totalHP: data.stats.find(s => s.stat.name === "hp").base_stat,
        attack: data.stats.find(s => s.stat.name === "attack").base_stat,
        sprite: data.sprites.other?.['official-artwork']?.front_default,
        types: data.types.map(t => t.type.name)
  }
}

// returns the types the queried type is effective against
export async function fetchTypesEffectiveAgainst(type) {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
    const data = await res.json()

    return {
        type,
        effectiveAgainst: data.damage_relations.double_damage_to.map((t) => t.name)
    }
}