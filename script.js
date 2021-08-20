"use strict";

//INPUT OBJECT//
const input = {
    dir: [0, 0, 0, 0], axis: [0, 0],
    btn1: 0,
    getAxis() {
        for (let i = 0; i < 2; i++) {
            let m;
            if (this.dir[i] + this.dir[i + 2] === 0) m = 0
            else this.dir[i] > this.dir[i + 2] ? m = -1 : m = 1;
            this.axis[i] = m;
        };
        //Fix diagonals if pushing on walls
        if (ship.y <= canvas.walls[1] && this.axis[1] === -1) this.axis[1] = 0;
        if (ship.y >= canvas.walls[3] && this.axis[1] === 1) this.axis[1] = 0;
        if (ship.x <= canvas.walls[0] && this.axis[0] === -1) this.axis[0] = 0;
        if (ship.x >= canvas.walls[2] && this.axis[0] === 1) this.axis[0] = 0;
    },
}

//SHIP//
const ship = {
    x: 0, y: 0,
    spd: 2, diagMultp: 0, angle: 0,
    setSprite() {
        this.sprite = new Image();
        this.sprite.src = 'ship-x32-optimized.png'; //PNG scaled + optimized = 500 bytes
        this.sprite.width = 13 * scale;
        this.sprite.height = 10 * scale;
    },
    startPos() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;

    },
    updatePos() {
        //Get diagonal multiplier
        const sumAxis = input.axis[0] + input.axis[1];
        Math.abs(sumAxis) === 2 ? this.diagMultp = 0.70710678118 : this.diagMultp = 1;
        //Update position
        this.x += input.axis[0] * this.spd * this.diagMultp * scale;
        this.y += input.axis[1] * this.spd * this.diagMultp * scale;
        //Fix position if leaves the play area
        if (this.x > canvas.walls[2]) this.x = canvas.walls[2];
        if (this.x < canvas.walls[0]) this.x = canvas.walls[0];
        if (this.y > canvas.walls[3]) this.y = canvas.walls[3];
        if (this.y < canvas.walls[1]) this.y = canvas.walls[1];
    },
};


//INITIALIZATION//
const canvas = document.getElementById('canvas1');  //Get canvas object
const context = canvas.getContext('2d');            //Get context objects
const width = 160; const height = 120;
canvas.width = width; canvas.height = height;            //Set canvas original w/h
canvas.setWalls = function (margin) {               //Function to set the frame boundaries
    this.walls = [margin, margin, this.width - margin, this.height - margin];
}
let scale = 1;          //Initial scale factor
canvas.setWalls(4*scale);     //Pass margin value here
let dt = 0;       //Current frame and delta time variables
let last = performance && performance.now ? performance.now() : new Date().getTime(); //Assign first timestamp like this
let step = 1000/60;      //Ideal step for the update function (16.66 ms)

resizeCanvas();         //Call resize canvas
ship.setSprite();       //Set ship sprite
ship.startPos();        //Set ship starting position


// GAMELOOP
requestAnimationFrame(loop); // Call it the first time and passes a timestamp
function loop(timestamp) {
    let updateFlag = false;
    dt += timestamp - last;
    last = timestamp;
    while (dt > step) {
        dt -= step; 
        update(); 
        updateFlag = true; 
    }
    if (updateFlag) render();
    requestAnimationFrame(loop); // Call it again passing a timestamp and so one...
}

//UPDATE//
function update() {
    ship.updatePos();
}

//RENDER//
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height); //Clear Screen

    context.save();
    context.translate(ship.x,ship.y);
    context.rotate(ship.angle * Math.PI/180); //Rotation


    context.drawImage( //Draw Ship
        ship.sprite,
        Math.round(0 - ship.sprite.width / 2),
        Math.round(0 - ship.sprite.height / 2),
        ship.sprite.width, ship.sprite.height
    );

    // context.drawImage(ship.sprite, (0- ship.sprite.width / 2), (0 - ship.sprite.height / 2), ship.sprite.width * 0.25, ship.sprite.height * 0.25);
    // context.drawImage(ship.sprite, ship.x - ship.sprite.width / 2, ship.y - ship.sprite.height / 2, ship.sprite.width, ship.sprite.height);

    context.restore();
    // ship.angle += 4;
}

//RESIZE CANVAS - SCALING//
function resizeCanvas() {
    scale = Math.min(
        Math.trunc(window.innerWidth  / width),
        Math.trunc(window.innerHeight / height)
    );

    canvas.width    = scale * width;
    canvas.height   = scale * height;

    canvas.setWalls(4*scale);
}

/////////////////LISTENERS//////////////////
// RESIZE 
window.addEventListener('resize', resizeCanvas);
//KEY DOWN & KEY UP//
window.addEventListener('keydown', function (e) {
    input.dir[e.keyCode - 37] = 1;
    input.getAxis();
});
window.addEventListener('keyup', function (e) {
    input.dir[e.keyCode - 37] = 0;
    input.getAxis();
});