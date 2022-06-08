//////////////////////////
// STAGE
//////////////////////////

// ************************************************
// WORKING WITH ACCESS TO PUBLIC OBJECTS,.... FIX
// ************************************************

class Stage {
    constructor(image, imageScaled, stageNum, pool) {
        this.allPatterns = [1,1,1,1,1,1,1,1,1,1,2,3,4,5,6,1,1,1,2,7,1,1,1,1,8,9,10,1,1,11,3,12,13,13,14,1,1,1,15,16,1,1,1,17,18,18,18,19,11,3,12,20,18,18,18,1,1,1,21,22,23,1,1,1,1,24,25,26,27,28,29,18,1,1,1,1,1,1,30,31,32,33,1,1,1,34,25,21,22,22,14,1,1,1,1,1,1,1,35,36,37,38,1,1,1,18,18,39,31,40,41,25,42,1,1,1,1,1,1,1,43,1,1,1,1,1,1,35,36,44,45,18,46,1,1,1,1,1,1,1,47,48,1,1,1,1,1,1,1,1,1,1,49,1,1,1,1,1,1,1,50,51,1,1,1,1,1,1,1,1,1,1,52,1,1,1,1,1,1,1,53,51,1,1,1,1,1,1,1,1,1,1,52,1,1,1,1,1,1,1,13,14,1,1,1,1,1,1,1,1,1,1,52,1,1,1,1,1,1,1,40,54,1,1,1,1,1,1,1,1,1,1,52,1,1,1,1,1,1,1,44,55,1,1,1,1,1,1,1,1,1,1,52,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,56,57,52,57,57,58,1,1,8,9,1,1,1,1,1,1,1,1,1,1,59,60,61,7,48,62,1,17,18,18,1,1,1,1,1,1,1,1,1,1,59,63,64,65,51,62,1,1,1,1,1,1,1,66,1,1,1,1,67,1,59,68,69,70,29,71,58,1,1,1,1,1,17,18,19,1,1,1,1,56,72,68,69,70,73,74,62,1,1,1,1,1,1,1,1,1,1,1,1,59,11,53,69,5,53,29,62,1,1,1,1,1,1,1,1,1,1,1,1,59,68,53,75,53,76,29,71,58,67,1,1,1,1,1,1,1,66,1,56,72,68,53,75,73,53,53,74,62,1,1,1,1,1,1,1,17,18,19,59,11,53,53,4,65,53,53,29,62,1,1,1,1,1,1,1,1,1,56,72,68,77,53,53,75,53,53,29,62,1,1,1,1,1,1,1,1,1,59,11,53,53,53,64,70,53,53,29,71,58,1,1,1,66,1,1,1,56,72,68,53,53,53,69,70,53,53,53,74,62,1,1,17,18,19,1,56,72,11,53,53,53,53,69,70,53,77,53,29,62,1,1,1,1,1,56,72,11,53,53,53,53,53,69,70,53,53,53,29,71,58,1,1,1,56,72,11,53,53,53,53,53,53,69,78,65,53,53,53,74,62,1,1,1,59,11,53,76,53,53,53,53,53,4,78,70,53,53,77,29,62,1,1,56,72,68,53,53,53,53,53,76,53,53,69,70,53,53,53,29,62,1,1,59,11,53,53,53,53,53,53,53,53,53,69,78,65,53,53,29,62,1,56,72,68,53,53,53,53,53,53,53,53,64,78,78,70,53,53,29,62,1,59,68,28,53,53,53,53,77,53,53,53,64,78,79,70,53,53,29,62,59,11,80,81,82,83,53,53,53,53,53,64,78,78,78,5,53,53,29,62,59,68,84,85,32,86,53,53,53,64,87,78,78,78,5,88,53,53,29,62,11,3,89,90,91,92,53,53,64,78,78,78,78,5,53,53,53,53,29,62,68,53,53,93,94,53,64,87,78,79,78,78,5,53,53,53,53,12,20,62,68,53,53,53,53,64,78,78,78,79,78,5,53,73,53,53,12,20,62,1,68,53,53,64,87,78,78,78,78,95,5,53,53,53,53,53,29,62,1,1,96,50,53,4,78,78,78,78,5,53,53,53,53,53,53,53,29,62,1,1,59,96,50,53,69,79,78,70,53,53,76,53,53,28,53,53,29,62,1,1,1,59,68,53,4,95,78,78,65,53,53,53,53,53,53,53,29,62,1,1,1,59,68,53,53,53,4,78,78,65,53,53,73,53,53,53,97,74,62,1,59,11,53,53,53,53,53,4,78,78,87,87,65,53,53,53,53,97,74,62,59,68,98,99,53,53,53,53,4,95,78,79,78,65,53,88,53,53,29,62,59,68,53,53,53,53,53,28,53,53,4,78,78,70,53,53,53,53,29,62,59,96,50,53,53,53,53,53,53,53,53,4,78,78,65,53,73,53,29,62,1,59,68,53,53,53,53,53,53,53,53,53,69,78,78,65,53,88,29,62];
        
        this.bg = {};
        this.bg.tileSize = 16;
        this.bg.tileQty = this.getTileQty(this.bg.tileSize, display.width, display.height);
        // Create patterns object
        this.bg.patterns = {}
        for(let i = 0; i < this.allPatterns.length; i+=this.bg.tileQty){
            this.bg.patterns[1+i/this.bg.tileQty] = this.allPatterns.slice(
                this.allPatterns.length-this.bg.tileQty*(1+i/this.bg.tileQty),
                this.allPatterns.length-this.bg.tileQty*(i/this.bg.tileQty)
            );
        };

        this.bg.queue = [];
        this.bg.pattern = [...this.bg.patterns["1"]]; // Basta de cambiar esto, tiene que quedar asi XD
        this.bg.image = image;

        this.bg.tileScaled = this.bg.tileSize * imageScaled;
        this.bg.imageCols = this.bg.image.width / this.bg.tileSize;
  
        this.bg.rows = this.setRowsArr(this.bg.tileSize);
        this.bg.numCols = display.width / this.bg.tileSize;
        this.bg.changePattern = false;

        // Se recomienda moverse en intervalos de 0.25, 0.5 o 1 para mejor rendimiento. 
        // El minimo intervalo es de 0.1
        this.bg.speed = 5;

        // Music
        this.music = undefined;

        // Events (function that Game calls on each update)
        this.events = this.getEvents(stageNum, pool);
    }

    setRowsArr (tileSize) {
        let arr =  [];
        for (let n = -tileSize; n < display.height; n += tileSize) arr.push(n);
        return arr;
        // With a tileSize of 16px, this function will return:
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