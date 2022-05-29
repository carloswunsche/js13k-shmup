"use strict";
//////////////////////////
// SETUP
//////////////////////////

const functions = {
  game: {
    update: () => game.update(),
    setup: (a) => game.setup(a),
    get: (property) => game[property],
  },
  input: {
    rawToGame: () => input.rawToGame(),
    // getAxis: () => input.getAxis(),
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
const display = new Display(320, 240, 'scanlines', 50, 'hitboxes');
const game    = new Game(assets, functions);
const engine  = new Engine(60, 60, functions);

// Helper Functions
function toRadians(degrees){return degrees * Math.PI/180};
function getDecimal(n){return n - Math.floor(n)};
function loopOver(obj, callback){
  for (const [key, val] of Object.entries(obj)) {
      callback(key, val);
  };
};