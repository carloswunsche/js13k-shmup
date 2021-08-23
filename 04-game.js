         "use strict";
      //////////////////
    /////// GAME //////
  ////////////////////

// Game constructor
const Game = function(initW, initH, rawInput) {
    // this.spritesheet = document.querySelector('img');
    this.objects = new Map();
    // Order in which objects should be drawn on screen
    this.objects.set('background',  [])
                .set('enemies',     [])
                .set('pBullets',    [])
                .set('player', [new Player(initW, initH)])
                .set('eBullets',    [])
                .set('hud',         []);

    this.gameInput = new Array(6); // Btn1, Btn2, left,right,up,down
    
    this.toGameInput = function(rawInput) {
        for (const i in rawInput) {        // Write state (1, 2, or 0)
            if(rawInput[i] && this.gameInput[i] < 2) this.gameInput[i]++;
            if(!rawInput[i]) this.gameInput[i] = 0;
        };
    };

    this.update = function() {
        this.toGameInput(rawInput); // Convert rawInput to gameInput
        this.objects.get('player')[0].updatePos(this.gameInput) // Player position
    };
};


// Player constructor
const Player = function(initW, initH) {

    this.x = initW / 2;
    this.y = initH / 2;
    this.axis = [0,0];
    this.diagMultp = 1;
    this.spd = 2;
    this.angle = 0;
    this.column = 1;
    setSprite(this, 'ship-x32-optimized.png', 1);

    this.setAxis = function(gameInput) {
        this.axis = [0,0];
        // X axis
        if (gameInput[2]) this.axis[0] = -1;
        if (gameInput[3]) this.axis[0] =  1;
        if (gameInput[2] && gameInput[3]) this.axis[0] = 0;
        // Y axis
        if (gameInput[4]) this.axis[1] = -1;
        if (gameInput[5]) this.axis[1] =  1;
        if (gameInput[4] && gameInput[5]) this.axis[1] = 0;
    };

    this.setDiag = function(gameInput) {
        this.diagMultp = 1;
        for (let i=2; i<4; i++) { //Solo evalua gameInput[2 y 3]
            if (gameInput[i] && gameInput[4] || gameInput[i] && gameInput[5])
            {this.diagMultp = 0.70710678118; return;};
        };
    };

    this.updatePos = function(gameInput) {
        this.setAxis(gameInput);
        this.setDiag(gameInput);
        this.x = this.x + this.axis[0] * this.spd * this.diagMultp;
        this.y = this.y + this.axis[1] * this.spd * this.diagMultp;
    };
};

////////////////////////////////
// GENERAL PURPOSE FUNCTIONS //
////////////////////////////////

function setSprite(obj, png, column){
    // obj.sprite = document.createElement('img'); // same as new Image()
    obj.sprite = document.createElement('img'); // same as new Image()
    //PNG always needs to be scaled x32 + optimized.
    obj.sprite.src = png;
    //Now scale it down to initial size (Only when it finishes loading png)
    obj.sprite.addEventListener('load', function() {
        obj.sprite.width  = obj.sprite.width / 32; 
        obj.sprite.height = obj.sprite.height / 32;
        removeEventListener('load', obj.sprite);
    });
};

function toRadians(degrees){return degrees * Math.PI/180};