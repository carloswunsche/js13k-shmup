         "use strict";
      //////////////////
    ////// SETUP ////// 
  ////////////////////

// Una vez que se cargaron todos los .js, recien ahi declarar objetos y arrancar engine
window.onload = function(){

  // Game screen initial dimensions
  const initW = 160;
  const initH = 120;

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
  // Create Engine passing: minimum step in ms, FPS, updateFunction, renderFunction
  const engine  = new Engine(1000/60, 165, update, render);
  // Create Input object
  const input   = new Input();
  // Create Game passing: initW, initH, rawInput Map, and graphics object
  const game    = new Game(initW, initH, input.rawInput, gfx);
  // Create Display passing: canvasID, initW, initH, integralScaling
  const display = new Display('layer1', initW, initH, true);

  // Go!
  engine.start();
};



////////////////////////////////
// GENERAL PURPOSE FUNCTIONS //
////////////////////////////////

// function setSprite(obj, png, scale = false, scaleValue = 32){
//   obj.sprite = document.createElement('img'); // same as new Image()
//   // Source PNG always needs to be scaled by x32 + optimized using online PNG Optimizer!
//   obj.sprite.src = png;
//   if (scale) {
//       //Scale it down to initial size (Only when it finishes loading png)
//       obj.sprite.addEventListener('load', function() {
//           obj.sprite.width  = obj.sprite.width / scaleValue; 
//           obj.sprite.height = obj.sprite.height / scaleValue;
//           removeEventListener('load', obj.sprite);
//       });
//   }
// };

function toRadians(degrees){return degrees * Math.PI/180};