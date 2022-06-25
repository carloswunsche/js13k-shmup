//////////////////////////
// ASSETS
//////////////////////////

class Assets {
	constructor(runGameFn) {
		this.runGameFn = runGameFn;
		this.gfx = [
			{n: 'Assaulter',	w:8, h:16},
			{n: 'EnemyBullet',	w:2, h:4 },
			{n: 'SinePop',		w:6, h:8 },
			{n: 'Sniper',		w:7, h:11},
			{n: 'PlayerBullet',	w:1, h:7 },
			{n: 'Player',		w:6, h:13},
			{n: 'Fatty',		w:7, h:13},
			{n: 'Tank',			w:6, h:15},
			{n: 'Item',			w:4, h:10},
		];
		this.bigPattern = [0,,,,,,,,,,,,,,,,1,0,,,1,0,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,1,0,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,1,0,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,1,0,0,,,,,,,,,,,,,,,,,,,,0,1,0,,,,,,1,0,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,1,0,,,,,0,,,,,,,,,,,,,,,,,,,,0,,1,0,,,,,,,,,,,,,,,,,0,2,,,,,0,,,,,,,,,,,,,,3,4,,,,,5,2,0,,,,,,,,,,,,4,6,7,8,9,4,,,5,0,,,,,,,,,,,4,10,11,12,13,4,,,,14,0,,,,,,,,,,4,15,16,17,18,4,,,,5,0,,,,,,,,,,4,,19,20,4,,,,,,14,0,,,,,,,,,4,,,,6,7,8,9,4,,14,0,,,,,,,,,4,,,,10,11,12,13,4,,14,0,,,,,,,,,4,,,,15,16,17,18,4,21,0,,,,,,,,,,4,,,,,19,20,4,,14,0,,,,,,,,,,4,,,,,,,,21,0,,,,,,,,,,,6,7,8,9,4,,,,14,0,,,,,,,,,,,10,11,12,13,4,,,21,0,,,,,,,,,,,,15,16,17,18,4,,21,0,,,,,,,,,,,,,4,19,20,4,,,14,0,,,,,,,,,,,,,4,,,,,21,0,,,,,,,2,,,,,,,22,,4,,,5,2,0,,,,2,3,4,,,,,,22,23,,24,22,4,,,5,2,0,25,4,,,,,,,26,23,27,,23,,24,4,,,,14,25,4,,,,,,26,23,27,27,,,,23,24,22,4,,5,0,28,4,,,,26,23,27,,27,,,,,23,,24,4,,5,0,28,4,,26,23,27,,,27,,,,,,,23,29,4,,5,3,4,26,23,27,,,,27,,,,,,,,24,4,,,,30,23,31,27,,,,27,,,,,,,,23,24,4,,,30,27,,,,,,27,31,27,,,,,,,23,24,4,,,32,27,,,,,27,,,,,,,,,,23,24,33,22,4,32,27,,,,27,,,,,,,,,,,23,34,23,29,30,27,,,,27,,,,,,,,,,,,34,27,24,4,32,27,,,27,,,,,,,,,,,,34,27,23,24,26,27,,,27,,,31,27,,,,,,,,34,27,,23,,27,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,31,27,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,31,,,,,,,,,,,,34,31,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,31,27,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,31,27,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,31,27,,,,,,,,34,27,,,,,,,27,,,,,,,,,,35,36,,32,27,,,,,,27,,,,,,,,,,24,4,,30,27,,,,,35,36,,32,27,,,,,,,23,24,22,26,27,,,,35,4,4,,,32,27,,,,,,,23,,,27,,,,29,4,22,4,,26,27,,,,,,,,,,,,,,24,4,23,24,26,23,27,,,,,,,,,,,,,,23,24,27,23,,27,,,,,,,,,,,,,,,,23,27,,,,,,,,,,,,,35,32,27,,,,,27,,,,,,,,,,,,35,4,,36,32,27,,,27,,,,,,,,,,,,29,4,,,30,27,,,27,,,,,,,,,,,,24,22,33,22,26,27,,,27,,,,,,,,,,,,23,,34,23,,27,,,27,,35,36,,,32,27,,,,,,,34,27,,,,,27,,24,4,,,30,27,,,,,,,34,27,,,,,27,,23,24,22,,26,27,,,,,,,34,27,,,,,27,,,23,,,,27,,,,,,,34,27,,,,,27,,,,,,,,,,,,,,34,27,,,,,27,,,,,,,,,,,,35,14,25,32,27,,,,27,,,,,,,,,,,,29,14,25,4,32,27,,,27,,,,,,,,,,,35,4,14,25,4,30,27,,,27,,,,,,,,,,,29,4,14,25,4,30,27,,,27,,,,,,,,,,35,4,,14,25,4,30,27,,,27,,,,,,,,,35,4,,,14,25,4,,32,27,,27,,,,,,,,35,4,,,,14,25,4,,30,27,,27,,,,,,,35,4,,,,,14,25,4,,30,27,,27,,,,,,35,4,,,,,,14,25,4,,30,27,,27,,,,,35,4,,,,,,,14,25,4,,30,27,,27,,,,,29,4,,,,,,,14,25,4,,30,27,,27,,,,35,4,,,,,,,,14,25,4,,,32,27,27,,,35,4,,,,,,,,21,0,25,4,,,30,27,27,,35,4,,,,,,,,21,0,,,28,4,,30,27,27,,29,4,,,,,,,,14,0,,,25,4,,30,27,27,35,4,,,,,,,,,14,0,,,3,4,,26,27,27,29,4,,,,,,,,21,0,,,3,4,,26,27,,27,24,4,,,,,,,21,0,,,3,4,,30,27,,,27,,24,4,,,,,21,0,,,3,4,,,30,27,,,27,,,29,4,,21,37,0,,,,28,4,,,,32,27,,27,,35,4,,21,0,,,,2,0,25,4,,,,,32,27,27,,29,4,21,0,,,2,3,4,14,0,28,4,,,,26,27,27,35,4,,5,0,,25,4,,,5,0,25,4,,,26,27,,27,29,4,,,14,0,,28,4,,,14,0,28,4,30,27,,,35,4,,,,5,0,,,28,4,,14,0,25,4,30,27,,,29,4,,,,,5,0,,,28,4,14,0,3,4,,32,27,,24,4,,,,,,14,0,,,28,14,25,4,,,,32,27,27,24,4,,,,,5,2,0,,,,,28,4,,,30,27,27,,29,4,,,,,,5,0,,,,3,4,,,30,27,27,,29,4,,,,,,,5,0,,,28,4,,,30,27,27,,29,4,,,,,,,,14,0,,,28,4,,30,27];
	}
	needs(){
		// For stage events
		this.p = pool;
		this.s = stage;
	}
	loadAndRun() {
		// Length of this.gfx + background
		this.remaining = this.gfx.length + 1;

		// Load background
		this.bg = new Image();
		this.bg.src = 'i/bg.webp';
		this.bg.onload = () => this.countDown();

		// Load sprites
		this.gfx.forEach((entity, xPos)=>{
			// Set up canvas
			let c=document.createElement('canvas'),x=c.getContext('2d');
			// About canvas width: It has to be double the size to allow mirroring, but a pixel less
			// to avoid repetition of the middle column. You'll also see this as a +1 on the drawImage fn.
			c.width = (entity.w * 2)-1; 
			c.height = entity.h;

			// Load sprites.webp
			let i = new Image();
			i.src = 'i/sprites.webp';
			i.onload = () => {
				// Draw regular and mirrored image
				[0,1].forEach(side=>{
				x.scale(side?-1:1, 1);
				x.drawImage(
					i, 							// sprites.webp
					xPos*8,						// X source
					0,							// Y source
					entity.w,					// Source width
					entity.h,					// Source height
					side?-entity.w+1:0,			// Destination X
					0, 							// Destination Y
					side?-entity.w:entity.w, 	// Destination width
					entity.h					// Destination height
					);
				})
				// Create final image and set source
				// if (entity.n === 'Player') c = this.addWhiteSubImage(c,x,this[entity.n]);
				this[entity.n] = new Image();
				this[entity.n].src = c.toDataURL();
				this[entity.n].onload = () => this.countDown();
			}
		})
		return this;
	}
	// addWhiteSubImage(c,x, entity){
	// 	// let x = c.getContext('2d')
	// 	// Get width of previously drawn image
	// 	let imgWidth = c.width;
	// 	// Get data from canvas
	// 	let imgData = x.getImageData(0, 0, c.width, c.height);
	// 	// Create new data to insert modified image
	// 	let newImgData = x.createImageData(c.width, c.height);
	// 	// Insert modified data into newImgData
	// 	for(let i = 0; i < imgData.data.length; i++) if (imgData.data[i] > 0) newImgData.data[i] = 255;
	// 	// Duplicate canvas width
	// 	c.width = c.width * 2;
	// 	// Create new image data object to put newData inside
		
	// 	// Put image data into canvas empty space
	// 	x.putImageData(imgData, 0, 0)
	// 	x.putImageData(newImgData, 16, 0)
	// 	// Return
	// 	return c
	// }
	countDown(){
		this.remaining--;
		if(!this.remaining) this.runGameFn();
	}
	getEventsFn() {
		let a = new Array(5**6).fill(f=>f); // 15625 empty functions
		// a[1]	=()=> this.p.free('Item', 'goodies', {y: 20});
		// a[1]	=()=> this.p.free('Assaulter', '2', {x: 30});
		// a[1]	=()=> this.p.free('Fatty', '2', {side: 1});
		// a[1]	=()=> this.p.free('Sniper', '2', {x: 40});
		// a[1]	=()=> this.p.free('SinePop', '2', {phase:-1});
		a[0]  	=()=>{this.p.free('Player', '5'); this.s.bg.speed = .5}
		a[50]	=()=> this.p.free('SinePop', '2', {phase:-1});
		a[60]	=()=> this.p.free('SinePop', '2', {phase:-1});
		a[70]	=()=> this.p.free('SinePop', '2', {phase:-1});
		a[80]	=()=> this.p.free('SinePop', '2', {phase:-1});
		a[145]	=()=> this.p.free('Tank', '1', {x:55, carryItem: true});
		a[270]	=()=> this.p.free('Tank', '1', {x:105});
		a[300]	=()=> this.p.free('Sniper', '2', {x: 40});
		a[400]	=()=> this.p.free('SinePop', '2', {phase:1});
		a[430]	=()=> this.p.free('SinePop', '2', {phase:1});
		a[460]	=()=> this.p.free('SinePop', '2', {phase:1});
		a[490]	=()=> this.p.free('SinePop', '2', {phase:1});
		a[550]	=()=>{this.s.bg.queue.push(...this.s.patterns['2'], ...this.s.patterns['3'], ...this.s.patterns['4']);
					 this.p.free('Sniper', '2', {x: 120});}
		a[580]	=()=> this.p.free('Fatty', '2', {side: 1});
		a[660]	=()=> this.p.free('Tank', '1', {x:52});
		a[750]	=()=> this.p.free('Sniper', '2');
		a[820]	=()=> this.p.free('SinePop', '2', {phase:-1});
		a[840]	=()=> this.p.free('SinePop', '2', {phase:-1});
		a[860]	=()=> this.p.free('SinePop', '2', {phase:-1});
		a[880]	=()=> this.p.free('Tank', '1', {x:112, carryItem: true});
		a[1000]	=()=> this.p.free('Sniper', '2');
		a[1020]	=()=> this.p.free('Sniper', '2', {x: 30});
		a[1040]	=()=> this.p.free('Sniper', '2', {x: 130});
		a[1200]	=()=>{this.p.free('Fatty', '2', {side: 1});
					 this.p.free('Fatty', '2', {side: -1});
					 this.s.bg.speed += .25;}
		a[1300]	=()=> this.s.bg.speed += .25;
		a[1400]	=()=>{this.s.bg.speed += .25;
					 this.p.free('Assaulter', '2', {x: 130});}
		a[1450]	=()=> this.s.bg.speed += .25;
		a[1550]	=()=>{this.s.bg.speed += .25;
					 this.p.free('Assaulter', '2', {x: 30});}
		a[1650]	=()=> this.s.bg.speed += .25;
		a[1700]	=()=> this.p.free('Assaulter', '2', {carryItem: true});
		a[1750]	=()=> this.s.bg.speed += .25;
		a[1780]	=()=> this.p.free('SinePop', '2', {phase:-1});
		a[1790]	=()=> this.p.free('SinePop', '2', {phase:-1});
		a[1800]	=()=> this.p.free('SinePop', '2', {phase:-1});
		a[1810]	=()=> this.p.free('SinePop', '2', {phase:-1});
		a[1850]	=()=> this.s.bg.speed += .25;
		a[1910]	=()=> this.p.free('Sniper', '2', {x: 30});
		a[1920]	=()=> this.p.free('Sniper', '2', {x: 50});
		a[1930]	=()=> this.p.free('Sniper', '2', {x: 70});
		a[1940]	=()=> this.p.free('Sniper', '2', {x: 90});
		a[1950]	=()=> this.p.free('Sniper', '2', {x: 110});
		a[1960]	=()=> this.p.free('Sniper', '2', {x: 130});
		a[2070]	=()=> this.s.bg.queue.push(...this.s.patterns['5'], ...this.s.patterns['6'], ...this.s.patterns['7']);
		a[2150]	=()=> this.p.free('Tank', '1', {x:105});
		a[2180]	=()=> this.p.free('Tank', '1', {x:132});
		a[2200]	=()=> this.p.free('Tank', '1', {x:95, carryItem: true});
		a[2220]	=()=> this.p.free('Tank', '1', {x:117});
		// a[]	=()=>

		// Reset level at the end of array
		a.push(()=>{debug.gameReset(); return 'stopGameUpdate'});
		return a





		// let events = new Array(5**6).fill(f=>f); // 15625 empty functions

		// // First iteration free Player and set initial bg speed
		// events[0]  		=()=>{this.p.free('Player', '5'); this.s.bg.speed = .5;}

		// // Patterns change
		// events[550]		=()=> this.s.bg.queue.push(...this.s.patterns['2'], ...this.s.patterns['3'], ...this.s.patterns['4']);
		// events[2070]	=()=> this.s.bg.queue.push(...this.s.patterns['5'], ...this.s.patterns['6'], ...this.s.patterns['7']);

		// // Enemy spawner functions
		// let assaulter1	=()=> this.p.free('Assaulter', '2');
		// let assaulter2	=()=> this.p.free('Assaulter', '2', {x: 30});
		// let assaulter3	=()=> this.p.free('Assaulter', '2', {x: 130});
		// let sinepop1	=()=> this.p.free('SinePop', '2', {phase:-1});
		// let sinepop2	=()=> this.p.free('SinePop', '2', {phase:1});
		// let tank1		=()=> this.p.free('Tank', '1', {x:55});
		// let tank2		=()=> this.p.free('Tank', '1', {x:105});
		// let tank3		=()=> this.p.free('Tank', '1', {x:112});
		// let tank4		=()=> this.p.free('Tank', '1', {x:132});
		// let tank5		=()=> this.p.free('Tank', '1', {x:117});
		// let sniper1		=()=> this.p.free('Sniper', '2', {x: 30});
		// let sniper2		=()=> this.p.free('Sniper', '2', {x: 50});
		// let sniper3		=()=> this.p.free('Sniper', '2');
		// let sniper4		=()=> this.p.free('Sniper', '2', {x: 105});
		// let sniper5		=()=> this.p.free('Sniper', '2', {x: 130});
		// let fatty1		=()=> this.p.free('Fatty', '2', {side: 1});
		// let fatty2		=()=> this.p.free('Fatty', '2', {side: -1});

		// // Speed change functions
		// let speedup		=()=> this.s.bg.speed += .25;

		// // Timeline (when, action)
		// let timeline = [
		// 	3,		assaulter2,
		// 	50, 	sinepop1, 
		// 	60, 	sinepop1,
		// 	70, 	sinepop1,
		// 	80, 	sinepop1,
		// 	145,	tank1,
		// 	270, 	tank2,
		// 	300,	sniper1,
		// 	400,	sinepop2,
		// 	430,	sinepop2,
		// 	460,	sinepop2,
		// 	490,	sinepop2,
		// 	551,	sniper1,
		// 	580,	fatty1,
		// 	660,	tank1,
		// 	880,	tank3,
		// 	1000,	sniper3,
		// 	1020,	sniper1,
		// 	1040,	sniper5,
		// 	1200,	fatty1,
		// 	1201,	fatty2,
		// 	1202,	speedup,
		// 	1300,	speedup,
		// 	1400,	speedup,
		// 	1401,	assaulter3,
		// 	1450,	speedup,
		// 	1550,	speedup,
		// 	1551,	assaulter2,
		// 	1650,	speedup,
		// 	1700,	assaulter1,
		// 	1750,	speedup,
		// 	1780, 	sinepop1,
		// 	1790, 	sinepop1,
		// 	1800, 	sinepop1,
		// 	1810, 	sinepop1,
		// 	1850,	speedup,
		// 	1910,	sniper1,
		// 	1920,	sniper2,
		// 	1930,	sniper3,
		// 	1940,	sniper4,
		// 	1950,	sniper5,
		// 	2150,	tank2,
		// 	2180,	tank4,
		// 	2200,	tank2,
		// 	2220,	tank5,
		// ];

		// // Fill array with events in timeline
		// for(let i = 0; i<timeline.length; i+=2)events[timeline[i]] = timeline[i+1];

		// // Reset level at the end of array
		// events.push(() => {debug.gameReset(); return 'stopUpdate'})

		// // Return events array 👍
		// return events
    }
};