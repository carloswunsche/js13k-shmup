//////////////////////////
// DISPLAY
//////////////////////////

const canvasTxt = window.canvasTxt.default
canvasTxt.align = 'left';
canvasTxt.vAlign = 'top';

class Display {
    constructor(width, height, scanlines = false, hitboxes = false) {
        this.width = width;
        this.height = height;
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.scanlines = scanlines;
        this.hitboxes = hitboxes;
        this.fade = {value: 0, mode: 'none', speed: 1};
        this.setScaleAndResize();
        window.addEventListener('resize', ()=>{
            this.setScaleAndResize();
            // Deactivate the next one for best performance
            this.render(stage.bg, game.objects);
        });
        this.txt = '';
    }
    needs(){
    }

    setScaleAndResize(forced) {
        // Set scale
        this.scale = Math.min(
            Math.trunc(window.innerWidth / this.width),
            Math.trunc(window.innerHeight / this.height));
        if (forced) this.scale = forced;
        // Resize
        this.canvas.width = this.scale * this.width;
        this.canvas.height = this.scale * this.height;    
    }

    render (bg, gameObjects) {
        // To clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render Background
        this.renderBackground(bg);

        // Render Game Objects
        this.renderGameObjects(gameObjects);

        // Fade
        if (this.fade.value > 0) this.renderFade();

        // Hitboxes
        if (this.hitboxes) this.renderHitboxes(gameObjects);

        // Scanlines
        if (this.scanlines) this.renderScanlines(50);

        // Canvas-txt
        if (this.txt.length > 0) {
            canvasTxt.fontSize = 14 * this.scale;
            canvasTxt.drawText(this.ctx, this.txt, 10, 0, this.width, this.height);
        };
    }

    renderBackground (bg) {
        //////////////
        // Performance
        this.p__tileTimesScaledCanvas = bg.tileSize * this.scale;
        //////////////
        this.bgPatIndex = 0;
        bg.rows.forEach((_, y) => {
            //////////////
            // Performance
            this.p__destinationY = bg.rows[y] * this.scale;
            //////////////
            for (let x = 0; x < this.width; x += bg.tileSize) {
                // Para no renderizar al pedo el row que queda out of bounds (arriba)
                if (bg.rows[y] <= -bg.tileSize) {this.bgPatIndex++; continue;}
                // Check if tile is not empty/transparent
                if (bg.pattern[this.bgPatIndex] !== 0) { 
                    this.ctx.drawImage(
                        // Img
                        bg.image,
                        // Source X
                        // (this.tileCode % bg.imageCols) * bg.tileScaled,
                        (bg.pattern[this.bgPatIndex]-1) * bg.tileScaled,
                        // Source Y
                        // Math.floor((this.tileCode / bg.imageCols)) * bg.tileScaled,
                        0,
                        // Source Width
                        bg.tileScaled,
                        // Source Height
                        bg.tileScaled,
                        // Destination X
                        x * this.scale,
                        // Destination Y
                        this.p__destinationY,
                        // Destination Width
                        this.p__tileTimesScaledCanvas,
                        // Destination height
                        this.p__tileTimesScaledCanvas 
                    );
                };
                this.bgPatIndex++;
            };
        });
    }

    renderGameObjects (gameObjects) {
        for (const [_, arr] of gameObjects){
        // loopOver(gameObjects, (_,arr) => { // delete dis
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
            })
        // }) // delete dis
        }
    }

    initFade(mode, speed) {
        this.fade.mode = mode;
        this.fade.speed = speed;
        if (mode === 'fromBlack') this.fade.value = 100;
        if (mode === 'toBlack') this.fade.value = 0;
    }

    updateFade(step) {
        if (this.fade.mode === 'fromBlack') this.fade.value -= this.fade.speed * step;
        if (this.fade.mode === 'toBlack')   this.fade.value += this.fade.speed * step;
        if (this.fade.value === 0 || this.fade.value === 100) this.initFade('none', 0)
    }

    renderFade () {
        this.ctx.globalAlpha = this.fade.value / 100; // 1.0 ~ 0.0
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalAlpha = 1; // Canvas globalAlpha fix
    }

    renderHitboxes(gameObjects) {
        for (const [_, arr] of gameObjects){
            arr.forEach(obj => {
                let color = 'white'
                // [0] = x1, [1] = x2, [2] = y1, [3] = y2
                this.drawLine(obj.hitbox[0], obj.hitbox[2], 'start', color);
                this.drawLine(obj.hitbox[1], obj.hitbox[2]);
                this.drawLine(obj.hitbox[1], obj.hitbox[3]);
                this.drawLine(obj.hitbox[0], obj.hitbox[3]);
                this.drawLine(obj.hitbox[0], obj.hitbox[2]);
            });
        }
    }

    drawLine(x,y, start, color) {
        if (start) {
            this.ctx.strokeStyle = color;
            this.ctx.beginPath();
            this.ctx.moveTo(x*this.scale, y*this.scale);
            return;
        }
        this.ctx.lineTo(x*this.scale, y*this.scale);
        this.ctx.stroke();
    }

    renderScanlines(intensity) {
        this.ctx.globalAlpha = intensity / 100;
        for (let y = 0; y < this.height; y++){
            this.ctx.fillRect(0, y * this.scale, this.canvas.width, 0.5 * this.scale);
        }
        this.ctx.globalAlpha = 1; // Canvas globalAlpha fix
    }

    pixelatedLook() {
        // Not used because artifacts due to floats
        this.canvas.style.cssText = 
        'image-rendering: optimizeSpeed;' +             // FireFox < 6.0
        'image-rendering: -moz-crisp-edges;' +          // FireFox
        'image-rendering: -o-crisp-edges;' +            // Opera
        'image-rendering: -webkit-crisp-edges;' +       // Chrome
        'image-rendering: crisp-edges;' +               // Chrome
        'image-rendering: -webkit-optimize-contrast;' + // Safari
        'image-rendering: pixelated; ' +                // Future browsers
        '-ms-interpolation-mode: nearest-neighbor;';    // IE
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.msImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
    }
};