import { useRef, useEffect } from 'react'
import styles from './starrytest.module.css'

export default function StarryTest() {
  const canvasElem = useRef<HTMLCanvasElement>(null);

  function resizeCanvas(canvas: HTMLCanvasElement | null) {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function drawStars(canvas: HTMLCanvasElement | null) {
    if (!canvas) return;
    let ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const numStars = 100;
    for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = '#444647';
        ctx.fill();
    }
  }

  useEffect(() => {
    if (canvasElem.current) {
      console.log(canvasElem.current)
      window.addEventListener('resize', () => {
        resizeCanvas(canvasElem.current);
        drawStars(canvasElem.current);
      });
      // window.addEventListener('scroll', () => {
      //   drawStars(canvasElem.current);
      // })
  
      resizeCanvas(canvasElem.current);
      drawStars(canvasElem.current);   
    }    
  }, [])

  return (
    <canvas ref={canvasElem} className={styles.starryCanvas}></canvas>
  )
}
