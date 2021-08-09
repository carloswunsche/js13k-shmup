"use strict";

//INPUT OBJECT//
const input = {
    getShipAngle(){
        ship.angle = -1;
        if (this.right) ship.angle = 0;
        if (this.up)    ship.angle = 90;
        if (this.left)  ship.angle = 180;
        if (this.down)  ship.angle = 270;
        if (this.right && this.down) ship.angle = 315;
        if (this.left  && this.down) ship.angle = 225;
        if (this.left  && this.up)   ship.angle = 135;
        if (this.right && this.up)   ship.angle = 45;
        if (this.up && this.down || this.left && this.right) ship.angle = -1;
    },
}

//SHIP//
const ship = {
    x: 0,     y: 0, 
    xSize:10, ySize:10, 
    angle:-1, spd: 2,
    startPos(){
        this.x = canvas.width/2 - this.xSize/2;
        this.y = canvas.height/2 - this.ySize/2; 
    },
    updatePos(){
            this.angle *= Math.PI / 180; //Degrees to radians
            this.x += Math.cos(this.angle) * this.spd;
            this.y -= Math.sin(this.angle) * this.spd;
    },
    sprite: new Image(),
};
ship.sprite.src = 'ship.png';

//INITIALIZATION//
const canvas = document.getElementById('canvas1');  //Get canvas object
const context = canvas.getContext('2d');            //Get context object
canvas.width = 160; canvas.height = 120;            //Set canvas original w/h
let curr, dt = 0;       //Current frame and delta time variables
let last = timestamp(); //Assign first timestamp to last frame variable
let step = 1 / 60;      //Ideal step for the update function (16.66 ms)
let scale = 1;          //Initial scale factor
resizeCanvas();         //Call resize canvas
ship.startPos();        //Set ship starting position

//GAMELOOP//
requestAnimationFrame(gameLoop); //Call it the first time
function gameLoop() {
    curr = timestamp();
    dt   = dt + (curr-last) / 1000;
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
function update(){
    input.getShipAngle();
    if (ship.angle !== -1) ship.updatePos();
}

//RENDER//
function render(){
    context.clearRect(0,0,canvas.width,canvas.height) //Clear Screen
    context.drawImage(ship.sprite,Math.round(ship.x),Math.round(ship.y))
} 

//RESIZE CANVAS - SCALING//
function resizeCanvas () {
    scale = Math.min(
      Math.floor(window.innerWidth  / canvas.width),
      Math.floor(window.innerHeight / canvas.height)
      )
    canvas.style.width  = `${scale * canvas.width}px`
    canvas.style.height = `${scale * canvas.height}px`
}


/////////////////LISTENERS//////////////////

//WINDOW RESIZE//
window.addEventListener('resize', resizeCanvas); //Scale if window is resized
//KEY DOWN//
window.addEventListener('keydown', function(e){
    switch(e.code) {
        case 'ArrowUp': input.up = true; break;
        case 'ArrowDown': input.down = true; break;
        case 'ArrowLeft': input.left = true; break;
        case 'ArrowRight': input.right = true; break;        
    }
});
//KEY UP//
window.addEventListener('keyup', function(e){
    switch(e.code) {
        case 'ArrowUp': input.up = false; break;
        case 'ArrowDown': input.down = false; break;
        case 'ArrowLeft': input.left = false; break;
        case 'ArrowRight': input.right = false; break;        
    }
});