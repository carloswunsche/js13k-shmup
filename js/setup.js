//////////////////////////
// SET UP
//////////////////////////
'use strict';

const input 	  = new Input();
const display 	  = new Display(160, 120, 8);
const audioPlayer = new AudioPlayer();
const pool 		  = new Pool();
const stage 	  = new Stage(8);
const engine 	  = new Engine();
const game 		  = new Game();
const assets 	  = new Assets('assets/').loadAnd(setupAndRun);

function setDependencies() {
	// 1) Pool Dependencies
	pool.needs(assets, game.objects);

	// 2) Stage Dependencies
	stage.needs(assets, pool, display.width, display.height);

	// 3) Engine Dependencies
	const update = (firefox, step) => {game.update(firefox, step)};
	const render = () => {display.render(stage.bg, game.objects)};
	engine.needs(update, render);

	// 4) Game Dependencies
	const initFade   = (a,b)  => display.initFade(a, b);
	const updateFade = (step) => display.updateFade(step);
	game.needs(stage, pool, input, display.height, audioPlayer, initFade, updateFade);
}
function initialize(){
	stage.init('1st-stage');
	engine.init(60, 60);
	game.init();
}
function setupAndRun() {
	setDependencies();
	initialize();
	// clean();
	engine.start();
}


//////////////////////////
// DEBUGGER
//////////////////////////
const debug = {
	gameReset() {
		// Pool: Liberar todos los objetos del los pools
		for(const key in pool.type) pool.type[key].forEach(el => el.free = true);
		// Stage: Reset values
		stage.bg.pattern = [...stage.patterns['1']];
		stage.bg.queue.length = 0
		stage.bg.changePattern = false;
		stage.bg.speedDecimalAcc = 0;
		stage.bg.rows = stage._setRowsArr();;
		stage.bg.speed = 0;
		// Game: 
		// Vaciar mapa game.objects
		for (const [_, arr] of game.objects) arr.length = 0;
		// Volver a primera iteracion
		game.iteration = 0;
		// Quitar queued functions
		game.queuedFns.length = 0;
		// Reset reset counter (lol)
		game.resetCounter = 0;
		// Set fade in
		game.initFade('fromBlack', 1);
		// Engine: (Re)start
		engine.start();
		console.log('Game reset');
	},
	changeFps(ups, fps) {
		engine.init(ups, fps);
		game.ceilIteration()
		engine.start();
		console.log(`Now rendering at ${fps}fps`);
	},
	toggleScanlines(){
		display.scanlines = display.scanlines ? undefined : 'scanlines';
		display.intensity = 50;
		display.render(stage.bg, game.objects);
	},
	toggleHitboxes(){
		display.hitboxes = display.hitboxes ? undefined : 'hitboxes';
		display.render(stage.bg, game.objects);
	},
	enginePause(){
		engine.pause();
	},
	engineStart(){
		engine.start();
	},
	bgSpeedAdd(n){
		game.stage.bg.speed += n;
	},
	bgSpeedSub(n){
		game.stage.bg.speed -= n;
	},
	spawnEnemy(){
		pool.getFreeObject('EnemyPop1', 'EnemyAir', {phase:-1});
	},
}
window.addEventListener('keydown', key => {
	if (key.code === 'KeyK') debug.enginePause();
	if (key.code === 'KeyP') debug.engineStart();
	if (key.code === 'KeyH') debug.toggleHitboxes();
	if (key.code === 'KeyR') debug.gameReset();
	// if (key.code === 'Minus')debug.bgSpeedSub(0.25);
	// if (key.code === 'Equal')debug.bgSpeedAdd(0.25);
	// if (key.code === 'Plus') debug.bgSpeedAdd(0.25);
	// if (key.code === 'KeyE') debug.spawnEnemy();
	// if (key.code === 'KeyS') debug.toggleScanlines();
	// if (key.code === 'Digit1') {
	// 	localStorage.clear();
	// 	localStorage.setItem('savedInputs', JSON.stringify(input.history));
	// }
});


// // Opera 8.0+
// var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// // Firefox 1.0+
// var isFirefox = typeof InstallTrigger !== 'undefined';

// // Safari 3.0+ "[object HTMLElementConstructor]" 
// var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

// // Internet Explorer 6-11
// var isIE = /*@cc_on!@*/false || !!document.documentMode;

// // Edge 20+
// var isEdge = !isIE && !!window.StyleMedia;

// // Chrome 1 - 79
// var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// // Edge (based on chromium) detection
// var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

// // Blink engine detection
// var isBlink = (isChrome || isOpera) && !!window.CSS;


// var output = 'Detecting browsers by ducktyping:<hr>';
// output += 'isFirefox: ' + isFirefox + '<br>';
// output += 'isChrome: ' + isChrome + '<br>';
// output += 'isSafari: ' + isSafari + '<br>';
// output += 'isOpera: ' + isOpera + '<br>';
// output += 'isIE: ' + isIE + '<br>';
// output += 'isEdge: ' + isEdge + '<br>';
// output += 'isEdgeChromium: ' + isEdgeChromium + '<br>';
// output += 'isBlink: ' + isBlink + '<br>';
// document.body.innerHTML = output;