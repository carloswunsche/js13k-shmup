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
    spd: 2, diagMultp: 0,
    // diagMultp: 0,
    setSprite() {
        this.sprite = new Image();
        this.sprite.src = 'ship.png';
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
        this.x += input.axis[0] * this.spd * this.diagMultp;
        this.y += input.axis[1] * this.spd * this.diagMultp;
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
canvas.width = 160; canvas.height = 120;            //Set canvas original w/h
canvas.setWalls = function (margin) {               //Function to set the frame boundaries
    this.walls = [margin, margin, this.width - margin, this.height - margin];
}
canvas.setWalls(4);     //Pass margin value here
let curr, dt = 0;       //Current frame and delta time variables
let last = timestamp(); //Assign first timestamp to last frame variable
let step = 1 / 60;      //Ideal step for the update function (16.66 ms)
let scale = 1;          //Initial scale factor
resizeCanvas();         //Call resize canvas
ship.setSprite();       //Set ship sprite
ship.startPos();        //Set ship starting position


//GAMELOOP//
requestAnimationFrame(gameLoop); //Call it the first time
function gameLoop() {
    curr = timestamp();
    dt = dt + (curr - last) / 1000;
    last = curr;
    while (dt > step) {
        dt = dt - step;
        update();
    }
    render();
    requestAnimationFrame(gameLoop); //Request another frame and so on...
}
function timestamp() {
    return performance && performance.now ? performance.now() : new Date().getTime();
}

//UPDATE//
function update() {
    ship.updatePos();
}

//RENDER//
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height); //Clear Screen
    context.drawImage(                                 //Draw Ship
        ship.sprite,
        Math.round(ship.x - ship.sprite.width / 2),
        Math.round(ship.y - ship.sprite.height / 2),
    );
}

//RESIZE CANVAS - SCALING//
function resizeCanvas() {
    scale = Math.min(
        Math.trunc(window.innerWidth / canvas.width),
        Math.trunc(window.innerHeight / canvas.height)
    );
    canvas.style.width = `${scale * canvas.width}px`;
    canvas.style.height = `${scale * canvas.height}px`;
}

/////////////////LISTENERS//////////////////

//WINDOW RESIZE//
window.addEventListener('resize', resizeCanvas); //Scale if window is resized
//KEY DOWN & KEY UP//
window.addEventListener('keydown', function (e) {
    input.dir[e.keyCode - 37] = 1;
    input.getAxis();
});
window.addEventListener('keyup', function (e) {
    input.dir[e.keyCode - 37] = 0;
    input.getAxis();
});


//Press enter to go fullscreen
// document.addEventListener("click", function(e) {
//     document.documentElement.requestFullscreen();
// }, false);

