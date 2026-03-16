import pikachuRun from "../assets/loadingAnimation.gif"

export default function LoadingScreen() {
    return (
        <div className="flex justify-center items-center">
            <div>
                <img className="w-25" src={pikachuRun} alt="Animation of Pikachu running"></img>
                <p className="font-silkscreen font-black text-xl">Loading...</p>
            </div>
        </div>
    )
}
