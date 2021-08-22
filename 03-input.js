         "use strict";
      //////////////////
    ////// INPUT //////
  ////////////////////

// Input constructor
const Input = function() {

  this.rawInput = new Array(6).fill(false); // Btn1, Btn2, left,right,up,down

  this.keyIntoArray = function(rawKey, trueOrFalse) {
    switch (rawKey) {
      case 'KeyZ':      this.rawInput[0] = trueOrFalse; return;
      case 'KeyX':      this.rawInput[1] = trueOrFalse; return;
      case 'ArrowLeft': this.rawInput[2] = trueOrFalse; return;
      case 'ArrowRight':this.rawInput[3] = trueOrFalse; return;
      case 'ArrowUp':   this.rawInput[4] = trueOrFalse; return;
      case 'ArrowDown': this.rawInput[5] = trueOrFalse; return;
    };
  };

  this.setListeners = function() {
    // Use an arrow function when adding an event listener if you don't need it to have a this keyword
    window.addEventListener('keydown', key => {
      this.keyIntoArray(key.code, true);
    });
    window.addEventListener('keyup', key => {
      this.keyIntoArray(key.code, false);
    });
  };
  this.setListeners();

};