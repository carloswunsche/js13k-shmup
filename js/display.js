//////////////////////////
// DISPLAY
//////////////////////////

// const canvasTxt = window.canvasTxt.default
// canvasTxt.align = 'left';
// canvasTxt.vAlign = 'top';

class Display {
    constructor(width, height, tileSize, scanlines=0, hitboxes=0) {
        this.width = width;
        this.height = height;
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.tileSize = tileSize;
        // this.scanlines = scanlines;
        this.hitboxes = hitboxes;
        this.fade = {value: 0, mode: 'none', speed: 1};
        // Used for compressed pattern array
        this.currentTile;
        this.setScaleAndResize();
        this.pixelatedLook();
        window.addEventListener('resize', ()=>{
            this.setScaleAndResize();
            this.pixelatedLook();
            // Unnecesary Also deactivate for best performance
            this.render(stage.bg, game.objects);
        });
        // this.txt = '';
    }
    setScaleAndResize(forced) {
        // Set scale
        this.scale = M.min(
            M.trunc(window.innerWidth / this.width),
            M.trunc(window.innerHeight / this.height));
        // Unnecesary remove forced scaling
        if (forced) this.scale = forced;
        // Resize
        this.canvas.width = this.scale * this.width;
        this.canvas.height = this.scale * this.height;

        this.p__tileTimesScaledCanvas = this.tileSize * this.scale;
    }
    render (bg, gameObjects) {
        // To clear the canvas
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render Background
        this.renderBackground(bg);

        // Render Game Objects
        this.renderGameObjects(gameObjects);

        // Fade
        if (this.fade.value > 0) this.renderFade();

        // Hitboxes
        if (this.hitboxes) this.renderHitboxes(gameObjects);
    }
    renderBackground (bg) {
        let i = 0;
        bg.rows.forEach((_, y) => {
            let p__destY = bg.rows[y] * this.scale;
            for (let x = 0; x < this.width; x += this.tileSize) {
                // Para no renderizar al pedo el row que queda out of bounds (arriba)
                if (bg.rows[y] <= -this.tileSize) {i++; continue;}
                // Update scanned tile if not undefined (void 0 === undefined but less characters lol)
                if(bg.pattern[i] != void 0) this.currentTile = bg.pattern[i];
                // Draw
                // this.drawBg(bg, x, p__destY);
                this.ctx.drawImage(bg.image,this.currentTile*8,0,8,8,x*this.scale,p__destY,8*this.scale,8*this.scale);
                // Update pattern index
                i++;
            };
        });
    }
    renderGameObjects (layers) {
        for (const [_, arr] of layers){
            arr.forEach(entity => {
                // Save canvas' context state
                this.ctx.save();

                // Set object's opacity
                if (entity.opacity < 100) this.ctx.globalAlpha = entity.opacity / 100;

                // Translate canvas to render position
                this.ctx.translate(entity.x * this.scale, entity.y * this.scale);

                // Rotate
                if (entity.rotation) this.ctx.rotate(entity.rotation);


                if (entity instanceof Particle) {
                    this.ctx.fillStyle = entity.rndColor;
                    this.ctx.fillRect(
                        -(entity.scale * this.scale) / 2, 
                        -(entity.scale * this.scale) / 2,
                        entity.scale * this.scale,
                        entity.scale * this.scale
                    );
                    this.ctx.restore();
                } else {
                // Draw
                this.ctx.drawImage(
                    // Img
                    entity.image,
                    // Source x
                    entity.image.width * entity.hitState,
                    // Source y
                    0,
                    // Source width
                    entity.image.width,
                    // Source height
                    entity.image.height,
                    // DestX (translate -50%), DestY (translate -50%), DestW, DestH
                    -(entity.image?.width * entity.scale * this.scale) / 2, 
                    -(entity.image?.height * entity.scale * this.scale) / 2,
                    entity.image?.width * entity.scale * this.scale,
                    entity.image?.height * entity.scale * this.scale
                );

                // Undo opacity, translation and rotation 
                this.ctx.restore();
            }
            })
        }
    }
    initFade(mode, speed) {
        this.fade.mode = mode;
        this.fade.speed = speed;
        if (mode === 'fromBlack') this.fade.value = 100;
        if (mode === 'toBlack') this.fade.value = 0;
    }
    updateFade() {
        if (this.fade.mode === 'fromBlack') this.fade.value -= this.fade.speed;
        if (this.fade.mode === 'toBlack')   this.fade.value += this.fade.speed;
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
                if (obj.hitbox) {
                    let color = 'white'
                    // [0] = x1, [1] = x2, [2] = y1, [3] = y2
                    this.drawLine(obj.hitbox[0], obj.hitbox[2], 'start', color);
                    this.drawLine(obj.hitbox[1], obj.hitbox[2]);
                    this.drawLine(obj.hitbox[1], obj.hitbox[3]);
                    this.drawLine(obj.hitbox[0], obj.hitbox[3]);
                    this.drawLine(obj.hitbox[0], obj.hitbox[2]);
                }
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
    pixelatedLook() {
        // Used if scaling is done through JS
        this.ctx.mozImageSmoothingEnabled = 0;
        this.ctx.webkitImageSmoothingEnabled = 0;
        this.ctx.msImageSmoothingEnabled = 0;
        this.ctx.imageSmoothingEnabled = 0;
    }
};