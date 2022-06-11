//////////////////////////
// STAGE
//////////////////////////

class Stage {
    constructor(tileSizeStr){
        this._tileSize = parseInt(tileSizeStr);
    }
    needs(assets, pool, gameObjects, sourceImgScaleFactor, displayW, displayH){
        this._assets = assets;
        // To pool stage objects and to get free ones from stage events
        this.pool = pool;
        this._displayW = displayW;
        this._displayH = displayH;
        this._tileQty = this.getTileQty();
        this._tileScaled = this._tileSize * sourceImgScaleFactor;
        this._gameObjects = gameObjects
    }
    init(stageNum){
        // Push new Player inside gameObjects
        this._gameObjects.get('Player').push(new Player(assets.Player))
        // Get stage number from comfy string
        this.stageNum = parseInt(stageNum);
        // Take raw pattern from assets, then make a patterns object
        this._rawPattern = this._assets.getRawPattern(this.stageNum);
        this.patterns = this.createPatternsObj(this._rawPattern);
        // Pool stage objects
        this._assets.getPoolInputArr(this.stageNum).forEach(el => this.pool.fillWith(el[0], el[1]))
        // Get events function
        this.events = this._assets.getEventsFn(this.stageNum);
        // Setup background
        this.setupBackground();
        // Music
        this.music = undefined;
    }
    setupBackground() {
        this.bg = {};
        this.bg.queue = [];
        this.bg.pattern = [...this.patterns['1']];
        this.bg.image = this._assets['Stage'+this.stageNum];
        this.bg.imageCols = this.bg.image.width / this._tileSize;
        this.bg.tileScaled = this._tileScaled;
        this.bg.rows = this.setRowsArr();
        this.bg.tileSize = this._tileSize;
        this.bg.numCols = this._displayW / this._tileSize;
        this.bg.tileQty = this._tileQty;
        this.bg.changePattern = false;
        this.bg.speed = 1;
        // Se recomienda moverse en intervalos de 0.25, 0.5 o 1 para mejor rendimiento. 
        // El minimo intervalo es de 0.1
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
    setRowsArr () {
        let arr =  [];
        for (let n = -this._tileSize; n < this._displayH; n += this._tileSize) arr.push(n);
        return arr;
        // With a tileSize of 16px, this function will return:
        // [-16, 0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224]
    }
    getTileQty() {
        let heightPlusOneRow = this._displayH + this._tileSize;
        return (this._displayW / this._tileSize) * (heightPlusOneRow / this._tileSize);
    }
    deleteUnused(){
        delete this._assets;
        delete this._rawPattern;
        delete this._tileSize
        delete this._displayW
        delete this._displayH
        delete this._tileQty;
        delete this._tileScaled;
        delete this._gameObjects;
    }
};