//////////////////////////
// GAME
//////////////////////////

class Game {
    constructor(assets, call) {
        this.setup = function (stageNum = 1) {
            this.frame = 0;
            this.stage = new Stage(assets, stageNum, call);
            this.objects = {
                enemies: [],
                pBullets: [],
                player: [new Player(assets.player, call.input.game)],
                eBullets: [],
                hud: [],
            };
        };
        
        this.update = function () {
            // Input: Convert raw inputs to game input
            call.input.rawToGame();

            // Current level events
            this.stage.events()

            // Update Frame Counter
            this.frame++;

            // Scroll background: account for decimals
            this.stage.bg.speedAcc += getDecimal(this.stage.bg.speed);
            this.stage.bg.speedInt = Math.floor(this.stage.bg.speed)
            this.stage.bg.speedDecimal = Math.floor(this.stage.bg.speedAcc);
            // Reset accumulator once it reaches integer state
            if (this.stage.bg.speedAcc >= 1)
            this.stage.bg.speedAcc = getDecimal(this.stage.bg.speedAcc);

            // Scroll background: move each row, wrap around and change pattern
            this.stage.bg.rows.forEach((_,i) => {
                // Add speed
                this.stage.bg.rows[i] += this.stage.bg.speedInt + this.stage.bg.speedDecimal;

                // If row position is greater than display height
                if (this.stage.bg.rows[i] >= display.height) { 
                    // Move to the top
                    this.stage.bg.rows[i] -= display.height + this.stage.bg.tileSize;

                    // If i === last row AND if queue is full, activate changePattern flag
                    // changePattern will remain true until all rows has been replaced in array
                    if (i === this.stage.bg.rows.length-1 && this.stage.bg.queue.length >= this.stage.bg.tileQty) {
                        this.stage.bg.changePattern = true;
                    }

                    // If changePattern is true, change each next row for next pattern's row
                    if (this.stage.bg.changePattern) {
                        for (let tile = 0; tile < this.stage.bg.numCols; tile++) {
                            this.stage.bg.pattern[tile + (i * this.stage.bg.numCols)] = this.stage.bg.queue[tile + (i * this.stage.bg.numCols)];
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


            // Entities update function
            loopOver(this.objects, (_, arr) => {
                arr.forEach(obj => {
                    // If player, pass movement data
                    if (obj instanceof Player) {
                        obj.update(call.input.playerInputData());
                    } else obj.update();
                });
            });

            // Shot
            if (call.input.get('game')[4] > 0) this.objects.player[0].shot(this.objects);

            // Collisions early test. Ejecutar solo si hay enemigos y pBullets en pantalla
            if (this.objects.enemies.length > 0 && this.objects.pBullets.length > 0) {
                // Loopear sobre los bullets y luego sobre los enemies
                this.objects.pBullets.forEach(pBullet => {
                    this.objects.enemies.forEach(enemy => {
                        // IF necesario sino un bullet puede atacar a varios enemies que estan overlapping
                        if (pBullet.hp > 0) { 
                            // Evaluar colision
                            if (pBullet.hitbox[0] < enemy.hitbox[1] &&
                                enemy.hitbox[0] < pBullet.hitbox[1] &&
                                pBullet.hitbox[2] < enemy.hitbox[3] &&
                                enemy.hitbox[2] < pBullet.hitbox[3]) {
                                // pBullet se marca para eliminar y al enemy le baja el hp
                                pBullet.hp = 0;
                                enemy.hp--;
                            };
                        };
                    });
                });
            };

            // Delete objects if hp === 0
            loopOver(this.objects, (_, arr) => {
                // Don't use forEach in this one
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].hp <= 0) {
                        arr.splice(i, 1);
                        i--;
                    };
                };
            });

            // Update fade transparency
            call.display.updateFade();
        };
    }
}


class Entity {
    constructor(image){
        this.image = image;
        this.width = image.width;
        this.height = image.height;
        this.xDecimal = 0;
        this.yDecimal = 0;
    }
    update (options) {
        if (this instanceof Player) {
            this.changeInputIfBoundary(options)
            this.setVectorAmplitude(options)
        };

        this.updateData();
        this.updatePos(options);
        this.roundPos();
        this.hitbox = this.setHitbox();

        if (this instanceof Player) {
            this.fixBoundaries();
            this.hitbox = this.setHitbox();
        };
    }
    setHitbox (xMargin = 2, yMargin = 2, xOffset = 0, yOffset = 0) {
        if (!this.hitbox) {
            this.xMargin = xMargin;
            this.yMargin = yMargin;
            this.xOffset = xOffset;
            this.yOffset = yOffset;
        };
        return [
            this.x - this.xMargin + this.xOffset,  //x1
            this.x + this.xMargin + this.xOffset,  //x2
            this.y - this.yMargin + this.yOffset,  //y1
            this.y + this.yMargin + this.yOffset,  //y2
        ];
    }
    roundPos () { // Esto esta TOTALMENTE MAL Xd hay q hacerlo como lo hice en el background
        if (!this.roundPosX) {
            this.x += this.xDecimal;
            this.xDecimal = getDecimal(this.x);
            this.x = Math.floor(this.x);
        };

        this.y += this.yDecimal;
        this.yDecimal = getDecimal(this.y);
        this.y = Math.floor(this.y);
    }
    updateData() {}
};

class Player extends Entity {
    constructor(image) {
        super (image)
        this.x = display.width / 2;
        this.y = display.height / 2;
        this.axis = [0, 0];
        this.amplitude = 1;
        this.spd = 2.8;
        this.angle = 0;
        this.opacity = 100;
        this.shotBufferInit = 4;
        this.shotBuffer = 0;
        this.hp = 1;

        // Hitbox
        this.hitbox = this.setHitbox(4,4,0,3);

        // Functions

        this.updatePos = function({axis}) {
            this.x += this.spd * axis[0] * this.amplitude;
            this.y += this.spd * axis[1] * this.amplitude;
        };

        this.fixBoundaries = function() {
            if (this.hitbox[0] < 0) this.x = this.xMargin - this.xOffset;
            if (this.hitbox[1] > display.width) this.x = display.width - this.xMargin - this.xOffset;
            if (this.hitbox[2] < 0) this.y = this.yMargin - this.yOffset;
            if (this.hitbox[3] > display.height) this.y = display.height - this.yMargin - this.yOffset;
        };

        this.changeInputIfBoundary = function ({axis, inputGame}) {
            if (this.hitbox[0] <= 0) inputGame[3] = 0;
            if (this.hitbox[1] >= display.width) inputGame[1] = 0;
            if (this.hitbox[2] <= 0) inputGame[0] = 0;
            if (this.hitbox[3] >= display.height) inputGame[2] = 0
        }

        this.setVectorAmplitude = function ({axis, inputGame}) {
            this.amplitude =
                     inputGame[0] && inputGame[1] || 
                    inputGame[1] && inputGame[2] ||
                    inputGame[2] && inputGame[3] || 
                    inputGame[3] && inputGame[0] ? 0.707 : 1;
        };

        this.updateData = function() {
            if (this.shotBuffer > 0) this.shotBuffer--;
        };

        this.shot = function (gameObjects) {
            if (this.shotBuffer === 0) {
                gameObjects.pBullets.push(new pBullet(assets.pBullet, this.x, this.y, 9));
                gameObjects.pBullets.push(new pBullet(assets.pBullet, this.x, this.y,-8));
                this.shotBuffer = this.shotBufferInit;
            };
        };
    }
};

class pBullet extends Entity {
    constructor(image, x, y, side) {
        super (image);
        this.x = x + side;
        this.y = y - 12;
        this.spd = 12;
        this.angle = 0;
        this.opacity = 100;
        this.hp = 1;

        // Hitbox
        this.hitbox = this.setHitbox(this.image.width/2, this.image.height/2);

        // Skip flags
        this.roundPosX = true;

        // Functions
        this.updatePos = function () {
            this.y = this.y - 1 * this.spd;
        };

        this.updateData = function () {
            // Destroy if out of the top
            if (this.y < 0) this.hp = 0;
        };
    }
};

class Enemy extends Entity {
    constructor(image) {
        super(image)
        this.x = -99;
        this.y = -99;
        this.angle = 180;
        this.spd = 0;
        this.hp = 5;
        this.timers = new Array(10).fill(0);

        // Hitbox
        this.hitbox = this.setHitbox(this.image.width/2-1, this.image.height/2-3);
    }

    // Functions
    updatePos(){
        this.easeInOutSine('y', -this.image.height, display.height-20, 200, 1)
        this.easeInOutSine('x', -this.image.width, display.width-20, 120, 2)
    }

    easeOutCubic(xy, startPos, goTo, timeInFrames, timerUsed){
        this[xy] = (goTo-startPos) * (1 - Math.pow(1 - this.timers[timerUsed]/timeInFrames, 3)) + startPos;
        this.timerCount(timeInFrames, timerUsed);
    }
    easeInOutSine(xy, startPos, goTo, timeInFrames, timerUsed){
        this[xy] = (goTo-startPos) * (-(Math.cos(Math.PI * this.timers[timerUsed]/timeInFrames) - 1) / 2) + startPos;
        this.timerCount(timeInFrames, timerUsed);
    }
    timerCount(timeInFrames, timerUsed) {
        if(this.timers[timerUsed] < timeInFrames) this.timers[timerUsed] += 1;
    }
};