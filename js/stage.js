//////////////////////////
// STAGE
//////////////////////////
class Stage {
    constructor(stageNum, assets, call) {

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
        }
        this.bg.queue = [];
        this.bg.pattern = [...this.bg.patterns[1]]; // Necesario usar spread operator
        this.bg.tileSize = 16;
        this.bg.image = assets['bg' + stageNum];
        this.bg.imageScaled = assets.imageScaled;
        this.bg.imageCols = this.bg.image.width / this.bg.tileSize;
        this.bg.tileQty = this.getTileQty(this.bg.tileSize, display.width, display.height);
        this.bg.rows = this.setRows(this.bg.tileSize); // Array
        this.bg.rowDecimal = this.newRowArr(this.bg.tileSize);
        this.bg.numCols = display.width / this.bg.tileSize;
        this.bg.changePattern = false;

        // Can only be changed in intervals of 0.25
        this.bg.speed = 1;

        this.music = undefined;

        // Returns a function
        this.events = this.getEvents(stageNum, call);
    }

    newRowArr(tile) {
        let positions = (display.height+tile) / tile;
        return new Array(positions).fill(0)
    }

    setRows (tile) {
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

    getEvents(stageNum, call) {
        // Return stage 1 function
        if (stageNum === 1) return function(){
            if (call.game.get('frame') ===     0) call.display.initFade('fromBlack', 1);
            if (call.game.get('frame') ===   100) this.bg.queue.push(...this.bg.patterns[2]);
            if (call.game.get('frame') ===   500) this.bg.queue.push(...this.bg.patterns[1], ...this.bg.patterns[1]);
        };
        // Return stage 2 function
        if (stageNum === 2) return function(){
            // ...
        };
    }
};