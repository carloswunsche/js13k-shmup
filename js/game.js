//////////////////////////
// GAME
//////////////////////////

class Game {
    constructor(assets, call) {
        this.setup = function (stageNum = 1) {
            this.frame = 0;
            this.stage = new Stage(stageNum, assets, call);
            this.objects = {
                enemies: [],
                pBullets: [],
                player: [new Player(assets, call.input.game)],
                eBullets: [],
                hud: [],
            };
        };
        
        this.update = function () {
            // Input: Convert raw inputs to game input
            call.input.rawToGame();

            // Delete objects if hp === 0
            loopOver(this.objects, (_, arr) => {
                // Don't use forEach in this one
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].hp === 0) {
                        arr.splice(i, 1);
                        i--;
                    };
                };
            });

            // Current level events
            this.stage.events()

            // Update Frame Counter
            this.frame++;

            // Scroll background

            // console.clear()
            this.stage.bg.rows.forEach((_,i) => {
                // Move by applying background speed to current row position
                this.stage.bg.rows[i] += this.stage.bg.speed;

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



            // Collisions early test
            // if (this.objects.get('enemies').length > 0 && this.objects.get('pBullets').length > 0) { // Si hay pBullets y enemies
            //     for (const [i, pBullet] of this.objects.get('pBullets').entries()) {
            //         for (const [i, enemy] of this.objects.get('enemies').entries()) {
            //             if (pBullet.x1Hitbox < enemy.x2Hitbox &&
            //                 enemy.x1Hitbox < pBullet.x2Hitbox &&
            //                 pBullet.y1Hitbox < enemy.y2Hitbox &&
            //                 enemy.y1Hitbox < pBullet.y2Hitbox) {
            //                 pBullet.destroy = true;
            //                 enemy.life--;
            //             };
            //         };
            //     };
            // };

            // Shot
            if (call.input.get('game')[4] > 0) this.objects.player[0].shot(this.objects);

            // Update fade transparency
            call.display.updateFade();
        };
    }
}


class Entity {
    constructor(){
        this.xDecimal = 0;
        this.yDecimal = 0;
    }
    update (options) {
        if (this instanceof Player) {
            this.changeInputIfBoundary(options)
            this.setVectorAmplitude(options)
        }

        // General objects
        this.updateData();
        this.updatePos(options);
        this.roundPos();
        this.hitbox = this.setHitbox();

        if (this instanceof Player) {
            this.fixBoundaries();
            this.hitbox = this.setHitbox();
        }
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
    };
    roundPos () {
        this.x += this.xDecimal;
        this.y += this.yDecimal;
        this.xDecimal = getDecimal(this.x);
        this.yDecimal = getDecimal(this.y);
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
    }
    updateData () {} // Empty on purpose
}


class Player extends Entity {
    constructor(assets, inputGame) {
        super ()
        this.image = assets.player;
        this.width = assets.player.width;
        this.height = assets.player.height;
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
        this.hitbox = this.setHitbox(4,4,0,3);

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
                gameObjects.pBullets.push(new pBullet(this.x, this.y, assets, 9));
                gameObjects.pBullets.push(new pBullet(this.x, this.y, assets, -8));
                this.shotBuffer = this.shotBufferInit;
            };
        };
    }
}

class pBullet extends Entity {
    constructor(x, y, assets, side) {
        super ();
        this.image = assets.pBullet;
        this.width = assets.pBullet.width;
        this.height = assets.pBullet.height;
        this.x = x + side;
        this.y = y - 12;
        this.spd = 12;
        this.angle = 0;
        this.opacity = 100;
        this.hp = 1;
        this.hitbox = this.setHitbox(this.width/2, this.height/2);

        this.updatePos = function () {
            this.y = this.y - 1 * this.spd;
        };

        this.updateData = function () {
            if (this.y < 0) this.hp = 0;
        }
    }
}