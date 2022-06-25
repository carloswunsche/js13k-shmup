//////////////////////////
// STAGE
//////////////////////////

class Stage {
    constructor(tileSize){
        this._tileSize = tileSize;
        this.r__rows = [-8, 0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112];
        this._tileQty = 320;
    }
    needs(assets, displayW, displayH){
        // To get the pool input array for the current level
        this._assets = assets;
        // To set bg number of columns
        this._displayW = displayW;
        // To use setRowsArr function and get tile quantity
        this._displayH = displayH;
    }
    init(){
        // Take raw pattern from assets, then make a patterns object
        this._rawPattern = this._assets.bigPattern;
        this.patterns = this.createPatternsObj(this._rawPattern);
        // Get events function
        this.events = this._assets.getEventsFn();
        // Setup background
        this.setupBackground();
        // Music
        // this.music = undefined;
    }
    setupBackground() {
        this.bg = {};
        this.bg.queue = [];
        this.bg.pattern = [...this.patterns['1']];
        this.bg.image = this._assets.bg;
        this.bg.imageCols = this.bg.image.width / this._tileSize;
        this.bg.rows = [...this.r__rows];
        this.bg.tileSize = this._tileSize;
        this.bg.numCols = this._displayW / this._tileSize;
        this.bg.tileQty = this._tileQty;
        this.bg.changePattern = false;
        // this.bg.speed = 0; // Necessary to be able to sum speed on events
    }
    createPatternsObj(rawPatArr){
        let obj = {}
        for(let i = 0; i < rawPatArr.length; i+=this._tileQty){
            obj[1+i/this._tileQty] = rawPatArr.slice(
                rawPatArr.length-this._tileQty*(1+i/this._tileQty),
                rawPatArr.length-this._tileQty*(i/this._tileQty)
            );
        };
        return obj;
    }
};