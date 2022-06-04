//////////////////////////
// SETUP
//////////////////////////
'use strict';

const callFns = {
	game: {
		update: (step) => game.update(step), //engine.js
		setup:  (a) => game.setup(a),		 //engine.js 
	},
	input: {
		rawToGame: () => input.rawToGame(), 			//game.js
		playerInputData: () => input.playerInputData(), //game.js
		get: (property) => input[property], 			//game.js
	},
	display: {
		render: () => display.render(game.stage.bg, game.objects),	//engine.js
		initFade: (a,b) => display.initFade(a, b), 				   	//game.js
		updateFade: () => display.updateFade(),						//game.js
	},
};

const assets  = new Assets('img/', 32);
const display = new Display(320, 240, assets.imageScaled);
const engine  = new Engine(60, 60, callFns);
const input   = new Input();
let pool	  = new Pool(10, assets);
let game   	  = new Game(assets, callFns);
function assetsReady() {game.setStage(1); engine.start();}


//////////////////////////
// HELPER FUNCTIONS
//////////////////////////
function toRadians(degrees){return degrees * Math.PI/180};
function loopOver(obj, callback){
	for (const key in obj) callback(key, obj[key])
};

// // Not used
// function getDecimal(n){
// 	if (Number.isInteger(n)) return 0;
// 	return Number('0.'+ n.toString().split('.')[1].slice(0,1));
// };


//////////////////////////
// DEBUGGER
//////////////////////////
const debug = {
	gameReset(ups, fps) {
		pool = new Pool(10, assets);
		
		game = new Game(assets, callFns); 
		game.setStage();
		engine.ups = ups;
		engine.fps = fps;

		console.clear();
		console.log(`Game reset: now rendering ${fps} frames per second`);

		engine.setup();
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
window.addEventListener('keydown', key => {
	if (key.code === 'KeyR') debug.gameReset(60, 60);
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