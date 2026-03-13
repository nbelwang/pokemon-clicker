import requests
import json
import time

# DO NOT RUN THIS BTW i manually tweaked pokemonLevels.json a lot after generating it 

pokemon_stats = {}

TOTAL_POKEMON = 1025

for poke_id in range(1, TOTAL_POKEMON + 1):
    url = f"https://pokeapi.co/api/v2/pokemon/{poke_id}"
    print(f"Fetching Pokemon {poke_id}...")

    res = requests.get(url)
    data = res.json()

    stats = data["stats"]

    base_stat_total = sum(stat["base_stat"] for stat in stats)

    pokemon_stats[poke_id] = base_stat_total

    # small delay so we dont spam the API
    time.sleep(0.05)

# sort pokemon by base stat total
sorted_pokemon = sorted(pokemon_stats.items(), key=lambda x: x[1])

# extract just ids in sorted order
sorted_ids = [p[0] for p in sorted_pokemon]

# split into 4 roughly equal groups
chunk_size = len(sorted_ids) // 4

level1 = sorted_ids[:chunk_size]
level2 = sorted_ids[chunk_size:chunk_size*2]
level3 = sorted_ids[chunk_size*2:chunk_size*3]
level4 = sorted_ids[chunk_size*3:]

output = {
    "level1": level1,
    "level2": level2,
    "level3": level3,
    "level4": level4
}

with open("pokemonLevels.json", "w") as f:
    json.dump(output, f, indent=2)

print("Done! pokemonLevels.json created.")