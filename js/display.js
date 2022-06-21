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

        // Scanlines
        // if (this.scanlines) this.renderScanlines(50);

        // Canvas-txt
        // if (this.txt.length > 0) {
        //     canvasTxt.fontSize = 14 * this.scale;
        //     canvasTxt.drawText(this.ctx, this.txt, 10, 0, this.width * this.scale, this.height * this.scale);
        // };
    }

    renderBackground (bg) {
        let i = 0;
        bg.rows.forEach((_, y) => {
            let p__destY = bg.rows[y] * this.scale;
            for (let x = 0; x < this.width; x += this.tileSize) {
                // Para no renderizar al pedo el row que queda out of bounds (arriba)
                if (bg.rows[y] <= -this.tileSize) {i++; continue;}
                // Update scanned tile if not undefined (void 0 === undefined)
                if(bg.pattern[i] != void 0) this.currentTile = bg.pattern[i];
                // Draw
                // this.drawBg(bg, x, p__destY);
                this.ctx.drawImage(bg.image,this.currentTile*8,0,8,8,x*this.scale,p__destY,8*this.scale,8*this.scale);
                // Update pattern index
                i++;
            };
        });
    }

    // Previous draw function
    // drawBg(bg, x, p__destY){
    //     // // Determine rotation state
    //     // typeof this.currentTile === 'string' ? this.r = 1 : this.r = 0;
    //     // // If rotation is on... get angle and more stuff
    //     // if (this.r) {
    //     //     let a;
    //     //     switch (this.currentTile.slice(-1)) {
    //     //         case 'a': a = 1.5708; break; // 90 degree
    //     //         case 'b': a = 3.1415; break; // 180 degree
    //     //         case 'c': a = 4.7123; break; // 270 degree
    //     //     }
    //     //     // Save context before rotating
    //     //     this.ctx.save();
    //     //     // Translate canvas to render position
    //     //     this.ctx.translate((x + (this.tileSize/2)) * this.scale, p__destY + ((this.tileSize/2) * this.scale));
    //     //     // Rotate
    //     //     this.ctx.rotate(a);
    //     // }

    //     this.ctx.drawImage(
    //         // Img
    //         bg.image,
    //         // Source X
    //         // (this.tileCode % bg.imageCols) * this.tileSize,
    //         // parseInt(this.currentTile) * this.tileSize,
    //         this.currentTile * this.tileSize,
    //         // Source Y
    //         // Math.floor((this.tileCode / bg.imageCols)) * this.tileSize,
    //         0,
    //         // Source Width
    //         this.tileSize,
    //         // Source Height
    //         this.tileSize,
    //         // Destination X
    //         // this.r ? (-this.tileSize/2) * this.scale : x * this.scale,
    //         x * this.scale,
    //         // Destination Y
    //         // this.r ? (-this.tileSize/2) * this.scale : p__destY,
    //         p__destY,
    //         // Destination Width
    //         this.p__tileTimesScaledCanvas,
    //         // Destination height
    //         this.p__tileTimesScaledCanvas 
    //     );

    //     // // If rotation was activated, restore context
    //     // if (this.r) this.ctx.restore();
    // }

    renderGameObjects (gameObjects) {
        for (const [_, arr] of gameObjects){
            arr.forEach(obj => {
                // Save canvas' context state
                this.ctx.save();

                // Unnecesary ?
                // Set object's opacity
                if (obj.opacity < 100) this.ctx.globalAlpha = obj.opacity / 100;

                // Translate canvas to render position
                this.ctx.translate(obj.x * this.scale, obj.y * this.scale);

                // Rotate
                if (obj.rotation) this.ctx.rotate(obj.rotation);
                // Draw
                this.ctx.drawImage(
                    // Img
                    obj.image,
                    // Source x
                    obj.image.sWidth * obj.hit,
                    // Source y
                    0,
                    // Source width
                    obj.image.sWidth,
                    // Source height
                    obj.image.height,
                    // Destination x (translate -50%)
                    -(obj.image.sWidth * this.scale) / 2,
                    // Destination y (translate -50%)
                    -(obj.image.height * this.scale) / 2,
                    // Destination width
                    obj.image.sWidth * this.scale,
                    // Destination height
                    obj.image.height * this.scale
                );

                // Undo opacity, translation and rotation 
                this.ctx.restore();
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

    // renderScanlines(intensity) {
    //     this.ctx.globalAlpha = intensity / 100;
    //     for (let y = 0; y < this.height; y++){
    //         this.ctx.fillRect(0, y * this.scale, this.canvas.width, 0.5 * this.scale);
    //     }
    //     this.ctx.globalAlpha = 1; // Canvas globalAlpha fix
    // }

    pixelatedLook() {
        // Used if scaling is done through JS
        this.ctx.mozImageSmoothingEnabled = 0;
        this.ctx.webkitImageSmoothingEnabled = 0;
        this.ctx.msImageSmoothingEnabled = 0;
        this.ctx.imageSmoothingEnabled = 0;
    }
};