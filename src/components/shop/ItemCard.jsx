import { useOutletContext } from "react-router-dom"

export default function ItemCard(props) {
    const { playerData } = useOutletContext()

    let sufficientXp = false
    let betterMult = true

    // Check if the user has enough XP to afford the item
    if (playerData.xp >= props.itemCost) sufficientXp = true

    // Check if the item's multiplier is better than the current itemMultiplier
    if (playerData.itemMultiplier > props.itemMult) {
        betterMult = false
    }

    // Conditionally change background color of card
    let bgColor

    if(props.itemBought && betterMult){
        bgColor = "bg-cream"    // Cream background if item is bought
    } else if(!betterMult) {
        bgColor = "bg-salmon"   // Salmon background if item multiplier is worse than current one (waste of XP)
    } else {
        bgColor = "bg-white"    // Default background
    }

    // Formatting changes to item name (remove hyphen and capitalize)
    const formattedName = props.itemName.split("-").join(" ")

    return (
        <>
            <div className="flex flex-col items-center">
                <div
                    className={`flex flex-col items-center space-y-2 w-3xs md:w-2xs py-4 ${bgColor} border-4 border-royal-blue rounded-xl lg:p-4`}
                >
                    <h2 className="flex items-center capitalize text-center font-silkscreen text-xl md:text-2xl lg:text-3xl mb-2 h-12 md:h-16 lg:h-20 overflow-hidden">
                        {formattedName}
                    </h2>
                    <p className="font-quantico text-center text-md md:text-lg lg:text-xl">
                        {props.itemMult}x Multiplier
                    </p>
                    <img
                        className="w-25"
                        src={props.itemSprite}
                        alt={props.itemName}
                    ></img>
                    <p className="font-silkscreen font-weight-black text-royal-blue text-md md:text-lg lg:text-xl">
                        {props.itemCost} XP
                    </p>
                </div>
                {props.itemBought && betterMult && <p className="font-silkscreen mt-2 text-xl md:text-2xl">Applied</p>}
                {sufficientXp && !props.itemBought && betterMult && (
                    <button
                        className="w-full py-3 text-center bg-green mt-2 rounded-lg font-silkscreen text-white text-xl"
                        onClick={() => props.onBuy(props.itemName)}
                    >
                        Buy
                    </button>
                )}
            </div>
        </>
    )
}
