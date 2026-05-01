/**
 * Network Canvas Background
 * Interactive node network simulation for AI/Engineering vibe.
 */

class NetworkBackground {
    constructor() {
        this.canvas = document.getElementById('network-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.points = [];
        this.mouse = { x: -1000, y: -1000 };
        this.pointCount = 120;
        this.connectionDistance = 180;
        this.mouseDistance = 300;
        
        // Dracula Theme Colors (Enhanced Visibility)
        this.colors = {
            node: 'rgba(189, 147, 249, 0.8)', // Dracula Purple
            line: 'rgba(139, 233, 253, 0.25)', // Dracula Cyan
            mouseLine: 'rgba(255, 121, 198, 0.5)' // Dracula Pink
        };

        this.init();
        this.animate();
        this.handleResize();
        this.handleMouse();
    }

    init() {
        this.resize();
        this.points = [];
        
        // Calculate point count based on total area for consistent density
        const area = this.canvas.width * this.canvas.height;
        this.pointCount = Math.floor(area / 8000); 
        if (this.pointCount > 300) this.pointCount = 300;
        if (this.pointCount < 80) this.pointCount = 80;

        for (let i = 0; i < this.pointCount; i++) {
            this.points.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                size: Math.random() * 3 + 1.5 // Larger nodes
            });
        }
    }

    resize() {
        // Ensure canvas takes full window dimensions
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.resize();
        });
    }

    handleMouse() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.points.length; i++) {
            let p1 = this.points[i];

            // Update position
            p1.x += p1.vx;
            p1.y += p1.vy;

            // Bounce off edges (Infinite wrap-around)
            if (p1.x < 0) p1.x = this.canvas.width;
            if (p1.x > this.canvas.width) p1.x = 0;
            if (p1.y < 0) p1.y = this.canvas.height;
            if (p1.y > this.canvas.height) p1.y = 0;

            // Draw Node
            this.ctx.fillStyle = this.colors.node;
            this.ctx.beginPath();
            this.ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Check connections with other points
            for (let j = i + 1; j < this.points.length; j++) {
                let p2 = this.points[j];
                let dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

                if (dist < this.connectionDistance) {
                    let alpha = 1 - (dist / this.connectionDistance);
                    this.ctx.strokeStyle = `rgba(139, 233, 253, ${alpha * 0.3})`;
                    this.ctx.lineWidth = 0.8;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }

            // Check connection with mouse
            let mouseDist = Math.hypot(p1.x - this.mouse.x, p1.y - this.mouse.y);
            if (mouseDist < this.mouseDistance) {
                let alpha = 1 - (mouseDist / this.mouseDistance);
                this.ctx.strokeStyle = `rgba(255, 121, 198, ${alpha * 0.6})`;
                this.ctx.lineWidth = 1.2;
                this.ctx.beginPath();
                this.ctx.moveTo(p1.x, p1.y);
                this.ctx.lineTo(this.mouse.x, this.mouse.y);
                this.ctx.stroke();
            }
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new NetworkBackground();
});
