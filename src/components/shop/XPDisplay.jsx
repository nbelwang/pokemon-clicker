export default function XPDisplay(props) {
    return (
        <div className="flex flex-wrap bg-yellow border-4 border-royal-blue rounded-lg">
            <div className="flex items-center border-e-4 border-r-royal-blue px-3">
                <p className="font-silkscreen font-bold text-lg md:text-xl lg:text-2xl leading-none text-royal-blue">
                    XP
                </p>
            </div>

            <div className="flex justify-end items-center px-2 w-md">
                <p className="font-silkscreen font-bold text-lg md:text-xl lg:text-2xl leading-none text-royal-blue ">
                    {props.xpData}
                </p>
            </div>
        </div>
    )
}
