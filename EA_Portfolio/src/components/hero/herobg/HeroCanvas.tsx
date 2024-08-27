import { useEffect, useRef } from "react";
import ParticleAnimation from "./ParticleAnim";


export default function HeroCanvas() {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pQuantity = window.innerWidth / 2;
    const options = {
      quantity: pQuantity,
      staticity: +(canvas.dataset.particleStaticity || "10"),
      ease: +(canvas.dataset.particleEase || "200"),
      randomX: +(canvas.dataset.particleRandomX || "2"),
      randomY: +(canvas.dataset.particleRandomY || "2"),
    };
    new ParticleAnimation(canvas, options);
  }, []);

  return (
    <div className="h-full w-full">
      <canvas
        ref={canvasRef}
        data-particle-staticity="2"
        data-particle-ease="500"
        data-particle-random-x="1"
        data-particle-random-y="1"
      />
    </div>
  )
}