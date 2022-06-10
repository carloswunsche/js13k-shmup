//////////////////////////
// GAME
//////////////////////////

class Game {
    constructor(){
        this.objects = {};
        this.iteration = 0;
    }
    needs(stage, pool, displayHeight, fns){
        this.stage = stage;
        this.pool = pool;
        this.displayHeight = displayHeight;
        this.call = fns;
    }
    init (playerImage) {
        this.iteration = 0;
        this.objects.Player = [new Player(playerImage)];
        this.objects.Enemy          = [];
        this.objects.PlayerBullet   = [];
        this.objects.EnemyBullet    = [];
        this.objects.Hud            = [];
        this.call.display.initFade('fromBlack', 1);
    }
    update () {
        // // Update fade transparency
        this.call.display.updateFade(step);
        // Gamepad
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
        this.call.input.updateButtons();

        // // USE THESE ONLY WITH 120 FPS
        // // Accumulate history of pressed button for saving in LocalStorage
        // input.history.push(input.game.slice());

        // // Rudimentary load replay
        // if (this.iteration * 2 < input.saved.length) {
        //     input.game = input.saved[this.iteration * 2];
        // } else input.game = [0,0,0,0,0,0];

        // Current level events:::





        this.stage.events(this.iteration);
        if (this.stage.bg.speed < 0) this.stage.bg.speed = 0;

        // // Update Frame Counter
        this.iteration += 1 * step;

        // Scroll background: move each row, wrap around and change pattern
        this.stage.bg.rows.forEach((_,y) => {
            // Move
            this.stage.bg.rows[y] += this.stage.bg.speed * step;

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

        // // Entities update function
        // loopOver(this.objects, (_, arr) => {
        //     arr.forEach(obj => {
        //         // If player, pass movement data
        //         if (obj instanceof Player) {
        //             // Fix this. Check input.js for more info
        //             obj.update(call.input.playerInputData());
        //         } else obj.update();
        //     });
        // });

        // // Collisions early test. Ejecutar solo si hay enemigos y pBullets en pantalla
        // if (this.objects.enemy.length > 0 && this.objects.playerBullet.length > 0) {
        //     // Loopear sobre los bullets y luego sobre los enemies
        //     this.objects.playerBullet.forEach(bullet => {
        //         this.objects.enemy.forEach(enemy => {
        //             // IF necesario sino un bullet puede atacar a varios enemies que estan overlapping
        //             if (bullet.hp > 0) { 
        //                 // Evaluar colision
        //                 if (bullet.hitbox[0] < enemy.hitbox[1] &&
        //                     enemy.hitbox[0] < bullet.hitbox[1] &&
        //                     bullet.hitbox[2] < enemy.hitbox[3] &&
        //                     enemy.hitbox[2] < bullet.hitbox[3]) {
        //                     // bullet se marca para eliminar y al enemy le baja el hp
        //                     bullet.hp = 0;
        //                     enemy.hp--;
        //                 };
        //             };
        //         });
        //     });
        // };

        // // Release objects (hp === 0)
        // loopOver(this.objects, (_, arr) => {
        //     // Don't use forEach in this one
        //     for (let i = 0; i < arr.length; i++) {
        //         if (arr[i].hp <= 0) {
        //             this.pool.releaseObject(...arr.splice(i,1))
        //             i--;
        //         };
        //     };
        // });
        

        // // Shot
        // if (call.input.game[4] > 0) this.objects.player[0].shot();
    }
    deleteUnused(){

    }
}