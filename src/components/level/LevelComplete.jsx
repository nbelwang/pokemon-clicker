import { NavLink, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import bgImage from '../../assets/background.png'
import spaceBg from '../../assets/spaceBg.jpg'

export default function LevelComplete({ status, playerCaughtNewPokemon}) {
    const navigate = useNavigate();
    const { levelNumber } = useParams()
    const prevLevel = Number(levelNumber) - 1
    const nextLevel = Number(levelNumber) + 1
    const isBossLevel = Number(levelNumber) === 5; 

    const isInventoryEmpty = !playerCaughtNewPokemon && Number(levelNumber) === 1;
    const isFailed = status === "failed" || isInventoryEmpty;
    const hasDefeatedBoss = !isFailed && isBossLevel && status === "finished";

    let mainMessage;
    if (hasDefeatedBoss) {
        mainMessage = "Wow! You defeated Hess!";
    } else if (isFailed && isBossLevel) {
        mainMessage = "You could not defeat Hess";
    } else if (isFailed) {
        mainMessage = isInventoryEmpty 
            ? "Huh? You didn't catch any pokemon" 
            : "Level failed, all of your pokemon fainted";
    } else {
        mainMessage = "You have encountered all pokemon on this level!";
    }

    let buttonText, buttonLink;
    if (isFailed) {
        buttonText = "retry";
        buttonLink = `/home/level/${levelNumber}`;
    } else {
        buttonText = nextLevel === 5 ? "Final Level >" : "Next Level >";
        buttonLink = `/home/level/${nextLevel}`;
    }

    return(
         <div className="relative flex flex-col flex-1 gap-3 items-center"
            style={{
                backgroundImage: `url(${isBossLevel ? spaceBg : bgImage})`,
                backgroundSize: isBossLevel ? "cover" : "120%",
                backgroundPosition: isBossLevel ? "center" : "bottom center",
            }}>
        
            <div className={`flex flex-col gap-5 border-6 mt-20 lg:mt-45 p-10 w-100 border-royal-blue rounded-xl
                            ${hasDefeatedBoss ? "bg-black" : "bg-white"}`}>
            
            <p  className={`font-quantico font-bold text-center text-xl tracking-widest 
                            ${hasDefeatedBoss ? "text-white" : "text-black"}`}>
                {mainMessage}
            </p>

            {isFailed && playerCaughtNewPokemon && (
                <p className="font-quantico text-sm text-gray-700">
                    You must leave behind your new pokemon :(
                </p>
            )}

            {!hasDefeatedBoss ? (
                <NavLink
                    to={buttonLink}
                    onClick={(e) => {
                        if (isFailed) {
                            e.preventDefault();
                            navigate(0); // refresh page on retry
                        }
                    }}
                    className={`rounded-lg flex flex-col items-center p-4 hover:brightness-95 transition-all 
                                ${nextLevel === 5 ? "bg-salmon" : "bg-yellow"}`}
                >
                    <p className='font-silkscreen'>{buttonText}</p>
                </NavLink>
            ) : (
                <div className="flex flex-col items-center w-full">
                    <p className='font-silkscreen text-yellow pb-2'>you acquired</p>
                    <p className='font-quantico text-white text-center border-4 border-yellow rounded-lg p-4 w-full hover:text-yellow'> 
                        His job. 
                    </p>
                </div>
            )}
            
            {Number(levelNumber) !== 1 ? (
                <NavLink
                    to={hasDefeatedBoss ? "/home/stats" : `/home/level/${prevLevel}`}
                    className="rounded-lg bg-slate-blue flex flex-col items-center p-4 hover:brightness-90"
                    >
                    <p className='font-silkscreen'>
                        {hasDefeatedBoss ? "stats" : "< prev level"}
                    </p>
                </NavLink>
            ) : (
                <NavLink
                    to="/home"
                    className="rounded-lg bg-slate-blue flex flex-col items-center p-4 hover:brightness-90"
                    >
                    <p className='font-silkscreen'>
                        home
                    </p>
                </NavLink>
            )}
            </div>

        </div>
    )
}