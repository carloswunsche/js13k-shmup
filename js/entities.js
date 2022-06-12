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
        // Taken from global: Used for enemy bullets to follow player
        this.player = game.objects.get('Player')[0];
        // Taken from global: Used for positioning relative to display
        this.displayWidth = display.width;
        this.displayHeight = display.height;
        // Taken from global: To play sounds
        this.zzfx = zzfx;
    }
    update (playerInputData) {
        // General updates for all entities
        this.updateDataGeneral();
        // Particular updateData
        this.updateData2(playerInputData);
        // Update position
        this.updatePos(playerInputData);
        // Non-particles get their hitbox updated
        if (this.hitbox) this.hitbox = this.setHitbox();
        // Player only calculations
        if (this.outOfBounds) {
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
            this.x - this.xMargin + this.xOffset,  //x1
            this.x + this.xMargin + this.xOffset,  //x2
            this.y - this.yMargin + this.yOffset,  //y1
            this.y + this.yMargin + this.yOffset,  //y2
        ];
    }
}

class Player extends Entity {
    constructor(image) {
        // Immutables
        super (image);
        this.speed = 2.5;
        this.shotBufferInit = 4;
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
    updateData2 (playerInputData) {
        // Adjust input in boundaries
        this.blockInputIfBoundary(playerInputData);

        // Set vector when diagonals
        this.setVectorAmplitude(playerInputData);

        // Shot
        if (playerInputData.buttons[4] > 0 && this.shotBuffer <= 0) {
            this.shot('PlayerBullet', 'PlayerBullet', this.x, this.y);
            this.shotBuffer = this.shotBufferInit;
        }
        if (this.shotBuffer > 0) this.shotBuffer -= 1 * step;
    }
    updatePos ({axis}) {
        this.x += this.speed * this.amplitude * axis[0] * step;
        this.y += this.speed * this.amplitude * axis[1] * step;
    }
    blockInputIfBoundary ({axis, buttons}) {
        // Evaluar los axis evita calculos innecesarios cuando la nave esta quieta sobre los bounds
        if (axis[0] !== 0) {
            if (this.hitbox[0] <= 0) {buttons[3] = 0; this.outOfBounds = true;}
            if (this.hitbox[1] >= this.displayWidth) {buttons[1] = 0; this.outOfBounds = true;}
        };
        if (axis[1] !==0) {
            if (this.hitbox[2] <= 0) {buttons[0] = 0; this.outOfBounds = true;}
            if (this.hitbox[3] >= this.displayHeight) {buttons[2] = 0; this.outOfBounds = true;}
        };
    }
    fixOutOfBounds () {
        if (this.hitbox[0] < 0) this.x = this.xMargin - this.xOffset;
        if (this.hitbox[1] > this.displayWidth) this.x = this.displayWidth - this.xMargin - this.xOffset;
        if (this.hitbox[2] < 0) this.y = this.yMargin - this.yOffset;
        if (this.hitbox[3] > this.displayHeight) this.y = this.displayHeight - this.yMargin - this.yOffset;
        this.outOfBounds = false;
    }
    setVectorAmplitude ({buttons}) {
        this.amplitude =
                buttons[0] && buttons[1] || 
                buttons[1] && buttons[2] ||
                buttons[2] && buttons[3] || 
                buttons[3] && buttons[0] ? 0.707 : 1;
    }
    shot(entity, type, x, y) {
        this.queue.push(() => {this.pool.getFreeObject(entity, type,[x, y, 9])});
        this.queue.push(() => {this.pool.getFreeObject(entity, type,[x, y,-8])});
        this.zzfx(...[.1,,1450,,.01,0,2,.37,-42,,-18,.19,,,-0.8,,,.63,.01,.81]); // Blip 80
    }
}

class PlayerBullet extends Entity {
    constructor(image) {
        super (image);
        this.speed = 12;
    }
    reset([x, y, side]){
        this.x = x + side;
        this.y = y - 12;
        this.hp = 1;
        this.hitbox = this.setHitbox(this.width/2, this.height/2);
    }
    updateData2 () {
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
    }
    reset(custom){
        this.sound = 'none';
        this.hp = this.r__hp;
        this.hitbox = this.r__hitbox;
        this.x = custom?.x || this.r__x;
        this.y = custom?.y || this.r__y;
        this.phase = custom?.phase || 1;
        this.rotation = this.r__rotation || 0;
        this.timers.fill(0);
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

class EnemyPop1 extends Enemy {
    constructor(image){
        super(image)
        // Used by Enemy class reset
        this.r__rotation = 180;
        this.r__hp = 2;
        this.r__hitbox = this.setHitbox(this.width/2-1, this.height/2-3);
        this.r__x = 25;
        this.r__y = -this.height/2;
    }
    updateData2 () {
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

class Tank extends Enemy {
    constructor(image){
        super(image)
        // Used by Enemy class reset
        this.r__hp = 6
        this.r__hitbox = this.setHitbox(this.width/2-2, this.height/2-6,0,-2);
        this.r__x = 160;
        this.r__y = -this.height/2;
    }
    updateData2 () {
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
    updateData2 () {
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
