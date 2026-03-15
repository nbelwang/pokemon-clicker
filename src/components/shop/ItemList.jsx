import { useOutletContext } from "react-router-dom"
import ItemCard from "./ItemCard"

export default function ItemList({ data }) {
    const { playerData, updateData } = useOutletContext()

    // TODO: handleBuy function
    function handleBuy(itemName) {
        // Grab the item from the sessionStorage for easier access
        const item = playerData.shop.find(
            (shopItem) => shopItem.name === itemName
        )

        // Handle if item cannot be found for some reason
        if (!item) {
            console.log("Item not found")
            return
        }

        // Check for XP equivalence/overflow
        if (playerData.xp >= item.cost) {
            // Update shop status
            const updatedShop = playerData.shop.map((shopItem) =>
                shopItem.name === itemName ? { ...shopItem, boughtStatus: true } : shopItem
            )

            // Update player's multiplier, remaining XP, shop, new item, and total XP spent
            const updatedPlayerData = {
                ...playerData,
                itemMultiplier: item.mult,
                xp: playerData.xp - item.cost,
                shop: updatedShop,
                item: [item],
                stats: {
                    ...playerData.stats,
                    totalXPSpent: (playerData.stats?.totalXPSpent ?? 0) + item.cost
                }
            }

            updateData(updatedPlayerData)

            //item.boughtStatus = true;
        } else {
            console.log("ERROR")
        }
    }

    return (
        <>
            <div className="flex flex-row flex-wrap gap-4">
                {data.map((item) => (
                    <ItemCard
                        key={item.name}
                        itemMult={item.mult}
                        itemName={item.name}
                        itemCost={item.cost}
                        itemSprite={item.sprite}
                        itemBought={item.boughtStatus}
                        onBuy={handleBuy}
                    />
                ))}
            </div>
        </>
    )
}
