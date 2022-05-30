"use strict";
//////////////////////////
// SETUP
//////////////////////////

const callFns = {
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
const assets  = new LoadAssets(callFns);
const display = new Display(320, 240);
let   game    = new Game(assets, callFns);
const engine  = new Engine(60, 60, callFns);

function assetsReady () {game.setup(); engine.start();}


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


//////////////////////////
// DEBUGGER
//////////////////////////
window.addEventListener('keydown', key => {
	if (key.code === 'KeyR') debug.gameReset();
	if (key.code === 'KeyK') debug.enginePause();
	if (key.code === 'KeyP') debug.engineStart();
	if (key.code === 'KeyS') debug.toggleScanlines();
	if (key.code === 'KeyH') debug.toggleHitboxes();
});

const debug = {
	gameReset() {
		game = new Game(assets, callFns); 
		game.setup(); 
		engine.start()
	},
	toggleScanlines(){
		display.scanlines = display.scanlines ? undefined : 'scanlines';
		display.intensity = 50;
		display.render(game.stage.bg, game.objects)
	},
	toggleHitboxes(){
		display.hitboxes = display.hitboxes ? undefined : 'hitboxes';
		display.render(game.stage.bg, game.objects)
	},
	enginePause(){engine.pause()},
	engineStart(){engine.start()},
}