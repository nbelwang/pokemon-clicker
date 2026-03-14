import { useOutletContext } from "react-router-dom"
import XPDisplay from "../shop/xpDisplay"

export default function StatDisplay({tempXP}) {
    const { playerData } = useOutletContext()

    const item = playerData?.item

    return (
        <div className="absolute bottom-4 right-4">
            {item.length != 0 && (
                <div className="flex flex-col items-end mb-2">
                    <img src={item[0].sprite} alt={playerData.item.name} className="w-20"></img>
                    <p className="font-quantico font-bold text-royal-blue text-xl">{playerData.itemMultiplier}x Multiplier</p>
                </div>
            )}
            <XPDisplay xpData={tempXP} />
        </div>
    )
}
