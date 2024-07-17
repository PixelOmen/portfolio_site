import { useEffect, useState } from "react";

export default function HeroCanvas() {
    return (
    <div className="w-screen bg-red-500">
        <Grid/>
    </div>
    )
}



function Grid() {
    const [gridDim, updateDim] = useState({
        width: 0,
        height: 0
    });

    var resizeDelay = setTimeout(() => {}, 100);
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeDelay);
        resizeDelay = setTimeout(() => {
            updateDim({
                width: Math.floor(window.innerWidth / 40),
                height: Math.floor(window.innerHeight / 60)
            })
        }, 500)
    });

    useEffect(() => {
        console.log(gridDim);
    }, [gridDim])


    return (
        <div className="h-screen">

        </div>
    )
}
