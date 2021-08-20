         "use strict";
      //////////////////
    ///// ENGINE //////
  ////////////////////

// Engine constructor function
const Engine = function(step, updateFunction, renderFunction) {

    this.delta      = 0;    // Amount of time that's accumulated since the last update.
    this.lastStamp  = 0;    // The most recent timestamp of loop execution.
    this.step       = step; // 1000/60 = 16.66ms each frame = 60FPS
    this.update     = updateFunction;
    this.render     = renderFunction;
  
    this.loop = function(newStamp) {
        this.delta += newStamp - this.lastStamp;
        this.lastStamp = newStamp;

        let updateFlag = false;
        while (this.delta > this.step) {
            this.delta -= this.step; 
            this.update(); 
            updateFlag = true; 
        }
        if (updateFlag) this.render();

        window.requestAnimationFrame(this.loop.bind(this)); // Call loop again passing timestamp and so on...
    };

    // ENGINE START
    this.start = function() {
        this.delta = this.step; // 1000/60 = 16.66ms each frame = 60FPS
        this.lastStamp = performance && performance.now ? performance.now() : new Date().getTime(); // First timestamp
        window.requestAnimationFrame(this.loop.bind(this)); // Call loop for the 1st time and pass timestamp
    }
};