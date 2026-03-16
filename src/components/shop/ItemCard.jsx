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
                    className={`flex flex-col items-center space-y-2 w-xs md:w-3xs py-4 ${bgColor} border-4 border-royal-blue rounded-xl lg:p-4`}
                >
                    <h2 className="flex items-center capitalize text-center font-silkscreen font-bold text-md md:text-lg lg:text-xl mb-2 h-8 md:h-12 lg:h-16 overflow-hidden">
                        {formattedName}
                    </h2>
                    <p className="font-quantico text-center text-md lg:text-lg">
                        {props.itemMult}x Multiplier
                    </p>
                    <img
                        className="w-25"
                        src={props.itemSprite}
                        alt={props.itemName}
                    ></img>
                    <p className="font-silkscreen font-bold text-royal-blue text-md md:text-lg lg:text-xl">
                        {props.itemCost} XP
                    </p>
                </div>
                {props.itemBought && betterMult && <p className="w-xs md:w-3xs font-silkscreen text-center mt-3 text-md md:text-lg text-royal-blue">Applied</p>}
                {sufficientXp && !props.itemBought && betterMult && (
                    <button
                        className="w-xs md:w-3xs py-3 text-center bg-green mt-3 rounded-lg font-silkscreen font-bold text-white text-md md:text-lg"
                        onClick={() => props.onBuy(props.itemName)}
                    >
                        Buy
                    </button>
                )}
            </div>
        </>
    )
}
