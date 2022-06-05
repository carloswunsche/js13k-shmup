//////////////////////////
// DISPLAY
//////////////////////////

class Display {
    constructor(width, height, imageScaled, scanlines, intensity, hitboxes) {
        this.width = width;
        this.height = height;
        this.canvas = this.setCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.scanlines = scanlines;
        this.intensity = intensity;
        this.hitboxes = hitboxes;
        this.fade = {value: 100, mode: 'none', amount: 1};
        // Used for rendering background
        this.imageScaled = imageScaled;
        // Resize canvas on initialization
        this.scale = this.setScale();  
        this.resizeCanvas();
        window.addEventListener('resize', () => {
            this.scale = this.setScale();
            this.resizeCanvas();
        });
    }

    setCanvas() {
        let canvas = document.querySelector('canvas');
        canvas.width  = this.width;
        canvas.height = this.height;
        return canvas;
    }

    setScale() {
        return Math.min(
            Math.trunc(window.innerWidth / this.width),
            Math.trunc(window.innerHeight / this.height));
    }

    resizeCanvas () {
        this.canvas.width = this.scale * this.width;
        this.canvas.height = this.scale * this.height;
    }

    render (bg, gameObjects) {
        // Clear canvas (not needed)
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render Background
        this.renderBackground(bg);

        // Render Game Objects
        this.renderGameObjects(gameObjects);

        // Fade
        if (this.fade.value > 0) this.renderFade();

        // Scanlines
        if (this.scanlines) this.renderScanlines(this.intensity);

        // Hitboxes
        if (this.hitboxes) this.renderHitboxes(gameObjects);
    }

    // Optimize harder
    renderBackground (bg) {
        this.bgPatIndex = 0;
        bg.rows.forEach((_, y) => {
            for (let x = 0; x < this.width; x += bg.tileSize) {
                // Para no renderizar al pedo el row que queda out of bounds (arriba)
                if (bg.rows[y] <= -bg.tileSize) {this.bgPatIndex++; continue;}
                // This is just to simplify the code syntax
                this.bgTile = bg.pattern[this.bgPatIndex]; 
                // Check if tile is not empty/transparent
                if (this.bgTile > 0) { 
                    // Adjust so sourceX and Y are calculated properly
                    this.bgTile--;
                    this.ctx.drawImage(
                        // Img
                        bg.image,
                        // Source note: improve perfomance by having a 1-row-only source image
                        // Source X
                        (this.bgTile % bg.imageCols) * bg.tileScaled,
                        // Source Y
                        Math.floor((this.bgTile / bg.imageCols)) * bg.tileScaled,
                        // Source Width
                        bg.tileScaled,
                        // Source Height
                        bg.tileScaled,
                        // Destination X
                        x * this.scale,
                        // Destination Y
                        bg.rows[y] * this.scale,
                        // Destination Width
                        bg.tileSize * this.scale,
                        // Destination height
                        bg.tileSize * this.scale 
                    );
                };
                this.bgPatIndex++;
            };
        });
    }

    renderGameObjects (gameObjects) {
        loopOver(gameObjects, (_,arr) => {
            arr.forEach(obj => {
                // Save canvas' context state
                this.ctx.save();

                // Set object's opacity
                if (obj.opacity < 100) this.ctx.globalAlpha = obj.opacity / 100;

                // Translate canvas to render position
                this.ctx.translate(obj.x * this.scale, obj.y * this.scale);

                // Rotate
                if (obj.angle) this.ctx.rotate(toRadians(obj.angle));

                // Draw
                this.ctx.drawImage(
                    // Img
                    obj.image,
                    // Translate (-50%, -50%) before drawing
                    -(obj.image.width * this.scale) / 2,
                    -(obj.image.height * this.scale) / 2,
                    // Draw acording to img size * scaled
                    obj.image.width * this.scale,
                    obj.image.height * this.scale
                );

                // Undo opacity, translation and rotation 
                this.ctx.restore();
            });
        });
    }

    initFade(mode, amount) {
        this.fade.mode = mode;
        this.fade.amount = amount;
        if (mode === 'fromBlack') this.fade.value = 100;
        if (mode === 'toBlack') this.fade.value = 0;
    }

    updateFade() {
        if (this.fade.mode === 'fromBlack') this.fade.value -= this.fade.amount;
        if (this.fade.mode === 'toBlack')   this.fade.value += this.fade.amount;
        if (this.fade.value === 0 || this.fade.value === 100) this.initFade('none')
    }

    renderFade () {
        // PERFORMANCE NOTE: this only runs until this.fade.value is 0 👍
        this.ctx.globalAlpha = this.fade.value / 100; // 1.0 ~ 0.0
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalAlpha = 1; // Canvas globalAlpha fix
    }

    renderScanlines(intensity) {
        this.ctx.globalAlpha = intensity / 100;
        for (let y = 0; y < this.height; y++){
            this.ctx.fillRect(0, y * this.scale, this.canvas.width, 0.5 * this.scale);
        }
        this.ctx.globalAlpha = 1; // Canvas globalAlpha fix
    }

    renderHitboxes(gameObjects) {
        loopOver(gameObjects, (_, arr) => {
            arr.forEach(obj => {
                let color = 'white'
                // [0] = x1, [1] = x2, [2] = y1, [3] = y2
                this.drawLine(obj.hitbox[0], obj.hitbox[2], 'start', color);
                this.drawLine(obj.hitbox[1], obj.hitbox[2]);
                this.drawLine(obj.hitbox[1], obj.hitbox[3]);
                this.drawLine(obj.hitbox[0], obj.hitbox[3]);
                this.drawLine(obj.hitbox[0], obj.hitbox[2]);
            });
        });
    }

    drawLine(x,y, start, color) {
        if (start) {
            this.ctx.strokeStyle = color;
            this.ctx.beginPath();
            this.ctx.moveTo(x*this.scale, y*this.scale);
            return
        }
        this.ctx.lineTo(x*this.scale, y*this.scale);
        this.ctx.stroke();
    }
};