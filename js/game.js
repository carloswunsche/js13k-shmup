//////////////////////////
// GAME
//////////////////////////

class Game {
    constructor(){
        // Layers Guide
        // 1=EnemyLand, 2=EnemyAir, 3=Particle, 4=Player, 5=pBullet, 6=eBullet, 7=Hud
        // this.objects = {
        //     EnemyLand    : [],
        //     EnemyAir     : [],
        //     Particle     : [],
        //     Player       : [],
        //     PlayerBullet : [],
        //     EnemyBullet  : [],
        //     Hud          : [],
        // };
        // this.objects = new Map(Object.entries(this.objects));
        // Change variable name to this.layers
        this.objects = new Map(Object.entries({1:[],2:[],3:[],4:[],5:[],6:[],7:[]}));
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
    update() {
        // Update fade transparency
        this.updateFade(step);

        // Update arr of pressed buttons
        // Checking if integer makes the ship feel the same both with 60ups & 120ups
        if (Number.isInteger(this.iteration)) this.input.updateButtons();

        // Current level events
        // Checking if integer will boost performance a little bit with 120ups
        if (Number.isInteger(this.iteration)) this.stage.events[this.iteration]();
        // if (this.iteration === 0) this.stage.events[0]();
        // if (this.iteration === 0) console.log(this.stage.events[0]);

        // Debug only (to prevent negative scrolling)
        // if (this.stage.bg.speed < 0) this.stage.bg.speed = 0;

        // Update Frame Counter
        this.iteration += 1 * step;

        // // Previous background renderer if firefox
        // if (firefox) {
        //     // Background Scrolling (A) (Fixes firefox crappy draw function)
        //     this.scrollBackground(this.getFlooredSpeed());
        // } else {
        //     // Background Scrolling (A) (super smooth in Chrome)
        //     this.scrollBackground(this.stage.bg.speed * step);
        // }
        this.scrollBackground(this.stage.bg.speed * step);

        // Run update function of each gameObject
        for (const [_, arr] of this.objects) arr.forEach(obj => obj.update());
   
        // At this point call functions inside queue (usually bullet creation)
        this.runQueued();

        // Test for collisions between PlayerBullets and Enemy
        this.testCollision();

        // Test for collisions between Player and EnemyBullet
        this.testCollisionPlayer();

        // Release objects if hp <= 0
        this.gameObjectsRelease();

        // Call functions inside queue again (usually particle creation)
        this.runQueued();

        // Play sounds if any
        this.audio.player.playSfx(this.audio.sfx);

        // Reset game if player dies
        if (!this.objects.get('4')[0]) {
            this.resetCounter += 1 * step;
            if (this.resetCounter === 50) this.initFade('toBlack', 1);
            if (this.resetCounter === 150) debug.gameReset();
        }

        // DEBUG TXT
        // display.txt = String(this.iteration)
    }
    // getFlooredSpeed(){
    //     let speedTimesStep = this.stage.bg.speed * step;
    //     let result = 0;
    //     this.stage.bg.speedDecimalAcc += this.getDecimal(speedTimesStep);
    //     if (this.stage.bg.speedDecimalAcc >= 1) {
    //         result += M.floor(this.stage.bg.speedDecimalAcc);
    //         this.stage.bg.speedDecimalAcc = this.getDecimal(this.stage.bg.speedDecimalAcc);
    //     }
    //     result += M.floor(speedTimesStep);
    //     return result;
    // }
    // getDecimal(n){
    //     if (Number.isInteger(n)) return 0;
    //     return Number('0.'+ n.toString().split('.')[1].slice(0,1));
    // }
    scrollBackground(spd){
        // Scroll background: move each row, wrap around and change pattern
        this.stage.bg.rows.forEach((_,y) => {
            // Move
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
    testCollision(){
        let pBulLayer = this.objects.get('5');
        ['2','1'].forEach(enemyType => {
            // Collisions early test. Ejecutar solo si hay enemigos y pBullets en pantalla
            if (this.objects.get(enemyType).length > 0 && pBulLayer.length > 0) {
                // Loopear sobre los bullets y luego sobre los enemies
                pBulLayer.forEach(b => {
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
                                e.hit = 1;
                                // Si el enemy evaluado murio...
                                if (e.hp <= 0) {
                                    // Audio: explosion sfx flag
                                    this.audio.sfx.sfx_explosion = true;
                                    // Pool: Liberar particulas de la explosion
                                    for (let i = 0; i < 30; i++)
                                    this.queuedFns.push(() => {
                                        this.pool.free(
                                            'Particle', 
                                            '3', 
                                            {x: e.x, y: e.y}
                                        )
                                    });
                                }
                                // Salir del forEach de los enemigos ya que el bullet actual murió
                                return;
                            }
                        }
                    })
                })
            }
        })
    }
    testCollisionPlayer(){
        // To speed up player collision test
        let player = this.objects.get('4')[0];
        // Collisions early test. Ejecutar solo si hay Enemy Bullets en pantalla y player existe
        // if (this.objects.get('EnemyBullet').length > 0 && player) {
        ['6', '2'].forEach(layer => {
            if (!player) return;
            this.objects.get(layer).forEach(b => {
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
                            this.pool.free('Particle','3',{x: xShallowCopy, y: yShallowCopy, speed: 4, rndRange:[1,2]})
                        });
                        player.disable();
                        return;
                    }
                }
            })
        })
    }
    gameObjectsRelease(){
        for (const [_, arr] of this.objects){
            for (let i = 0; i < arr.length; i++) {
                // Checks if there's any dead entity
                if (arr[i].hp <= 0) {
                    // Remove from array and set free
                    arr.splice(i,1)[0].free = true;
                    // Shift loop index
                    i--;
                };
            };
        }
    }
    // Unnecesary if not going after 120hz
    ceilIteration(){
        this.iteration = M.ceil(this.iteration);
    }
    runQueued(){
        this.queuedFns.forEach(fn => fn());
        this.queuedFns.length = 0;
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