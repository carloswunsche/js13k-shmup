//////////////////////////
// ENGINE
//////////////////////////

let step = 1;

class Engine {
    constructor(ups, fps, call) {
        this.ups = ups; // Desired amount of updates per second
        this.fps = fps > ups ? ups : fps; // Desired amount of frames rendered per second (cannot be more than ups)
        this.setup();

        this.start = function () {
// this.iterations = [0,0];
            this.paused = false;
            this.timeAcc = 0;
            this.lastStamp = performance?.now ? performance.now() : new Date().getTime();
            window.requestAnimationFrame(newStamp => this.loop(newStamp));
            return 'Engine started';
        };

        this.loop = function (newStamp) {
// if (this.iterations[0] >= 100 * (this.step === 1 ? 1 : 2))  {this.paused = true;console.log(this.iterations);}
            if (this.paused) return;

            // A delta se le suma la diferencia entre newStamp y lastStamp
            this.delta = newStamp - this.lastStamp;
            // Se reasigna lastStamp con el valor de newStamp
            this.lastStamp = newStamp;
            // Se acumula delta
            this.timeAcc += this.delta;

            while (this.timeAcc > this.slice) {
                call.game.update(this.step);
                this.timeAcc -= this.slice;
                this.renderAcc += this.slice;

// this.iterations[0]++
            };

            if (this.renderAcc >= this.oneFrameInMs) {
                call.display.render();
                this.renderAcc = 0;
// this.iterations[1]++
            };
            return window.requestAnimationFrame((newStamp) => this.loop(newStamp));
        };

        this.pause = function () {
            if (!this.paused) {
                this.paused = true;
                return 'Engine Paused';
            }
            if (this.paused) {
                call.game.update();
                call.display.render();
                return 'Advance one frame';
            }
        };
    }
    setup() {
        this.slice = 1000 / this.ups; // Minimum time required for each update in ms
        this.timeAcc = 0; // Time accumulator
        this.delta = 0; // Difference between this.lastStamp and newStamp
        this.step = (-1/120) * this.ups + 1.5; // Multiplier passed to update function. This will give 1 for 60 ups and 0.5 for 120 ups
        step = (-1/120) * this.ups + 1.5;
        this.renderAcc = 0; // Necessary to render at the proper moment
        this.oneFrameInMs = 1000 / this.fps; // One frame in ms
        this.lastStamp; // The most recent timestamp of loop execution
    }
}