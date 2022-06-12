//////////////////////////
// GAME
//////////////////////////

class Game {
    constructor(){
        this.objects = {
            EnemyLand    : [],
            Player       : [],
            EnemyAir     : [],
            PlayerBullet : [],
            EnemyBullet  : [],
            Hud          : [],
        };
        this.objects = new Map(Object.entries(this.objects));
        this.iteration = 0;
        this.queuedFns = [];
        this.zzfx = zzfx;
    }
    needs(stage, pool, displayHeight, fns){
        // To call level events and scroll background
        this.stage = stage;
        // To scroll background
        this.displayHeight = displayHeight;
        // To liberate objects when hp <= 0
        this.pool = pool;
        // To control display fades, to update input buttons and get player data from input (fix)
        this.call = fns;
    }
    init() {
        this.iteration = 0;
        this.queuedFns.length = 0;
        this.call.display.initFade('fromBlack', 1);
        // Remove enemies and bullets

    }
    update(firefox, stepNotUsedYet) {
        // // Update fade transparency
        this.call.display.updateFade(step);

        // Update arr of pressed buttons
        this.call.input.updateButtons();

        // Current level events
        this.stage.events(this.iteration);
        if (this.stage.bg.speed < 0) this.stage.bg.speed = 0;

        // Update Frame Counter
        this.iteration += 1 * step;

        // Background Scrolling (A) (Fixes firefox crappy draw function)
        if (firefox) {
            this.scrollBackground(this.getFlooredSpeed());
        } else {
            // Background Scrolling (A) (super smooth in Chrome)
            this.scrollBackground(this.stage.bg.speed * step);
        }

        // Run update function of gameObjects
        this.gameObjectsUpdate();
   
        // Run these queued functions before rendering
        this.queuedFns.forEach(fn => fn());
        // Clear queue
        this.queuedFns.length = 0;

        // Test for collisions
        this.testCollisions();

        // Release objects if hp <= 0
        this.gameObjectsRelease();

        // Yes. A second time is needed
        this.queuedFns.forEach(fn => fn());
        this.queuedFns.length = 0;

        // DEBUG
        // Display iteration on screen
        // display.txt = String(this.iteration)
    }
    getFlooredSpeed(){
        let speedTimesStep = this.stage.bg.speed * step;
        let result = 0;
        this.stage.bg.speedDecimalAcc += this.getDecimal(speedTimesStep)
        if (this.stage.bg.speedDecimalAcc >= 1) {
            result += parseInt(this.stage.bg.speedDecimalAcc);
            this.stage.bg.speedDecimalAcc = this.getDecimal(this.stage.bg.speedDecimalAcc);
        }
        result += parseInt(speedTimesStep)
        return result
    }
    getDecimal(n){
        if (Number.isInteger(n)) return 0;
        return Number('0.'+ n.toString().split('.')[1].slice(0,1));
    }
    scrollBackground(spd){
        // Scroll background: move each row, wrap around and change pattern
        this.stage.bg.rows.forEach((_,y) => {
            // Move
            // this.stage.bg.rows[y] += this.stage.bg.speed * step;
            this.stage.bg.rows[y] += spd

            // If row position is greater than display height
            if (this.stage.bg.rows[y] >= this.displayHeight) { 
                // Move to the top
                this.stage.bg.rows[y] -= this.displayHeight + this.stage.bg.tileSize;

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
    }
    gameObjectsUpdate(){
        // Entities update function
        for (const [_, arr] of this.objects){
            arr.forEach(obj => {
                // If player, pass movement data
                if (obj instanceof Player) {
                    // Fix this if possible. Check input.js for more info
                    obj.update(this.call.input.playerInputData());
                } else obj.update();
            })
        }
    }
    testCollisions(){
        ['EnemyAir','EnemyLand'].forEach(enemyType => {
            // Collisions early test. Ejecutar solo si hay enemigos y pBullets en pantalla
            if (this.objects.get(enemyType).length > 0 && this.objects.get('PlayerBullet').length > 0) {
                // Loopear sobre los bullets y luego sobre los enemies
                this.objects.get('PlayerBullet').forEach(b => {
                    this.objects.get(enemyType).forEach(e => {
                        if (b.hp > 0 && e.hp > 0) { 
                            // Condicion de la colision
                            if (b.hitbox[0] < e.hitbox[1] &&
                                e.hitbox[0] < b.hitbox[1] &&
                                b.hitbox[2] < e.hitbox[3] &&
                                e.hitbox[2] < b.hitbox[3]) {
                                // Ambos pierden HP
                                b.hp--; e.hp--;
                                // Enemy cambia el tile a "Hit"
                                e.animation = 1;
                                if (e.hp <= 0) {
                                    // Si el enemy murio, marcar el flag para reproducir explosion luego
                                    e.sound = 'explosion';
                                    // Particulas de la explosion
                                    for (let i = 0; i < 30; i++)
                                    this.queuedFns.push(() => {this.pool.getFreeObject('Particle', 'Player',[e.x, e.y])});
                                }
                            }
                        }
                    })
                })
            }
        })
    }
    gameObjectsRelease(){
        for (const [_, arr] of this.objects){
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].hp <= 0) {
                    // Check for explosion sound
                    if (arr[i].sound === 'explosion') this.zzfx(...[.5,,914,.01,.12,.12,4,2.49,,.5,,,,.3,,.5,.18,.44,.14]);
                    // Remove from array and set free
                    this.pool.releaseObject(...arr.splice(i,1));
                    // Fix loop index
                    i--;
                };
            };
        }
    }
    deleteUnused(){

    }
}


// // GAMEPAD
// // if (navigator?.getGamepads()[0]?.buttons[12]?.pressed) call.input.get('raw')[0] = true;
// // if (!navigator?.getGamepads()[0]?.buttons[12]?.pressed) call.input.get('raw')[0] = false;
// // if (navigator?.getGamepads()[0]?.buttons[13]?.pressed) call.input.get('raw')[2] = true;
// // if (!navigator?.getGamepads()[0]?.buttons[13]?.pressed) call.input.get('raw')[2] = false;
// // if (navigator?.getGamepads()[0]?.buttons[14]?.pressed) call.input.get('raw')[3] = true;
// // if (!navigator?.getGamepads()[0]?.buttons[14]?.pressed) call.input.get('raw')[3] = false;
// // if (navigator?.getGamepads()[0]?.buttons[15]?.pressed) call.input.get('raw')[1] = true;
// // if (!navigator?.getGamepads()[0]?.buttons[15]?.pressed) call.input.get('raw')[1] = false;
// // if (navigator?.getGamepads()[0]?.buttons[0]?.pressed) call.input.get('raw')[4] = true;
// // if (!navigator?.getGamepads()[0]?.buttons[0]?.pressed) call.input.get('raw')[4] = false;

// // let deadzone=0.5;
// // if (navigator?.getGamepads()[0]?.axes[0] < -deadzone) call.input.get('raw')[3] = true;
// // if (navigator?.getGamepads()[0]?.axes[0] > deadzone) call.input.get('raw')[1] = true;
// // if (navigator?.getGamepads()[0]?.axes[1] < -deadzone) call.input.get('raw')[0] = true;
// // if (navigator?.getGamepads()[0]?.axes[1] > deadzone) call.input.get('raw')[2] = true;

// // Update arr of pressed buttons
// this.call.input.updateButtons();

// // // SAVE AND LOAD INPUT HISTORY
// // // Accumulate history of pressed button for saving in LocalStorage
// // input.history.push(input.game.slice());

// // // Rudimentary load replay
// // if (this.iteration * 2 < input.saved.length) {
// //     input.game = input.saved[this.iteration * 2];
// // } else input.game = [0,0,0,0,0,0];