import { useEffect, useState } from "react";

export default function HeroCanvas() {
    return (
    <div className="">
        {/* <div className="h-[500px]">Test</div> */}
        <Grid/>
        test
    </div>
    )
}



function Grid() {
    interface DotGrid {
        width: number;
        height: number;
    }

    function dimByScreen(wRatio = 30, hRatio = 30): DotGrid {
        return {
            width: Math.floor(window.innerWidth / wRatio),
            height: Math.floor(window.innerHeight / hRatio)
        }
    }

    const [gridDim, updateDim] = useState(dimByScreen());


    const dots = [];
    let index = 0;

    for (let gridX = 0; gridX < gridDim.width; gridX++) {
        for (let gridY = 0; gridY < gridDim.height; gridY++) {
            dots.push(
                <div
                    className="rounded border-2 border-slate-800 p-2 hover:bg-slate-400"
                    data-index={index}
                    key={`${gridX}-${gridY}`}
                >
                    <div
                        className="dot-point rounded-sm h-4 w-4 bg-slate-600"
                        data-index={index}
                    >                        
                    </div>
                </div>
            )
            index++;
        }
    }

    var resizeDelay = setTimeout(() => {}, 100);
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeDelay);
        resizeDelay = setTimeout(() => {
            updateDim(dimByScreen());
        }, 500)
    });

    useEffect(() => {
        console.log(gridDim);
        console.log(dots.length)
    }, [gridDim])


    return (
        <div
            style={{ gridTemplateColumns: `repeat(${gridDim.width}, 1fr)`}}
            className="grid w-fit"
        >
            {dots}
        </div>
    )
}
