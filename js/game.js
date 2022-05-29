//////////////////////////
// GAME
//////////////////////////

class Game {
    constructor(initW, initH, assets, fns) {
        this.frame = 0;
        this.stage = new Stage(1, assets, initW, initH);
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
            if (this.frame === 100)
                this.stage.bg.queue.push(...this.stage.pattern2);
            if (this.frame === 300)
                this.stage.bg.queue.push(...this.stage.pattern1, ...this.stage.pattern2);
            if (this.frame === 1000)
                this.stage.bg.queue.push(...this.stage.pattern1);
            // if (this.frame === 50) this.objects.get('enemies').push(new Enemy(initW, initH, assets));
            

            // Update Frame Counter
            this.frame++;


            // Background scrolling
            this.stage.bg.rows.forEach((_,i) => {
                // Move by applying background speed to current row position
                this.stage.bg.rows[i] += this.stage.bg.speed;

                // If row position is greater than display height
                if (this.stage.bg.rows[i] >= initH) { 
                    // Move to the top
                    this.stage.bg.rows[i] -= initH + this.stage.bg.tileSize;

                    // If i === last row AND if queue is full, activate changePattern flag
                    // changePattern will remain true until all rows has been replaced in array
                    if (i === this.stage.bg.rows.length-1 && this.stage.bg.queue.length >= this.stage.bg.tileQty) {
                        this.stage.bg.changePattern = true;
                    }

                    // If changePattern is true, change each next row for next pattern's row
                    if (this.stage.bg.changePattern) {
                        for (let tile = 0; tile < this.stage.bg.numCols; tile++) {
                            this.stage.bg.array[tile + (i * this.stage.bg.numCols)] = this.stage.bg.queue[tile + (i * this.stage.bg.numCols)];
                        };
                    };

                    // If changePattern is true but i === 0, deactivate changePattern flag
                    if (this.stage.bg.changePattern && i === 0) {
                        this.stage.bg.changePattern = false;
                        // Also delete 1 full pattern from queue
                        this.stage.bg.queue.splice(0, this.stage.bg.numCols * this.stage.bg.rows.length);
                    };
                };
            });


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
