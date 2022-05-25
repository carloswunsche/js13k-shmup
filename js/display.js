         "use strict";
      //////////////////
    ///// DISPLAY /////
  ////////////////////

// Display constructor function
const Display = function(canvasID, initW, initH, integer) {
    this.render = function(gameObjects, bg) {
        // Clean canvas first
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background
        let bgArrIndex = 0; // Index of pattern array always starts at zero
        let tile;
        for (let y=0; y<bg.rowsPos.length; y++) {
            for (let x=0;  x<initW;  x+=bg.tileSize) {
                tile = bg.array[bgArrIndex]; // This is just to simplify the code syntax
                if(tile > 0) {    // Check if tile is not transparent
                    tile --;      // Adjust so sourceX and Y are calculated properly
                    this.ctx.drawImage(
                        bg.sprite, // Image
                        (tile % bg.spriteCols) * bg.tileSize * bg.pngScale,            // sourceX
                        Math.floor((tile / bg.spriteCols)) * bg.tileSize * bg.pngScale,// sourceY
                        bg.tileSize * bg.pngScale,              // Clipped width
                        bg.tileSize * bg.pngScale,              // Clipped height
                        x * this.scale,                         // X placement
                        Math.floor(bg.rowsPos[y] * this.scale), // Y placement
                        bg.tileSize * this.scale,               // destination width
                        bg.tileSize * this.scale                // destination height
                    );
                };
                bgArrIndex ++;
            };
        };

        // Draw gameObjects
        for (const arr of gameObjects.values()){
            for (const obj of arr.values()) {
                this.ctx.save();
                this.ctx.globalAlpha = obj.opacity / 100;
                this.ctx.translate(obj.x * this.scale, obj.y * this.scale);
                this.ctx.rotate(toRadians(obj.angle));
                this.ctx.drawImage(
                    obj.sprite,
                    Math.round(-(obj.sprite.width  * this.scale) / 2),
                    Math.round(-(obj.sprite.height * this.scale) / 2),
                    obj.sprite.width  * this.scale, 
                    obj.sprite.height * this.scale
                );
                this.ctx.restore();
            };
        };

        // Fade from black
        if (bg.blackFadeOpacity >= 0) {
            this.ctx.globalAlpha = bg.blackFadeOpacity / 100; // 1.0 ~ 0.0
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.globalAlpha = 1; // Canvas globalAlpha fix
        };
    };

    this.resizeCanvas = function(initW, initH) {
        this.scale = Math.min(
            Math.trunc(window.innerWidth  / initW),
            Math.trunc(window.innerHeight / initH));
        this.canvas.width  = this.scale * initW;
        this.canvas.height = this.scale * initH;
    };

    this.setCanvas = function(canvasID, initW, initH) {
        this.canvas = document.getElementById(canvasID);
        this.ctx    = this.canvas.getContext('2d');
        this.canvas.width  = initW;
        this.canvas.height = initH;
        this.resizeCanvas(initW, initH); // Call resizeCanvas

        // Call anonimous function so the this keyword scopes the constructor function
        window.addEventListener('resize', () => this.resizeCanvas(initW, initH));
    };

    this.setCanvas(canvasID, initW, initH); // Call setCanvas on initialization
};