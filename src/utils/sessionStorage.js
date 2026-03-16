const KEY = 'pokemonClicker'

const DEFAULT_STATE = {
  pokemon: [],
  xp: 0,
  itemMultiplier: 1,
  levelsUnlocked: 1,
  stats: {
    employment: "Unemployed",
    pokemonCaught: 0,
    totalDamageDealt: 0,
    totalClicks: 0,
    totalWildEncounters: 0,
    totalXPEarned: 0,
    totalXPSpent: 0,
  },
  shop: [],
  item: []
}

export function loadData() {
    const raw = sessionStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : DEFAULT_STATE
  }
  
  export function saveData(data) {
    sessionStorage.setItem(KEY, JSON.stringify(data))
  }