import { NavLink, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import bgImage from '../../assets/background.png'
import spaceBg from '../../assets/spaceBg.jpg'

export default function LevelComplete({ status, playerCaughtNewPokemon}) {
    const navigate = useNavigate();
    const { levelNumber } = useParams()
    const nextLevel = Number(levelNumber) + 1
    const isBossLevel = Number(levelNumber) === 5; 

    const isInventoryEmpty = !playerCaughtNewPokemon && Number(levelNumber) === 1;
    const isFailed = status === "failed" || isInventoryEmpty;
    const hasDefeatedBoss = !isFailed && isBossLevel && status === "finished";

    let mainMessage;
    if (hasDefeatedBoss) {
        mainMessage = "Wow! you defeated Hess! You acquired: his job";
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
    if (hasDefeatedBoss) {
        buttonText = "stats";
        buttonLink = "/home/stats";
    } else if (isFailed) {
        buttonText = "retry";
        buttonLink = `/home/level/${levelNumber}`;
    } else {
        buttonText = nextLevel === 5 ? "Final Level >" : "Next Level >";
        buttonLink = `/home/level/${nextLevel}`;
    }

     const buttonStyle = status === "failed" || isInventoryEmpty
        ? "bg-yellow"           
        : hasDefeatedBoss
            ? "bg-slate-blue"     
            : nextLevel === 5
            ? "bg-salmon"        
            : "bg-yellow";       

    return(
        <div className="flex flex-col flex-1 items-center gap-3 bg-cover bg-center"
                 style={{ backgroundImage: `url(${isBossLevel ? spaceBg : bgImage})`}}>
        
            <div className="flex flex-col gap-5 border-6 mt-35 p-10 w-100 border-royal-blue rounded-xl bg-white text-center">
            
            <p className='font-quantico font-bold text-xl tracking-widest'>
                {mainMessage}
            </p>

            {isFailed && playerCaughtNewPokemon && (
                <p className="font-quantico text-sm text-gray-700">
                    You must leave behind your new pokemon :(
                </p>
            )}

            <NavLink
                to={buttonLink}
                onClick={(e) => {
                    if (isFailed) {
                        e.preventDefault();
                        navigate(0); // refresh page on retry
                    }
                }}
                className={`rounded-lg flex flex-col items-center p-4 hover:brightness-95 transition-all ${buttonStyle}`}>
                <p className='font-silkscreen'>
                    {buttonText}
                </p>
            </NavLink>

            {!hasDefeatedBoss && (
                <NavLink to="/home" className="rounded-lg bg-slate-blue flex flex-col items-center p-4 hover:brightness-95">
                    <p className='font-silkscreen'>Home</p>
                </NavLink>
            )}

            </div>

        </div>
    )
}