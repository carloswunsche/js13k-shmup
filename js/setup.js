         "use strict";
      //////////////////
    ////// SETUP ////// 
  ////////////////////

// Una vez que se cargaron todos los .js, recien ahi declarar objetos y arrancar engine
window.onload = () => {

  // Other
  console.clear();
  const p = document.querySelector('p');

  // Game screen initial dimensions
  const initW = 320;
  const initH = 240;

  // Update function
  const update = function() {
    game.update();
  };

  // Render function
  const render = function() {
      display.render(game.objects, game.bg);
  };

  // Create graphics object to store all images
  const gfx     = new Gfx();
  // Create Input object
  const input   = new Input();
  // Create Engine passing: minimum step in ms, FPS, updateFunction, renderFunction
  const engine  = new Engine(1000/60, 60, update, render, input.rawInput);
  // Create Game passing: initW, initH, rawInput Map, and graphics object
  const game    = new Game(initW, initH, input.rawInput, gfx);
  // Create Display passing: canvasID, initW, initH, integerScaling
  const display = new Display('layer1', initW, initH, true);

  // Go!
engine.start();
};

///////////////////////////////
// GENERAL PURPOSE FUNCTIONS //
///////////////////////////////

function toRadians(degrees){return degrees * Math.PI/180};