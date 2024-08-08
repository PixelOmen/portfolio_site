export function logFPS() {
    let lastFrameTime = performance.now();
    let frameCount = 0;
    let fps = 0;

    function calculateFPS() {
      const now = performance.now();
      const delta = now - lastFrameTime;
      
      frameCount++;
      
      if (delta >= 1000) {
        fps = (frameCount / delta) * 1000;
        frameCount = 0;
        lastFrameTime = now;
        console.log(`FPS: ${Math.round(fps)}`);
      }
      
      requestAnimationFrame(calculateFPS);
    }

    requestAnimationFrame(calculateFPS);
  }