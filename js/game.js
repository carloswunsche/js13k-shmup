//////////////////////////
// GAME
//////////////////////////

class Game {
    constructor(assets, call) {
        this.setStage = function (stageNum = 1) {
            this.objects = {
                player:       [new Player(assets.player)],
                enemy:        [],
                playerBullet: [],
                enemyBullet:  [],
                hud:          [],
            };
            this.pool = new Pool(assets, this.objects)
            this.stage = new Stage(assets['bg'+stageNum], assets.imageScaled, stageNum, this.pool);
            this.iteration = 0;
        };

        
        this.update = function () {
            // // Gamepad
            // if (navigator?.getGamepads()[0]?.buttons[12]?.pressed) call.input.get('raw')[0] = true;
            // if (!navigator?.getGamepads()[0]?.buttons[12]?.pressed) call.input.get('raw')[0] = false;
            // if (navigator?.getGamepads()[0]?.buttons[13]?.pressed) call.input.get('raw')[2] = true;
            // if (!navigator?.getGamepads()[0]?.buttons[13]?.pressed) call.input.get('raw')[2] = false;
            // if (navigator?.getGamepads()[0]?.buttons[14]?.pressed) call.input.get('raw')[3] = true;
            // if (!navigator?.getGamepads()[0]?.buttons[14]?.pressed) call.input.get('raw')[3] = false;
            // if (navigator?.getGamepads()[0]?.buttons[15]?.pressed) call.input.get('raw')[1] = true;
            // if (!navigator?.getGamepads()[0]?.buttons[15]?.pressed) call.input.get('raw')[1] = false;
            // if (navigator?.getGamepads()[0]?.buttons[0]?.pressed) call.input.get('raw')[4] = true;
            // if (!navigator?.getGamepads()[0]?.buttons[0]?.pressed) call.input.get('raw')[4] = false;

            // let deadzone=0.5;
            // if (navigator?.getGamepads()[0]?.axes[0] < -deadzone) call.input.get('raw')[3] = true;
            // if (navigator?.getGamepads()[0]?.axes[0] > deadzone) call.input.get('raw')[1] = true;
            // if (navigator?.getGamepads()[0]?.axes[1] < -deadzone) call.input.get('raw')[0] = true;
            // if (navigator?.getGamepads()[0]?.axes[1] > deadzone) call.input.get('raw')[2] = true;

            // Input: Convert raw inputs to game input
            call.input.rawToGame();

            // // USE THESE ONLY WITH 120 FPS
            // // Accumulate history of pressed button for saving in LocalStorage
            // input.history.push(input.game.slice());

            // // Rudimentary load replay
            // if (this.iteration * 2 < input.saved.length) {
            //     input.game = input.saved[this.iteration * 2];
            // } else input.game = [0,0,0,0,0,0];

            // On first frame, init fade from black to transparent
            if (this.iteration === 0) call.display.initFade('fromBlack', 1);
            // Update fade transparency
            call.display.updateFade();
            // Current level events
            this.stage.events();

            // Update Frame Counter
            this.iteration += 1 * step;

            // Scroll background: move each row, wrap around and change pattern
            this.stage.bg.rows.forEach((_,y) => {
                // Move
                this.stage.bg.rows[y] += this.stage.bg.speed * step;

                // If row position is greater than display height
                if (this.stage.bg.rows[y] >= display.height) { 
                    // Move to the top
                    this.stage.bg.rows[y] -= display.height + this.stage.bg.tileSize;

                    // If i === last row AND if queue is full, activate changePattern flag
                    // changePattern will remain true until all rows has been replaced in array
                    if (y === this.stage.bg.rows.length-1 && this.stage.bg.queue.length >= this.stage.bg.tileQty) {
                        this.stage.bg.changePattern = true;
                    }

                    // If changePattern is true, change each next row for next pattern's row
                    if (this.stage.bg.changePattern) {
                        for (let tile = 0; tile < this.stage.bg.numCols; tile++) {
                            this.stage.bg.pattern[tile + (y * this.stage.bg.numCols)] = this.stage.bg.queue[tile + (y * this.stage.bg.numCols)];
                        };
                    };

                    // If changePattern is true but i === 0, deactivate changePattern flag
                    if (this.stage.bg.changePattern && y === 0) {
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

            // Collisions early test. Ejecutar solo si hay enemigos y pBullets en pantalla
            if (this.objects.enemy.length > 0 && this.objects.playerBullet.length > 0) {
                // Loopear sobre los bullets y luego sobre los enemies
                this.objects.playerBullet.forEach(bullet => {
                    this.objects.enemy.forEach(enemy => {
                        // IF necesario sino un bullet puede atacar a varios enemies que estan overlapping
                        if (bullet.hp > 0) { 
                            // Evaluar colision
                            if (bullet.hitbox[0] < enemy.hitbox[1] &&
                                enemy.hitbox[0] < bullet.hitbox[1] &&
                                bullet.hitbox[2] < enemy.hitbox[3] &&
                                enemy.hitbox[2] < bullet.hitbox[3]) {
                                // bullet se marca para eliminar y al enemy le baja el hp
                                bullet.hp = 0;
                                enemy.hp--;
                            };
                        };
                    });
                });
            };

            // Release objects (hp === 0)
            loopOver(this.objects, (_, arr) => {
                // Don't use forEach in this one
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].hp <= 0) {
                        this.pool.releaseObject(...arr.splice(i,1))
                        i--;
                    };
                };
            });
            

            // Shot
            if (call.input.get('game')[4] > 0) this.objects.player[0].shot(this.pool);

        };
    }
}


class Entity {
    constructor(image){
        this.free = true;
        this.image = image;
        this.width = image.width;
        this.height = image.height;
        this.opacity = 100;
        this.angle = 0;
    }
    update (playerInputData) {
        this.updateData(playerInputData);
        this.updatePos(playerInputData);
        this.hitbox = this.setHitbox();

        // Player only
        if (this.outOfBounds) {
            this.fixOutOfBounds();
            this.hitbox = this.setHitbox();
            this.outOfBounds = false;
        };
    }
    updateData() {} // Dummy
    updatePos () {
        this.x += this.x * step || 0;
        this.y += this.x * step || 0;
    }
    setHitbox (xMargin = 2, yMargin = 2, xOffset = 0, yOffset = 0) {
        // Necessary for first time execution
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
};

class Player extends Entity {
    constructor(image) {
        super (image)
        this.x = display.width / 2;
        this.y = display.height / 2;
        this.speed = 2.5;
        this.shotBufferInit = 4;
        this.shotBuffer = 0;
        this.hp = 1;
        this.hitbox = this.setHitbox(4,4,0,3);
        // Flags
        this.outOfBounds = false;
    }
    // Functions
    updateData (playerInputData) {
        this.blockInputIfBoundary(playerInputData);
        this.setVectorAmplitude(playerInputData);
        if (this.shotBuffer > 0) this.shotBuffer -= 1 * step;
    }
    
    updatePos ({axis}) {
        this.x += this.speed * this.amplitude * axis[0] * step;
        this.y += this.speed * this.amplitude * axis[1] * step;
    }

    blockInputIfBoundary ({axis, inputGame}) {
        // Evaluar los axis evita calculos innecesarios cuando la nave esta quieta sobre los bounds
        if (axis[0] !== 0) {
            if (this.hitbox[0] <= 0) {inputGame[3] = 0; this.outOfBounds = true;}
            if (this.hitbox[1] >= display.width) {inputGame[1] = 0; this.outOfBounds = true;}
        };
        if (axis[1] !==0) {
            if (this.hitbox[2] <= 0) {inputGame[0] = 0; this.outOfBounds = true;}
            if (this.hitbox[3] >= display.height) {inputGame[2] = 0; this.outOfBounds = true;}
        };
    }

    fixOutOfBounds () {
        if (this.hitbox[0] < 0) this.x = this.xMargin - this.xOffset;
        if (this.hitbox[1] > display.width) this.x = display.width - this.xMargin - this.xOffset;
        if (this.hitbox[2] < 0) this.y = this.yMargin - this.yOffset;
        if (this.hitbox[3] > display.height) this.y = display.height - this.yMargin - this.yOffset;
    }

    setVectorAmplitude ({inputGame}) {
        this.amplitude =
                inputGame[0] && inputGame[1] || 
                inputGame[1] && inputGame[2] ||
                inputGame[2] && inputGame[3] || 
                inputGame[3] && inputGame[0] ? 0.707 : 1;
    }

    shot(pool) {
        if (this.shotBuffer === 0) {
            pool.getFreeObject('playerBullet', this.x, this.y, 9);
            pool.getFreeObject('playerBullet', this.x, this.y, -8);
            this.shotBuffer = this.shotBufferInit;
        };
    }
};

class PlayerBullet extends Entity {
    constructor(image) {
        super (image);
        this.speed = 12;
    }
    reset(x, y, side = 9){
        this.x = x + side;
        this.y = y - 12;
        this.hp = 1;
        this.hitbox = this.setHitbox(this.image.width/2, this.image.height/2);
    }
    updateData () {
        // Destroy if out of the top
        if (this.y < 0) this.hp = 0;
    }
    updatePos () {
        this.y -= this.speed * step;
    };
};

class Enemy extends Entity {
    constructor(image) {
        super(image)
        this.speed = 2;
        this.angle = 180;
    }

    reset(){
        this.x = -99;
        this.y = -99;
        this.hp = 5;
        this.timers = new Array(10).fill(0);
        this.hitbox = this.setHitbox(this.image.width/2-1, this.image.height/2-3);
    }
    updatePos(){
        this.easeInOutSine('y', -this.image.height, display.height-20, 200, 1);
        this.easeInOutSine('x', -this.image.width, display.width-20, 120, 2);
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
        if(this.timers[timerUsed] < timeInFrames) this.timers[timerUsed] += 1*step;
    }
};