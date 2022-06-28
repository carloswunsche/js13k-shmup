//////////////////////////
// ENTITIES
//////////////////////////

// Layers Guide
class Entity {
    constructor(image) {
        this.free = true;
        this.image = image;
        this.width = image?.sWidth || 1;
        this.height = image?.height || 1;
        this.hitbox = new Array(4);
        this.timers = new Array(9);
        // Taken from global: Math object
        this.math = customMath;
        // Taken from global: Used for bullet shooting
        this.pool = pool;
        // Taken from global: Used for queue spawning bullets and particles
        this.queue = game.queuedFns;
        // Taken from global: Used for positioning relative to display
        this.displayWidth = display.width;
        this.displayHeight = display.height;
        // Taken from global: To activate sounds
        this.sfxFlags = game.sfxFlags;
        // Taken from global: For accurate movement of land enemies by using bg's speed
        this.stage = stage;
    }
    parentReset(custom){
        // Default hp for living objects
        this.hp = 1;
        // Animation stuff
        this.hitState = 0;
        this.opacity = 100;
        this.rotation = 0;
        this.scale = 1;
        // Timers
        this.timers.fill(0);
        // Flags
        this.dying = false;
        this.carryItem = custom?.carryItem || false;
        // Custom resets if any
        this.reset1?.(custom);
        this.reset2?.(custom);
        // Always leave hitbox update for the end of reset function
        this.updateHitbox();
        // Useful when chaining method in pool
        return this;
    }
    setupHitbox(xMargin = this.width/2, yMargin = this.height/2, xOffset = 0, yOffset = 0) {
        this.xMargin = xMargin;
        this.yMargin = yMargin;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
    }
    updateHitbox() {
        this.hitbox[0] = this.x - this.xMargin + this.xOffset  //x1 (left)
        this.hitbox[1] = this.x + this.xMargin + this.xOffset  //x2 (right)
        this.hitbox[2] = this.y - this.yMargin + this.yOffset  //y1 (up)
        this.hitbox[3] = this.y + this.yMargin + this.yOffset  //y2 (down)
    }
    spawnParticles(data){
        // If no data received, don't spawn any particles
        if (!data) return;
    
        for (let i = 0; i < data.qty; i++)
        this.queue.push(()=>this.pool.free('Particle',data.options));
    }
    timerCount(timeInFrames = 999, timerUsed = 0) {
        // Count until chosen time, using selected timer
        if (this.timers[timerUsed] < timeInFrames) this.timers[timerUsed] += 1;
    }
    // Movimiento por vector
    vectorMovement(){
        // this.x += 
        // custom?.xAng !== void 0 ? custom.xAng : M.cos(this.angle) 
        // * this.speed;

        // this.y -= 
        // custom?.yAng !== void 0 ? custom.yAng : M.sin(this.angle) 
        // * this.speed;


        // Less space:
        this.x += M.cos(this.angle) * this.speed;
        this.y -= M.sin(this.angle) * this.speed;
    }
    // Movimiento de tierra
    landMovement(x,y) {
        // Go down at the speed of background
        this.x += x;
        this.y += this.stage.bg.speed + y;
    }
    // Moviemiento por defecto:
    updatePos() {this.vectorMovement()};
}

class Player extends Entity {
    constructor(image) {
        super(image);
        this.palette = 7;
        this.layer = 'Players'
        this.setupHitbox(2, 2, 0, 2);
        this.explosionData = function() {return {qty: 40, options: {x:this.x, y:this.y,speed: 4}}};
        this.shotTime = 6;
        // Taken from global: Used for moving and shooting
        this.buttons = input.buttons;
    }
    reset1() {
        this.outOfBounds = false;
        this.x = this.displayWidth / 2;
        this.y = 95;
    }
    updateData() {
        ////////////
        // SHOT
        ///////////
        // If button pressed & timer has reached destination
        if (this.buttons[4] > 0 && this.timers[0] === this.shotTime) {

            // Queue bullets version 2
            let parms = [
                {x: this.x, y: this.y-6, offset:  4 },
                {x: this.x, y: this.y-6, offset: -4 },
                {x: this.x+7, y: this.y-4, angle: 1.0472, rotation: 5.2359, hitbox: [1,2]},
                {x: this.x-7, y: this.y-4, angle: 2.0944, rotation: 4.1887, hitbox: [1,2]}
            ];
            for(let i = 0; i < 4; i++)this.queue.push(() => this.pool.free('PlayerBullet', parms[i]));
            
            // Sound
            this.sfxFlags.pShot = true;
            // Reset timer
            this.timers[0] = 0;
        }
        // Shot timer always counting up
        this.timerCount(this.shotTime);
    }
    updatePos() {
        // Always start with no angle
        this.angle = 0;
        // Evaluate directions
        if (this.buttons[0]) this.angle = 1.570;
        if (this.buttons[1]) this.angle = 6.283;
        if (this.buttons[2]) this.angle = 4.712;
        if (this.buttons[3]) this.angle = 3.141;
        if (this.buttons[0] && this.buttons[1]) this.angle = .785;
        if (this.buttons[1] && this.buttons[2]) this.angle = 5.497;
        if (this.buttons[2] && this.buttons[3]) this.angle = 3.926;
        if (this.buttons[0] && this.buttons[3]) this.angle = 2.356;
        // This is just to stop moving if opposite directions are pressed (Can be omitted if space needed)
        if (this.buttons[0] && this.buttons[2] || this.buttons[1] && this.buttons[3]) this.angle = 0;
        // Set speed
        this.speed = !this.angle ? 0 : 1.5;
        // Move
        this.vectorMovement(this.angle)
    }
    fixOutOfBounds() {
        if (this.hitbox[2] < 0) this.y = this.yMargin - this.yOffset;
        if (this.hitbox[1] > this.displayWidth) this.x = this.displayWidth - this.xMargin - this.xOffset;
        if (this.hitbox[3] > this.displayHeight) this.y = this.displayHeight - this.yMargin - this.yOffset;
        if (this.hitbox[0] < 0) this.x = this.xMargin - this.xOffset;
    }
    positionFar() {
        this.x = this.displayWidth / 2;
        this.y = this.displayHeight + 99;
    }
}

// SHARE MOVEMENT
class PlayerBullet extends Entity {
    constructor(image) {
        super(image);
        this.palette = 1;
        this.layer = 'pBullets'
        // this.setupHitbox(); // Omitted because it has to be called on reset
        this.speed = 6;
        this.deadBound = 'top';
    }
    reset1(custom) {
        this.setupHitbox();
        if (custom?.hitbox) this.setupHitbox(...custom.hitbox);
        this.x = custom.x + (custom.offset || 0);
        this.y = custom.y;
        this.rotation = (custom.rotation + 1.5708) || 0;
        this.angle = custom.angle || 1.5708;
    }
    updateData() {
        // Destroy if out of the top
        if (this.y <= 0) this.hp = 0;
    }
}

//////////////////////////
// ENEMIES
//////////////////////////

class AccessToPlayer extends Entity {
    constructor(image){
        super(image)
        // Taken from global: Used for Enemy and EnemyBullet to follow player
        // NOTE: NO sirve llamar a X y a Y individualmente. Hay que tener acceso
        // al objeto entero para que no se haga shallow copy de sus propiedades.
        this.player = pool.type.Player[0];
    }
}

class Enemy extends AccessToPlayer {
    constructor(image) {
        super(image)
        this.layer = 'E_Air' // most of the enemies are land enemies
        this.explosionData = function() {return {qty: 9, options: {x:this.x, y:this.y}}};
    }
    reset1(custom) {
        this.x = custom?.x || this.displayWidth / 2;
        this.y = custom?.y || -this.height / 2;
        this.side = custom?.side || 1;
        this.phase = custom?.phase || 1;
        this.speed = custom?.speed || 1;
        this.alt = custom?.alt || false;
    }
    shot(howMany = 1, spd, angle, add, offX = 0, offY = 0) {
        // Reduce layer name
        for(let i = 0; i < howMany; i++)
            this.pool.free('EnemyBullet', 
                {x: this.x + offX, 
                y: this.y + offY, 
                speed: spd, 
                // This angle parameter can be the string 'auto' to go towards Player
                angle: angle || 270 + i * (360 / howMany),
                // Multiply add to spread, if any
                add: add * (i - M.floor(howMany/2)) || 0,
            });
            // Sound
            this.sfxFlags.eShot = true;
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
    constructor() {
        super()
        this.layer = 'eBullets'
        this.setupHitbox(1, 1);
        this.explosionData = () => false;
        this.deadBound = 'any';
        this.currentColor = '#ff7';
    }
    reset2(custom) {
        // Necessary because it's using particle drawing system now
        this.scale = 3;

        // Check between mode 'auto' (towards Player) and regular degrees
        if (custom?.angle === 'auto')
             this.angle = M.atan2(this.y - this.player.y, this.player.x - this.x);
        else this.angle = this.math.toRadians(custom?.angle || 0);
        // Add spread if any
        this.angle += this.math.toRadians(custom?.add) || 0;
    }
    updateData() {
        // Rotate
        this.rotation += this.math.toRadians(10)
    }
}
class SinePop extends Enemy {
    constructor(image) {
        super(image)
        this.palette = 6
        this.setupHitbox(this.height/2,this.height/2-1,0,-1);
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
        this.palette = 0;
        this.setupHitbox(this.width/2-1, this.height/2-1);
        this.deadBound = 'bottom';
    }
    reset2(){
        this.hp = 3;
        this.speed = 1.5;
        this.scale = 1.2;
    }
    updateData() {
        this.timerCount(100);
        // Speed down
        if (this.timers[0] < 50) this.speed -= .025;
        // Shot
        if (this.timers[0] === 60) {
            if (this.alt) {
                this.shot(7, 1)
            } else this.shot(1, 1.3, 'auto', 0, -1, 4);}
        // Speed up
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
        this.palette = 5;
        this.setupHitbox(5, 5);
    }
    reset2(custom) {
        this.hp = 4;
        // Set x starting position based on side
        this.x = this.displayWidth / 2 - (this.displayWidth / 2 + this.width/2) * this.side;
        // Set this.deadBound based on this.side
        this.deadBound = custom?.side === 1 ? 'right' : 'left';
    }
    updateData() {
        this.timerCount(80);
        // Shot
        if (this.timers[0] === 70) {
            if (this.alt) this.shot(1, 1.5, 'auto');
            else this.shot(3, 1.3, 'auto', 20);
        }
    }
    updatePos() {
        this.x += (this.speed * .75) * this.side;
        this.y += (this.speed * .25);
    }
}
class Tank extends Enemy {
    constructor(image) {
        super(image)
        this.palette = 6;
        this.setupHitbox(this.width / 2, this.height / 2-2);
        this.deadBound = 'bottom';
        this.layer = 'E_Land'
    }
    reset2(){
        this.hp = 3;
    }
    updatePos() {this.landMovement(0,.1)}
}
class Assaulter extends Enemy {
    constructor(image) {
        super(image)
        this.palette = 4;
        this.setupHitbox(10, 10);
        this.deadBound = 'any';
        this.delayedFree = true;
    }
    reset2() {
        this.hp = 22;
        this.speed = 2.5;
        this.angle = M.atan2(this.y - this.player.y, this.player.x - this.x);
        this.scale = 1.5;
    }
    updateData() {
        this.timerCount(100);
        if (this.timers[0] < 25)    this.speed -= .1;
        if (this.timers[0] === 40)  this.shot(10, 1);
        if (this.timers[0] === 80)  {
            this.shot(3, 1.5, 'auto', 20);
            this.angle = M.atan2(this.y - this.player.y, this.player.x - this.x);
        }
        if (this.timers[0] > 80)    this.speed += .02;
    }
}
class Boat extends Enemy {
    constructor(image) {
        super(image)
        this.palette = 1;
        this.setupHitbox();
        this.deadBound = 'bottom';
    }
    reset2(){this.hp = 4}
    updateData(){
        // Shot
        this.timerCount(110);
        // Will shot 5 bullets each 10 frames from frame 40 to 80
        if (this.timers[0] % 10 === 0 &&
            this.timers[0] > 39 && this.timers[0] < 81)
                this.shot(1,1,'auto')
    }
    updatePos() {this.landMovement(.05 * this.side, .05)}
}

//////////////////////////
// PARTICLES
//////////////////////////

// Particles doesn't have a hitbox not palette
class Particle extends AccessToPlayer {
    constructor(){
        super()
        this.deadBound = 'any';
        this.layer = 'Parts'
    }
    reset1(custom) {
        this.x = custom?.x;
        this.y = custom?.y;
        this.scale = custom?.scale || 4;
        this.speed = custom?.speed || 3;
        this.subSpdRange = custom?.subSpdRange || [1, 2];
        // Set random angle:
        this.angle = custom?.angle || this.math.toRadians(this.math.randomBetween(1, 360));
        // Randomize rotation direction
        this.rndDir = this.math.randomBetween(0,1)?-1:1;
        // Random color
        this.colors = custom?.colors || ['#f61','#fd7','#ff9','#feb','#ffc','#ffe'];
        this.currentColor = this.colors[this.math.randomBetween(0,this.colors.length-1)];
        this.beheavior = custom?.beheavior || 1;
    }
    updateData() {
        this.rotation += .08 * this.rndDir; // 5 degree in a random orientation
        this.opacity -= 5;
        // Call different beheaviors at the end
        this[`beheavior${this.beheavior}`]()
    }
    beheavior1(){
        this.scale-=.2;
        this.speed -= this.math.randomBetween(...this.subSpdRange) / 10
        // If small enough, bye
        if (this.scale <= 0) this.hp = 0;
    }
    beheavior2(){
        // Follow player continuosly
        this.x = this.player.x;
        this.y = this.player.y;
        this.scale+=4
        // If invisible, bye
        if (this.opacity <= 0) this.hp = 0;
    }
    updatePos() {this.vectorMovement()}
}

class Item extends Entity {
    constructor(image) {
        super(image)
        this.setupHitbox();
        this.deadBound = 'bottom';
        this.layer = 'Pickups';
        this.colors = ['#9ff','#aff','#bff','#dff','#eff'];
        this.explosionData = function() {
            return {
                qty: 30, 
                options: {
                    x:this.x, 
                    y:this.y,
                    colors: this.colors,
                }
            }
        };
        this.speed = 1;
        this.angle = this.math.toRadians(-90);
    }
    reset1(custom) {
        this.x = custom?.x || this.displayWidth / 2;
        this.y = custom?.y || -this.height / 2;
        this.ySpd = 3;
        this.scale = 0;
    }
    updateData(){
        this.palette = this.math.randomBetween(1, 3)
        if (this.scale < 1) this.scale+= 10/100;
        // One every other iteration will spawn a particle
        if (this.timers[0]%2 === 0)
        this.spawnParticles({
            qty: 1, 
            options: {
                x:this.x, 
                y:this.y,
                colors: this.colors,
                speed: 2.5,
                scale: 3.5,
                angle: this.math.toRadians(this.math.randomBetween(0, 180))
            }
        })
        // Use this timer yez yez
        this.timerCount(999)
    }
    updatePos() {
        this.y -= this.ySpd;
        if (this.ySpd >= 0) this.ySpd -= 0.1
        if (this.ySpd < 0) this.ySpd -= 0.02
        this.vectorMovement();
    }
}