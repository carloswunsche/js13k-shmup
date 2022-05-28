         "use strict";
      //////////////////////
    /////// GRAPHICS //////
  ////////////////////////

// // Graphics constructor
const Gfx = function() {
  // Source PNGs always need to be scaled by x32 + optimized using https://tinypng.com/
this.scaleFactor = 32;
  this.imgDir = 'img/';
  this.associations = {
    bg:     "bg.png",
    player:   "player.png",
    pBullet: "pBullet.png",
    enemy: "enemy.png",
  };

  this.setImage = function(obj, png, scale = true, scaleValue = 16){
    obj.image = document.createElement('img'); // same as new Image()
    // Source PNG always needs to be scaled by x32 + optimized using online PNG Optimizer!
    obj.image.src = png;
    if (scale) {
        //Scale it down to initial size (Only when it finishes loading png)
        obj.image.addEventListener('load', function() {
            obj.image.width  = obj.image.width / scaleValue; 
            obj.image.height = obj.image.height / scaleValue;
            removeEventListener('load', obj.image);
        });
    };
  };

  // Loop to create properties that will store the graphics
  for (const [key, value] of Object.entries(this.associations)) {
    this[key] = {}; // new properties must be objects
    this.setImage(this[key], this.imgDir+value); // set the image into each object
  };
};