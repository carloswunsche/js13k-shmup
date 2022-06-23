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
        this.sfxFlags = {};
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
        this.audioPlayer = audioPlayer;
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
        this.updateFade();

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
        this.iteration++;

        // // Previous background renderer if firefox
        // if (firefox) {
        //     // Background Scrolling (A) (Fixes firefox crappy draw function)
        //     this.scrollBackground(this.getFlooredSpeed());
        // } else {
        //     // Background Scrolling (A) (super smooth in Chrome)
        //     this.scrollBackground(this.stage.bg.speed);
        // }
        this.scrollBackground(this.stage.bg.speed);

        // Run update function of each gameObject
        for (const [_, arr] of this.objects) arr.forEach(obj => obj.update());
   
        // At this point call functions inside queue (usually bullet creation)
        this.runQueued();

        // Test for collisions between PlayerBullets and Enemy
        this.testCollision();

        // Test for collisions between Player and EnemyBullet
        this.testCollisionPlayer();

        // Remove entities from layer if hp <= 0 and call kill method on them
        this.removeDeadEntities();

        // Call functions inside queue again (usually particle creation)
        this.runQueued();

        // Play sounds passing flags, then set all flags to false
        this.audioPlayer.playSfx(this.sfxFlags);
        for(const soundName in this.sfxFlags) this.sfxFlags[soundName] = 0;

        // Reset game if player dies
        if (!this.objects.get('4')[0]) {
            this.resetCounter++;
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
                    this.stage.bg.changePattern = 1;
                }

                // If changePattern is true, change each next row for next pattern's row
                if (this.stage.bg.changePattern) {
                    for (let tile = 0; tile < this.stage.bg.numCols; tile++) {
                        this.stage.bg.pattern[tile + (y * this.stage.bg.numCols)] = this.stage.bg.queue[tile + (y * this.stage.bg.numCols)];
                    };
                };

                // If changePattern is true but i === 0, deactivate changePattern flag
                if (this.stage.bg.changePattern && !y) {
                    this.stage.bg.changePattern = 0;
                    // Also delete 1 full pattern from queue
                    this.stage.bg.queue.splice(0, this.stage.bg.numCols * this.stage.bg.rows.length);
                };
            };
        });
    }
    testCollision(){
        // Evaluar si cada pBullet colisiona con cada enemy. Hacer esto por ambos layers de enemies.
        ['2','1'].forEach(enemyType => {
            this.objects.get('5').forEach(pBullet => {
                this.objects.get(enemyType).forEach(enemy => {
                    if (pBullet.hp > 0 && enemy.hp > 0) { 
                        // Condicion de la colision
                        if (pBullet.hitbox[0] < enemy.hitbox[1] &&
                            enemy.hitbox[0] < pBullet.hitbox[1] &&
                            pBullet.hitbox[2] < enemy.hitbox[3] &&
                            enemy.hitbox[2] < pBullet.hitbox[3]) {
                            // Ambos pierden HP
                            pBullet.hp--; enemy.hp--;
                            // Enemy activa el tile hit ("transparente" / not found) solo si no murio
                            if (enemy.hp > 0) enemy.hit = 1;
                            // Si el enemy evaluado murio por colision, activar flag de explosion
                            if (enemy.hp <= 0) enemy.explode = true;
                            // Salir del forEach de los enemigos ya que el bullet actual murió
                            // Fix this: este bullet muerto va a ser evaluado con los enemies del proximo layer
                            return;
                        }
                    }
                })
            })
        })
    }
    testCollisionPlayer(){
        let player = this.objects.get('4')[0];
        ['6', '2'].forEach(layer => {
            this.objects.get(layer).forEach(foe => {
                if (foe.hp > 0 && player?.hp > 0) { 
                    // Si hay colision...
                    if (foe.hitbox[0] < player.hitbox[1] &&
                        player.hitbox[0] < foe.hitbox[1] &&
                        foe.hitbox[2] < player.hitbox[3] &&
                        player.hitbox[2] < foe.hitbox[3]) {
                        // Both will be killed
                        foe.hp = 0; player.hp = 0;
                        // Explosion flag for both
                        foe.explode = true; player.explode = true;
                        return;
                    }
                }
            })
        })
    }
    removeDeadEntities(){
        for (const [_, arr] of this.objects){
            for (let i = arr.length-1; i >= 0; i--) {
                // Si no tiene hp y no tiene flag dying activada, kill.
                if (arr[i].hp <= 0 && !arr[i].dying) arr[i].kill();
                // Tras eso, todos los que hayan quedado free, sacarlos del array.
                if (arr[i].free) arr.splice(i,1);
            };
        }
    }
    // Unnecesary if not going after 120hz
    // ceilIteration(){
    //     this.iteration = M.ceil(this.iteration);
    // }
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