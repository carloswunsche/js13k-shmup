         "use strict";
      //////////////////
    ///// ENGINE //////
  ////////////////////

// Engine constructor function
const Engine = function(minStep, fps, updateFunction, renderFunction) {

    this.delta      = 0;    // Amount of time that's accumulated since the last update.
    this.lastStamp  = 0;    // The most recent timestamp of loop execution.
    this.minStep    = minStep; // 1000/60 = 16.66ms minimum update time
    this.update     = updateFunction;
    this.render     = renderFunction;
    this.updateFlag = 0;
  
    this.loop = function(newStamp) {
        this.delta += newStamp - this.lastStamp;
        this.lastStamp = newStamp;

        while (this.delta > this.minStep) {
            this.delta -= this.minStep; 
            this.update();
            this.updateFlag += minStep; 
        }
        if (this.updateFlag >= 1000/fps) {this.updateFlag = 0; this.render();}

        window.requestAnimationFrame((newStamp) => this.loop(newStamp)); // Call loop again passing timestamp and so on...
    };

    // ENGINE START
    this.start = function() {
        this.delta = this.minStep; // 1000/60 = 16.66ms minimum update time
        this.lastStamp = performance && performance.now ? performance.now() : new Date().getTime(); // First timestamp
        window.requestAnimationFrame((newStamp) => this.loop(newStamp)); // Call loop for the 1st time and pass timestamp
    }
};