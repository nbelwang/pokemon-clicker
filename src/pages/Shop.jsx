import { useEffect, useState } from "react"
import { useOutletContext } from 'react-router-dom'
import ItemList from "../components/shop/ItemList"
import XPDisplay from "../components/shop/xpDisplay"

export default function Shop() {
    const { playerData } = useOutletContext()

    const [itemsArr, setItemsArr] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const multipliers = [1.5, 2, 2.5, 4, 5]
    const costs = [1000, 2000, 3000, 4000, 5000]

    // TODO: Set up an effect that triggers once data is pulled
    useEffect(() => {
        async function fetchItemData(itemName) {
            const res = await fetch(
                `https://pokeapi.co/api/v2/item/${itemName}/`,
            )
            const data = await res.json()
            return data
        }

        async function fetchAllItemData() {
            setLoading(true)
            try {
                // Query PokeAPI for items of the "held-item" category
                const res = await fetch(
                    "https://pokeapi.co/api/v2/item-category/12/",
                )
                const data = await res.json()
                //console.log("== ALL DATA: ", data)

                // Grab just the array of items from the response
                const tempItemsArr = data.items

                // Fetch all data at once
                const itemPromises = tempItemsArr.map((item) =>
                    fetchItemData(item.name),
                )
                const allItems = await Promise.all(itemPromises)

                // Remove any items that do NOT have a sprite
                const filteredItems = allItems.filter(
                    (item) => item?.sprites?.default != null,
                )
                //console.log("== Filtered Data: ", filteredItems)

                const simplifiedItems = filteredItems.map((item) => ({
                    id: item.id,
                    name: item.name,
                    sprite: item.sprites.default,
                }))

                // Grab 5 "random" items from filtered list
                const fiveItems = [...simplifiedItems]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 5)

                // Add multipliers and cost to 5 items
                const shopItems = fiveItems.map((item, i) => ({
                    ...item,
                    mult: multipliers[i],
                    cost: costs[i],
                }))

                setLoading(false)
                setError(null)
                setItemsArr(shopItems)

                console.log("== 5 Items: ", shopItems)
            } catch (err) {
                if (err.name == "AbortError") {
                    console.log("HTTP request was cancelled.")
                } else {
                    console.error(err)
                    setError(err)
                }
            }
        }

        if (itemsArr.length == 0) {
            fetchAllItemData()
        }
    })

    return (
        <div className="h-full px-12 py-6 md:px-24 md:py-12 lg:px-36 lg:py-24">
            <div className="flex flex-wrap justify-between">
                <h1 className="font-silkscreen font-black text-4xl md:text-5xl lg:text-7xl text-royal-blue mb-4">
                    Shop
                </h1>
                <XPDisplay xpData={playerData.xp}/>
            </div>
            <main>
                {/* {loading && <></>} */}
                {/* {error && } */}
                <ItemList data={itemsArr} />
            </main>
        </div>
    )
}
