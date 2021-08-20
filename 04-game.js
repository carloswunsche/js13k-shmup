         "use strict";
      //////////////////
    /////// GAME //////
  ////////////////////

// Game constructor
const Game = function(initW, initH) {

    this.objects = new Map(); // Create objects map
    this.objects.set('background',  []);
    this.objects.set('enemies',     []);
    this.objects.set('pBullets',    []);
    this.objects.set('player', [new Player(initW, initH)]); // Inserts player into map
    this.objects.set('eBullets',    []);
    this.objects.set('hud',         []);

    this.update = function() {};
}

// Player constructor
const Player = function(initW, initH) {

    this.x = initW / 2;
    this.y = initH / 2;
    this.spd = 2;
    this.diagMultp = 0;
    this.angle = 0;
    setSprite(this, 'ship-x32-optimized.png')

    // this.updatePos = function() {
    //     //Get diagonal multiplier
    //     const sumAxis = input.axis[0] + input.axis[1];
    //     Math.abs(sumAxis) === 2 ? this.diagMultp = 0.70710678118 : this.diagMultp = 1;
    //     //Update position
    //     this.x += input.axis[0] * this.spd * this.diagMultp * scale;
    //     this.y += input.axis[1] * this.spd * this.diagMultp * scale;
    //     //Fix position if leaves the play area
    //     if (this.x > canvas.walls[2]) this.x = canvas.walls[2];
    //     if (this.x < canvas.walls[0]) this.x = canvas.walls[0];
    //     if (this.y > canvas.walls[3]) this.y = canvas.walls[3];
    //     if (this.y < canvas.walls[1]) this.y = canvas.walls[1];
    // };
}

////////////////////////////////
// GENERAL PURPOSE FUNCTIONS //
////////////////////////////////

function setSprite(obj, png){
    obj.sprite = new Image();
    //PNG always needs to be scaled x32 + optimized.
    obj.sprite.src = png; 
    //Now scale it down to initial size
    obj.sprite.width  = obj.sprite.width / 32; 
    obj.sprite.height = obj.sprite.height / 32;
};

function toRadians(degrees){return degrees * Math.PI/180};