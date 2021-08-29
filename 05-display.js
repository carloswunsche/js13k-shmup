         "use strict";
      //////////////////
    ///// DISPLAY /////
  ////////////////////

// Display constructor function
const Display = function(canvasID, initW, initH, integral) {

    this.render = function(gameObjects, level1) {
        // Clean canvas first
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background
        const bgCols = 3;    // Columns in the spritesheet image file
        const tileSize = 10; // Initial tile size
        const sourceScale = 32;
        let bgIndex = 0;     // Index of pattern array
        for (let y=0;  y<initH;  y+=tileSize) {
            for (let x=0;  x<initW;  x+=tileSize) {
                let tile = level1.pattern[bgIndex];
                if(tile !== 0) {    // Check if tile is not transparent
                    tile -= 1;      // Adjust so sourceX and Y are calculated properly
                    this.ctx.drawImage(
                        level1.sprite,              // Image
                        (tile % bgCols) * tileSize * sourceScale,            // sourceX
                        Math.floor((tile / bgCols)) * tileSize * sourceScale,// sourceY
                        tileSize * sourceScale,     // Clipped width
                        tileSize * sourceScale,     // Clipped height
                        x * this.scale,             // X placement
                        (y * this.scale) + (level1.y * level1.spd * this.scale), // Y placement
                        tileSize * this.scale,      // destination width
                        tileSize * this.scale       // destination height
                    );
                }
                bgIndex ++;
            }
        }






        //Loop over gameObjects to draw each "object"
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
    this.setCanvas(canvasID, initW, initH); // Call setCanvas automatically
};