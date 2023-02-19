//////////////////////////
// ENGINE (OK)
//////////////////////////

class Engine {
  constructor() {
    this.ups = 60;
  }
  needs(updateFn, renderFn) {
    this.callUpdate = updateFn;
    this.callRender = renderFn;
  }
  start() {
    // Pause flag
    this.paused = false;
    // Time accumulator
    this.timeAcc = 0;
    // Render Acc t
    this.renderAcc = 0;
    // Time slice
    this.slice = 1000 / this.ups;
    // Fps
    this.oneFrameInMs = 1000 / 60;
    // Difference between this.lastStamp and newStamp
    this.delta = 0;
    // The most recent timestamp of loop execution
    this.lastStamp = performance?.now
      ? performance.now()
      : new Date().getTime();
    // Start loop passing newStamp
    window.requestAnimationFrame(newStamp => this.loop(newStamp));
  }
  loop(newStamp) {
    // Necesary for game reset when player dies
    if (this.paused) return;
    // A delta se le suma la diferencia entre newStamp y lastStamp
    this.delta = newStamp - this.lastStamp;
    // Se reasigna lastStamp con el valor de newStamp
    this.lastStamp = newStamp;
    // Se acumula delta
    this.timeAcc += this.delta;

    while (this.timeAcc > this.slice) {
      this.callUpdate();
      this.timeAcc -= this.slice;
      // Necesary for render section
      this.renderAcc += this.slice;
    }
    // Necesary for render section
    if (this.renderAcc >= this.oneFrameInMs) {
      this.callRender();
      this.renderAcc = 0;
    }
    // Segun la documentacion de mozilla, lo primero que hacer en el main loop es ya pedirle el siguiente frame al navegador
    if (!this.paused)
      window.requestAnimationFrame(newStamp => this.loop(newStamp));
  }
  pause() {
    /** If not paused, pause and exit */
    if (!this.paused) return (this.paused = true);
    /** If paused, call update and render once to refresh screen */
    if (this.paused) {
      this.callUpdate();
      this.callRender();
    }
  }
}
