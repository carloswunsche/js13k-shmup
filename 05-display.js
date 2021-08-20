         "use strict";
      //////////////////
    ///// DISPLAY /////
  ////////////////////

// Display constructor function
const Display = function(canvasID, initW, initH, integral) {
    
    this.render = function(gameObjects) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        //Loop over each object to draw it
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
                )
                this.ctx.restore();
                // obj.angle += 5;
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
        window.addEventListener('resize', this.resizeCanvas.bind(this, initW, initH, integral));
    };
    this.setCanvas(canvasID, initW, initH); // Call setCanvas automatically
};