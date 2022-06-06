//////////////////////////
// STAGE
//////////////////////////

// ************************************************
// WORKING WITH ACCESS TO PUBLIC OBJECTS,.... FIX
// ************************************************

class Stage {
    constructor(image, imageScaled, stageNum, pool) {
        this.allPatterns = [1,2,2,2,3,1,2,2,2,1,1,2,2,2,1,4,2,2,2,5,1,2,2,6,3,3,2,2,2,1,1,2,2,7,8,9,10,2,2,11,1,12,2,2,3,1,12,2,2,1,1,2,2,13,14,15,2,2,2,11,2,2,2,2,1,1,2,2,2,1,1,16,17,18,19,20,21,22,2,11,1,2,2,2,13,14,15,2,2,1,1,23,19,19,19,19,19,24,2,11,1,2,16,17,18,19,20,21,22,1,1,25,26,27,19,28,29,30,2,11,1,2,31,19,19,19,19,19,24,1,32,2,2,33,34,35,2,2,2,11,1,2,36,26,27,19,37,29,30,1,1,2,2,2,1,1,2,2,2,11,1,2,2,38,33,39,40,2,2,1,1,2,2,2,4,1,2,2,2,11,1,2,2,2,1,1,2,2,2,1,13,14,15,2,1,1,2,2,2,11,1,2,2,2,1,1,2,2,16,17,18,19,20,21,22,1,12,2,2,11,1,12,2,2,1,32,2,2,31,19,41,41,41,19,24,1,2,2,2,11,1,2,2,2,1,1,2,2,36,26,27,19,37,29,30,1,2,2,2,11,1,2,2,2,1,1,2,2,2,1,33,42,43,2,1,1,2,12,2,11,1,2,2,2,32,1,2,2,2,1,44,2,2,2,1,1,2,2,2,11,1,2,2,2,1,1,2,2,2,1,1,2,2,2,1,1,2,2,2,45,46,47,47,47,48,2,2,2,2,2,2,2,31,19,19,19,19,49,50,51,52,53,1,54,55,2,2,2,2,2,2,2,31,19,19,19,19,21,22,51,56,57,58,59,60,2,2,2,2,61,62,2,31,19,19,19,19,19,24,51,63,64,65,66,67,2,2,68,2,2,2,2,31,19,19,19,19,19,24,51,69,70,71,72,73,2,2,74,75,2,2,2,31,19,19,19,19,19,24,51,2,2,2,2,2,2,2,2,2,2,2,2,31,19,19,19,19,19,24,51,2,2,2,2,2,2,2,2,2,2,76,77,31,19,19,19,19,19,24,51,2,2,2,2,2,2,2,2,2,78,79,80,31,19,19,19,19,19,24,51,2,81,82,83,84,85,86,2,2,81,87,88,31,19,19,19,19,19,24,51,89,90,91,92,93,94,95,2,2,96,97,98,31,19,19,19,19,19,24,51,89,2,2,2,2,2,2,2,2,2,2,2,31,19,19,19,19,19,24,51,89,2,2,2,99,100,2,2,2,101,2,2,31,19,19,19,19,102,24,51,89,2,2,2,2,68,68,68,68,68,103,103,31,19,19,19,19,19,24,51,89,89,2,2,2,74,74,74,74,74,103,103,31,19,19,19,19,19,24,51,89,89,2,2,2,103,103,103,103,103,103,103,31,19,19,19,19,19,104,51,89,89,2,2,2,2,2,2,2,2,2,2,31,19,19,19,19,19,24,51,2,2,2,2,2,2,2,2,2,2,2,2,31,19,19,19,19,19,24,2,2,2,2,2,2,2,2,2,2,2,2,2,31,19,19,19,19,19,24,2,2,2,2,2,2,2,2,2,2,2,2,2,31,19,19,19,19,19,24,2,2,2,2,2,68,2,2,68,2,2,2,2,31,19,19,19,19,19,24,2,2,2,2,2,74,2,2,74,2,2,2,2,31,19,19,19,19,19,24,2,2,2,2,2,2,2,2,2,2,2,2,2,31,19,19,19,19,19,24,2,2,2,2,2,2,2,2,2,2,2,2,2,31,19,19,19,19,19,24,2,2,2,2,2,2,2,2,2,2,2,2,2,31,19,19,19,19,19,24,2,2,81,82,83,84,85,86,2,2,2,2,2,31,19,19,19,19,19,24,2,2,90,91,92,93,94,95,2,2,2,2,2,31,19,19,19,19,19,24,2,2,2,2,2,2,2,2,2,2,2,2,2,31,19,19,19,19,19,24,2,2,2,2,2,2,2,2,2,2,2,2,2,31,19,19,19,19,19,24,2,2,2,2,2,2,68,68,68,68,68,2,2,31,19,19,19,19,19,24,2,2,2,2,2,2,74,74,74,74,74,2,2,31,19,19,19,19,19,24,2,2,2,2,2,2,2,2,2,2,2,2,2,31,19,19,19,19,19,24,2,2,2,2,2,2,2,2,2,2,2,2,2,31,19,19,19,19,19,24,2];
        // Background
        this.bg = {};
        this.bg.patterns = {
            1: this.allPatterns.slice(this.allPatterns.length-320*1,this.allPatterns.length-320*0),
            2: this.allPatterns.slice(this.allPatterns.length-320*2,this.allPatterns.length-320*1),
            3: this.allPatterns.slice(this.allPatterns.length-320*3 ,this.allPatterns.length-320*2),
        }

        this.bg.queue = [];
        this.bg.pattern = [...this.bg.patterns[1]]; // Basta de cambiar esto, tiene que quedar asi XD
        this.bg.image = image;
        this.bg.tileSize = 16;
        this.bg.tileScaled = this.bg.tileSize * imageScaled;
        this.bg.imageCols = this.bg.image.width / this.bg.tileSize;
        this.bg.tileQty = this.getTileQty(this.bg.tileSize, display.width, display.height);
        this.bg.rows = this.setRowsArr(this.bg.tileSize);
        this.bg.numCols = display.width / this.bg.tileSize;
        this.bg.changePattern = false;

        // Se recomienda moverse en intervalos de 0.25, 0.5 o 1 para mejor rendimiento. 
        // El minimo intervalo es de 0.1
        this.bg.speed = 5;
        // console.log(this.bg.speed);

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
        // Return stage 1 events
        if (stageNum === 1) return function(){
            if (game.iteration === 50)    pool.getFreeObject('enemy');
            if (game.iteration === 150)   pool.getFreeObject('enemy');
            if (game.iteration === 180)   pool.getFreeObject('enemy');
            if (game.iteration === 200)   pool.getFreeObject('enemy');
            
            
            if (game.iteration === 200)   this.bg.speed -= 0.5;
            if (game.iteration === 225)   this.bg.speed -= 0.5;
            if (game.iteration === 250)   this.bg.speed -= 0.5;
            if (game.iteration === 275)   this.bg.speed -= 0.5;
            if (game.iteration === 300)   this.bg.speed -= 0.5;
            if (game.iteration === 325)   this.bg.speed -= 0.5;
            if (game.iteration === 350)   this.bg.speed -= 0.5;
            if (game.iteration === 375)   this.bg.speed -= 0.5;

            if (game.iteration === 300)   this.bg.queue.push(...this.bg.patterns[2]);
            if (game.iteration === 600)   this.bg.queue.push(...this.bg.patterns[3]);
        };
        // Return stage 2 events
        if (stageNum === 2) return function(){
            // ...................
            // ...................
            // ...................
        };
    }
};