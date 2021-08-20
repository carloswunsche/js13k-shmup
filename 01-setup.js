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
      display.render(game.objects);
  };


  // Create Engine passing: step, updateFunction, renderFunction
  const engine  = new Engine(1000/60, update, render);
  // Create Display passing: canvasID, initW, initH, integralScaling
  const display = new Display('canvas1', initW, initH, true);
  // Create Game passing: initW, initH
  const game    = new Game(initW, initH);
  
  engine.start();

};