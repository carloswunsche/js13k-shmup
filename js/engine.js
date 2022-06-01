//////////////////////////
// ENGINE
//////////////////////////

let step = 1;

class Engine {
    constructor(ups, fps, call) {
        this.paused = false;

        this.ups = ups; // Desired amount of updates per second
        this.slice = 1000 / ups; // Minimum time required for each update in ms
        this.timeAcc; // Time accumulator
        this.delta; // Difference between this.lastStamp and newStamp
        this.step = (-1/120) * ups + 1.5; // Multiplier passed to update function. This will give 1 for 60 ups and 0.5 for 120 ups
        step = (-1/120) * ups + 1.5;
        
        this.fps = fps > ups ? ups : fps; // Desired amount of frames rendered per second (cannot be more than ups)
        this.renderAcc = 0; // Necessary to render at the proper moment
        this.oneFrameInMs = 1000 / fps; // One frame in ms

        this.lastStamp = 0; // The most recent timestamp of loop execution
        this.iterations = [0,0];




        // 1 =
        // (-1/120) * 60 + 1.5


        // 0.5 =
        // (-1/120) * 120 + 1.5



        this.start = function () {
            this.iterations = [0,0];
            this.paused = false;
            this.timeAcc = 0;
            this.lastStamp = performance?.now ? performance.now() : new Date().getTime();
            window.requestAnimationFrame(newStamp => this.loop(newStamp));
            return 'Engine started';
        };

        this.loop = function (newStamp) {
// this.did = []
// if (this.iterations[0] === 50) this.paused = true;
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
                this.iterations[0]++
// this.did.push('update')
            };

            if (this.renderAcc >= this.oneFrameInMs) {
                call.display.render();
                this.renderAcc = 0;
                this.iterations[1]++
// this.did.push('render')
            };

// console.log(this.did);
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
}