//////////////////////////
// SET UP (borrar cosas de debug)
//////////////////////////
'use strict';

const customMath = new CustomMath();
const input = new Input();
const display = new Display();
const audioPlayer = new AudioPlayer();
const pool = new Pool();
const stage = new Stage();
const engine = new Engine();
const game = new Game();
const assets = new Assets();

assets.load(connectInitStart);

function connectInitStart() {
  /** Connect modules */
  pool.needs(assets, game.objects);
  engine.needs(
    () => game.update(),
    () => display.render(stage.bg, game.objects, game.fade)
  );
  game.needs(customMath, stage, pool, input, display.height, audioPlayer);

  /** Initialize */
  stage.init(assets.bg, display, pool);
  game.init();

  /** Start engine */
  engine.start();
}

// Debug
const debug = {
  gameReset() {
    // Audio: enable again
    audioPlayer.enable = true;
    // Pool: Liberar todos los objetos del los pools
    for (const key in pool.type) pool.type[key].forEach(el => (el.free = true));
    /* --------------------- STAGE --------------------- */
    stage.init(assets.bg, display, pool);
    /* ---------------------- GAME --------------------- */
    // Reinicializar game
    game.init();
    // Engine: Pause (so that window.requestAnimationFrame stops)
    engine.pause();
    // Wait 200ms and restart to allow window.requestAnimationFrame to stop
    setTimeout(() => engine.start(), 200);
  },
  toggleHitboxes() {
    display.hitboxes = display.hitboxes ? undefined : 'hitboxes';
    display.render(stage.bg, game.objects, game.fade);
  },
};
window.addEventListener('keydown', key => {
  if (key.code === 'KeyP') engine.pause();
  if (key.code === 'Enter') engine.start();
  if (key.code === 'KeyH') debug.toggleHitboxes();
  if (key.code === 'KeyR') debug.gameReset();
});

document.getElementById('resetBtn').addEventListener('click', debug.gameReset);
document.getElementById('pauseBtn').addEventListener('click', engine.pause);
document.getElementById('continueBtn').addEventListener('click', engine.start);
document
  .getElementById('hitboxBtn')
  .addEventListener('click', debug.toggleHitboxes);
document.getElementById('fullScreenBtn').addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
});
