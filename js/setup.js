//////////////////////////
// SETUP
//////////////////////////
'use strict';


// Load assets
const sourceImgScaleFactor = 9;
function onLoad() {game.setStage(1); engine.start()};
const assets = new Assets('img/', sourceImgScaleFactor, onLoad);


// Display
const display = new Display(320, 240, sourceImgScaleFactor);


// Engine
function update() {game.update(step)};
function render() {display.render(game.stage.bg, game.objects)};
const engine = new Engine(60, 60, update, render);


// Player Input
const input = new Input();


// Game logic
const callFns = {
	input: {
		rawToGame: () => input.rawToGame(),
		playerInputData: () => input.playerInputData(),
		raw: input.raw,
		game: input.game,
		// For developing purposes:
		get: (property) => input[property],
	},
	display: {
		initFade: (a,b) => display.initFade(a, b),
		updateFade: () => display.updateFade(),
	},
};
let game = new Game(assets, callFns);




//////////////////////////
// HELPER FUNCTIONS
//////////////////////////
function toRadians(degrees){return degrees * Math.PI/180};
function loopOver(obj, callback){
	for (const key in obj) callback(key, obj[key])
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
		game = new Game(assets, callFns); 
		game.setStage();
		engine.ups = ups;
		engine.fps = fps;

		console.log('---------------------');
		console.log(`GAME RESET: now rendering at ${fps}fps`);

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