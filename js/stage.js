//////////////////////////
// STAGE (pretty much OK)
//////////////////////////

class Stage {
    constructor(){
		// this.r__rows = [-8,0,8,16,24,32,40,48,56,64,72,80,88,96,104,112];
        this.r__rows = new Array(16).fill(-8).map((n,i)=>n+8*i)
        this._tileSize = 8;
        this._tileQty = 320;
    }
    needs(assets, displayW, displayH){
        // To get the pool input array for the current level
        this._assets = assets;
        // To set bg number of columns
        this._displayW = displayW;
        // To use setRowsArr function and get tile quantity
        this._displayH = displayH;
		// For stage events
		this.p = pool;
    }
    init(){
        // Take raw pattern from assets, then make a patterns object
        this._rawPattern = this._assets.bigPattern;
        this.patterns = this.createPatternsObj(this._rawPattern);
        // Get events function
        this.events = this.getEventsFn();
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
    getEventsFn() {
		let a = new Array(5**6).fill(f=>f); // 15625 empty functions
		a[0] =()=>{
			this.p.free('Player', 'Players'); 
			this.bg.speed = .5
			this.bg.palette = 8;
		}
		// DEBUG and TESTING
		// a[1]	=()=> this.p.free('Item', {y: 20});
		// a[1]	=()=> this.p.free('Assaulter', {x: 30});
		// a[1]	=()=> this.p.free('Fatty', {side: 1});
		// a[1]	=()=> this.p.free('Sniper', {x: 40});
		// a[1]	=()=> this.p.free('SinePop', {phase:-1});

		// a[1] =()=>this.bg.speed = 2.5
		// a[2] =()=>this.bg.queue.push(...this.patterns['5'], ...this.patterns['6'], ...this.patterns['7']);
		// a[3]	=()=>this.bg.palette = 9;
		// a[1] =()=>game.iteration = 1399;


		// New
		// let 
		// sinepop1 =()=> this.p.free('SinePop',{phase:1}),
		// sinepop2 =()=> this.p.free('SinePop',{phase:-1});
		// [50,60,70,80,90,820,830,840,850,860].forEach(n=>a[n]=sinepop1);
		// [400,410,420,430,440,1780,1790,1800,1810,1820].forEach(n=>a[n]=sinepop2);
		
		// Old
		// a[50] 	=()=> this.p.free('SinePop',{phase:1});
		// a[60] 	=()=> this.p.free('SinePop',{phase:1});
		// a[70] 	=()=> this.p.free('SinePop',{phase:1});
		// a[80] 	=()=> this.p.free('SinePop',{phase:1});
		// a[90] 	=()=> this.p.free('SinePop',{phase:1});


		a[145]	=()=> this.p.free('Tank',  	{x:55, carryItem: true});
		// a[270]	=()=> this.p.free('Tank',  	{x:105});
		a[300]	=()=> this.p.free('Sniper',	{x: 40, alt: true});


		// Old
		a[400] 	=()=> this.p.free('SinePop',	{phase:-1});
		a[410] 	=()=> this.p.free('SinePop',	{phase:-1});
		a[420] 	=()=> this.p.free('SinePop',	{phase:-1});
		a[430] 	=()=> this.p.free('SinePop',	{phase:-1});
		a[440] 	=()=> this.p.free('SinePop',	{phase:-1});

		a[550]	=()=>{this.bg.queue.push(...this.patterns['2'], ...this.patterns['3'], ...this.patterns['4']);
					  this.p.free('Sniper', {x: 120, alt: true})}
		a[560]	=()=> this.p.free('Fatty', 	{side: 1, y: 1,  alt:true});
		a[590]	=()=> this.p.free('Fatty', 	{side: 1, y: 21, alt:true});
		a[620]	=()=> this.p.free('Fatty', 	{side: 1, y: 41, alt:true});
		a[660]	=()=> this.p.free('Tank', 	{x:52});
		a[750]	=()=> this.p.free('Sniper', {alt: true});


		// Old
		a[820] 	=()=> this.p.free('SinePop',	{phase:1});
		a[830] 	=()=> this.p.free('SinePop',	{phase:1});
		a[840] 	=()=> this.p.free('SinePop',	{phase:1});
		a[850] 	=()=> this.p.free('SinePop',	{phase:1});
		a[860] 	=()=> this.p.free('SinePop',	{phase:1});

		a[880]	=()=> this.p.free('Tank', 	{x:112, carryItem: true});
		a[1000]	=()=> this.p.free('Sniper');
		a[1020]	=()=> this.p.free('Sniper',	{x: 30});
		a[1040]	=()=> this.p.free('Sniper',	{x: 130});
		a[1080]	=()=> this.p.free('Boat',	{x: 145, side: -1});
		a[1140]	=()=> this.p.free('Boat',	{x: 20, side: 1});
		a[1200]	=()=>{this.p.free('Fatty',	{side: 1});
					  this.p.free('Fatty',	{side: -1});
					  this.bg.speed += .25;}
		a[1300]	=()=> this.bg.speed += .25;
		a[1400]	=()=>{this.bg.speed += .25;
					  this.p.free('Assaulter',{x: 130});}
		a[1450]	=()=> this.bg.speed += .25;
		a[1550]	=()=>{this.bg.speed += .25;
					  this.p.free('Assaulter',{x: 30});}
		a[1650]	=()=> this.bg.speed += .25;
		a[1700]	=()=> this.p.free('Assaulter',{carryItem: true});
		a[1750]	=()=> this.bg.speed += .25;

		// Old
		a[1780]	=()=> this.p.free('SinePop',{phase:-1});
		a[1790]	=()=> this.p.free('SinePop',{phase:-1});
		a[1800]	=()=> this.p.free('SinePop',{phase:-1});
		a[1810]	=()=> this.p.free('SinePop',{phase:-1});
		a[1820]	=()=> this.p.free('SinePop',{phase:-1});
		a[1850]	=()=> this.bg.speed += .25;

		a[1910]	=()=> this.p.free('Sniper', {x:30});
		a[1920]	=()=> this.p.free('Sniper', {x:50});
		a[1930]	=()=> this.p.free('Sniper', {x:70});
		a[1940]	=()=> this.p.free('Sniper', {x:90});
		a[1950]	=()=> this.p.free('Sniper', {x:110});
		a[1960]	=()=> this.p.free('Sniper', {x:130});

		a[2070]	=()=> this.bg.queue.push(...this.patterns['5'], ...this.patterns['6'], ...this.patterns['7']);
		a[2150]	=()=> this.p.free('Tank', 	{x:105});
		a[2180]	=()=> this.p.free('Tank', 	{x:132});
		a[2200]	=()=> this.p.free('Tank', 	{x:95, carryItem: true});
		a[2220]	=()=> this.p.free('Tank', 	{x:117});

		// Background fades to darker color, enter tanks
		a[2300]	=()=> {game.fade.dir='fadeIn'; game.fade.speed=2; game.fade.layer=0;}
		a[2350]	=()=> {this.bg.palette = 9; game.fade.dir = 'fadeOut';}
		a[2400]	=()=> {game.fade.speed = 1; game.fade.layer='top';}
		a[2401]	=()=> {this.p.free('BigTank'); game.sfxFlags.bigTank = true}
		a[3001]	=()=> {this.p.free('BigTank', {palette: 6}); game.sfxFlags.bigTank = true}

		// Background fades to previous color and changes route
		a[3300]	=()=> {game.fade.dir='fadeIn'; game.fade.speed=2; game.fade.layer=0;}
		a[3350]	=()=> {this.bg.palette = 2; game.fade.dir = 'fadeOut';}
		a[3400]	=()=> {game.fade.speed = 1; game.fade.layer='top';}
		a[3401]	=()=> this.bg.queue.push(...this.patterns['5'])
	

		// a[]	=()=>

		// Reset level at the end of array
		a.push(()=>{debug.gameReset(); return 'stop'});
		return a
    }
};