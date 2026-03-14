import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import ItemList from "../components/shop/ItemList"
import XPDisplay from "../components/shop/xpDisplay"
import LoadingScreen from "../components/LoadingScreen"

export default function Shop() {
    const { playerData, updateData } = useOutletContext()
    const [loading, setLoading] = useState(false)

    // Modify these to adjust what multipliers and costs should be assigned to shop items
    const multipliers = [1.5, 2, 2.5, 4, 5]
    const costs = [50, 100, 150, 200, 300]

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
                    boughtStatus: false,
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

                updateData({ shop: shopItems })
            } catch (err) {
                if (err.name == "AbortError") {
                    console.log("HTTP request was cancelled.")
                } else {
                    console.error(err)
                }
            }
        }

        // Only query API for items if the shop is not "set up"
        if (playerData?.shop?.length === 0) {
            fetchAllItemData()
        }
    }, [playerData])

    return (
        <div className="h-full px-6 py-3 md:px-12 md:py-6 lg:px-24 lg:py-12">
            <div className="flex flex-col gap-2 items-start md:flex-row md:justify-between md:items-center mb-6">
                <h1 className="font-silkscreen font-black text-4xl mb-2 md:mb-0 md:text-5xl lg:text-7xl text-royal-blue">
                    Shop
                </h1>
                <XPDisplay xpData={playerData.xp} />
            </div>
            <div>
                <p className="font-quantico text-lg md:text-xl lg:text-2xl mb-6">
                    Purchase items with XP to multiply clicks! Items are applied
                    automatically once purchased. Note that multipliers do NOT
                    stack.
                </p>
                {loading && <LoadingScreen />}
                <ItemList data={playerData?.shop} />
            </div>
        </div>
    )
}
