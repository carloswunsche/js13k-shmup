//////////////////////////
// ENTITIES
//////////////////////////

// Layers Guide
// 1=EnemyLand, 2=EnemyAir, 3=Particle, 4=Player, 5=pBullet, 6=eBullet, 7=Hud
class Entity {
    constructor(image) {
        this.free = true;
        this.image = image;
        this.width = image?.width;
        this.height = image?.height;
        this.hit = 0;
        // Unnecesary?
        this.opacity = 100;
        this.rotation = 0;
        this.x = 50;
        this.y = 50;
        // For scaling entities
        this.scale = 1;

        // Taken from global: Used for bullet shooting
        this.pool = pool;
        // Taken from global: Used for queue spawning bullets after objects updateData
        this.queue = game.queuedFns;
        // Taken from global: Used for positioning relative to display
        this.displayWidth = display.width;
        this.displayHeight = display.height;
        // Taken from global: To flag sounds
        this.sfx = game.audio.sfx;
    }
    update() {
        // Particular updateData
        this.updateData?.();
        // Update position
        this.updatePos?.();
        // Kill if out of bounds flag
        if(this.deadBound) this.killIfOutOfBounds(this.deadBound);
        // Non-particles get their hitbox updated
        if (this.hitbox) this.hitbox = this.setHitbox();
        // Test for out of bounds (Player only)
        if (this instanceof Player) {
            this.fixOutOfBounds();
            this.hitbox = this.setHitbox();
        };
        // General updates for all entities
        this.hit = 0;
        if (this.opacity < 0) this.opacity = 0;
    }
    setHitbox(xMargin = 2, yMargin = 2, xOffset = 0, yOffset = 0) {
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
    killIfOutOfBounds(where){
        // Reduce strings
        // Player bullets
        if (where === 'top') {
            if (this.y <= 0) this.hp = 0;
            return;
        }

        // Most enemies
        if (where === 'bottom'){
            if (this.y >= this.displayHeight + this.height / 2) this.hp = 0;
            return;
        } 
            
        // Enemy Bullets
        if (where === 'any') {
            if (this.y >= this.displayHeight + this.height / 2 ||
                this.y <= 0 - this.height / 2                  ||
                this.x >= this.displayWidth + this.width / 2   ||
                this.x <= 0 - this.width / 2) {
                    this.hp = 0;
            }
            return;
        }
        // Some enemies
        if (where === 'left') {
            if (this.x <= 0 - this.width / 2) this.hp = 0; 
            return;
        }
        // Some enemies (also this has no guard clause because end of function)
        if (where === 'right' && this.x >= this.displayWidth + this.width / 2) this.hp = 0;
    }
    // General calculation functions
    toRadians(degrees) {
        return degrees * M.PI / 180
    }
    randomBetween(min, max) {
        return M.floor(M.random() * (max - min + 1) + min)
    }
}

class Player extends Entity {
    constructor(image) {
        // Immutables
        super(image);
        this.speed = 1.5;
        this.shotBufferInit = 5;
        // Taken from global: Used for moving and shooting
        this.buttons = input.buttons;
    }
    reset() {
        this.outOfBounds = 0;
        this.x = this.displayWidth / 2;
        this.y = 95;
        this.shotBuffer = 0;
        this.hp = 1;
        this.hitbox = this.setHitbox(2, 2, 0, 2);
        // Useful if chaining methods
        return this;
    }
    updateData() {
        // Shot: If button pressed & buffer empty...
        if (this.buttons[4] > 0 && this.shotBuffer <= 0) {
            // Queue 2 bullets
            this.queue.push(() => { this.pool.free('PlayerBullet', '5', { x: this.x, y: this.y, offset:  4 }) });
            this.queue.push(() => { this.pool.free('PlayerBullet', '5', { x: this.x, y: this.y, offset: -4 }) });
            // Sound
            this.sfx.pShot = true;
            // Reset buffer
            this.shotBuffer = this.shotBufferInit;
        }
        // Buffer timer
        if (this.shotBuffer > 0) this.shotBuffer -= 1;
    }
    updatePos() {
        // Start from no-movement
        this.xDir = 0; this.yDir = 0;
        // Un-press button if out of bounds
        if (this.hitbox[2] <= 0) this.buttons[0] = 0;
        if (this.hitbox[1] >= this.displayWidth) this.buttons[1] = 0;
        if (this.hitbox[3] >= this.displayHeight) this.buttons[2] = 0;
        if (this.hitbox[0] <= 0) this.buttons[3] = 0;
        // Set direction based on pressed buttons
        if (this.buttons[0]) this.yDir--
        if (this.buttons[1]) this.xDir++
        if (this.buttons[2]) this.yDir++
        if (this.buttons[3]) this.xDir--
        // Set correct vector amplitude
        this.vectorAmp = this.setVectorAmplitude(); // 1 or 0.707
        // Update position
        this.x += (this.xDir * this.vectorAmp) * this.speed;
        this.y += (this.yDir * this.vectorAmp) * this.speed;
    }
    setVectorAmplitude() {
        // If diagonals then return 0.707, if not return 1
        return this.buttons[0] && this.buttons[1] ||
            this.buttons[1] && this.buttons[2] ||
            this.buttons[2] && this.buttons[3] ||
            this.buttons[3] && this.buttons[0] ? .707 : 1;
    }
    fixOutOfBounds() {
        if (this.hitbox[2] < 0) this.y = this.yMargin - this.yOffset;
        if (this.hitbox[1] > this.displayWidth) this.x = this.displayWidth - this.xMargin - this.xOffset;
        if (this.hitbox[3] > this.displayHeight) this.y = this.displayHeight - this.yMargin - this.yOffset;
        if (this.hitbox[0] < 0) this.x = this.xMargin - this.xOffset;
    }
    disable() {
        this.x = this.displayWidth / 2;
        this.y = this.displayHeight + 99;
    }
}

class PlayerBullet extends Entity {
    constructor(image) {
        super(image);
        this.speed = 6;
        this.deadBound = 'top';
    }
    reset(custom) {
        this.x = custom.x + custom.offset;
        this.y = custom.y - 6;
        this.hp = 1;
        this.hitbox = this.setHitbox(this.width / 2, this.height / 2);
    }
    updateData() {
        // Destroy if out of the top
        if (this.y <= 0) this.hp = 0;
    }
    updatePos() {
        // Move up
        this.y -= this.speed;
    };
}

//////////////////////////
// ENEMIES
//////////////////////////

class Enemy extends Entity {
    constructor(image) {
        super(image)
        this.timers = new Array(9).fill(0);
        // Taken from global: Used for Enemy and EnemyBullet to follow player
        // NOTE: NO sirve llamar a X y a Y individualmente. Hay que tener acceso
        // al objeto entero para que no se haga shallow copy de sus propiedades.
        this.player = pool.type.Player[0];
        // Taken from global: For accurate movement of EnemyLand's (using bg's speed)
        this.stage = stage;
    }
    reset(custom) {
        this.hp = this.r__hp || 1;
        this.hitbox = this.r__hitbox;
        this.side = custom?.side || 1;
        this.x = custom?.x || this.r__x || this.displayWidth / 2;
        this.y = custom?.y || this.r__y || -this.height / 2;
        this.phase = custom?.phase || 1;
        this.speed = custom?.speed || this.r__speed || 1;
        this.rotation = this.r__rotation || 0;
        this.timers.fill(0);
        // If reset2 exists for this entity, run!
        this.reset2?.(custom);
        // Useful if chaining methods
        return this;
    }
    shot(howMany = 1, spd, angle, add, offX = 0, offY = 0) {
        // Reduce layer name
        for(let i = 0; i < howMany; i++)
            this.pool.free('EnemyBullet', '6', 
                {x: this.x + offX, 
                y: this.y + offY, 
                speed: spd, 
                // This angle parameter can be the string 'toPlayer'
                angle: angle || 270 + i * (360 / howMany),
                // Multiply add to spread, if any
                add: add * (i - M.floor(howMany/2)) || 0,
            });
            // Sound
            this.sfx.eShot = true;
    }
    timerCount(timeInFrames = 999, timerUsed = 0) {
        // Para que no se pueda usar un timer inexistente
        // Unnecesary
        if (timerUsed >= this.timers.length) timerUsed = this.timers.length - 1;
        // Count time
        if (this.timers[timerUsed] < timeInFrames) this.timers[timerUsed] += 1;
    }
    // Reduce all moving functions that are not used
    easeOutCubic(xy, startPos, goTo, timeInFrames, timerUsed = 0) {
        this[xy] = (goTo - startPos) * (1 - M.pow(1 - this.timers[timerUsed] / timeInFrames, 3)) + startPos;
    }
    easeInOutSine(xy, startPos, goTo, timeInFrames, timerUsed = 0) {
        this[xy] = (goTo - startPos) * (-(M.cos(M.PI * this.timers[timerUsed] / timeInFrames) - 1) / 2) + startPos;
    }
    sin(xy, halfCycle, freq, centerPoint, timerUsed = 0) {
        this[xy] = halfCycle * M.sin(this.timers[timerUsed] / 32 * freq) + centerPoint;
    }
    cos(xy, phase, cycle, freq, centerPoint, timerUsed = 0) {
        this[xy] = cycle / 2 * phase * M.cos(this.timers[timerUsed] / 32 * freq) + centerPoint;
    }
}
class EnemyBullet extends Enemy {
    constructor(image) {
        super(image);
        this.r__hitbox = this.setHitbox(this.width / 2 - 1, this.height / 2 - 1);
        // Reduce string
        this.deadBound = 'any';
    }
    reset2(custom) {
        // Check between mode 'auto' (towards Player) and regular degrees
        if (custom?.angle === 'auto') {
            this.angle = M.atan2(this.y - this.player.y, this.player.x - this.x);
        } else {
            this.angle = this.toRadians(custom?.angle || 0);
        }
        // Add spread if any
        this.angle += this.toRadians(custom?.add) || 0;
    }
    updateData() {
        this.rotation += this.toRadians(9)
        // Destroy if out of bounds
        if (this.x <= 0 - this.width / 2) return this.hp = 0;
        if (this.x >= this.displayWidth + this.width / 2) return this.hp = 0;
        if (this.y <= 0 - this.height / 2) return this.hp = 0;
        if (this.y >= this.displayHeight + this.height / 2) return this.hp = 0;
    }
    updatePos() {
        // Move in the direction of player
        this.x = this.x + M.cos(this.angle) * this.speed;
        this.y = this.y - M.sin(this.angle) * this.speed;
    };
}
class SinePop extends Enemy {
    constructor(image) {
        super(image)
        // Used by Enemy class reset
        this.r__hitbox = this.setHitbox(this.width / 2 - 1, this.height / 2 - 2);
        // this.r__hp = 1;
        // Reduce string
        this.deadBound = 'bottom';
    }
    updatePos() {
        // Cosine movement
        this.cos('x', this.phase, 130, 1, 80);
        this.timerCount();
        this.y += 0.5
    }
}
class Sniper extends Enemy {
    constructor(image) {
        super(image)
        // Used by Enemy class reset
        this.r__hitbox = this.setHitbox(this.width / 2 - 2, this.height / 2 - 2);
        this.r__speed = 1.5;
        this.r__hp = 3;
        // Reduce string
        this.deadBound = 'bottom';
    }
    updateData() {
        this.timerCount(100);
        if (this.timers[0] < 50) this.speed -= .025;
        if (this.timers[0] === 60) this.shot(1, 1, 'auto', 0, -1, 4);
        if (this.timers[0] === 100) this.speed += .02;
    }
    updatePos() {
        // Go down adding (variable) speed
        this.y += this.speed;
    }
}
class Fatty extends Enemy {
    constructor(image) {
        super(image)
        // Used by Enemy class reset
        this.r__hitbox = this.setHitbox(this.width / 2 - 2, this.height / 2 - 2);
        this.r__hp = 4;
        this.r__y = 10;
    }
    reset2(custom) {
        // Set x starting position based on side
        this.x = this.displayWidth / 2 - (this.displayWidth / 2 + this.width/2) * this.side;
        // Set this.deadBound based on this.side
        // Reduce strings
        this.deadBound = custom?.side === 1 ? 'right' : 'left';
    }
    updateData() {
        this.timerCount(300);
        // Reduce string to number
        if (this.timers[0] === 80) this.shot(3, 1.3, 'auto', 20);
    }
    updatePos() {
        // Go down adding (variable) speed
        this.x += (this.speed * .75) * this.side;
        this.y += (this.speed * .25);
    }
}
class Tank extends Enemy {
    constructor(image) {
        super(image)
        // Used by Enemy class reset
        this.r__hitbox = this.setHitbox(this.width / 2 - 2, this.height / 2 - 2, 0, -1);
        this.r__hp = 3;
        // Reduce string
        this.deadBound = 'bottom';
    }
    updatePos() {
        // Go down
        this.y += (this.stage.bg.speed + .1);
    }
}
class Assaulter extends Enemy {
    constructor(image) {
        super(image)
        this.deadBound = 'any';
        // Used by Enemy class reset
        this.r__hitbox = this.setHitbox(12, 12);
        this.r__hp = 22;
        this.r__speed = 2.5;
        // Sprite scaling
        this.scale = 1.5;
    }
    reset2() {
        this.angle = M.atan2(this.y - this.player.y, this.player.x - this.x);
    }
    updateData() {
        this.timerCount(100);
        if (this.timers[0] < 25) this.speed -= .1;
        if (this.timers[0] === 40)  this.shot(10, 1);
        if (this.timers[0] === 80)  this.angle = M.atan2(this.y - this.player.y, this.player.x - this.x);
        if (this.timers[0] > 80)    this.speed += .02;
        if (this.timers[0] === 99)  this.shot(3, 1, 'auto', 20);
    }
    updatePos() {
        this.x = this.x + M.cos(this.angle) * this.speed;
        this.y = this.y - M.sin(this.angle) * this.speed;
    }
}

//////////////////////////
// PARTICLES
//////////////////////////

// Particle capabilities needs to be expanded for multiple uses❗
class Particle extends Entity {
    constructor(image) {
        super(image)
    }
    reset(custom) {
        this.speed = custom?.speed || 3;
        this.x = custom?.x || 0;
        this.y = custom?.y || 0;
        this.rndRange = custom?.rndRange || [1, 2];
        this.hp = 1;
        this.scale = 4;
        // Set random direction:
        this.angle = this.toRadians(this.randomBetween(1, 360));
        // Make object visible
        this.opacity = 100;
        // Randomize rotation direction
        this.rndDir = this.randomBetween(0,1)?-1:1;
        this.rndColor = ['#ffe066','#ffec99','#fff3bf','#fff9db'][this.randomBetween(0,3)];
    }
    updateData() {
        // this.scale-=this.randomBetween(1,2);
        this.scale-=.2;
        this.opacity-= 1;
        this.rotation += .08 * this.rndDir; // 5 degree in a random orientation
        this.speed -= this.randomBetween(...this.rndRange) / 10
        // If invisible, bye
        if (this.scale <= 0) this.hp = 0;
    }
    updatePos() {
        this.x = this.x + M.cos(this.angle) * this.speed;
        this.y = this.y - M.sin(this.angle) * this.speed;
        // Unnecesary?
        // this.y = this.y + 1;
    }
}
