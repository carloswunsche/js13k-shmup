//////////////////////////
// STAGE
//////////////////////////

class Stage {
    constructor(tileSize){
        this._tileSize = tileSize;
        this.r__rows = [-8, 0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112];
    }
    needs(assets, pool, displayW, displayH){
        // To get the pool input array for the current level
        this._assets = assets;
        // // To pool objects from assets' input array AND to get free ones from stage events
        this.pool = pool;
        // To set bg number of columns
        this._displayW = displayW;
        // To use setRowsArr function and get tile quantity
        this._displayH = displayH;
    }
    init(){
        // Get tile quantity
        // this._tileQty = this.getTileQty();
        this._tileQty = 320;
        // Unnecesary
        // Get stage number from comfy string
        // this.stageNum = parseInt(stageNum);
        // Take raw pattern from assets, then make a patterns object
        this._rawPattern = this._assets.bigPattern;
        this.patterns = this.createPatternsObj(this._rawPattern);
        // Pool stage objects
        // this._assets.getPoolInputArr(this.stageNum).forEach(entityArr => this.pool.fillWith(entityArr))
        this._assets.getPoolInputArr().forEach(entityArr => this.pool.fillWith(entityArr))
        // Get events function
        this.events = this._assets.getEventsFn(this.stageNum);
        // Setup background
        this.setupBackground();
        // Music
        // this.music = undefined;
    }
    setupBackground() {
        this.bg = {};
        this.bg.queue = [];
        // Reduce a little
        this.bg.pattern = [...this.patterns['1']];
        // Reduce
        // this.bg.image = this._assets['Stage'+this.stageNum];
        this.bg.image = this._assets.bg;
        this.bg.imageCols = this.bg.image.width / this._tileSize;
        this.bg.rows = [...this.r__rows];
        this.bg.tileSize = this._tileSize;
        this.bg.numCols = this._displayW / this._tileSize;
        this.bg.tileQty = this._tileQty;
        this.bg.changePattern = false;
        this.bg.speed = 0; // See stage events for initial speed

        // Unnecesary Used for firefox background rendering
        // this.bg.speedDecimalAcc = 0;
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
    // _setRowsArr () {
    //     let arr =  [];
    //     for (let n = -this._tileSize; n < this._displayH; n += this._tileSize) arr.push(n);
    //     return arr;
    //     // With a tileSize of 16px, this function will return:
    //     // [-16, 0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224]
    //     // With a tileSize of 8px, this function will return:
    //     // [-8,, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112]
    // }
    // getTileQty() {
    //     let heightPlusOneRow = this._displayH + this._tileSize;
    //     return (this._displayW / this._tileSize) * (heightPlusOneRow / this._tileSize);
    // }
};