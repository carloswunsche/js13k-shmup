//////////////////////////
// ASSETS
//////////////////////////


// Built game's size before mirrored sprites: 10669 bytes
// Built game's size after mirrored sprites: 10277 bytes

class Assets {
	constructor() {
		// All .webp have been compressed using whoosh with pallete limitation of 15 colors 
		// With exception of the background which has a limitation of 5 colors
		this._filenames = {
			// Backgrounds
			Stage1: 		'stage-1.webp',
			// Player
			Player: 		'player.webp',
			PlayerBullet: 	'pBullet.webp',
			// Enemies
			SinePop: 		'enemy.webp',
			Sniper: 		'enemy2.webp',
			Fatty: 			'pop_3.webp',
			Tank: 			'tank1.webp',
			Assaulter: 		'assault.webp',
			EnemyBullet: 	'eBullet.webp',
			// Particles
			// Particle: 		'part.png',
			Particle: 		'part.webp',
			// Particle: 		0,
		}
		this.patterns = {};
		this.patterns[1] = [0,,,,,,,,,,,,,,,,1,0,,,1,0,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,1,0,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,1,0,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,1,0,0,,,,,,,,,,,,,,,,,,,,0,1,0,,,,,,1,0,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,1,0,,,,,0,,,,,,,,,,,,,,,,,,,,0,,1,0,,,,,,,,,,,,,,,,,0,2,,,,,0,,,,,,,,,,,,,,3,4,,,,,5,2,0,,,,,,,,,,,,4,6,7,8,9,4,,,5,0,,,,,,,,,,,4,10,11,12,13,4,,,,14,0,,,,,,,,,,4,15,16,17,18,4,,,,5,0,,,,,,,,,,4,,19,20,4,,,,,,14,0,,,,,,,,,4,,,,6,7,8,9,4,,14,0,,,,,,,,,4,,,,10,11,12,13,4,,14,0,,,,,,,,,4,,,,15,16,17,18,4,21,0,,,,,,,,,,4,,,,,19,20,4,,14,0,,,,,,,,,,4,,,,,,,,21,0,,,,,,,,,,,6,7,8,9,4,,,,14,0,,,,,,,,,,,10,11,12,13,4,,,21,0,,,,,,,,,,,,15,16,17,18,4,,21,0,,,,,,,,,,,,,4,19,20,4,,,14,0,,,,,,,,,,,,,4,,,,,21,0,,,,,,,2,,,,,,,22,,4,,,5,2,0,,,,2,3,4,,,,,,22,23,,24,22,4,,,5,2,0,25,4,,,,,,,26,23,27,,23,,24,4,,,,14,25,4,,,,,,26,23,27,27,,,,23,24,22,4,,5,0,28,4,,,,26,23,27,,27,,,,,23,,24,4,,5,0,28,4,,26,23,27,,,27,,,,,,,23,29,4,,5,3,4,26,23,27,,,,27,,,,,,,,24,4,,,,30,23,31,27,,,,27,,,,,,,,23,24,4,,,30,27,,,,,,27,31,27,,,,,,,23,24,4,,,32,27,,,,,27,,,,,,,,,,23,24,33,22,4,32,27,,,,27,,,,,,,,,,,23,34,23,29,30,27,,,,27,,,,,,,,,,,,34,27,24,4,32,27,,,27,,,,,,,,,,,,34,27,23,24,26,27,,,27,,,31,27,,,,,,,,34,27,,23,,27,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,31,27,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,31,,,,,,,,,,,,34,31,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,31,27,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,31,27,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,,,,,,,,,,34,27,,,,,,,27,,,31,27,,,,,,,,34,27,,,,,,,27,,,,,,,,,,35,36,,32,27,,,,,,27,,,,,,,,,,24,4,,30,27,,,,,35,36,,32,27,,,,,,,23,24,22,26,27,,,,35,4,4,,,32,27,,,,,,,23,,,27,,,,29,4,22,4,,26,27,,,,,,,,,,,,,,24,4,23,24,26,23,27,,,,,,,,,,,,,,23,24,27,23,,27,,,,,,,,,,,,,,,,23,27,,,,,,,,,,,,,35,32,27,,,,,27,,,,,,,,,,,,35,4,,36,32,27,,,27,,,,,,,,,,,,29,4,,,30,27,,,27,,,,,,,,,,,,24,22,33,22,26,27,,,27,,,,,,,,,,,,23,,34,23,,27,,,27,,35,36,,,32,27,,,,,,,34,27,,,,,27,,24,4,,,30,27,,,,,,,34,27,,,,,27,,23,24,22,,26,27,,,,,,,34,27,,,,,27,,,23,,,,27,,,,,,,34,27,,,,,27,,,,,,,,,,,,,,34,27,,,,,27,,,,,,,,,,,,35,14,25,32,27,,,,27,,,,,,,,,,,,29,14,25,4,32,27,,,27,,,,,,,,,,,35,4,14,25,4,30,27,,,27,,,,,,,,,,,29,4,14,25,4,30,27,,,27,,,,,,,,,,35,4,,14,25,4,30,27,,,27,,,,,,,,,35,4,,,14,25,4,,32,27,,27,,,,,,,,35,4,,,,14,25,4,,30,27,,27,,,,,,,35,4,,,,,14,25,4,,30,27,,27,,,,,,35,4,,,,,,14,25,4,,30,27,,27,,,,,35,4,,,,,,,14,25,4,,30,27,,27,,,,,29,4,,,,,,,14,25,4,,30,27,,27,,,,35,4,,,,,,,,14,25,4,,,32,27,27,,,35,4,,,,,,,,21,0,25,4,,,30,27,27,,35,4,,,,,,,,21,0,,,28,4,,30,27,27,,29,4,,,,,,,,14,0,,,25,4,,30,27,27,35,4,,,,,,,,,14,0,,,3,4,,26,27,27,29,4,,,,,,,,21,0,,,3,4,,26,27,,27,24,4,,,,,,,21,0,,,3,4,,30,27,,,27,,24,4,,,,,21,0,,,3,4,,,30,27,,,27,,,29,4,,21,37,0,,,3,4,,,,,32,27,,27,,35,4,,21,0,,,,3,4,,,,,,,32,27,27,,29,4,21,0,,,2,3,4,,,,,,,,26,27,27,35,4,,5,0,,25,4,,,,,,,,,26,27,,27,29,4,,,14,0,,28,4,,,,,,,30,27,,,35,4,,,,5,0,,,28,4,,,,,,30,27,,,29,4,,,,,5,0,,,28,4,,,,,,32,27,,24,4,,,,,,14,0,,,28,4,,,,,,32,27,27,24,4,,,,,5,2,0,,,28,4,,,,,30,27,27,,29,4,,,,,,5,0,,,28,4,,,,30,27,27,,29,4,,,,,,,5,0,,,28,4,,,30,27,27,,29,4,,,,,,,,5,0,,25,4,,,30,27];

		// Decompressor for "repeat function" arrays
		// let r = this.patterns[1];
		// for(let i=r.length;i>0;i--)r[i]<0?r.splice(i,1,...new Array(M.abs(r[i]))):0
	}
	needs(){
		// For stage events
		this.p = pool;
		this.s = stage;
	}
	loadAnd(runSetupFn) {
		// Get number of remaining images to be loaded
		// Reduce to literal
		let remaining = Object.keys(this._filenames).length;

		for (const key in this._filenames) {
			// Create a new property for each image
			this[key] = new Image();

			// Set source image with hit state
			this.setSrcwithMirroredImg(this[key], this._filenames[key])

			// When image has loaded...
			this[key].onload = () => {remaining--;if(!remaining) runSetupFn()};
		};
		return this;
	}
	setSrcwithMirroredImg(key, filename){
		let c=document.createElement('canvas'),x=c.getContext('2d');
		// Single pixel drawing for particles
		// if (!filename) {
		// 	c.width, c.height = 1;
		// 	x.fillStyle='ivory';
		// 	x.fillRect(0,0,1,1);
		// 	key.sWidth = 1;
		// 	return key.src = c.toDataURL();
		// }
		let i = new Image();
		i.src = 'i/'+filename;
		i.onload = () => {
			c.height = i.height;
			c.width = i.width * 2;
			key.sWidth = i.width * 2;
			x.drawImage(i, 0,0);
			x.scale(-1, 1);
			x.drawImage(i, -i.width+1, 0, -i.width, i.height);
			key.src = c.toDataURL();
		}
	}
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
	getPoolInputArr(stageNum){
        if (stageNum === 1)
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
	getEventsFn(stageNum) {
		// 1=EnemyLand, 2=EnemyAir, 3=Particle, 4=Player, 5=pBullet, 6=eBullet, 7=Hud
		let a = new Array(5**6).fill(b=>b); // 15625 empty functions
		a[0]	=b=>{this.p.free('Player', '4');
					 this.s.bg.speed = .5};
		a[50]	=b=> this.p.free('SinePop', '2', {phase:-1});
		a[60]	=b=> this.p.free('SinePop', '2', {phase:-1});
		a[70]	=b=> this.p.free('SinePop', '2', {phase:-1});
		a[80]	=b=> this.p.free('SinePop', '2', {phase:-1});
		a[145]	=b=> this.p.free('Tank', '1', {x:55});
		a[270]	=b=> this.p.free('Tank', '1', {x:105});
		a[300]	=b=> this.p.free('Sniper', '2', {x: 40});
		a[400]	=b=> this.p.free('SinePop', '2', {phase:1});
		a[430]	=b=> this.p.free('SinePop', '2', {phase:1});
		a[460]	=b=> this.p.free('SinePop', '2', {phase:1});
		a[490]	=b=> this.p.free('SinePop', '2', {phase:1});
		a[550]	=b=>{this.s.bg.queue.push(...this.s.patterns['2'], ...this.s.patterns['3'], ...this.s.patterns['4']);
					 this.p.free('Sniper', '2', {x: 120});}
		a[580]	=b=> this.p.free('Fatty', '2', {side: 1});
		a[660]	=b=> this.p.free('Tank', '1', {x:52});
		a[750]	=b=> this.p.free('Sniper', '2');
		a[820]	=b=> this.p.free('SinePop', '2', {phase:-1});
		a[840]	=b=> this.p.free('SinePop', '2', {phase:-1});
		a[860]	=b=> this.p.free('SinePop', '2', {phase:-1});
		a[880]	=b=> this.p.free('Tank', '1', {x:112});
		a[1000]	=b=> this.p.free('Sniper', '2');
		a[1020]	=b=> this.p.free('Sniper', '2', {x: 30});
		a[1040]	=b=> this.p.free('Sniper', '2', {x: 130});
		a[1200]	=b=>{this.p.free('Fatty', '2', {side: 1});
					 this.p.free('Fatty', '2', {side: -1});
					 this.s.bg.speed += .25;}
		a[1300]	=b=> this.s.bg.speed += .25;
		a[1400]	=b=>{this.s.bg.speed += .25;
					 this.p.free('Assaulter', '2', {x: 130});}
		a[1450]	=b=> this.s.bg.speed += .25;
		a[1550]	=b=>{this.s.bg.speed += .25;
					 this.p.free('Assaulter', '2', {x: 30});}
		a[1650]	=b=> this.s.bg.speed += .25;
		a[1700]	=b=> this.p.free('Assaulter', '2');
		a[1750]	=b=> this.s.bg.speed += .25;
		a[1780]	=b=> this.p.free('SinePop', '2', {phase:-1});
		a[1790]	=b=> this.p.free('SinePop', '2', {phase:-1});
		a[1800]	=b=> this.p.free('SinePop', '2', {phase:-1});
		a[1810]	=b=> this.p.free('SinePop', '2', {phase:-1});
		a[1850]	=b=> this.s.bg.speed += .25;
		a[1910]	=b=> this.p.free('Sniper', '2', {x: 30});
		a[1920]	=b=> this.p.free('Sniper', '2', {x: 50});
		a[1930]	=b=> this.p.free('Sniper', '2', {x: 70});
		a[1940]	=b=> this.p.free('Sniper', '2', {x: 90});
		a[1950]	=b=> this.p.free('Sniper', '2', {x: 110});
		a[1960]	=b=> this.p.free('Sniper', '2', {x: 130});
		a[2070]	=b=> this.s.bg.queue.push(...this.s.patterns['5'], ...this.s.patterns['6'], ...this.s.patterns['7']);
		a[2120]	=b=> this.p.free('Tank', '1', {x:105});
		a[2150]	=b=> this.p.free('Tank', '1', {x:132});
		a[2170]	=b=> this.p.free('Tank', '1', {x:95});
		a[2190]	=b=> this.p.free('Tank', '1', {x:117});
		// a[]	=b=>
		return a
    }
};