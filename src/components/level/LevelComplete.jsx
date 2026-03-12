import bgImage from '../../assets/background.png'

export default function LevelComplete() {
    return(
        <div className="flex flex-col flex-1 gap-3 bg-cover bg-center"
                 style={{ backgroundImage: `url(${bgImage})` }}>
        
            <div className="p-10">Level Complete</div>

        </div>
    )
}