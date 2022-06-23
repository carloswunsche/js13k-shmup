//////////////////////////
// GAME
//////////////////////////

class Game {
    constructor(){
        // Layers Guide
        // 1=EnemyLand, 2=EnemyAir, 3=Particle, 4=pBullet, 5=Player, 6=eBullet, 7=Hud
        // Change variable name to this.layers
        this.objects = new Map(Object.entries({1:[],2:[],3:[],4:[],5:[],6:[],7:[]}));
        this.queuedFns = [];
        this.resetCounter = 0;
        this.sfxFlags = {};
    }
    needs(customMath, stage, pool, input, displayHeight, audioPlayer, initFade, updateFade){
        // Custom math functions
        this.math = customMath;
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
        this.input.updateButtons();

        // Current level events
        this.stage.events[this.iteration]();

        // Update Frame Counter
        this.iteration++;

        // Update Background Position
        this.scrollBackground(this.stage.bg.speed);

        // Run update function of each gameObject
        for (const [_, arr] of this.objects) arr.forEach(entity => this.updateEntity(entity));
   
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
        if (!this.objects.get('5')[0]) {
            this.resetCounter++;
            if (this.resetCounter === 50) this.initFade('toBlack', 1);
            if (this.resetCounter === 150) debug.gameReset();
        }
    }
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
            this.objects.get('4').forEach(pBullet => {
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
                            if (enemy.hp > 0) enemy.hitState = 1;
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
        let player = this.objects.get('5')[0];
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
    // Entities update function
    updateEntity(entity) {
        if(!entity.dying) { 
            // General updates for all entities
            entity.hitState = 0;
            // Particular updateData
            entity.updateData?.();
            // Update position
            entity.updatePos?.();
        } else {
            // Only dying enemies
            this.flickerDelayedAndDie(entity);
        }
        // Anything besides the player must be killed if out of bounds.
        // These entities has a deadBound string that specifies on which bound must be killed
        if(entity.deadBound) this.killIfOutOfBounds(entity);
        // Non-particles get their hitbox updated
        entity.updateHitbox();
        // Test for out of bounds (Player only)
        if (entity instanceof Player) {
            entity.fixOutOfBounds();
            entity.updateHitbox();
        };
        // Fix opacity if under 0
        if (entity.opacity < 0) entity.opacity = 0;
    }
    killIfOutOfBounds(entity){
        let where = entity.deadBound;

        // Player bullets
        if (where === 'top') {
            if (entity.y <= 0) entity.hp = 0;
            return;
        }

        // Most enemies
        if (where === 'bottom'){
            if (entity.y >= entity.displayHeight + entity.height / 2) entity.hp = 0;
            return;
        } 
            
        // Enemy Bullets
        if (where === 'any') {
            if (entity.y >= entity.displayHeight + entity.height / 2 ||
                entity.y <= 0 - entity.height / 2                    ||
                entity.x >= entity.displayWidth + entity.width / 2   ||
                entity.x <= 0 - entity.width / 2) {
                    entity.hp = 0;
            }
            return;
        }
        // Some enemies
        if (where === 'left') {
            if (entity.x <= 0 - entity.width / 2) entity.hp = 0; 
            return;
        }
        // Some enemies (also this has no guard clause because end of function)
        if (where === 'right' && entity.x >= entity.displayWidth + entity.width / 2) entity.hp = 0;
    }
    // Killing entities
    removeDeadEntities(){
        for (const [_, arr] of this.objects){
            for (let i = arr.length-1; i >= 0; i--) {
                // Si no tiene hp y no tiene flag dying activada, kill.
                // if (arr[i].hp <= 0 && !arr[i].dying) arr[i].kill();
                if (arr[i].hp <= 0 && !arr[i].dying) this.explodeAndFree(arr[i]);
                // Tras eso, todos los que hayan quedado free, sacarlos del array.
                if (arr[i].free) arr.splice(i,1);
            };
        }
    }
    explodeAndFree(entity){
        // Enemies with flag delayFree which want an explosion will not die/explode instantly...
        if (entity.explode && entity.delayedFree) {
            // Start dying process right away
            this.flickerDelayedAndDie(entity);
            // Activating this flag will call flickerAndDie() instead of the regular update fns every frame
            entity.dying = true;
            // Reset flag to false
            entity.explode = false;
            // Return here
            return
        }

        // Para los demas: Si ha sido matado por colision y tiene data de la explosion, generar particulas
        if (entity.explode) {
            // Queue particles passing current entity data
            entity.spawnParticles(entity.explosionData());
            // Reset flag to false
            entity.explode = false;
            // Audio: explosion sfx flag
            entity.sfxFlags.xplos = true;
        }

        // Player will also be positioned far so that eBullets will always go down
        if (entity instanceof Player) {
            entity.positionFar();
            entity.sfxFlags.die = true; // Audio: Die sfx flag
        }

        // Finally, all entities EXCEPT those with delayFree flag will be free NOW
        entity.free = 1;
    }
    flickerDelayedAndDie(entity){
        // (use timer 8 for explosions and stuff) Will adjust this later on
        // Set randomness
        let rndX = this.math.randomBetween(-entity.width/2,entity.width/2);
        let rndY = this.math.randomBetween(-entity.height/2,entity.height/2);

        // If timer is 0, 10, 20..etc
        if (entity.timers[8]%10 === 0) {
            // Little smoke with added random position
            entity.spawnParticles({
                qty: 4,  
                options: {
                    x: entity.x+rndX, 
                    y:entity.y+rndY, 
                    speed: 1, 
                    subSpdRange:[0.5,1],
                    colors:['#eee','#ddd','#ccc','#bbb']
                }
            })
            // Sound
            entity.sfxFlags.xplos_S = true;
        }
        // Hit state (dissappear) when timer is NOT 0, 4, 8..etc
        entity.hitState = entity.timers[8]%4 ? 1 : 0;
        // Start counting at this moment. Up until now timer was always 0.
        entity.timerCount(60, 8)
        // More: Also fall...
        entity.y+=0.2;
        // More: Also shrink a bit
        entity.scale-=0.005

        // When timer ends
        if (entity.timers[8] === 60) {
            // Big explosion at the end
            entity.spawnParticles({qty: 20, options: {x: entity.x, y:entity.y}})
            // Sound
            entity.sfxFlags.xplos_L = true;
            // Free entity for reuse
            entity.free = true;
        }
    }
    // Extra
    runQueued(){
        this.queuedFns.forEach(fn => fn());
        this.queuedFns.length = 0;
    }
}