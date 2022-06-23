//////////////////////////
// SET UP
//////////////////////////
'use strict';

let M = Math;
const input 	  = new Input();
const display 	  = new Display(160, 120, 8);
const audioPlayer = new AudioPlayer();
const pool 		  = new Pool();
const stage 	  = new Stage(8);
const engine 	  = new Engine(60);
const game 		  = new Game();
const assets 	  = new Assets(runGame).loadAndRun();

function runGame() {
	// 1) Pool Dependencies
	pool.needs(assets, game.objects);

	// 2) Stage Dependencies
	stage.needs(assets, pool, display.width, display.height);

	// 3) Engine Dependencies
	engine.needs(
		z => game.update(), 
		z => display.render(stage.bg, game.objects
	));

	// 4) Assets dependencies
	assets.needs(pool, stage)

	// 5) Game Dependencies
	game.needs(
		stage, 
		pool, 
		input, 
		display.height, 
		audioPlayer,
		(a,b) => display.initFade(a, b), 
		z => display.updateFade()
	);

	// 6) Initialize
	stage.init();
	game.init();

	// 7) Start engine
	engine.start();
}

// Debug
const debug = {
	gameReset() {
		// Audio: enable again
		audioPlayer.enable = true;
		// Pool: Liberar todos los objetos del los pools
		for(const key in pool.type) pool.type[key].forEach(el => el.free = true);
		// Stage: Reset values
		stage.bg.pattern = [...stage.patterns['1']];
		stage.bg.queue.length = 0
		stage.bg.changePattern = false;
		// stage.bg.speedDecimalAcc = 0;
		stage.bg.rows = [...stage.r__rows];
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
		// Engine: Pause (so that window.requestAnimationFrame stops)
		engine.pause()
		// Custom...
		// engine.ups = 20;
		// Wait 100ms and restart to allow window.requestAnimationFrame to stop
		setTimeout(a=>engine.start(), 100)
	},
	// changeFps(ups, fps) {
	// 	engine.init(ups, fps);
	// 	game.ceilIteration()
	// 	engine.start();
	// 	console.log(`Now rendering at ${fps}fps`);
	// },
	// toggleScanlines(){
	// 	display.scanlines = display.scanlines ? undefined : 'scanlines';
	// 	display.intensity = 50;
	// 	display.render(stage.bg, game.objects);
	// },
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
	// bgSpeedAdd(n){
	// 	game.stage.bg.speed += n;
	// },
	// bgSpeedSub(n){
	// 	game.stage.bg.speed -= n;
	// },
	// spawnEnemy(){
	// 	pool.getFreeObject('EnemyPop1', 'EnemyAir', {phase:-1});
	// },
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