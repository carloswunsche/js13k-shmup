//////////////////////////
// STAGE
//////////////////////////

// ************************************************
// WORKING WITH ACCESS TO PUBLIC OBJECTS,.... FIX
// ************************************************

class Stage {
    constructor(image, imageScaled, stageNum, pool) {
        // Background
        this.bg = {};
        this.bg.patterns = {
            1: [6,3,3,2,3,2,3,2,3,2,3,3,3,2,8,2,3,5,3,4,
                2,3,2,6,2,2,2,3,2,3,2,3,2,3,2,8,2,3,2,3,
                1,2,8,2,3,2,3,7,3,2,3,2,3,2,3,2,3,2,3,4,
                5,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,
                6,2,3,2,3,2,3,2,3,2,3,2,3,2,6,2,3,2,3,4,
                5,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,8,
                1,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,7,
                1,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,8,
                1,2,3,2,3,2,3,2,6,2,3,2,3,2,3,2,3,2,3,2,
                5,3,2,3,2,3,2,3,2,8,2,3,2,3,2,3,2,3,2,8,
                6,2,3,5,3,2,3,2,8,2,3,2,3,2,3,2,3,2,3,7,
                1,3,2,3,2,3,2,3,2,3,2,3,2,3,5,3,2,3,2,4,
                1,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,3,3,4,
                5,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,7,
                1,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,5,6,2,
                2,3,3,3,7,3,2,3,2,3,2,8,2,3,2,3,2,6,3,4],
            
            2: [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
                6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
                6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
                6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
                6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
                6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
                6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
                6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
                6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
                6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
                6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
                6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
                6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
                6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
                6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
                8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
        };
        this.bg.queue = [];
        this.bg.pattern = this.bg.patterns[1];
        this.bg.image = image;
        this.bg.tileSize = 16;
        this.bg.tileScaled = this.bg.tileSize * imageScaled;
        this.bg.imageCols = this.bg.image.width / this.bg.tileSize;
        this.bg.tileQty = this.getTileQty(this.bg.tileSize, display.width, display.height);
        this.bg.rows = this.setRowsArr(this.bg.tileSize);
        this.bg.numCols = display.width / this.bg.tileSize;
        this.bg.changePattern = false;

        // Se recomienda moverse en intervalos de 0.25, 0.5 o 1 para mejor rendimiento. 
        // El minimo es 0.1
        this.bg.speed = 1;

        // Music
        this.music = undefined;

        // Events (function that Game calls on each update)
        this.events = this.getEvents(stageNum, pool);
    }

    setRowsArr (tile) {
        let arr =  [];
        for (let n = -tile; n < display.height; n += tile) arr.push(n);
        return arr;
        // With tileSize of 16px, this will return:
        // [-16, 0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224]
    }
    getTileQty(tileSize) {
        let heightPlusOneRow = display.height + tileSize;
        return (display.width / tileSize) * (heightPlusOneRow / tileSize);
    }
    getEvents(stageNum, pool) {
        // Return stage 1 function
        if (stageNum === 1) return function(){
            if (game.iteration === 50)    pool.getFreeObject('enemy');
            if (game.iteration === 100)   this.bg.queue.push(...this.bg.patterns[2]);
            if (game.iteration === 150)   pool.getFreeObject('enemy');
            if (game.iteration === 180)   pool.getFreeObject('enemy');
            if (game.iteration === 200)   pool.getFreeObject('enemy');
            if (game.iteration === 500)   this.bg.queue.push(...this.bg.patterns[1], ...this.bg.patterns[1]);
        };
        // Return stage 2 function
        if (stageNum === 2) return function(){
            // ...................
            // ...................
            // ...................
        };
    }
};