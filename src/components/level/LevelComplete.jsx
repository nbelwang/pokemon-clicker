import { NavLink} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import bgImage from '../../assets/background.png'

export default function LevelComplete() {
    const { levelNumber } = useParams()
    const nextLevel = Number(levelNumber) + 1
    const isBossLevel = nextLevel === 5;

    return(
        <div className="flex flex-col flex-1 items-center gap-3 bg-cover bg-center"
                 style={{ backgroundImage: `url(${bgImage})` }}>
        
            <div className="flex flex-col gap-5 border-6 mt-30 p-10 w-100 border-royal-blue rounded-xl bg-white text-center">
                <p className='font-quantico font-bold text-xl tracking-widest'>You have encountered all pokemon on this level!</p>

               <NavLink to={`/home/level/${nextLevel}`} 
                    className={`rounded-lg flex flex-col items-center p-4 hover:brightness-110 transition-all 
                    ${isBossLevel ? "bg-salmon" : "bg-yellow"}`}> 
                    <p className='font-silkscreen'>
                        {isBossLevel ? "Final Level >" : "Next Level >"}
                    </p>
                </NavLink>

                <NavLink to="/home" className="rounded-lg bg-slate-blue flex flex-col items-center p-4 hover:brightness-95"> 
                    <p className='font-silkscreen'>Home</p>
                </NavLink>

            </div>

        </div>
    )
}