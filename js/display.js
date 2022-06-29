//////////////////////////
// DISPLAY (falta agregar los fades)
//////////////////////////

// const canvasTxt = window.canvasTxt.default
// canvasTxt.align = 'left';
// canvasTxt.vAlign = 'top';

class Display {
    constructor(width, height, tileSize) {
        this.width = width;
        this.height = height;
        this.c = document.querySelector('canvas');
        this.ctx = this.c.getContext('2d');
        this.tileSize = tileSize;
        this.hitboxes = 0;
        // this.fade = {value: 0, mode: 'none', speed: 1};
        this.setScaleAndResize();
        this.pixelatedLook(this.ctx);
        window.addEventListener('resize', ()=>{
            this.setScaleAndResize();
            this.pixelatedLook(this.ctx);
            // Unnecesary Also deactivate for best performance
            this.render(stage.bg, game.objects, game.fade);
        });

        // Prevent scrolling with finger
		window.addEventListener('touchmove', e=>e.preventDefault(),{passive: false})
        // this.txt = '';
    }
    setScaleAndResize(forced, integer = false) {
        // Set scale
        if (integer) {
            this.scale = M.min(
                M.trunc(window.innerWidth / this.width),
                M.trunc(window.innerHeight / this.height));
        } else {
            // this.scale = window.innerHeight / this.height;
            this.scale = 2.5
        }
            
        // Unnecesary remove forced scaling
        if (forced) this.scale = forced;
        // Resize
        this.c.width = this.scale * this.width;
        this.c.height = this.scale * this.height;

        // this.tileTimesScaledCanvas = this.tileSize * this.scale;
    }
    render (bg, gameObjects, fade) {
        // To clear the canvas
        // this.ctx.clearRect(0, 0, this.c.width, this.c.height);

        // Render Background
        this.renderBackground(bg);

        if (fade.layer === 'top') {
            // Regular order
            this.renderGameObjects(gameObjects);
            this.renderFade(fade);
        } else {
            // Reverse order
            this.renderFade(fade);
            this.renderGameObjects(gameObjects);
        }
document.get
        // Hitboxes
        if (this.hitboxes) this.renderHitboxes(gameObjects);
    }
    renderBackground (bg) {
        // Only used if decompression of bigPattern is not activated
        // let currentTile;
        let i = 0;
        bg.rows.forEach((_, y) => {
            let destY = bg.rows[y] * this.scale;
            for (let x = 0; x < this.width; x += this.tileSize) {
                // Para no renderizar al pedo el row que queda out of bounds (arriba)
                if (bg.rows[y] <= -this.tileSize) {i++; continue;}
                // Update scanned tile if not undefined (void 0 === undefined but less characters lol)


                // Draw: Only used if decompression of bigPattern is not activated
                // if(bg.pattern[i] != void 0) currentTile = bg.pattern[i];
                // this.ctx.drawImage(bg.image,currentTile*8+(304*0),0,8,8,x*this.scale,p__destY,8*this.scale,8*this.scale);

                
                // Draw
                this.ctx.drawImage(bg.image,bg.pattern[i]*8+(176*bg.palette),0,8,8,x*this.scale,destY,8*this.scale,8*this.scale);
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
                this.ctx.globalAlpha = entity.opacity / 100;

                // Translate canvas to render position
                this.ctx.translate(entity.x * this.scale, entity.y * this.scale);

                // Rotate
                this.ctx.rotate(entity.rotation);


                if (entity instanceof Particle || entity instanceof EnemyBullet) {
                    this.ctx.fillStyle = entity.currentColor || '#fff';
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
                    entity.image.sWidth * entity.palette,
                    // Source y
                    entity.image.height * entity.hitState,
                    // Source width
                    entity.image.sWidth,
                    // Source height
                    entity.image.height,
                    // DestX (translate -50%), DestY (translate -50%), DestW, DestH
                    -(entity.image?.sWidth * entity.scale * this.scale) / 2, 
                    -(entity.image?.height * entity.scale * this.scale) / 2,
                    entity.image?.sWidth * entity.scale * this.scale,
                    entity.image?.height * entity.scale * this.scale
                );

                // Undo opacity, translation and rotation 
                this.ctx.restore();
            }
            })
        }
    }
    // initFade(mode, speed) {
    //     this.fade.mode = mode;
    //     this.fade.speed = speed;
    //     if (mode === 'fromBlack') this.fade.value = 100;
    //     if (mode === 'toBlack') this.fade.value = 0;
    // }
    // updateFade() {
    //     if (this.fade.mode === 'fromBlack') this.fade.value -= this.fade.speed;
    //     if (this.fade.mode === 'toBlack')   this.fade.value += this.fade.speed;
    //     if (this.fade.value === 0 || this.fade.value === 100) this.initFade('none', 0)
    // }
    renderFade (fade) {
        // Immediate return if opacity is outside range
        if (fade.opacity < 0 || fade.opacity > 100) return;

        this.ctx.globalAlpha = fade.opacity / 100; // 1.0 ~ 0.0
        this.ctx.fillStyle = fade.color;
        this.ctx.fillRect(0, 0, this.c.width, this.c.height);
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
    pixelatedLook(ctx) {
        // Used if scaling is done through JS
        ctx.mozImageSmoothingEnabled = 0;
        ctx.webkitImageSmoothingEnabled = 0;
        ctx.msImageSmoothingEnabled = 0;
        ctx.imageSmoothingEnabled = 0;
    }
};