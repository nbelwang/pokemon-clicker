export default function XPDisplay({ xpData }) {
    return (
        <div className="flex flex-row md:flex-wrap bg-yellow border-4 border-royal-blue rounded-lg">
            <div className="flex flex-row items-center border-e-4 border-r-royal-blue p-3 md:p-4 lg:p-2">
                <p className="font-silkscreen font-bold text-lg md:text-xl lg:text-xl leading-none text-royal-blue">
                    XP
                </p>
            </div>

            <div className="flex justify-end items-center p-3 md:p-4 ps-20 md:ps-30 lg:p-2 lg:ps-30">
                <p className="font-silkscreen font-bold text-lg md:text-xl lg:text-xl leading-none text-royal-blue ">
                    {xpData}
                </p>
            </div>
        </div>
    )
}
