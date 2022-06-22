//////////////////////////
// ASSETS
//////////////////////////


// Built game's size before mirrored sprites: 10669 bytes
// Built game's size after mirrored sprites: 10277 bytes

class Assets {
	constructor(runGameFn) {
		this.runGameFn = runGameFn;
		this.gfx = [
			{n: 'Assaulter',	w:8, h:16},
			{n: 'EnemyBullet',	w:2, h:4 },
			{n: 'SinePop',		w:6, h:8 },
			{n: 'Sniper',		w:7, h:11},
			// {n: 'Particle',		w:1, h:1 },
			{n: 'PlayerBullet',	w:1, h:7 },
			{n: 'Player',		w:6, h:13},
			{n: 'Fatty',		w:7, h:13},
			{n: 'Tank',			w:6, h:15}
		];
		// this.patterns = {};
		this.bigPattern = [0,,,,,,,,,,,,,,,,1,0,,,1,0,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,1,0,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,1,0,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,1,0,0,,,,,,,,,,,,,,,,,,,,0,1,0,,,,,,1,0,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,1,0,,,,,0,,,,,,,,,,,,,,,,,,,,0,,1,0,,,,,,,,,,,,,,,,,0,2,,,,,0,,,,,,,,,,,,,,3,4,,,,,5,2,0,,,,,,,,,,,,4,6,7,8,9,4,,,5,0,,,,,,,,,,,4,10,11,12,13,4,,,,14,0,,,,,,,,,,4,15,16,17,18,4,,,,5,0,,,,,,,,,,4,,19,20,4,,,,,,14,0,,,,,,,,,4,,,,6,7,8,9,4,,14,0,,,,,,,,,4,,,,10,11,12,13,4,,14,0,,,,,,,,,4,,,,15,16,17,18,4,21,0,,,,,,,,,,4,,,,,19,20,4,,14,0,,,,,,,,,,4,,,,,,,,21,0,,,,,,,,,,,6,7,8,9,4,,,,14,0,,,,,,,,,,,10,11,12,13,4,,,21,0,,,,,,,,,,,,15,16,17,18,4,,21,0,,,,,,,,,,,,,4,19,20,4,,,14,0,,,,,,,,,,,,,4,,,,,21,0,,,,,,,2,,,,,,,22,,4,,,5,2,0,,,,2,3,4,,,,,,22,23,,24,22,4,,,5,2,0,25,4,,,,,,,26,23,27,,23,,24,4,,,,14,25,4,,,,,,26,23,27,27,,,,23,24,22,4,,5,0,28,4,,,,26,23,27,,27,,,,,23,,24,4,,5,0,28,4,,26,23,27,,,27,,,,,,,23,29,4,,5,3,4,26,23,27,,,,27,,,,,,,,24,4,,,,30,23,31,27,,,,27,,,,,,,,23,24,4,,,30,27,,,,,,27,31,27,,,,,,,23,24,4,,,32,27,,,,,27,,,,,,,,,,23,24,33,22,4,32,27,,,,27,,,,,,,,,,,23,34,23,29,30,27,,,,27,,,,,,,,,,,,34,27,24,4,32,27,,,27,,,,,,,,,,,,34,27,23,24,26,27,,,27,,,31,27,,,,,,,,34,27,,23,,27,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,31,27,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,31,,,,,,,,,,,,34,31,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,31,27,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,31,27,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,31,27,,,,,,,,34,27,,,,,,,27,,,,,,,,,,35,36,,32,27,,,,,,27,,,,,,,,,,24,4,,30,27,,,,,35,36,,32,27,,,,,,,23,24,22,26,27,,,,35,4,4,,,32,27,,,,,,,23,,,27,,,,29,4,22,4,,26,27,,,,,,,,,,,,,,24,4,23,24,26,23,27,,,,,,,,,,,,,,23,24,27,23,,27,,,,,,,,,,,,,,,,23,27,,,,,,,,,,,,,35,32,27,,,,,27,,,,,,,,,,,,35,4,,36,32,27,,,27,,,,,,,,,,,,29,4,,,30,27,,,27,,,,,,,,,,,,24,22,33,22,26,27,,,27,,,,,,,,,,,,23,,34,23,,27,,,27,,35,36,,,32,27,,,,,,,34,27,,,,,27,,24,4,,,30,27,,,,,,,34,27,,,,,27,,23,24,22,,26,27,,,,,,,34,27,,,,,27,,,23,,,,27,,,,,,,34,27,,,,,27,,,,,,,,,,,,,,34,27,,,,,27,,,,,,,,,,,,35,14,25,32,27,,,,27,,,,,,,,,,,,29,14,25,4,32,27,,,27,,,,,,,,,,,35,4,14,25,4,30,27,,,27,,,,,,,,,,,29,4,14,25,4,30,27,,,27,,,,,,,,,,35,4,,14,25,4,30,27,,,27,,,,,,,,,35,4,,,14,25,4,,32,27,,27,,,,,,,,35,4,,,,14,25,4,,30,27,,27,,,,,,,35,4,,,,,14,25,4,,30,27,,27,,,,,,35,4,,,,,,14,25,4,,30,27,,27,,,,,35,4,,,,,,,14,25,4,,30,27,,27,,,,,29,4,,,,,,,14,25,4,,30,27,,27,,,,35,4,,,,,,,,14,25,4,,,32,27,27,,,35,4,,,,,,,,21,0,25,4,,,30,27,27,,35,4,,,,,,,,21,0,,,28,4,,30,27,27,,29,4,,,,,,,,14,0,,,25,4,,30,27,27,35,4,,,,,,,,,14,0,,,3,4,,26,27,27,29,4,,,,,,,,21,0,,,3,4,,26,27,,27,24,4,,,,,,,21,0,,,3,4,,30,27,,,27,,24,4,,,,,21,0,,,3,4,,,30,27,,,27,,,29,4,,21,37,0,,,3,4,,,,,32,27,,27,,35,4,,21,0,,,,3,4,,,,,,,32,27,27,,29,4,21,0,,,2,3,4,,,,,,,,26,27,27,35,4,,5,0,,25,4,,,,,,,,,26,27,,27,29,4,,,14,0,,28,4,,,,,,,30,27,,,35,4,,,,5,0,,,28,4,,,,,,30,27,,,29,4,,,,,5,0,,,28,4,,,,,,32,27,,24,4,,,,,,14,0,,,28,4,,,,,,32,27,27,24,4,,,,,5,2,0,,,28,4,,,,,30,27,27,,29,4,,,,,,5,0,,,28,4,,,,30,27,27,,29,4,,,,,,,5,0,,,28,4,,,30,27,27,,29,4,,,,,,,,5,0,,25,4,,,30,27];

		// Decompressor for "repeat function" arrays (not used)
		// let r = this.patterns[1];
		// for(let i=r.length;i>0;i--)r[i]<0?r.splice(i,1,...new Array(M.abs(r[i]))):0
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
		this.bg.onload = z => this.countDown();

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
				this[entity.n] = new Image();
				this[entity.n].src = c.toDataURL();
				this[entity.n].onload = () => this.countDown();
			}
		})
		return this;
	}
	countDown(){
		this.remaining--;
		if(!this.remaining) this.runGameFn();
	}
	// setSrcwithMirroredImg(key, filename){
	// 	let c=document.createElement('canvas'),x=c.getContext('2d');
	// 	// Single pixel drawing for particles
	// 	// if (!filename) {
	// 	// 	c.width, c.height = 1;
	// 	// 	x.fillStyle='ivory';
	// 	// 	x.fillRect(0,0,1,1);
	// 	// 	key.sWidth = 1;
	// 	// 	return key.src = c.toDataURL();
	// 	// }
	// 	let i = new Image();
	// 	i.src = 'i/'+filename;
	// 	i.onload = () => {
	// 		c.height = i.height;
	// 		c.width = i.width * 2;
	// 		x.drawImage(i, 0,0);
	// 		x.scale(-1, 1);
	// 		x.drawImage(i, -i.width+1, 0, -i.width, i.height);
	// 		key.src = c.toDataURL();
	// 	}
	// }
	// setSrcWithHitState(key, filename){
	// 	// Load original image
	// 	let img = new Image()
	// 	// To fix if "The canvas has been tainted by cross-origin data" error appears
	// 	// img.crossOrigin = "Anonymous"
	// 	// Insert png into source
	// 	img.src = 'i/'+filename;
	// 	// When png loads...
	// 	img.addEventListener('load', () => {
	// 		// Create temporal canvas
	// 		let c = document.createElement('canvas')
	// 		let ctx = c.getContext('2d');
	// 		// Set dimensions to image size
	// 		c.height = img.height;
	// 		// But double the width to be able to draw hit state image later on
	// 		c.width = img.width * 2;
	// 		// New property on key element to save source width
	// 		key.sWidth = img.width;
	// 		// Draw original image
	// 		ctx.drawImage(img, 0, 0)
	// 		// Get pixel data
	// 		let imgData = ctx.getImageData(0,0,c.width/2,c.height);
	// 		// Create new arr and push modified pixel data
	// 		let arr2 = [];
	// 		imgData.data.forEach((n)=>{
	// 		   if (n>0 && n<180) n += 80;
	// 		   if (n>255) n = 255;
	// 		   arr2.push(n)
	// 		})
	// 		// Create new data container and insert new arr
	// 		let imgData2 = ctx.createImageData(img.width, img.height);
	// 		imgData2.data.set(arr2)
	// 		// Draw new imageData right next to original
	// 		ctx.putImageData(imgData2, img.width, 0);
	// 		// Finally Load new image that includes the original + a hit state
	// 		key.src = c.toDataURL();
	// 	})
	// }
	getPoolInputArr(){
        // if (stageNum === 1)
		return [
			[1,		Player],
			[12,	PlayerBullet],
			[35,	EnemyBullet],
			[4, 	SinePop],
			[6, 	Sniper],
			[2, 	Fatty],
			[4, 	Tank],
			[2, 	Assaulter],
			[120,	Particle],
		];
	}
	getEventsFn() {
		// 1=EnemyLand, 2=EnemyAir, 3=Particle, 4=Player, 5=pBullet, 6=eBullet, 7=Hud
		let a = new Array(5**6).fill(f=>f); // 15625 empty functions
		a[0]	=e=>{this.p.free('Player', '4');
					 this.s.bg.speed = .5};
		// Testing
		// a[1]	=e=> this.p.free('Sniper', '2', {x: 40});

		a[50]	=e=> this.p.free('SinePop', '2', {phase:-1});
		a[60]	=e=> this.p.free('SinePop', '2', {phase:-1});
		a[70]	=e=> this.p.free('SinePop', '2', {phase:-1});
		a[80]	=e=> this.p.free('SinePop', '2', {phase:-1});
		a[145]	=e=> this.p.free('Tank', '1', {x:55});
		a[270]	=e=> this.p.free('Tank', '1', {x:105});
		a[300]	=e=> this.p.free('Sniper', '2', {x: 40});
		a[400]	=e=> this.p.free('SinePop', '2', {phase:1});
		a[430]	=e=> this.p.free('SinePop', '2', {phase:1});
		a[460]	=e=> this.p.free('SinePop', '2', {phase:1});
		a[490]	=e=> this.p.free('SinePop', '2', {phase:1});
		a[550]	=e=>{this.s.bg.queue.push(...this.s.patterns['2'], ...this.s.patterns['3'], ...this.s.patterns['4']);
					 this.p.free('Sniper', '2', {x: 120});}
		a[580]	=e=> this.p.free('Fatty', '2', {side: 1});
		a[660]	=e=> this.p.free('Tank', '1', {x:52});
		a[750]	=e=> this.p.free('Sniper', '2');
		a[820]	=e=> this.p.free('SinePop', '2', {phase:-1});
		a[840]	=e=> this.p.free('SinePop', '2', {phase:-1});
		a[860]	=e=> this.p.free('SinePop', '2', {phase:-1});
		a[880]	=e=> this.p.free('Tank', '1', {x:112});
		a[1000]	=e=> this.p.free('Sniper', '2');
		a[1020]	=e=> this.p.free('Sniper', '2', {x: 30});
		a[1040]	=e=> this.p.free('Sniper', '2', {x: 130});
		a[1200]	=e=>{this.p.free('Fatty', '2', {side: 1});
					 this.p.free('Fatty', '2', {side: -1});
					 this.s.bg.speed += .25;}
		a[1300]	=e=> this.s.bg.speed += .25;
		a[1400]	=e=>{this.s.bg.speed += .25;
					 this.p.free('Assaulter', '2', {x: 130});}
		a[1450]	=e=> this.s.bg.speed += .25;
		a[1550]	=e=>{this.s.bg.speed += .25;
					 this.p.free('Assaulter', '2', {x: 30});}
		a[1650]	=e=> this.s.bg.speed += .25;
		a[1700]	=e=> this.p.free('Assaulter', '2');
		a[1750]	=e=> this.s.bg.speed += .25;
		a[1780]	=e=> this.p.free('SinePop', '2', {phase:-1});
		a[1790]	=e=> this.p.free('SinePop', '2', {phase:-1});
		a[1800]	=e=> this.p.free('SinePop', '2', {phase:-1});
		a[1810]	=e=> this.p.free('SinePop', '2', {phase:-1});
		a[1850]	=e=> this.s.bg.speed += .25;
		a[1910]	=e=> this.p.free('Sniper', '2', {x: 30});
		a[1920]	=e=> this.p.free('Sniper', '2', {x: 50});
		a[1930]	=e=> this.p.free('Sniper', '2', {x: 70});
		a[1940]	=e=> this.p.free('Sniper', '2', {x: 90});
		a[1950]	=e=> this.p.free('Sniper', '2', {x: 110});
		a[1960]	=e=> this.p.free('Sniper', '2', {x: 130});
		a[2070]	=e=> this.s.bg.queue.push(...this.s.patterns['5'], ...this.s.patterns['6'], ...this.s.patterns['7']);
		a[2120]	=e=> this.p.free('Tank', '1', {x:105});
		a[2150]	=e=> this.p.free('Tank', '1', {x:132});
		a[2170]	=e=> this.p.free('Tank', '1', {x:95});
		a[2190]	=e=> this.p.free('Tank', '1', {x:117});
		// a[]	=b=>
		return a
    }
};