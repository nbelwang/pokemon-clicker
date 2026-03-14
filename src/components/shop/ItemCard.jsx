export default function ItemCard(props) {
    // Formatting changes to item name (remove hyphen and capitalize)
    const formattedName = props.itemName.split("-").join(" ")

    return (
        <div className="flex flex-col items-center space-y-2 w-3xs md:w-2xs py-4 bg-white border-4 border-royal-blue rounded-xl lg:p-4">
            <h2 className="flex items-center capitalize text-center font-silkscreen text-xl md:text-2xl lg:text-3xl mb-2 h-12 md:h-16 lg:h-20 overflow-hidden">
                {formattedName}
            </h2>
            <p className="font-quantico text-center text-md md:text-lg lg:text-xl">{props.itemMult}x Multiplier</p>
            <img className="w-25" src={props.itemSprite} alt={props.itemName}></img>
            <p className="font-silkscreen font-weight-black text-royal-blue text-md md:text-lg lg:text-xl">{props.itemCost} XP</p>
        </div>
    )
}
