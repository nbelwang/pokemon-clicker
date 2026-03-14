export default function XPDisplay(props) {
    return (
        <div className="flex flex-row md:flex-wrap bg-yellow border-4 border-royal-blue rounded-lg">
            <div className="flex flex-row items-center border-e-4 border-r-royal-blue p-4">
                <p className="font-silkscreen font-bold text-xl md:text-2xl lg:text-3xl leading-none text-royal-blue">
                    XP
                </p>
            </div>

            <div className="flex justify-end items-center p-4 ps-20 md:ps-50">
                <p className="font-silkscreen font-bold text-xl md:text-2xl lg:text-3xl leading-none text-royal-blue ">
                    {props.xpData}
                </p>
            </div>
        </div>
    )
}
