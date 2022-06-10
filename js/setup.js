//////////////////////////
// SET UP
//////////////////////////
'use strict';

const sourceImgScaleFactor = 9;
const input 	= new Input();
const display 	= new Display(320, 240);
const pool 		= new Pool();
const stage 	= new Stage('16px-tileSize');
const engine 	= new Engine();
const game 		= new Game();
const assets 	= new Assets('img/', sourceImgScaleFactor).loadImagesAnd(setupAndRun);

function setupAndRun() {
	setDependencies();
	initialize();
	clean();
	engine.start();
}

function setDependencies() {
	// 1) Pool Dependencies
	pool.needs(assets, game.objects, game.iteration);

	// 2) Stage Dependencies
	stage.needs(assets, pool, game.objects, sourceImgScaleFactor, display.width, display.height);

	// 3) Engine Dependencies
	const update = () => {game.update(step)};
	const render = () => {display.render(stage.bg, game.objects)};
	engine.needs(update, render);

	// 4) Game Dependencies
	const gameFns = {
		input: {
			updateButtons: () => input.updateButtons(),
			playerInputData: () => input.playerInputData(),
		},
		display: {
			initFade: (a,b) => display.initFade(a, b),
			updateFade: (step) => display.updateFade(step),
		},
	}
	game.needs(stage, pool, display.height, gameFns);
}

function initialize(){
	stage.init('1st-stage');
	engine.init(60, 60);
	game.init();
}

function clean(){
	assets.deleteUnused();
	pool.deleteUnused();
	stage.deleteUnused();
	game.deleteUnused();
}


//////////////////////////
// HELPER FUNCTIONS
//////////////////////////
function toRadians(degrees){return degrees * Math.PI/180};
function loopOver(obj, callback){
	for (const key in obj) callback(key, obj[key])
};
function getDecimal(n){ // Not used
	if (Number.isInteger(n)) return 0;
	return Number('0.'+ n.toString().split('.')[1].slice(0,1));
};


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