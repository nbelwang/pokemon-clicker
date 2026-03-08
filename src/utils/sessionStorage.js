const KEY = 'pokemonClicker'

const DEFAULT_STATE = {
  pokemon: [],
  xp: 0,
  itemMultiplier: 1,
  levelsUnlocked: 1,
  stats: {
    pokemonCaught: 0,
    totalDamageDealt: 0,
    // TODO: add more stats
  }
}

const TEST_STATE = {
  pokemon: [1, 4, 26, 69, 204],
  xp: 0,
  itemMultiplier: 1,
  levelsUnlocked: 2,
  stats: {
    pokemonCaught: 0,
    totalDamageDealt: 0,
    // TODO: add more stats
  }
}

export function loadData() {
    const raw = sessionStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : TEST_STATE
  }
  
  export function saveData(data) {
    sessionStorage.setItem(KEY, JSON.stringify(data))
  }