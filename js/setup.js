"use strict";
//////////////////////////
// SETUP
//////////////////////////

const functions = {
  game: {
    update: () => game.update(),
    setup: (a) => game.setup(a),
    get: (property) => game[property], // stage.js
  },
  input: {
    rawToGame: () => input.rawToGame(),
    playerInputData: () => input.playerInputData(),
    get: (property) => input[property],
  },
  display: {
    render: () => display.render(game.stage.bg, game.objects),
    initFade: (a,b) => display.initFade(a, b),
    updateFade: () => display.updateFade(),
  },
  engine: {
    start: () => engine.start(),
    pause: () => engine.pause(),
  },
};

const input   = new Input();
const assets  = new LoadAssets(functions);
const display = new Display(320, 240, 'scanlines', 50);
const game    = new Game(assets, functions);
const engine  = new Engine(60, 60, functions);

// Helper Functions
function toRadians(degrees){return degrees * Math.PI/180};
function getDecimal(num){
  if (Number.isInteger(num)) return 0;
  const decimalStr = num.toString().split('.')[1];
  return Number('0.'+decimalStr);
};
function loopOver(obj, callback){
  for (const [key, val] of Object.entries(obj)) {
      callback(key, val);
  };
};