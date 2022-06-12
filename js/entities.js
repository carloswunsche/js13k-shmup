//////////////////////////
// ENTITIES
//////////////////////////

class Entity {
    constructor(image){
        this.free = true;
        this.image = image;
        this.width = image.sWidth;
        this.height = image.height;
	    this.imageTile = 0;
        // Fallback if not declared on child
        this.opacity = 100;
        this.angle = 0;
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
    }
    update (playerInputData) {
        // General updates for all entities
        this.updateDataGeneral(playerInputData);
        // If instance has these functions, run them
        if(this.updateDataParticular) this.updateDataParticular(playerInputData);
        if (this.updatePos) this.updatePos(playerInputData);

        // Non-particles get their hitbox updated
        if ((this instanceof Particle) === false) this.hitbox = this.setHitbox();

        // Player only
        if (this.outOfBounds) {
            this.fixOutOfBounds();
            this.hitbox = this.setHitbox();
            this.outOfBounds = false;
        };
    }
    updateDataGeneral(playerInputData) {
        this.imageTile = 0;
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
        super (image);
        this.free = false;
        this.x = display.width / 2;
        this.y = display.height / 2;
        this.outOfBounds = false;
        this.speed = 2.5;
        this.shotBufferInit = 4;
        this.shotBuffer = 0;
        this.hp = 1;
        this.hitbox = this.setHitbox(4,4,0,3);
        this.zzfx = zzfx
    }
    updateDataParticular (playerInputData) {
        // Adjust input in boundaries
        this.blockInputIfBoundary(playerInputData);

        // Set vector when diagonals
        this.setVectorAmplitude(playerInputData);

        // Shot
        if (playerInputData.buttons[4] > 0 && this.shotBuffer <= 0) {
            this.shot('PlayerBullet', 'PlayerBullet', this.x, this.y)
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
            if (this.hitbox[1] >= display.width) {buttons[1] = 0; this.outOfBounds = true;}
        };
        if (axis[1] !==0) {
            if (this.hitbox[2] <= 0) {buttons[0] = 0; this.outOfBounds = true;}
            if (this.hitbox[3] >= display.height) {buttons[2] = 0; this.outOfBounds = true;}
        };
    }
    fixOutOfBounds () {
        if (this.hitbox[0] < 0) this.x = this.xMargin - this.xOffset;
        if (this.hitbox[1] > display.width) this.x = display.width - this.xMargin - this.xOffset;
        if (this.hitbox[2] < 0) this.y = this.yMargin - this.yOffset;
        if (this.hitbox[3] > display.height) this.y = display.height - this.yMargin - this.yOffset;
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
    reset([x, y, side = 9]){
        this.x = x + side;
        this.y = y - 12;
        this.hp = 1;
        this.hitbox = this.setHitbox(this.width/2, this.height/2);
    }
    updateDataParticular () {
        // Destroy if out of the top
        if (this.y < 0) this.hp = 0;
    }
    updatePos () {
        this.y -= this.speed * step;
    };
}

//////////////////////////
// ENEMIES
//////////////////////////

class Enemy extends Entity {
    constructor(image) {
        super(image)
    }
    reset(custom){
        this.sound = undefined;
        this.hp = this.r__hp;
        this.hitbox = this.r__hitbox;
        this.timers = new Array(10).fill(0);
        this.x = custom?.x || this.r__x;
        this.y = custom?.y || this.r__y;
        this.phase = custom?.phase || 1;
    }
    easeOutCubic(xy, startPos, goTo, timeInFrames, timerUsed = 1){
        this[xy] = (goTo-startPos) * (1 - Math.pow(1 - this.timers[timerUsed]/timeInFrames, 3)) + startPos;
        this.timerCount(timeInFrames, timerUsed);
    }
    easeInOutSine(xy, startPos, goTo, timeInFrames, timerUsed = 1){
        this[xy] = (goTo-startPos) * (-(Math.cos(Math.PI * this.timers[timerUsed]/timeInFrames) - 1) / 2) + startPos;
        this.timerCount(timeInFrames, timerUsed);
    }
    sin(xy, halfCycle, freq, centerPoint, timerUsed = 1){
        this[xy] = halfCycle * Math.sin(this.timers[timerUsed]/32*freq) + centerPoint;
        this.timerCount();
    }
    cos(xy, phase, cycle, freq, centerPoint, timerUsed = 1){
        this[xy] = cycle/2*phase * Math.cos(this.timers[timerUsed]/32*freq) + centerPoint;
        this.timerCount();
    }
    timerCount(timeInFrames = 999, timerUsed = 1) {
        if(this.timers[timerUsed] < timeInFrames) this.timers[timerUsed] += 1*step;
    }
}

class EnemyPop1 extends Enemy {
    constructor(image){
        super(image)
        this.angle = 180;
        this.r__hp = 2;
        this.r__hitbox = this.setHitbox(this.width/2-1, this.height/2-3);
        this.r__x = 25;
        this.r__y = -this.height/2;
    }
    updateDataParticular () {
        // Destroy if out of bounds (bottom)
        if (this.y > this.displayHeight + this.height/2) this.hp = 0;
    }
    updatePos(){
        this.cos('x',this.phase, 260, 1, 160);
        this.y += 1 * step
    }
}

class Tank extends Enemy {
    constructor(image){
        super(image)
        this.r__hp = 6
        this.r__hitbox = this.setHitbox(this.width/2-2, this.height/2-6,0,-2);
        this.r__x = 160;
        this.r__y = -this.height/2;
    }
    updateDataParticular () {
        // Destroy if out of bounds (bottom)
        if (this.y > this.displayHeight + this.height/2) this.hp = 0;
    }
    updatePos(){
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
        // To set angle towards player position:
        // this.angle = Math.atan2(this.y - this.player.y, this.player.x - this.x);
        // To set a random angle:
        this.angle = toRadians(randomBetween(0, 359));
    }
    updateDataParticular () {
        // When speed is low, free
        this.speed -= randomBetween(2, 8)/20 * step
        if (this.speed <= 1) this.hp = 0;
    }
    updatePos () {
        this.x = this.x + Math.cos(this.angle) * this.speed * step;
        this.y = this.y - Math.sin(this.angle) * this.speed * step;
        this.y = this.y + 1 * step;
    }
}
