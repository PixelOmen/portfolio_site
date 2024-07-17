import { useEffect, useRef, MutableRefObject } from 'react';
import { Ticker } from '@createjs/easeljs';
import styles from './canvasBG.module.css';
import ParticleEngine from './particles.js';


export default function CanvasBG() {
    let canvasElem = useRef(null);

    useEffect(() => {
        let particles = new ParticleEngine(canvasElem.current);
        Ticker.addEventListener("tick", updateCanvas);
        window.addEventListener("resize", resizeCanvas, false);

        function updateCanvas() {
            particles.render();
        }

        function resizeCanvas() {
            particles.resize();
        }
    }, []);

  return (
    <div className={`${styles.container} h-screen`}>
        <canvas id='bgCanvas' ref={canvasElem} className={`${styles.projector}`}/>
    </div>
  )
}
