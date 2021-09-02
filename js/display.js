         "use strict";
      //////////////////
    ///// DISPLAY /////
  ////////////////////

// Display constructor function
const Display = function(canvasID, initW, initH, integral) {
    this.render = function(gameObjects, bg) {

        // Clean canvas first
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background
        let bgArrIndex = 0; // Index of pattern array  
        for (let y=0; y<bg.rowsPos.length; y++) {
            for (let x=0;  x<initW;  x+=bg.tileSize) {
                let tile = bg.array[bgArrIndex];
                if(tile !== 0) {    // Check if tile is not transparent
                    tile -= 1;      // Adjust so sourceX and Y are calculated properly
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
        for (const [key, arr] of gameObjects){
            for (const [index, obj] of arr.entries()) {
                this.ctx.save();
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
    };


    this.resizeCanvas = function(initW, initH, integral) {
        if (integral){
            this.scale = Math.min(
                Math.trunc(window.innerWidth  / initW),
                Math.trunc(window.innerHeight / initH));
        } else {
            this.scale = Math.min(
                window.innerWidth / initW,
                window.innerHeight / initH);
        }
        this.canvas.width  = this.scale * initW;
        this.canvas.height = this.scale * initH;
    };

    this.setCanvas = function(canvasID, initW, initH) {
        this.canvas = document.getElementById(canvasID);
        this.ctx    = this.canvas.getContext('2d');
        this.canvas.width  = initW;
        this.canvas.height = initH;
        this.resizeCanvas(initW, initH, integral); // Call resizeCanvas
        // Use an arrow function when adding an event listener if you don't need it to have a this keyword
        window.addEventListener('resize', () => this.resizeCanvas(initW, initH, integral));
    };
    this.setCanvas(canvasID, initW, initH); // Call setCanvas on initialization
};