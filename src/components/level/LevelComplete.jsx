import { NavLink, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import homeImage from '../../assets/home.svg'
import pokeballImage from '../../assets/pokeball.svg'
import shopImage from '../../assets/shop.svg'
import statsImage from '../../assets/stats.svg'

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
         <div className="relative flex flex-col flex-1 gap-3 items-center pb-35">
        
            <div className={`flex flex-col gap-5 border-6 p-10 w-100 border-royal-blue rounded-xl
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

            {!hasDefeatedBoss && (
                <div className="flex flex-row gap-10 justify-center mt-2">
                    <NavLink 
                        to="/home" 
                        className="flex flex-col items-center hover:brightness-90" 
                        title="Go to Home"
                    >
                        <img src={homeImage} alt="Home" className="w-10 h-10" />
                    </NavLink>

                    <NavLink 
                        to="/home/pokedex" 
                        className="flex flex-col items-center hover:brightness-90" 
                        title="View Pokedex"
                    >
                        <img src={pokeballImage} alt="Pokeball" className="w-10 h-10" />
                    </NavLink>

                    <NavLink 
                        to="/home/shop" 
                        className="flex flex-col items-center hover:brightness-90" 
                        title="Go to Shop"
                    >
                        <img src={shopImage} alt="Shop" className="w-10 h-10" />
                    </NavLink>

                    <NavLink 
                        to="/home/stats" 
                        className="flex flex-col items-center hover:brightness-90" 
                        title="View Stats"
                    >
                        <img src={statsImage} alt="Stats" className="w-10 h-10" />
                    </NavLink>
                </div>
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
                    to="/home/shop"
                    className="rounded-lg bg-slate-blue flex flex-col items-center p-4 hover:brightness-90"
                    >
                    <p className='font-silkscreen'>
                        shop
                    </p>
                </NavLink>
            )}
            </div>

        </div>
    )
}