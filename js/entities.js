//////////////////////////
// ENTITIES
//////////////////////////

class Entity {
    constructor(image){
        this.free = true;
        this.image = image;
        this.width = image.sWidth;
        this.height = image.height;
	    this.animation = 0;
        this.opacity = 100;
        this.rotation = 0;
        this.x = 50;
        this.y = 50;
        // Taken from global: Used for bullet shooting
        this.pool = pool;
        // Taken from global: Used for queue spawning bullets after objects updateData
        this.queue = game.queuedFns;
        // Taken from global: Used for positioning relative to display
        this.displayWidth = display.width;
        this.displayHeight = display.height;
        // Taken from global: To play sounds
        this.zzfx = zzfx;
    }
    update () {
        // General updates for all entities
        this.updateDataGeneral();
        // Particular updateData
        this.updateData();
        // Update position
        this.updatePos();
        // Non-particles get their hitbox updated
        if (this.hitbox) this.hitbox = this.setHitbox();
        // Test for out of bounds (Player only)
        if (this instanceof Player) {
            this.fixOutOfBounds();
            this.hitbox = this.setHitbox();
        };
    }
    updateDataGeneral() {
        this.animation = 0;
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
            this.x - this.xMargin + this.xOffset,  //x1 (left)
            this.x + this.xMargin + this.xOffset,  //x2 (right)
            this.y - this.yMargin + this.yOffset,  //y1 (up)
            this.y + this.yMargin + this.yOffset,  //y2 (down)
        ];
    }
}

class Player extends Entity {
    constructor(image) {
        // Immutables
        super (image);
        this.speed = 2.5;
        this.shotBufferInit = 4;
        // Taken from global: Used for moving and shooting
        this.buttons = input.buttons;
    }
    reset(){
        this.outOfBounds = false;
        this.x = this.displayWidth / 2;
        this.y = 180;
        this.shotBuffer = 0;
        this.hp = 1;
        this.hitbox = this.setHitbox(4,4,0,3);
        // Just because you're always using it...
        this.free = false;
        // Useful if chaining methods
        return this;  
    }
    updateData () {
        // If button pressed & buffer empty...
        if (this.buttons[4] > 0 && this.shotBuffer <= 0) {
            // Queue 2 bullets
            this.queue.push(() => {this.pool.getFreeObject('PlayerBullet', 'PlayerBullet',{x: this.x, y: this.y, offset: 9})});
            this.queue.push(() => {this.pool.getFreeObject('PlayerBullet', 'PlayerBullet',{x: this.x, y: this.y, offset: -8})});
            // Blip!
            this.zzfx(...[.1,,1450,,.01,0,2,.37,-42,,-18,.19,,,-0.8,,,.63,.01,.81]);
            // Reset buffer
            this.shotBuffer = this.shotBufferInit;
        }
        // Buffer timer
        if (this.shotBuffer > 0) this.shotBuffer -= 1 * step;
    }
    updatePos () {
        // Start from no-movement
        this.xDir = 0; this.yDir = 0;
        // Un-press button if out of bounds
        if (this.hitbox[2] <= 0)                    this.buttons[0] = 0;
        if (this.hitbox[1] >= this.displayWidth)    this.buttons[1] = 0;
        if (this.hitbox[3] >= this.displayHeight)   this.buttons[2] = 0;
        if (this.hitbox[0] <= 0)                    this.buttons[3] = 0;
        // Set direction based on pressed buttons
        if (this.buttons[0]) this.yDir--
        if (this.buttons[1]) this.xDir++
        if (this.buttons[2]) this.yDir++
        if (this.buttons[3]) this.xDir--
        // Set correct vector amplitude
        this.vectorAmp = this.setVectorAmplitude(); // 1 or 0.707
        // Update position
        this.x += (this.xDir * this.vectorAmp) * this.speed * step;
        this.y += (this.yDir * this.vectorAmp) * this.speed * step;
    }
    setVectorAmplitude () {
        // If diagonals then return 0.707, if not return 1
        return this.buttons[0] && this.buttons[1] ||
               this.buttons[1] && this.buttons[2] ||
               this.buttons[2] && this.buttons[3] || 
               this.buttons[3] && this.buttons[0] ? 0.707 : 1;
    }
    fixOutOfBounds () {
        if (this.hitbox[2] < 0) this.y = this.yMargin - this.yOffset;
        if (this.hitbox[1] > this.displayWidth) this.x = this.displayWidth - this.xMargin - this.xOffset;
        if (this.hitbox[3] > this.displayHeight) this.y = this.displayHeight - this.yMargin - this.yOffset;
        if (this.hitbox[0] < 0) this.x = this.xMargin - this.xOffset;
    }
}

class PlayerBullet extends Entity {
    constructor(image) {
        super (image);
        this.speed = 12;
    }
    reset(custom){
        this.x = custom.x + custom.offset;
        this.y = custom.y - 12;
        this.hp = 1;
        this.hitbox = this.setHitbox(this.width/2, this.height/2);
    }
    updateData () {
        // Destroy if out of the top
        if (this.y <= 0) this.hp = 0;
    }
    updatePos () {
        // Move up
        this.y -= this.speed * step;
    };
}

//////////////////////////
// ENEMIES
//////////////////////////

class Enemy extends Entity {
    constructor(image) {
        super(image)
        this.timers = new Array(10).fill(0);
        // Taken from global: Used for Enemy and EnemyBullet to follow player
        // NOTE: NO sirve llamar a X y a Y individualmente. Hay que tener acceso
        // al objeto entero para que sus propiedades esten siempre actualizadas.
        this.player = game.objects.get('Player')[0];
    }
    reset(custom){
        this.sound = 'none';
        this.hp = this.r__hp || 1;
        this.hitbox = this.r__hitbox;
        this.side = custom?.side || 1;
        this.x = custom?.x || this.r__x || this.displayWidth/2;
        this.y = custom?.y || this.r__y || -this.height/2;
        this.phase = custom?.phase || 1;
        this.speed = custom?.speed || this.r__speed || 1;
        this.rotation = this.r__rotation || 0;
        this.timers.fill(0);
        // If reset2 exists for this entity, run!
        this.reset2?.(custom);
        // Useful if chaining methods
        return this;
    }
    easeOutCubic(xy, startPos, goTo, timeInFrames, timerUsed = 0){
        this[xy] = (goTo-startPos) * (1 - Math.pow(1 - this.timers[timerUsed]/timeInFrames, 3)) + startPos;
    }
    easeInOutSine(xy, startPos, goTo, timeInFrames, timerUsed = 0){
        this[xy] = (goTo-startPos) * (-(Math.cos(Math.PI * this.timers[timerUsed]/timeInFrames) - 1) / 2) + startPos;
    }
    sin(xy, halfCycle, freq, centerPoint, timerUsed = 0){
        this[xy] = halfCycle * Math.sin(this.timers[timerUsed]/32*freq) + centerPoint;
    }
    cos(xy, phase, cycle, freq, centerPoint, timerUsed = 0){
        this[xy] = cycle/2*phase * Math.cos(this.timers[timerUsed]/32*freq) + centerPoint;
    }
    timerCount(timeInFrames = 999, timerUsed = 0) {
        // Para que no se pueda usar un timer inexistente
        if (timerUsed >= this.timers.length) timerUsed = this.timers.length-1;
        // Count time
        if(this.timers[timerUsed] < timeInFrames) this.timers[timerUsed] += 1*step;
    }
}
class EnemyBullet extends Enemy {
    constructor(image) {
        super (image);
        this.r__hitbox = this.setHitbox(this.width/2, this.height/2);
    }
    reset2(custom){
        this.angle = custom?.angle === 'toPlayer' ? Math.atan2(this.y - this.player.y, this.player.x - this.x) : this.r__angle || 0;

        this.angle += (toRadians(custom?.add) || 0)
    }
    updateData () {
        // Destroy if out of bounds (how ?)
        // temporal
        if (this.timers[0] === 500) this.hp = 0;
    }
    updatePos () {
        // Move in the direction of player
        this.x = this.x + Math.cos(this.angle) * this.speed * step;
        this.y = this.y - Math.sin(this.angle) * this.speed * step;
        this.timerCount(500)

    };
}
class EnemyPop1 extends Enemy {
    constructor(image){
        super(image)
        // Used by Enemy class reset
        this.r__hitbox = this.setHitbox(this.width/2-1, this.height/2-3);
        this.r__hp = 2;
    }
    updateData () {
        // Destroy if out of bounds (bottom)
        if (this.y > this.displayHeight + this.height/2) this.hp = 0;
    }
    updatePos(){
        // Cosine movement
        this.cos('x', this.phase, 260, 1, 160);
        this.timerCount(999);
        this.y += 1 * step
    }
}
class EnemyPop2 extends Enemy {
    constructor(image){
        super(image)
        // Used by Enemy class reset
        this.r__hitbox = this.setHitbox(this.width/2-4, this.height/2-5);
        this.r__speed = 3;
        this.r__hp = 3;
    }
    updateData () {
        this.timerCount(100);
        if (this.timers[0] < 50) this.speed -= 0.05 * step;
        if (this.timers[0] === 80) {
            // Shot!
            this.pool.getFreeObject('EnemyBullet', 'EnemyBullet', {x: this.x+1, y: this.y+6, speed: 2, angle:'toPlayer'});
            // Sound
            this.zzfx(...[.1,,346,,,.01,,1.64,-4.1,,,,,.9,,,.04,.95,.08]);
        }
        if (this.timers[0] === 100) this.speed += 0.04 * step;
        // Destroy if out of bounds (bottom)
        if (this.y > this.displayHeight + this.height/2) this.hp = 0;
    }
    updatePos(){
        // Go down adding (variable) speed
        this.y += this.speed * step;
    }
}
class EnemyPop3 extends Enemy {
    constructor(image){
        super(image)
        // Used by Enemy class reset
        this.r__hitbox = this.setHitbox(this.width/2-2, this.height/2-2);
        this.r__hp = 4;
        this.r__y = 10;
    }
    reset2(){
        this.x = this.displayWidth/2 - (this.displayWidth/2 + 40) * this.side;
    }
    updateData () {
        this.timerCount(300);
        if (this.timers[0] === 80) {
            // Shot 3 bulletz
            this.pool.getFreeObject('EnemyBullet', 'EnemyBullet', {x: this.x+1, y: this.y+6, speed: 2, angle:'toPlayer', add:-20});
            this.pool.getFreeObject('EnemyBullet', 'EnemyBullet', {x: this.x+1, y: this.y+6, speed: 2, angle:'toPlayer'});
            this.pool.getFreeObject('EnemyBullet', 'EnemyBullet', {x: this.x+1, y: this.y+6, speed: 2, angle:'toPlayer', add:20});
            // Sound
            this.zzfx(...[.1,,346,,,.01,,1.64,-4.1,,,,,.9,,,.04,.95,.08]);
        }
        // If out of bounds
        // (side === 1)
        if (this.side === 1 && this.x >= this.displayWidth + this.height/2) this.hp = 0;
        // (side === -1)
        if (this.side === -1 && this.x <= 0 - this.height/2) this.hp = 0;
    }
    updatePos(){
        // Go down adding (variable) speed
        this.x += (this.speed * 1.5) * this.side * step;
        this.y += (this.speed * 0.5) * step;
    }
}

class Tank extends Enemy {
    constructor(image){
        super(image)
        // Used by Enemy class reset
        this.r__hitbox = this.setHitbox(this.width/2-2, this.height/2-6,0,-2);
        this.r__hp = 6
    }
    updateData () {
        // Destroy if out of bounds (bottom)
        if (this.y > this.displayHeight + this.height/2) this.hp = 0;
    }
    updatePos(){
        // Go down
        this.y += 1.1 * step;
    }
}

//////////////////////////
// PARTICLES
//////////////////////////


class Particle extends Entity {
    constructor(image) {
        super(image)
    }
    reset([x, y]){
        this.x = x;
        this.y = y;
        this.hp = 1;
        this.speed = 5;
        // Set random angle:
        this.angle = toRadians(randomBetween(0, 359));
        // To set angle towards player position:
        // this.angle = Math.atan2(this.y - this.player.y, this.player.x - this.x);
    }
    updateData () {
        // Subtract speed until bye
        this.speed -= randomBetween(2, 8)/20 * step
        if (this.speed <= 1) this.hp = 0;
    }
    updatePos () {
        this.x = this.x + Math.cos(this.angle) * this.speed * step;
        this.y = this.y - Math.sin(this.angle) * this.speed * step;
        this.y = this.y + 1 * step;
    }
}
