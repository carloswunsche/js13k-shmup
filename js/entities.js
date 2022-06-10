//////////////////////////
// ENTITIES
//////////////////////////

class Entity {
    constructor(image){
        this.free = true;
        this.image = image;
        this.width = image.width;
        this.height = image.height;
        // Fallback if not declared on child
        this.opacity = 100;
        this.angle = 0;
        this.x = -99;
        this.y = -99;
        // Taken from global: Used for bullet liberation
        this.pool = pool;
        // Taken from global: Used for spawning bullets
        this.queue = game.runBeforeRender;
    }
    update (playerInputData) {
        this.updateData(playerInputData);
        this.updatePos(playerInputData);
        this.hitbox = this.setHitbox();

        // Player only
        if (this.outOfBounds) {
            this.fixOutOfBounds();
            this.hitbox = this.setHitbox();
            this.outOfBounds = false;
        };
    }
    updateData() {}
    updatePos () {}
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
        this.x = display.width / 2;
        this.y = display.height / 2;
        this.outOfBounds = false;
        this.speed = 2.5;
        this.shotBufferInit = 4;
        this.shotBuffer = 0;
        this.hp = 1;
        this.hitbox = this.setHitbox(4,4,0,3);
    }
    updateData (playerInputData) {
        // Adjust input in boundaries
        this.blockInputIfBoundary(playerInputData);

        // Set vector when diagonals
        this.setVectorAmplitude(playerInputData);

        // Shot
        if (playerInputData.buttons[4] > 0 && this.shotBuffer === 0) {
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
        this.queue.push(() => {this.pool.getFreeObject(entity, type, x, y, 9)});
        this.queue.push(() => {this.pool.getFreeObject(entity, type, x, y, -8)});
    }
}

class PlayerBullet extends Entity {
    constructor(image) {
        super (image);
        this.speed = 12;
    }
    reset(x, y, side = 9){
        this.x = x + side;
        this.y = y - 12;
        this.hp = 1;
        this.hitbox = this.setHitbox(this.image.width/2, this.image.height/2);
    }
    updateData () {
        // Destroy if out of the top
        if (this.y < 0) this.hp = 0;
    }
    updatePos () {
        this.y -= this.speed * step;
    };
}

class Enemy extends Entity {
    constructor(image) {
        super(image)
    }
    reset(){
        this.hp = this.r__hp;
        this.hitbox = this.r__hitbox;
        this.timers = new Array(10).fill(0);
    }
    easeOutCubic(xy, startPos, goTo, timeInFrames, timerUsed){
        this[xy] = (goTo-startPos) * (1 - Math.pow(1 - this.timers[timerUsed]/timeInFrames, 3)) + startPos;
        this.timerCount(timeInFrames, timerUsed);
    }
    easeInOutSine(xy, startPos, goTo, timeInFrames, timerUsed){
        this[xy] = (goTo-startPos) * (-(Math.cos(Math.PI * this.timers[timerUsed]/timeInFrames) - 1) / 2) + startPos;
        this.timerCount(timeInFrames, timerUsed);
    }
    timerCount(timeInFrames, timerUsed) {
        if(this.timers[timerUsed] < timeInFrames) this.timers[timerUsed] += 1*step;
    }
}

class EnemyPop1 extends Enemy {
    constructor(image){
        super(image)
        this.angle = 180;
        this.r__hp = 1
        this.r__hitbox = this.setHitbox(this.image.width/2-1, this.image.height/2-3);
    }
    updatePos(){
        this.easeInOutSine('y', -this.image.height, display.height-20, 200, 1);
        this.easeInOutSine('x', -this.image.width, display.width-20, 120, 2);
    }
}