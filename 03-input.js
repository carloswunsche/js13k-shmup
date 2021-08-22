         "use strict";
      //////////////////
    ////// INPUT //////
  ////////////////////

// Input constructor
const Input = function() {

  this.dir = [0, 0, 0, 0];
  this.inputted = [];
  this.axis = [0, 0];
  this.btn1 = 0;
  this.btn2 = 0;

  this.getAxis = function() {
    for (let i = 0; i < 2; i++) {
        let m;
        if (this.dir[i] + this.dir[i + 2] === 0) m = 0
        else this.dir[i] > this.dir[i + 2] ? m = -1 : m = 1;
        this.axis[i] = m;
    };
    //Fix diagonals if pushing on walls
    if (ship.y <= canvas.walls[1] && this.axis[1] === -1) this.axis[1] = 0;
    if (ship.y >= canvas.walls[3] && this.axis[1] === 1)  this.axis[1] = 0;
    if (ship.x <= canvas.walls[0] && this.axis[0] === -1) this.axis[0] = 0;
    if (ship.x >= canvas.walls[2] && this.axis[0] === 1)  this.axis[0] = 0;

  };
  
  // window.addEventListener('keyup', function (e) {
  //   this.dir[e.keyCode - 37] = 0;
  //   this.getAxis();
  // });

  

}

window.addEventListener('keydown', function(e) {
  console.log(this)
});  