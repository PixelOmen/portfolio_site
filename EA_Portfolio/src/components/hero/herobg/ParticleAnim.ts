export default class ParticleAnimation {
    canvas: HTMLCanvasElement;
    canvasContainer: HTMLElement;
    context: CanvasRenderingContext2D;
    dpr: number;
    circles: any[];
    mouse: { x: number; y: number; };
    canvasSize: { w: number; h: number; };
    settings: {
      quantity: number;
      staticity: number;
      ease: number;
      randomX: number;
      randomY: number;
      windowWidth: number;
      windowHeight: number;
    };

    constructor(
      elem: HTMLCanvasElement,
      {
        quantity = 30,
        staticity = 50,
        ease = 50,
        randomX = 2,
        randomY = 2,
        windowWidth = window.innerWidth,
        windowHeight = window.innerHeight,
      } = {}
    ) {
      this.canvas = elem;
      if (!this.canvas.parentElement) {
        throw new Error('Canvas element must be a child of another element');
      };
      this.canvasContainer = this.canvas.parentElement;
      const context = this.canvas.getContext('2d');
      if (!context) {
        throw new Error('Canvas context is null');
      }
      this.context = context;
      this.dpr = window.devicePixelRatio || 1;
      this.settings = {
        quantity: quantity,
        staticity: staticity,
        ease: ease,
        randomX: randomX,
        randomY: randomY,
        windowWidth: windowWidth,
        windowHeight: windowHeight,
      };
      this.circles = [];
      this.mouse = {
        x: 0,
        y: 0,
      };
      this.canvasSize = {
        w: 0,
        h: 0,
      };
      this.onMouseMove = this.onMouseMove.bind(this);
      this.initCanvas = this.initCanvas.bind(this);
      this.resizeCanvas = this.resizeCanvas.bind(this);
      this.drawCircle = this.drawCircle.bind(this);
      this.drawParticles = this.drawParticles.bind(this);
      this.remapValue = this.remapValue.bind(this);
      this.animate = this.animate.bind(this);
      this.init();
    }
  
    init() {
      this.initCanvas();
      this.animate();
      this.handleResize = this.handleResize.bind(this);
      window.addEventListener('resize', this.handleResize);
      window.addEventListener('mousemove', this.onMouseMove);
    }

    handleResize() {
      if (window.innerWidth != this.settings.windowWidth) {
        this.settings.windowWidth = window.innerWidth;
        this.initCanvas();
        return;
      }
      if (Math.abs(window.innerHeight - this.settings.windowHeight) > 300) {
        this.settings.windowHeight = window.innerHeight;
        this.initCanvas();
        return;
      }
    }
    
    initCanvas() {
      this.resizeCanvas();
      this.drawParticles();
    }
  
    onMouseMove(event: MouseEvent) {
      const { clientX, clientY } = event;
      const rect = this.canvas.getBoundingClientRect();
      const { w, h } = this.canvasSize;
      const x = clientX - rect.left - (w / 2);
      const y = clientY - rect.top - (h / 2);
      const inside = x < (w / 2) && x > -(w / 2) && y < (h / 2) && y > -(h / 2);
      if (inside) {
        this.mouse.x = x;
        this.mouse.y = y;
      }
    }
  
    resizeCanvas() {
      this.circles.length = 0;
      this.canvasSize.w = this.canvasContainer.offsetWidth;
      this.canvasSize.h = this.canvasContainer.offsetHeight;
      this.canvas.width = this.canvasSize.w * this.dpr;
      this.canvas.height = this.canvasSize.h * this.dpr;
      this.canvas.style.width = this.canvasSize.w + 'px';
      this.canvas.style.height = this.canvasSize.h + 'px';
      this.context.scale(this.dpr, this.dpr);
    }
  
    circleParams() {
      const x = Math.floor(Math.random() * this.canvasSize.w);
      const y = Math.floor(Math.random() * this.canvasSize.h);
      const translateX = 0;
      const translateY = 0;
      const size = Math.floor(Math.random() * 4) + 1;
      const alpha = 0;
      const targetAlpha = parseFloat((Math.random() * 0.1).toFixed(1));
      const dx = (Math.random() - 0.5) * this.settings.randomX;
      const dy = (Math.random() - 0.5) * this.settings.randomY;
      const magnetism = 0.1 + Math.random() * 4;
      return { x, y, translateX, translateY, size, alpha, targetAlpha, dx, dy, magnetism };
    }
  
    drawCircle(circle: any, update = false) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      this.context.translate(translateX, translateY);
      this.context.beginPath();
      this.context.arc(x, y, size, 0, 2 * Math.PI);
      this.context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      this.context.fill();
      this.context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      if (!update) {
        this.circles.push(circle);
      }
    }
  
    clearContext() {
      this.context.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
    }
  
    drawParticles() {
      this.clearContext();
      const particleCount = this.settings.quantity;
      for (let i = 0; i < particleCount; i++) {
        const circle = this.circleParams();
        this.drawCircle(circle);
      }
    }
  
    remapValue(value: number, start1: number, end1: number, start2: number, end2: number) {
      const remapped = (value - start1) * (end2 - start2) / (end1 - start1) + start2;
      return remapped > 0 ? remapped : 0;
    }
  
    animate() {
      this.clearContext();
      this.circles.forEach((circle, i) => {
        const edge = [
          circle.x + circle.translateX - circle.size,
          this.canvasSize.w - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          this.canvasSize.h - circle.y - circle.translateY - circle.size,
        ];
        const closestEdge = edge.reduce((a, b) => Math.min(a, b));
        const remapClosestEdge = +this.remapValue(closestEdge, 0, 20, 0, 1).toFixed(2);
        if (remapClosestEdge > 1) {
          circle.alpha += 0.02;
          if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
        } else {
          circle.alpha = circle.targetAlpha * remapClosestEdge;
        }
        circle.x += circle.dx;
        circle.y += circle.dy;
        circle.translateX += ((this.mouse.x / (this.settings.staticity / circle.magnetism)) - circle.translateX) / this.settings.ease;
        circle.translateY += ((this.mouse.y / (this.settings.staticity / circle.magnetism)) - circle.translateY) / this.settings.ease;        
        if (circle.x < -circle.size || circle.x > this.canvasSize.w + circle.size || circle.y < -circle.size || circle.y > this.canvasSize.h + circle.size) {          
          this.circles.splice(i, 1);          
          const circle = this.circleParams();
          this.drawCircle(circle);          
        } else {
          this.drawCircle({ ...circle, x: circle.x, y: circle.y, translateX: circle.translateX, translateY: circle.translateY, alpha: circle.alpha }, true);
        }
      });
      window.requestAnimationFrame(this.animate);
    }
  }