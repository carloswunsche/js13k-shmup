//////////////////////////
// ENGINE
//////////////////////////

let step = 1;

class Engine {
    needs(updateFn, renderFn){
        this.callUpdate = updateFn;
        this.callRender = renderFn;
    }
    init (ups = 60, fps = 60) {
        // Amount of updates per second
        this.ups = ups;
        // Amount of frames rendered per second (cannot be more than ups)
        this.fps = fps > ups ? ups : fps;
        // Minimum time required for each update in ms
        this.slice = 1000 / this.ups; 
        // Necessary to render at the proper moment
        this.renderAcc = 0;
        // One frame in ms
        this.oneFrameInMs = 1000 / this.fps;
        // Multiplier passed to update function. This will be 1 for 60 ups and 0.5 for 120 ups
        this.step = (-1/120) * this.ups + 1.5;
        step = (-1/120) * this.ups + 1.5;
        // Firefox?
        this.firefox = typeof InstallTrigger !== 'undefined';
    }
    start () {
    // this.iterations = [0,0];
        // Pause flag
        this.paused = false;
        // Time accumulator
        this.timeAcc = 0;
        // Difference between this.lastStamp and newStamp
        this.delta = 0;
        // The most recent timestamp of loop execution
        this.lastStamp = performance?.now ? performance.now() : new Date().getTime();
        // Start loop passing newStamp
        window.requestAnimationFrame(newStamp => this.loop(newStamp));
        return 'Engine started';
    }   
    loop (newStamp) {
    // if (this.iterations[0] >= 100 * (this.step === 1 ? 1 : 2))  {this.paused = true;console.log(this.iterations);}
        if (this.paused) return;

        // A delta se le suma la diferencia entre newStamp y lastStamp
        this.delta = newStamp - this.lastStamp;
        // Se reasigna lastStamp con el valor de newStamp
        this.lastStamp = newStamp;
        // Se acumula delta
        this.timeAcc += this.delta;

        while (this.timeAcc > this.slice) {
            this.callUpdate(this.firefox, this.step);
            this.timeAcc -= this.slice;
            this.renderAcc += this.slice;

    // this.iterations[0]++
        };

        if (this.renderAcc >= this.oneFrameInMs) {
            this.callRender();
            this.renderAcc = 0;
    // this.iterations[1]++
        };
        return window.requestAnimationFrame((newStamp) => this.loop(newStamp));
    }    
    pause () {
        if (!this.paused) {
            this.paused = true;
            return 'Engine Paused';
        };
        if (this.paused) {
            this.callUpdate(this.step);
            this.callRender();
            return 'Advance one frame';
        };
    }
};