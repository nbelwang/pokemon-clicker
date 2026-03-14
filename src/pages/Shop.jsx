import { useEffect, useState } from "react"

export default function Shop() {
    const [itemsArr, setItemsArr] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

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
                console.log("== Filtered Data: ", filteredItems)
                setLoading(false)
                setError(null)
                setItemsArr(filteredItems)
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

    const multipliers = [1.5, 2, 2.5, 4, 5]
    const costs = [1000, 2000, 3000, 4000, 5000]

    return (
        <div>
            <div>
                <h1>Shop</h1>
                <main>
                    {/* {loading && <></>} */}
                    {/* {error && } */}
                    <ul>
                        {itemsArr.map((item) => (
                            <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                </main>
            </div>
        </div>
    )
}
