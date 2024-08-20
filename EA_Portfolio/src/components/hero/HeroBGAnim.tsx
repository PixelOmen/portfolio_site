import { useEffect, useState, useRef } from "react";
import anime from "animejs"

export default function HeroCanvas() {
  return (
    <div className="">
      <Grid/>
    </div>
  )
}

interface DotGrid {
  width: number;
  height: number;
}

function dimByScreen(wRatio = 72, hRatio = 46): DotGrid {
  return {
    width: Math.floor(window.innerWidth / wRatio),
    height: Math.floor(window.innerHeight / hRatio)
  }
}

function Grid() {
  const [gridDim, updateDim] = useState(dimByScreen());

  var animDelay = 8000;
  var animAllowed = true;
  var currentAnim = 0;
  let dotIndex = 0;

  function stopAnims() {
    animAllowed = false;
    anime.remove('.gridPoint');
  }

  function startAnims(childCall = false) {
    if (!animAllowed) {
        clearTimeout(currentAnim);
        if (childCall) { return } else { animAllowed = true }
    }

    requestAnimationFrame(() => {
      const startPoint = Math.floor(Math.random() * dotIndex);
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
            { value: 0.6, easing: "easeOutSine", duration: 250 },
            { value: 0, easing: "easeInOutSine", duration: 1200 },
        ],
        delay: anime.stagger(50, {
            grid: [gridDim.width, gridDim.height],
            from: startPoint,
        }),
      });
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
          className="rounded-xl border-2 border-[rgb(21,29,46)] p-4"
          data-index={dotIndex}
          key={`${gridX}-${gridY}`}
        >
          <div
            style={{ willChange: "transform, opacity" }}
            className={`gridPoint h-4 w-12 rounded-md opacity-0 bg-slate-700`}
            data-index={dotIndex}
          >
          </div>
        </div>
      )
      dotIndex++;
    }
  }

  var resizeDebounce = useRef<number>(-1);

  window.addEventListener('resize', () => {
    clearTimeout(resizeDebounce.current);
    resizeDebounce.current = setTimeout(() => {
      stopAnims();
      updateDim(dimByScreen());
    }, 500)
  });

  useEffect(() => {
    if (window.innerWidth < 480) return;
    setTimeout(() => {
      startAnims();
    }, 2000);
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
