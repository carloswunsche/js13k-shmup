//////////////////////////
// SET UP
//////////////////////////
'use strict';

// Player Input
const input = new Input();

// Display
const display = new Display(320, 240);

// Pool of objects **
const pool = new Pool();

// Stage **
const stage = new Stage('16px-tileSize');

// Engine **
const engine = new Engine();

// Game logic **
const game = new Game();

// Load assets
const sourceImgScaleFactor = 9;
const assets = new Assets('img/', sourceImgScaleFactor).loadImagesAnd(setup);

function setup() {
	// Pool Dependencies
	pool.needs(assets, game.objects, game.iteration)

	// Stage Dependencies
	stage.needs(assets, pool, sourceImgScaleFactor, display.width, display.height)

	// Engine Dependencies
	const update = () => {game.update(step)};
	const render = () => {display.render(stage.bg, game.objects)};
	engine.needs(update, render);

	// Game Dependencies
	const gameFns = {
		input: {
			updateButtons: () => input.updateButtons(),
			playerInputData: () => input.playerInputData(),
			raw: input.raw,
			game: input.game,
			// For developing purposes:
			get: (property) => input[property],
		},
		display: {
			initFade: (a,b) => display.initFade(a, b),
			updateFade: (step) => display.updateFade(step),
		},
	}
	game.needs(stage, pool, display.height, gameFns)


	// Initialize
	stage.init('1st-stage');
	engine.init(60, 60);
	game.init(assets.Player);

	// Clean
	assets.deleteUnused();
	pool.deleteUnused();
	stage.deleteUnused();
	game.deleteUnused();

	// Run!
	engine.start()
};


// // Game logic



//////////////////////////
// SET UP
//////////////////////////

// function onLoadCompletion() {
// 	pool.init(assets, game.objects);
// 	stage.init(assets, pool, '1st-stage');
// 	game.init(assets, pool);
// 	engine.start()
// };



// //////////////////////////
// // HELPER FUNCTIONS
// //////////////////////////
function toRadians(degrees){return degrees * Math.PI/180};
function loopOver(obj, callback){
	for (const key in obj) callback(key, obj[key])
};
function getAllSubclasses(baseClass) {
	var globalObject = Function('return this')(); 
	var allVars = Object.keys(globalObject);
	var classes = allVars.filter(function (key) {
	try {
	  var obj = globalObject[key];
		  return obj.prototype instanceof baseClass;
	  } catch (e) {
		  return false;
	  }
	});
	return classes;
};

// function getDecimal(n){
// 	if (Number.isInteger(n)) return 0;
// 	return Number('0.'+ n.toString().split('.')[1].slice(0,1));
// };




//////////////////////////
// DEBUGGER
//////////////////////////
const debug = {
	gameReset(ups, fps) {
		engine.ups = ups;
		engine.fps = fps;
		engine.setup();
		onLoad();
		console.log(`GAME RESET: now rendering at ${fps}fps`);
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
		game.pool.getFreeObject('enemy');
	},
}
window.addEventListener('keydown', key => {
	if (key.code === 'KeyR') debug.gameReset(60, 60);
	if (key.code === 'KeyK') debug.enginePause();
	if (key.code === 'KeyP') debug.engineStart();
	// if (key.code === 'KeyS') debug.toggleScanlines();
	if (key.code === 'KeyH') debug.toggleHitboxes();
	if (key.code === 'Minus')debug.bgSpeedSub(0.25);
	if (key.code === 'Equal')debug.bgSpeedAdd(0.25);
	if (key.code === 'Plus') debug.bgSpeedAdd(0.25);
	if (key.code === 'KeyE') debug.spawnEnemy();
	if (key.code === 'Digit1') {
		localStorage.clear();
		localStorage.setItem('savedInputs', JSON.stringify(input.history));
	}
});