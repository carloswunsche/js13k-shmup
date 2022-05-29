"use strict";
//////////////////////////
// LOAD ASSETS
//////////////////////////



//////////////////////////
// SETUP
//////////////////////////

const fns = {
  update:     () => game.update(),
  render:     () => display.render(game.objects, game.stage),
  rawToGame:  () => input.rawToGame(),
  initFade:   (a,b) => display.initFade(a, b),
  updateFade: () => display.updateFade(),
  start:      () => engine.start(),
  pause:      () => engine.pause()
};

const assets  = new Assets(fns);
const input   = new Input();
const engine  = new Engine(60, 60, fns);
const display = new Display(320, 240, 'scanlines', 50);
const game    = new Game(display.width, display.height, assets, fns);

// engine.start();


///////////////////////////////
// GENERAL PURPOSE FUNCTIONS //
///////////////////////////////

function toRadians(degrees){return degrees * Math.PI/180};
function getDecimal(n){return n - Math.floor(n)};