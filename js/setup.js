//////////////////////////
// SET UP (borrar cosas de debug)
//////////////////////////
'use strict';

const customMath  = new CustomMath();
const input 	  = new Input();
const display 	  = new Display(160, 120, 8);
const audioPlayer = new AudioPlayer();
const pool 		  = new Pool();
const stage 	  = new Stage(8);
const engine 	  = new Engine(60);
const game 		  = new Game();
const assets 	  = new Assets(runGame).loadAndRun();

function runGame() {
	// Pool Dependencies
	pool.needs(assets, game.objects);

	// Stage Dependencies
	stage.needs(assets, display.width, display.height);

	// Engine Dependencies
	engine.needs(
		() => game.update(), 
		() => display.render(stage.bg, game.objects, game.fade)
	);

	// Game Dependencies
	game.needs(
		customMath,
		stage, 
		pool, 
		input, 
		display.height, 
		audioPlayer
	);

	// Initialize
	stage.init();
	game.init();

	// Start engine
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
		// Game: 
		// Vaciar mapa game.objects
		for (const [_, arr] of game.objects) arr.length = 0;
		// Reiniciar game
		game.init()
		// Engine: Pause (so that window.requestAnimationFrame stops)
		engine.pause()
		// Custom...
		// engine.ups = 20;

		//BUGGY
		// Wait 100ms and restart to allow window.requestAnimationFrame to stop
		setTimeout(() => engine.start(), 100)
	},
	toggleHitboxes(){
		display.hitboxes = display.hitboxes ? undefined : 'hitboxes';
		display.render(stage.bg, game.objects, game.fade);
	},
	enginePause(){
		engine.pause();
	},
	engineStart(){
		engine.start();
	}
}
window.addEventListener('keydown', key => {
	if (key.code === 'KeyK') debug.enginePause();
	if (key.code === 'KeyP') debug.engineStart();
	if (key.code === 'KeyH') debug.toggleHitboxes();
	if (key.code === 'KeyR') debug.gameReset();
});