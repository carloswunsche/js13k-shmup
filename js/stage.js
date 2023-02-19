/* ------------------------------------------------- */
/*                       STAGE                       */
/* ------------------------------------------------- */

class Stage {
  constructor() {
  }

	getBgTilesMapPatterns(tileQty) {
		let arr = [0,,,,,,,,,,,,,,,,,,,1,0,,,,1,0,,,,,,,,,,,,,,,2,0,,,,,,,,,,,,,,,,,,,3,4,0,,,,,,,,,,,,,,,,,,3,4,0,,,,,,,,,,,,,,,,,,3,2,0,,,,,,,,,,1,0,,,,,,,3,,4,0,,,,,,,,,,,,,,,,,3,,4,0,,,,,,,,,,,,,,,1,0,3,,4,0,,,,1,0,,,,,,,,,,5,6,3,7,0,,,,,,,,,,,,,,,6,3,,7,0,,,,,,,,,,,,,,,6,3,,,0,,,,,,,,,,,,,,,,8,3,,,0,,,,,,,,,,,,,,,,,8,3,,0,,1,0,,,,,,,,,,,,,,9,3,,0,,,,,,,,,,,,1,0,,,,,8,3,0,,,,,,,,,,,,,,,,,,,8,2,5,,0,,,,,,,,,,,,,,,,1,3,,,2,5,,0,,1,0,,,,,,,,,,,3,,,,,,4,0,,,,,,,,,,,,,3,,,,,,2,0,,,,,,,,,,,,,3,,,,,,,4,0,,,,1,0,,,,,,,3,,,,,,,2,0,,,,,,,,,,,,3,,,,,,,,4,0,,,,,,,,,,,3,,,,,,,7,0,,,,,,,,,,,,3,,,,,,,4,0,,,,,,,,,,,,3,,,,,,,2,0,,,1,0,,,,,,,,3,,,,,,,,2,5,0,,,,,,,,,,3,,,,,,,,,,2,0,,,,,,1,0,,3,,,,,,,,,,,4,0,,,,,,,,3,,,,,,,,,,,4,0,,,,,,,,3,,,,,,,,,,,4,0,,,,,,,,3,,,,,,,,,,,4,0,,,,,,5,,10,3,,,,,,,,,,2,0,,1,0,,6,3,10,11,12,10,3,,,,,,,,,2,0,,,6,3,13,11,14,11,,12,10,3,,,,,,,,2,5,6,3,,13,14,15,14,,11,,12,10,,3,,,,,,,,,,16,14,,,,,,11,,,17,3,,,,,,,,16,11,14,,,,,,,,,12,10,3,,,,,,13,11,14,,,18,19,14,,,,,11,,12,10,3,,,,16,14,,,,17,3,19,14,,,,,,11,,12,10,,16,11,14,,15,14,12,3,13,14,,,,,,,,11,,20,11,14,,,,,11,17,3,21,,19,14,,,,,,,20,14,,,,,,,12,3,,,13,14,,,,,,,20,14,,,,,,,11,12,10,,16,14,,,,,,,20,14,,,,,,,,11,,,,14,,,15,14,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,15,,,,,14,,,,,,,,20,14,,,,,15,,,14,,15,,,,,,,14,,20,14,15,,,,14,,,,,,,,,15,,,14,,20,15,,,14,,,,,,,,,,,,,15,,,20,15,14,,,,,,,,,,,,,,,,,,20,14,,,,,,,15,14,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,15,14,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,15,14,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,15,14,,,,,,,,,,18,21,,19,14,,,,,,,,,,,,,,18,21,3,,10,16,14,,,,,,,,,,,,,18,3,,,13,14,,,,,,,,,,,,,,,17,3,,10,16,14,,,,,,,,,,,,,18,21,3,,13,14,,,,,,,,,,,,,,,17,3,7,8,3,19,14,,,,,15,14,,,,,,,,12,3,2,0,8,3,19,14,,,,,,,,,15,14,,,11,12,3,2,0,8,13,14,,,,,,,,,,,,,,11,17,7,0,,8,19,14,,,,,,,,,,,,,,17,2,0,,,8,19,14,,,,,,,,,,,,,12,3,2,5,,6,13,14,,,,,,,,,,,,,11,12,10,,,,16,14,,,,,,,,,,,,,,11,,,20,11,,14,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,15,14,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,18,21,,19,14,,,,15,14,,,,,,,,,,18,3,7,8,3,19,14,,,,,,,,,,,,,,17,3,4,9,3,,21,19,14,,,,,,,,,,,18,3,7,0,9,3,,,13,14,,,,,,,,,,18,3,7,0,1,9,3,,,,19,14,,,15,14,,,18,21,3,,2,0,,9,3,,,,13,14,,,,,,,17,3,,,,2,0,9,3,,,,13,14,,,,,,18,3,,,,,,4,9,3,,,,13,14,,,,,18,3,,,,,,,4,0,8,3,,,13,14,,,,18,3,,,,,,,,4,0,,8,3,,,21,14,,,17,3,,,,,,,7,0,1,0,,8,3,,,14,,,17,3,,,,,,7,0,,,,,6,3,,,14,,18,3,,,,,,7,0,,,,,9,3,,,,14,,17,3,,,,,,4,0,,,,,9,3,,,,14,,17,3,,,,,7,0,1,0,,,5,6,3,,,,14,18,3,,,,,7,0,,,,,6,3,,,,,10,21,3,,,,,7,0,,,,,9,3,,,,,13,11,3,,,,,7,0,,,,,,9,3,,,,,16,14,3,,,,,4,1,0,,,,,,8,3,,,16,11,14,3,,,,7,0,,,,,6,2,0,9,3,,13,11,14,,10,3,,7,0,,,,,6,3,,4,0,8,3,13,14,,,11,17,3,4,0,,,,9,3,,7,0,,9,3,,19,14,,,17,3,2,0,,,,,8,3,2,0,,9,3,,,19,14,,12,3,,2,5,0,,,,8,3,2,0,6,3,,,13,14,,11,17,3,,,4,1,0,,,8,7,9,3,,,,13,14,,,17,3,,,2,0,,,,,,9,3,,,,13,14,,18,3,,,,,2,0,,,,,,8,3,,,,21,14,17,3,,,,,,2,0,,,,,,8,3,,,,14,17,3,,,,,,,4,0,1,0,,,9,3,,,3];
		// Decompress array
		let index=0; for(let i=0; i<arr.length;i++) {index = arr[i] === undefined ? index : arr[i]; arr.splice(i,1,index)}
		// Create patterns;
		let patterns = {};
		for(let i = 0; i < arr.length; i+=tileQty){
				patterns[1+i/tileQty] = arr.slice(
						arr.length-tileQty*(1+i/tileQty),
						arr.length-tileQty*(i/tileQty)
				);
		};
		return patterns;
	} 

  init(assetsBg, display, pool) {
		// Needed from display
		this._displayW = display.width;
		this._displayH = display.height;
		this._tileSize = display.tileSize;
		this._tileQty = display.tileQty;
    // Make patterns from bgTilesMap
    this.patterns = this.getBgTilesMapPatterns(this._tileQty)
		/** SETUP BACKGROUND OBJECT */
		this.bg = {};
    this.bg.queue = [];
    this.bg.pattern = [...this.patterns['1']];
    this.bg.image = assetsBg;
    this.bg.imageCols = this.bg.image.width / this._tileSize;
		/**            [-8,0,8,16,24,32,40,48,56,64,72,80,88,96,104,112] */
    this.bg.rows = new Array(16).fill(-8).map((n, i) => n + 8 * i);
    this.bg.tileSize = this._tileSize;
    this.bg.numCols = this._displayW / this._tileSize;
    this.bg.tileQty = this._tileQty;
    this.bg.changePattern = false;
		/** SETUP EVENTS */
		this.events = this.getEventsFn(pool, this.patterns, this.bg);
  }

  getEventsFn(pool, patterns, bg) {
    let a = new Array(5 ** 6).fill(f => f); // 15625 empty functions
    a[0] = () => {
      pool.free('Player', 'Players');
      bg.speed = 0.5;
      bg.palette = 8;
    };

    a[145] = () => pool.free('Tank', { x: 55, carryItem: true });

    a[300] = () => pool.free('Sniper', { x: 40, alt: true });

    a[400] = () => pool.free('SinePop', { phase: -1 });
    a[410] = () => pool.free('SinePop', { phase: -1 });
    a[420] = () => pool.free('SinePop', { phase: -1 });
    a[430] = () => pool.free('SinePop', { phase: -1 });
    a[440] = () => pool.free('SinePop', { phase: -1 });

    a[550] = () => {
      bg.queue.push(
        ...patterns['2'],
        ...patterns['3'],
        ...patterns['4']
      );
      pool.free('Sniper', { x: 120, alt: true });
    };
    a[560] = () => pool.free('Fatty', { side: 1, y: 1, alt: true });
    a[590] = () => pool.free('Fatty', { side: 1, y: 21, alt: true });
    a[620] = () => pool.free('Fatty', { side: 1, y: 41, alt: true });
    a[660] = () => pool.free('Tank', { x: 52 });
    a[750] = () => pool.free('Sniper', { alt: true });

    // Old
    a[820] = () => pool.free('SinePop', { phase: 1 });
    a[830] = () => pool.free('SinePop', { phase: 1 });
    a[840] = () => pool.free('SinePop', { phase: 1 });
    a[850] = () => pool.free('SinePop', { phase: 1 });
    a[860] = () => pool.free('SinePop', { phase: 1 });

    a[880] = () => pool.free('Tank', { x: 104, carryItem: true });
    a[1000] = () => pool.free('Sniper');
    a[1020] = () => pool.free('Sniper', { x: 30 });
    a[1040] = () => pool.free('Sniper', { x: 130 });
    a[1080] = () => pool.free('Boat', { x: 145, side: -1 });
    a[1140] = () => pool.free('Boat', { x: 20, side: 1 });
    a[1200] = () => {
      pool.free('Fatty', { side: 1 });
      pool.free('Fatty', { side: -1 });
      bg.speed += 0.25;
    };
    a[1300] = () => (bg.speed += 0.25);
    a[1400] = () => {
      bg.speed += 0.25;
      pool.free('Assaulter', { x: 130 });
    };
    a[1450] = () => (bg.speed += 0.25);
    a[1550] = () => {
      bg.speed += 0.25;
      pool.free('Assaulter', { x: 30 });
    };
    a[1650] = () => (bg.speed += 0.25);
    a[1700] = () => pool.free('Assaulter', { carryItem: true });
    a[1750] = () => (bg.speed += 0.25);

    // Old
    a[1780] = () => pool.free('SinePop', { phase: -1 });
    a[1790] = () => pool.free('SinePop', { phase: -1 });
    a[1800] = () => pool.free('SinePop', { phase: -1 });
    a[1810] = () => pool.free('SinePop', { phase: -1 });
    a[1820] = () => pool.free('SinePop', { phase: -1 });
    a[1850] = () => (bg.speed += 0.25);

    a[1910] = () => pool.free('Sniper', { x: 30 });
    a[1920] = () => pool.free('Sniper', { x: 50 });
    a[1930] = () => pool.free('Sniper', { x: 70 });
    a[1940] = () => pool.free('Sniper', { x: 90 });
    a[1950] = () => pool.free('Sniper', { x: 110 });
    a[1960] = () => pool.free('Sniper', { x: 130 });

    a[2070] = () =>
      bg.queue.push(
        ...patterns['5'],
        ...patterns['6'],
        ...patterns['7']
      );
    a[2150] = () => pool.free('Tank', { x: 105 });
    a[2180] = () => pool.free('Tank', { x: 132 });
    a[2200] = () => pool.free('Tank', { x: 95, carryItem: true });
    a[2220] = () => pool.free('Tank', { x: 117 });

    // Background fades to darker color, enter tanks
    a[2300] = () => {
      game.fade.dir = 'fadeIn';
      game.fade.speed = 2;
      game.fade.layer = 0;
    };
    a[2350] = () => {
      bg.palette = 9;
      game.fade.dir = 'fadeOut';
    };
    a[2400] = () => {
      game.fade.speed = 1;
      game.fade.layer = 'top';
    };
    a[2401] = () => {
      pool.free('BigTank');
      game.sfxFlags.bigTank = true;
    };
    a[3001] = () => {
      pool.free('BigTank', { palette: 6 });
      game.sfxFlags.bigTank = true;
    };

    // Background fades to previous color and changes route
    a[3300] = () => {
      game.fade.dir = 'fadeIn';
      game.fade.speed = 2;
      game.fade.layer = 0;
    };
    a[3350] = () => {
      bg.palette = 2;
      game.fade.dir = 'fadeOut';
    };
    a[3400] = () => {
      game.fade.speed = 1;
      game.fade.layer = 'top';
    };
    a[3401] = () => bg.queue.push(...patterns['5']);

    // a[]	=()=>

    // Reset level at the end of array
    a.push(() => {
      debug.gameReset();
      return 'stop';
    });
    return a;
  }
}
