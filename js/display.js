//////////////////////////
// DISPLAY
//////////////////////////

class Display {
    constructor(width, height, scanlines = false, intensity) {
        this.width = width;
        this.height = height;
        this.canvas = this.setCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.scanlines = scanlines;
        this.intensity = intensity;
        this.fade = {value: 100, mode: 'none', amount: 1};

        // Resize canvas on init
        this.scale = this.setScale();  
        this.resizeCanvas(this.canvas, this.scale);
        window.addEventListener('resize', () => {
            this.scale = this.setScale();
            this.resizeCanvas(this.canvas, this.scale);
        });
    }

    setCanvas() {
        let canvas = document.querySelector('canvas');
        canvas.width  = this.width;
        canvas.height = this.height;
        return canvas;
    }

    setScale() {
        let scale;
        scale = Math.min(
            Math.trunc(window.innerWidth / this.width),
            Math.trunc(window.innerHeight / this.height));
        return scale;
    }

    resizeCanvas (canvas, scale) {
        canvas.width = scale * this.width;
        canvas.height = scale * this.height;
    }

    render (gameObjects, stage) {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render Background
        this.renderBackground(stage);

        // Render Game Objects
        this.renderGameObjects(gameObjects);

        // Fade
        if (this.fade.value > 0) this.renderFade();

        // Scanlines
        if (this.scanlines) this.renderScanlines(this.intensity);
    }

    renderBackground (stage) {
        let bgArrIndex = 0;
        for (let y = 0; y < stage.bg.rowsPos.length; y++) {
            for (let x = 0; x < this.width; x += stage.bg.tileSize) {
                let tile = stage.bg.array[bgArrIndex]; // This is just to simplify the code syntax
                if (tile > 0) { // Check if tile is not transparent
                    tile--; // Adjust so sourceX and Y are calculated properly
                    this.ctx.drawImage(
                        stage.bg.sprite,
                        (tile % stage.bg.spriteCols) * stage.bg.tileSize * stage.bg.pngScale,
                        Math.floor((tile / stage.bg.spriteCols)) * stage.bg.tileSize * stage.bg.pngScale,
                        stage.bg.tileSize * stage.bg.pngScale,
                        stage.bg.tileSize * stage.bg.pngScale,
                        x * this.scale,
                        Math.floor(stage.bg.rowsPos[y] * this.scale),
                        stage.bg.tileSize * this.scale,
                        stage.bg.tileSize * this.scale // destination height
                    );
                };
                bgArrIndex++;
            };
        };
    }

    renderGameObjects (gameObjects) {
        for (const arr of gameObjects.values()) {
            for (const obj of arr.values()) {
                // Save canvas' context state
                this.ctx.save();

                // Set object's opacity
                this.ctx.globalAlpha = obj.opacity / 100;

                // Translate canvas to render position
                this.ctx.translate(
                    obj.x * this.scale, 
                    obj.y * this.scale
                );

                // Rotate if obj angle !== 0
                if (obj.angle) this.ctx.rotate(toRadians(obj.angle));

                // Draw
                this.ctx.drawImage(
                    // Img
                    obj.sprite,
                    // Translate (-50%, -50%) before drawing
                    -(obj.sprite.width * this.scale) / 2,
                    -(obj.sprite.height * this.scale) / 2,
                    // Draw acording to img size * scaled
                    obj.sprite.width * this.scale,
                    obj.sprite.height * this.scale
                );

                // Undo opacity, translation and rotation 
                this.ctx.restore();
            };
        };
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
        if (this.fade.value === 0 || this.fade.value === 100) this.initFade('none', 1)
    }

    renderFade () {
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
};