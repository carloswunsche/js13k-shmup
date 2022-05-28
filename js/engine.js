//////////////////////////
// ENGINE
//////////////////////////

class Engine {
    constructor(ups, fps, fns) {
        this.paused = true;
        this.ups = ups; // How many updates performed per second (can be use as "game speed")
        this.fps = fps; // How many frames rendered per second
        this.delta = 0; // Amount of time that's accumulated since the last update.
        this.lastStamp = 0; // The most recent timestamp of loop execution.
        this.min = 1000 / ups; // Minimum update time (16.6 ms if 60 ups)
        this.acc = 0; // Necessary to choose different fps values

        this.start = function () {
            this.delta = this.min;
            this.lastStamp = performance && performance.now ? performance.now() : new Date().getTime();
            window.requestAnimationFrame((newStamp) => {
                // Fixes this.lastStamp being greater than newStamp when engine starts
                if (this.lastStamp > newStamp) this.lastStamp = newStamp - this.min;
                // Call loop
                this.paused = false;
                this.loop(newStamp);
            });
            return 'Engine started';
        };

        this.loop = function (newStamp) {
            if (this.paused) return;

            // A delta se le suma la diferencia entre newStamp y lastStamp
            this.delta += newStamp - this.lastStamp;
            // Se reasigna lastStamp con el valor de newStamp
            this.lastStamp = newStamp;

            while (this.delta > this.min) {
                fns.update();
                this.delta -= this.min;
                this.acc += this.min;
            };

            // Render with fps control
            if (this.acc >= 1000 / this.fps) {
                fns.render();
                this.acc = 0;
            };

            return window.requestAnimationFrame((newStamp) => this.loop(newStamp));
        };

        this.pause = function () {
            if (!this.paused) {
                this.paused = true;
                return 'Engine Paused';
            }
            if (this.paused) {
                fns.update();
                fns.render();
                return 'Advance one frame';
            }
        };
    }
}