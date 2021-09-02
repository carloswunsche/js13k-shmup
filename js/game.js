         "use strict";
      //////////////////
    /////// GAME //////
  ////////////////////

// Game constructor
const Game = function(initW, initH, rawInput) {

    this.frame = 0;

    this.level1 = { // this could also be a Map?
        png:      'spritesheet.png',
        pattern_01: [3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1],
        pattern_02: [4, 5, 5, 5, 5, 5, 6, 4, 6, 4, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 6, 4, 6, 4, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 6, 4, 6, 4, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 6, 4, 6, 4, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 6, 4, 6, 4, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 6, 4, 6, 4, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 6, 4, 6, 4, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 6, 4, 6, 4, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 6, 4, 6, 4, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 6, 4, 6, 4, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 6, 4, 6, 4, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 6, 4, 6, 4, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 6, 4, 6, 4, 5, 5, 5, 5, 5, 6],
        /// ETC...
    };

    this.bg = {
        array: [...this.level1.pattern_01],
        rowsPos: [-10,0,10,20,30,40,50,60,70,80,90,100,110],
        speed: 1,
        sprite: undefined,
        spriteCols: 3,
        tileSize: 10,
        pngScale: 32,
        canChange: false,
    }
    setSprite(this.bg, 'img/'+this.level1.png , false);


    this.objects = new Map();
    // Important! Order in which objects should be drawn on screen:
    this.objects.set('enemies',     [])
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
        // Update Frame Counter
        this.frame++;

        // Background: Scroll each row
        for (let i=0; i < this.bg.rowsPos.length; i++) {
            this.bg.rowsPos[i] += this.bg.speed; // Add bg.speed to row Y position
            if (this.bg.rowsPos[i] >= initH) {      // If Y position is more than canvas height...
                this.bg.rowsPos[i] -= initH + 10;   // ... Set Y position to top of canvas.
                if (i === this.bg.rowsPos.length-1) this.bg.canChange = true; // If last row of the pattern, activate canChange flag
                // If canChange is true... change each tile of that row for the next pattern one
                if (this.bg.canChange) {
                    for (let x=0; x<16; x++) {
                        this.bg.array[x + (i*16)] = this.level1.pattern_02[x + (i*16)];
                    };
                    if (i === 0) this.bg.canChange = false; // And if this was the first row of the pattern, deactivate canChange flag after updating
                };
            };
        };    

        // Convert rawInput to gameInput
        this.toGameInput(rawInput);
        // Player position
        this.objects.get('player')[0].updatePos(this.gameInput);
        //Scrolling speed debugger
        if (rawInput[7] === true) {this.bg.speed += 0.25; rawInput[7] = false; console.log(this.bg.speed);}
        if (rawInput[6] === true) {this.bg.speed -= 0.25; rawInput[6] = false; console.log(this.bg.speed);}
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
    setSprite(this, 'img/ship-x32-optimized.png', true);

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

function setSprite(obj, png, scale = false, scaleValue = 32){
    obj.sprite = document.createElement('img'); // same as new Image()
    //PNG always needs to be scaled x32 + optimized.
    obj.sprite.src = png;
    if (scale) {
        //Scale it down to initial size (Only when it finishes loading png)
        obj.sprite.addEventListener('load', function() {
            obj.sprite.width  = obj.sprite.width / scaleValue; 
            obj.sprite.height = obj.sprite.height / scaleValue;
            removeEventListener('load', obj.sprite);
        });
    }
};

function toRadians(degrees){return degrees * Math.PI/180};