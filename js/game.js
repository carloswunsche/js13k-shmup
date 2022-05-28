//////////////////////////
// GAME
//////////////////////////

class Game {
    constructor(initW, initH, assets, fns) {
        this.frame = 0;
        this.stage = new Stage(1, assets);
        this.objects = new Map()
        .set('enemies', [])
        .set('pBullets', [])
        .set('player', [new Player(initW, initH, assets)])
        .set('eBullets', [])
        .set('hud', []);

        this.update = function () {
            fns.rawToGame();
            fns.updateFade();

            // Delete game objects if destroy===true
            for (const [key, arr] of this.objects) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].destroy === true) {
                        arr.splice(i, 1);
                        i--;
                    };
                };
            };

            // Level events
            if (this.frame === 0) 
                fns.initFade('fromBlack', 1);
            // if (this.frame === 120)
            //     this.stage.bg.queue = [...this.stage.bg.queue, ...this.stage.pattern2];
            // if (this.frame === 500)
            //     this.stage.bg.queue = [...this.stage.bg.queue, ...this.stage.pattern3, ...this.stage.pattern4];
            // if (this.frame === 2000)
            //     this.stage.bg.queue = [...this.stage.bg.queue, ...this.stage.pattern1];
            // if (this.frame === 50) this.objects.get('enemies').push(new Enemy(initW, initH, assets));
            
            // Update Frame Counter
            this.frame++;

            // Background: Scrolling and changing pattern of array
            for (let i = 0; i < this.stage.bg.rowsPos.length; i++) {
                this.stage.bg.rowsPos[i] += this.stage.bg.speed; // Add bg.speed to row Y position
                if (this.stage.bg.rowsPos[i] >= initH) { // If Y position is more than canvas height...
                    this.stage.bg.rowsPos[i] -= initH + this.stage.bg.tileSize; // ... Set Y position to top of canvas.
                    if (i === this.stage.bg.rowsPos.length - 1 && this.stage.bg.queue.length >= 208)
                        this.stage.bg.canChange = true; // If last row of the pattern AND bg.queue is full, activate canChange flag

                    // If canChange is true... change each tile of that row for the next pattern one
                    if (this.stage.bg.canChange) {
                        for (let x = 0; x < 16; x++) {
                            this.stage.bg.array[x + (i * 16)] = this.stage.bg.queue[x + (i * 16)];
                        };
                        if (i === 0) {
                            this.stage.bg.canChange = false; // And if this was the first row of the pattern, deactivate canChange flag after updating it
                            this.stage.bg.queue.splice(0, 16 * 13); // Also delete 1 full pattern from queue

                            // console.log('Game.js: Pattern change inside bg.array done');
                        };
                    };
                };
            };

            // Run updatePos and updateData on all objects
            for (const [key, arr] of this.objects) {
                for (const [i, obj] of arr.entries()) {
                    obj.updatePos(input.game);
                    // obj.updateData();
                };
            };

            // Collisions early test
            if (this.objects.get('enemies').length > 0 && this.objects.get('pBullets').length > 0) { // Si hay pBullets y enemies
                for (const [i, pBullet] of this.objects.get('pBullets').entries()) {
                    for (const [i, enemy] of this.objects.get('enemies').entries()) {
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
            if (input.game[0] > 0) this.objects.get('player')[0].shot1(this.objects);
        };
    }
}

// Player constructor
const Player = function(initW, initH, assets) {
    this.sprite = assets.player;
    this.width = assets.player.width;
    this.height = assets.player.height;
    this.x = initW / 2;
    this.y = initH / 2;
    this.axis = [0,0];
    this.diagMultp = 1;
    this.spd = 2.8;
    this.angle = 0;
    this.opacity = 100;
    this.shotBufferInit = 4;
    this.shotBuffer = 0;
    this.destroy = false;
    this.xDecimal = 0;
    this.yDecimal = 0;
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
            if (gameInput[i] && gameInput[4] || gameInput[i] && gameInput[5]) {
                this.diagMultp = 0.707;
            };
        };
    };

    this.updatePos = function(gameInput) {
        this.setAxis(gameInput);
        this.setDiag(gameInput);
        this.x = this.x + this.axis[0] * this.spd * this.diagMultp;
        this.y = this.y + this.axis[1] * this.spd * this.diagMultp;
        this.accountFloats();
        // this.updateHitbox();
        // Ya que esto se corre siempre , aprovechar para esto tmb:
        if (this.shotBuffer > 0) this.shotBuffer --;
    };

    this.accountFloats = function() {
        this.x += this.xDecimal;
        this.y += this.yDecimal;
        this.xDecimal = getDecimal(this.x);
        this.yDecimal = getDecimal(this.y);
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
    }

    this.shot1 = function(gameObjects) {
        if (this.shotBuffer === 0) {
            gameObjects.get('pBullets').push(new pBullet(this.x, this.y, assets, 9));
            gameObjects.get('pBullets').push(new pBullet(this.x, this.y, assets, -8)); 
            this.shotBuffer = this.shotBufferInit;
        };


    };
};

// Bullet constructor
const pBullet = function(initW, initH, assets, side) {
    this.sprite = assets.pBullet;
    this.width = assets.pBullet.width;
    this.height = assets.pBullet.height;
    this.x = initW + side;
    this.y = initH - 12;
    this.spd = 12;
    this.angle = 0;
    this.opacity = 100;
    this.destroy = false;

    this.updatePos = function() {
        this.y = this.y - 1 * this.spd;
        // this.updateHitbox();
    };

    this.updateData = function() {
        // Destroy = true if out of the screen
        if (this.y < 0) this.destroy = true;
    };
};

// Enemy constructor
const Enemy = function(initW, initH, assets) {
    this.sprite = assets.enemy.image;
    this.width = assets.enemy.image.width;
    this.height = assets.enemy.image.height;
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
