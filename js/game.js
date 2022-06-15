//////////////////////////
// GAME
//////////////////////////

class Game {
    constructor(){
        this.objects = {
            EnemyLand    : [],
            EnemyAir     : [],
            Particle     : [],
            Player       : [],
            PlayerBullet : [],
            EnemyBullet  : [],
            Hud          : [],
        };
        this.objects = new Map(Object.entries(this.objects));
        this.iteration = 0;
        this.queuedFns = [];
        this.resetCounter = 0;
    }
    needs(stage, pool, input, displayHeight, audioPlayer, initFade, updateFade){
        // To call level events and scroll background
        this.stage = stage;
        // To scroll background
        this.displayHeight = displayHeight;
        // To liberate objects when hp <= 0
        this.pool = pool;
        // To access buttons mainly
        this.input = input;
        // To initialize display fades
        this.initFade = initFade;
        // To play sounds
        this.audio = {
            player: audioPlayer,
            sfx: {},
        }
        // To update fade state
        this.updateFade = updateFade;
    }
    init() {
        this.iteration = 0;
        this.queuedFns.length = 0;
        this.initFade('fromBlack', 1);
    }
    update(firefox, stepNotUsedYet) {
        // Update fade transparency
        this.updateFade(step);

        // Reset game if player dies
        if (this.objects.get('Player').length === 0) this.resetCounter += 1 * step;
        if (this.resetCounter === 50) this.initFade('toBlack', 1);
        if (this.resetCounter === 150) debug.gameReset();


        // Update arr of pressed buttons
        // Checking if integer makes the ship feel the same both with 60ups & 120ups
        if (Number.isInteger(this.iteration)) this.input.updateButtons();

        // Current level events
        // Checking if integer will boost performance a little bit with 120ups
        if (Number.isInteger(this.iteration)) this.stage.events(this.iteration);

        // Debug only (to prevent negative scrolling)
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
   
        // Usually for bullet creation
        this.queuedFns.forEach(fn => fn());
        // Clear queue
        this.queuedFns.length = 0;

        // Test for collisions between PlayerBullets and Enemy
        this.testCollision();

        // Test for collisions between Player and EnemyBullet
        this.testCollisionPlayer();

        // Release objects if hp <= 0
        this.gameObjectsRelease();

        // Usually for particles
        // Yes. A second time is needed
        this.queuedFns.forEach(fn => fn());
        this.queuedFns.length = 0;

        // Play sounds
        this.audio.player.playSfx(this.audio.sfx)

        // DEBUG
        // display.txt = String(this.objects.get('Player')[0].vectorAmp)
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
        // Run entities update function
        for (const [_, arr] of this.objects) arr.forEach(obj => obj.update())
    }
    testCollision(){
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
                                    // Audio: explosion sfx flag
                                    this.audio.sfx.sfx_explosion = true;
                                    // Particulas de la explosion
                                    for (let i = 0; i < 30; i++)
                                    this.queuedFns.push(() => {
                                        this.pool.getFreeObject(
                                            'Particle', 
                                            'Particle', 
                                            {x: e.x, y: e.y}
                                        )
                                    });
                                }
                                // Performance:
                                // Salir del forEach de los enemigos si el bullet actual murio
                                if (b.hp <= 0) return;
                            }
                        }
                    })
                })
            }
        })
    }
    testCollisionPlayer(){
        // To speed up player collision test
        let player = this.objects.get('Player')[0];
        // Collisions early test. Ejecutar solo si hay Enemy Bullets en pantalla y player existe
        if (this.objects.get('EnemyBullet').length > 0 && player) {
            this.objects.get('EnemyBullet').forEach(b => {
                if (b.hp > 0 && player.hp > 0) { 
                    // Si hay colision...
                    if (b.hitbox[0] < player.hitbox[1] &&
                        player.hitbox[0] < b.hitbox[1] &&
                        b.hitbox[2] < player.hitbox[3] &&
                        player.hitbox[2] < b.hitbox[3]) {
                        // HP: Ambos mueren
                        b.hp = 0; player.hp = 0;
                        // Audio: Explosion sfx flag
                        this.audio.sfx.sfx_explosionPlayer = true;
                        // Free objects: Explosion particles
                        let xShallowCopy = player.x;
                        let yShallowCopy = player.y;
                        for (let i = 0; i < 40; i++)
                        this.queuedFns.push(() => {
                            this.pool.getFreeObject(
                                'Particle',
                                'Particle',
                                {x: xShallowCopy, y: yShallowCopy, speed: 4, rndRange:[1,2]}
                            )
                        });
                        player.disable();
                        // Performance: Se aborta el resto del forEach
                        return;
                    }
                }
            })
        }
    }
    gameObjectsRelease(){
        for (const [_, arr] of this.objects){
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].hp <= 0) {
                    // Remove from array and set free
                    this.pool.releaseObject(...arr.splice(i,1));
                    // Shift loop index
                    i--;
                };
            };
        }
    }
    ceilIteration(){
        this.iteration = Math.ceil(this.iteration);
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