import { useEffect, useState } from "react";
import anime from "animejs"

export default function HeroCanvas() {
  return (
    <div className="">
      <Grid/>
    </div>
  )
}



function Grid() {
  interface DotGrid {
    width: number;
    height: number;
  }


  function dimByScreen(wRatio = 50, hRatio = 50): DotGrid {
    return {
      width: Math.floor(window.innerWidth / wRatio),
      height: Math.floor(window.innerHeight / hRatio)
    }
  }

  const [gridDim, updateDim] = useState(dimByScreen());


  var animDelay = 5000;
  var animAllowed = true;
  var currentAnim = 0;
  let dotIndex = 0;

  function stopAnims() {
    animAllowed = false;
  }

  function startAnims(childCall = false) {
    if (!animAllowed) {
        clearTimeout(currentAnim);
        if (childCall) { return } else { animAllowed = true }
    }
    anime({
      targets: ".gridPoint",
      scale: [
          { value: 1.5, easing: "easeOutSine", duration: 250 },
          { value: 1, easing: "easeInOutSine", duration: 1500 },
      ],
      translateY: [
          { value: -20, easing: "easeOutSine", duration: 100 },
          { value: 0, easing: "easeInOutSine", duration: 1000 },
      ],
      translateX: [
          { value: -40, easing: "easeOutSine", duration: 500 },
          { value: 0, easing: "easeInOutSine", duration: 50 },
      ],
      opacity: [
          { value: 1, easing: "easeOutSine", duration: 250 },
          { value: 0.1, easing: "easeInOutSine", duration: 1200 },
      ],
      delay: anime.stagger(50, {
          grid: [gridDim.width, gridDim.height],
          from: Math.floor(Math.random() * dotIndex),
      }),
    })
    currentAnim = setTimeout(() => {
      startAnims(true);
    }, animDelay);
  }

  const dots = [];

  for (let gridX = 0; gridX < gridDim.width; gridX++) {
    for (let gridY = 0; gridY < gridDim.height; gridY++) {
      dots.push(
        <div
          className="rounded-xl border-2 opacity-40 border-slate-800 p-4"
          data-index={dotIndex}
          key={`${gridX}-${gridY}`}
        >
          <div
            className="gridPoint rounded-md h-4 w-6 opacity-10 bg-slate-600"
            data-index={dotIndex}
          >
          </div>
        </div>
      )
      dotIndex++;
    }
  }

  var resizeDelay = setTimeout(() => {}, 100);

  window.addEventListener('resize', () => {
    clearTimeout(resizeDelay);
    resizeDelay = setTimeout(() => {
      stopAnims();
      updateDim(dimByScreen());
    }, 500)
  });

  useEffect(() => {
    startAnims();
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
