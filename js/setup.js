"use strict";
//////////////////////////
// SETUP
//////////////////////////

const callFns = {
	game: {
		update: (step) => game.update(step),
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
const engine  = new Engine(60, 60, callFns);
let game   	  = new Game(assets, callFns);

function assetsReady () {game.setup(); engine.start();}


// Helper Functions
function toRadians(degrees){return degrees * Math.PI/180};
function getDecimal(n){
	if (Number.isInteger(n)) return 0;
	return Number('0.'+ n.toString().split('.')[1].slice(0,1));
};
function loopOver(obj, callback){
	for (const [key, val] of Object.entries(obj)) {
		callback(key, val);
	};
};

// Debugger
window.addEventListener('keydown', key => {
	if (key.code === 'KeyR') debug.gameReset(60);
	if (key.code === 'KeyK') debug.enginePause();
	if (key.code === 'KeyP') debug.engineStart();
	// if (key.code === 'KeyS') debug.toggleScanlines();
	if (key.code === 'KeyH') debug.toggleHitboxes();
	if (key.code === 'Minus')debug.bgSpeedSub(0.1);
	if (key.code === 'Equal')debug.bgSpeedAdd(0.1);
	if (key.code === 'Plus') debug.bgSpeedAdd(0.1);
	if (key.code === 'KeyE') debug.spawnEnemy();
	if (key.code === 'Digit1') {
		localStorage.clear();
		localStorage.setItem('savedInputs', JSON.stringify(input.history));
	}
});

const debug = {
	gameReset(ups, fps) {
		game = new Game(assets, callFns); 
		game.setup();
		engine.ups = ups;
		engine.fps = fps;

		console.clear();
		console.log(`Game reset: now rendering ${fps} frames per second`);

		engine.setup()
		engine.start();

	},
	toggleScanlines(){
		display.scanlines = display.scanlines ? undefined : 'scanlines';
		display.intensity = 50;
		display.render(game.stage.bg, game.objects);
	},
	toggleHitboxes(){
		display.hitboxes = display.hitboxes ? undefined : 'hitboxes';
		display.render(game.stage.bg, game.objects);
	},
	enginePause(){
		engine.pause();
	},
	engineStart(){
		engine.start();
	},
	bgSpeedAdd(n){
		game.stage.bg.speed += n;
		console.log('BG speed is ' + game.stage.bg.speed);
	},
	bgSpeedSub(n){
		game.stage.bg.speed -= n;
		console.log('BG speed is ' + game.stage.bg.speed);
	},
	spawnEnemy(){
		game.objects.enemies.push(new Enemy(assets.enemy));
	},
}