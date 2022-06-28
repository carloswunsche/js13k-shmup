//////////////////////////
// ENGINE (OK)
//////////////////////////

class Engine {
    constructor(ups){
        this.ups = ups;
    }
    needs(updateFn, renderFn){
        this.callUpdate = updateFn;
        this.callRender = renderFn;
    }
    // init (ups = 60, fps = 60) {
    // init () {
        // Amount of updates per second
        // this.ups = ups;
        // Amount of frames rendered per second (cannot be more than ups)
        // this.fps = fps > ups ? ups : fps;
        // Minimum time required for each update in ms
        // this.slice = 1000 / this.ups;
        // Necessary to render at the proper moment
        // One frame in ms
        // this.oneFrameInMs = 1000 / this.fps;
        // Multiplier passed to update function. This will be 1 for 60 ups and 0.5 for 120 ups
        // this.step = (-1/120) * this.ups + 1.5;
        // step = (-1/120) * this.ups + 1.5;
        // Firefox? // Unnecesary?
        // this.firefox = typeof InstallTrigger !== 'undefined';
    // }
    start () {
        // Updates/Renders array
        // this.iterations = [0,0];
        // Pause flag
        this.paused = false;
        // Time accumulator
        this.timeAcc = 0;
        // Render Acc t
        this.renderAcc = 0;
        // Time slice
        this.s = 1000 / this.ups;
        // Fps
        this.oneFrameInMs = 1000 / 60;
        // Difference between this.lastStamp and newStamp
        this.delta = 0;
        // The most recent timestamp of loop execution
        this.lastStamp = performance?.now ? performance.now() : new Date().getTime();
        // Start loop passing newStamp
        window.requestAnimationFrame(newStamp => this.loop(newStamp));
    }   
    loop (newStamp) {
        // Display when 100 iterations
        // if (this.iterations[0] >= 100)  {this.paused = true;console.log(this.iterations[0]+' updates and '+this.iterations[1]+' renders.');}
        // Necesary for game reset when player dies
        if (this.paused) return;
        // A delta se le suma la diferencia entre newStamp y lastStamp
        this.delta = newStamp - this.lastStamp;
        // Se reasigna lastStamp con el valor de newStamp
        this.lastStamp = newStamp;
        // Se acumula delta
        this.timeAcc += this.delta;
        
        while (this.timeAcc > this.s) {
            this.callUpdate();
            this.timeAcc -=  this.s;
            // Necesary for render section
            this.renderAcc += this.s;
            // this.iterations[0]++;
            // console.log('%cupdate', 'color:grey')
        };
        // Necesary for render section
        if (this.renderAcc >= this.oneFrameInMs) {
            this.callRender();
            this.renderAcc = 0;
            // console.log('%crender', 'color:orange');
            // this.iterations[1]++
        };
        // Segun la documentacion de mozilla, lo primero que hacer en el main loop es ya pedirle el siguiente frame al navegador
        if (!this.paused) window.requestAnimationFrame((newStamp) => this.loop(newStamp));
    }    
    // Necesary for game reset (almost...)
    pause () {
        if (!this.paused) return this.paused = !0;
        if (this.paused) {this.callUpdate();this.callRender()};
    }
};