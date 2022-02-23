         "use strict";
      //////////////////
    /////// GAME //////
  ////////////////////

// Game constructor
const Game = function(initW, initH, rawInput, gfx) {

    this.frame = 0;

    this.level1 = { // this could also be a Map?
        png:        'spritesheet.png',
        pattern_01: [3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1],
        pattern_02: [3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 2, 3, 4, 5, 5, 6, 1, 2, 1, 2, 1, 3, 2, 3, 2, 2, 2, 2, 3, 4, 5, 5, 6, 1, 1, 2, 1, 3, 2, 3, 2, 2, 2, 2, 2, 3, 4, 5, 5, 6, 1, 2, 1, 3, 2, 3, 2, 2, 2, 2, 3, 4, 5, 5, 6, 1, 1, 2, 1, 3, 2, 3, 2, 2, 2, 3, 4, 5, 5, 6, 1, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1, 3, 2, 3, 2, 3, 4, 5, 5, 6, 1, 2, 2, 2, 1, 2, 1, 3, 2, 3, 3, 4, 5, 5, 6, 1, 2, 2, 2, 2, 1, 2, 1, 3, 2, 3, 4, 5, 5, 6, 1, 2, 2, 2, 2, 2, 1, 2, 1, 3, 2, 3, 3, 4, 5, 5, 6, 1, 2, 2, 2, 2, 1, 2, 1, 3, 2, 3, 2, 3, 4, 5, 5, 6, 1, 2, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1],
        pattern_03: [3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 1, 3, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 1, 1, 3, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 1, 1, 3, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 1, 2, 1, 3, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 1, 2, 1, 3, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 1, 2, 1, 3, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 1, 2, 1, 3, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 1, 2, 1, 3, 2, 3, 2, 4, 5, 5, 5, 5, 5, 5, 6, 2, 1, 2, 1, 3, 2, 3, 2, 4, 5, 5, 5, 5, 5, 5, 6, 2, 1, 2, 1, 3, 2, 3, 2, 2, 4, 5, 5, 5, 5, 6, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 4, 5, 5, 5, 5, 6, 2, 2, 1, 2, 1, 3, 2, 3, 2, 2, 3, 4, 5, 5, 6, 1, 2, 2, 1, 2, 1],
        pattern_04: [4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6],
        /// ETC...
    };

    this.bg = {
        array: [...this.level1.pattern_01],
        queue: [],
        rowsPos: [-10,0,10,20,30,40,50,60,70,80,90,100,110],
        canChange: false,
        speed: 1,
        spriteCols: 3,
        tileSize: 10,
        pngScale: 32,
        blackFadeOpacity: 100,
        sprite: gfx.bg.image
    };

    this.objects = new Map();
    // Important! Order in which objects should be drawn on screen:
    this.objects.set('enemies',     [])
                .set('pBullets',    [])
                .set('player',      [new Player(initW, initH, gfx)])
                .set('eBullets',    [])
                .set('hud',         []);

    this.inputEnabled = true;
    this.gameInput = new Array(6); // Btn1, Btn2, left,right,up,down 
    this.toGameInput = function(rawInput) {
        for (const i in rawInput) {        // Write state (1, 2, or 0)
            if(rawInput[i] && this.gameInput[i] < 2) this.gameInput[i]++;
            if(!rawInput[i]) this.gameInput[i] = 0;
        };
    };

    this.update = function() {
        // Convert rawInput to gameInput first
        if (this.inputEnabled) this.toGameInput(rawInput);

        // Black fade opacity
        if (this.frame > 1 && this.bg.blackFadeOpacity >= 0) this.bg.blackFadeOpacity -= 1;

        // Delete game objects if destroy===true
        for (const [key, arr] of this.objects) {
            for (let i=0; i < arr.length; i++) {
                if (arr[i].destroy === true) {
                    arr.splice(i, 1);
                    i--;
                };
            };
        };

        // Level events
        if (this.frame === 120)  console.log(gfx);
        if (this.frame === 120)  this.bg.queue = [...this.bg.queue,...this.level1.pattern_02];
        if (this.frame === 500)  this.bg.queue = [...this.bg.queue,...this.level1.pattern_03,...this.level1.pattern_04];
        if (this.frame === 2000) this.bg.queue = [...this.bg.queue,...this.level1.pattern_01];
        if (this.frame === 50) this.objects.get('enemies').push(new Enemy(initW, initH, gfx));

        // Update Frame Counter
        this.frame++;

        // Background: Scrolling and changing pattern of array
        for (let i=0; i < this.bg.rowsPos.length; i++) {
            this.bg.rowsPos[i] += this.bg.speed; // Add bg.speed to row Y position
            if (this.bg.rowsPos[i] >= initH) {      // If Y position is more than canvas height...
                this.bg.rowsPos[i] -= initH + 10;   // ... Set Y position to top of canvas.
                if (i === this.bg.rowsPos.length-1 && this.bg.queue.length >= 208) this.bg.canChange = true; // If last row of the pattern AND bg.queue is full, activate canChange flag
                // If canChange is true... change each tile of that row for the next pattern one
                if (this.bg.canChange) {
                    for (let x=0; x<16; x++) {
                        this.bg.array[x + (i*16)] = this.bg.queue[x + (i*16)];
                    };
                    if (i === 0) {
                        this.bg.canChange = false; // And if this was the first row of the pattern, deactivate canChange flag after updating it
                        this.bg.queue.splice(0, 16*13); // Also delete 1 full pattern from queue
                        // console.log('Game.js: Pattern change inside bg.array done');
                    };
                };
            };
        };

        // Run updatePos and updateData on all objects
        for (const [key, arr] of this.objects){
            for (const [i, obj] of arr.entries()) {
                obj.updatePos(this.gameInput);
                obj.updateData();
            };
        };

        // Collisions early test
        if (this.objects.get('enemies').length > 0 && this.objects.get('pBullets').length > 0) { // Si hay pBullets y enemies
            for (const [i, pBullet] of this.objects.get('pBullets').entries()){
                for (const [i, enemy] of this.objects.get('enemies').entries()){
                    if (pBullet.x1Hitbox < enemy.x2Hitbox && 
                        enemy.x1Hitbox < pBullet.x2Hitbox &&
                        pBullet.y1Hitbox < enemy.y2Hitbox && 
                        enemy.y1Hitbox < pBullet.y2Hitbox) {
                        pBullet.destroy = true;
                        enemy.life--;
                    };
                };
            };
        };

        // Player shot 1: if Btn1 is pressed then tell player to shot
        if (this.gameInput[0] > 0) this.objects.get('player')[0].shot1(this.objects);

        // Scrolling speed tester
        if (rawInput[7] === true) {this.bg.speed += 0.25; rawInput[7] = false; console.log(this.bg.speed);}
        if (rawInput[6] === true) {this.bg.speed -= 0.25; rawInput[6] = false; console.log(this.bg.speed);}
    };
};


// Player constructor
const Player = function(initW, initH, gfx) {
    this.sprite = gfx.player.image;
    this.width = gfx.player.image.width;
    this.height = gfx.player.image.height;
    this.x = initW / 2;
    this.y = initH / 2;
    this.axis = [0,0];
    this.diagMultp = 1;
    this.spd = 2;
    this.angle = 0;
    this.opacity = 100;
    this.shotBufferInit = 4;
    this.shotBuffer = 0;
    this.destroy = false;
    this.updateHitbox = function() {
        this.x1Hitbox = this.x - this.width/2;
        this.x2Hitbox = this.x + this.width/2;
        this.y1Hitbox = this.y - this.height/2;
        this.y2Hitbox = this.y + this.height/2;
    };

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
        this.updateHitbox();
    };

    this.updateData = function() {

    };

    this.shot1 = function(gameObjects) {
        if (this.shotBuffer === 0) {
            gameObjects.get('pBullets').push(new pBullet(this.x, this.y, gfx, -1));
            gameObjects.get('pBullets').push(new pBullet(this.x, this.y, gfx,  1)); 
            this.shotBuffer = this.shotBufferInit;
        };
        if (this.shotBuffer > 0) this.shotBuffer --;
    };

    this.updateHitbox();
};

// Bullet constructor
const pBullet = function(initW, initH, gfx, side) {
    this.sprite = gfx.pBullet.image;
    this.width = gfx.pBullet.image.width;
    this.height = gfx.pBullet.image.height;
    this.x = initW - 4 * side;
    this.y = initH - 6;
    this.spd = 5;
    this.angle = 0;
    this.opacity = 100;
    this.destroy = false;
    this.updateHitbox = function() {
        this.x1Hitbox = this.x - this.width/2;
        this.x2Hitbox = this.x + this.width/2;
        this.y1Hitbox = this.y - this.height/2;
        this.y2Hitbox = this.y + this.height/2;
    };

    this.updatePos = function() {
        this.y = this.y - 1 * this.spd;
        this.updateHitbox();
    };

    this.updateData = function() {
        // Destroy = true if out of the screen
        if (this.y < 0) this.destroy = true;
    };

    this.updateHitbox();
};

// Enemy constructor
const Enemy = function(initW, initH, gfx) {
    this.sprite = gfx.enemy.image;
    this.width = gfx.enemy.image.width;
    this.height = gfx.enemy.image.height;
    this.x = initW / 2;
    this.y = -this.height/2;
    this.spd = 0.2;
    this.angle = 0;
    this.opacity = 100;
    this.life = 5;
    this.destroy = false;
    this.updateHitbox = function() {
        this.x1Hitbox = this.x - this.width/2;
        this.x2Hitbox = this.x + this.width/2;
        this.y1Hitbox = this.y - this.height/2;
        this.y2Hitbox = this.y + this.height/2;
    };

    this.updatePos = function() {
        this.y = this.y + 1 * this.spd;
        this.updateHitbox();
    };

    this.updateData = function() {
        // destroy=true if out of the screen
        if (this.y > initH+this.height/2) this.destroy = true;
        // destroy = true if life <= 0
        if (this.life <= 0) this.destroy = true;
    };

    this.updateHitbox();
};
