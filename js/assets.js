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
		this.patterns[1] = [0,,,,,,,,,,,,,,,,1,0,,,1,0,,,2,0,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,2,0,0,,,,,,,,,,1,0,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,2,0,,,1,0,,,,,,,,,,,,,,0,,,,,,,,,,,,2,0,,,,,,,0,,,,,,,,,,,,,,,,,,1,0,0,,,,,,,,,,,,,,,,,,,,0,1,0,,,,,,1,0,,,,,,,,,,,0,,,,,,,,,,,,,,,,2,0,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,2,0,,,,,,1,0,,,,,0,,,,,,,,,,,,,,,,,,,,2,0,1,0,,,,,,,,,,,,,,,,,0,3,,,,,0,,,1,0,,,,,,,,,,4,5,,,,,6,3,0,,,,,,,,,,,,5,7,8,9,10,5,,,6,0,,,,,,,1,0,,,5,11,12,13,14,5,,15,5,16,0,,,,,,,,,,5,17,18,19,20,5,,,,6,0,1,0,,,,,,,,5,,21,22,5,,,,,,16,0,,,,,,,,,5,,,,7,8,9,10,5,,16,0,,,,,,,,,5,15,5,,11,12,13,14,5,,16,0,,,,,,,,,5,,,,17,18,19,20,5,23,0,,,,1,0,,,,1,5,,,,,21,22,5,,16,0,,,,,,,,,,5,,,,,,,,23,0,,,,,,,,,,,7,8,9,10,5,15,5,,16,0,,,,,,,,,,,11,12,13,14,5,,,23,0,,1,0,,,,,,,,,17,18,19,20,5,,23,0,,,,,,,,,,,,,5,21,22,5,,,16,0,,,,,,,,1,0,,,,5,,,,,23,0,1,0,,,,,3,,,,,,,24,,5,,,6,3,0,,,,3,4,5,,,,,,24,25,26,27,24,5,,,6,3,0,28,5,,,,,,,29,30,31,,25,26,27,5,,,,16,28,15,5,,,,,29,30,31,31,,,,26,27,24,5,,6,0,32,5,,,,29,30,31,,31,,,,,25,26,27,5,,6,0,32,5,,29,30,31,,,31,,,,,,,26,33,5,,6,4,5,29,30,31,,,,31,,,,,,,,27,15,5,,,34,30,35,31,,,,31,,,,,,,,26,27,5,,,34,36,31,,,,,31,35,31,,,,,,,26,27,5,,,37,36,31,,,,31,,,,,,,,,,26,27,38,24,5,37,36,31,,,31,,,,,,,,,,,25,39,26,33,34,36,31,,,31,,,,,,,,,,,,39,40,27,5,37,36,31,,31,,,,,,,,,,,,39,31,26,27,29,36,31,,31,,,35,31,,,,,,,,39,31,,25,,31,,,31,,,,,,,,,,,,39,31,,,,,,,31,,,,,,,,,,,,39,31,,,,,,,31,,,,,,,,,,35,31,39,31,,,,,,,31,,,,,,,,,,,,39,31,,,,,,,41,,,,,,,,,,,,39,41,,,,,,,31,,,,,,,,,,,,39,31,,,,,,,31,,,,,,,,,,,,39,31,,,,,,,31,,,,,,,,,,,,39,31,,,,,,,31,,,,,,35,31,,,,,39,31,,,,,,,31,,,,,,,,,,,,39,31,,,,,,,31,,,,,,,,,,,,39,31,,,35,31,,,31,,,,,,,,,,,,39,31,,,,,,,31,,,,,,,,,,,,39,31,,,,,,,31,,,,,,,,,,,,39,31,,,,,,,31,,,,,,,,,,,,39,31,,,,,,,31,,,,,,,,,,,,39,31,,,,,,,31,,,,,,,,,,,,39,31,,,,,,,31,,,35,31,,,,,,,,39,31,,,,,,,31,,,,,,,,,,42,43,,37,31,,,,,,31,,,,,,,,,,27,5,,34,31,,,,,42,43,,37,31,,,,,,,26,27,24,29,31,,,,42,5,44,45,5,37,31,,,,,,,25,,,31,,,,33,5,24,5,,29,31,,,,,,,,,,,,,,27,5,26,27,29,30,31,,,,,,,,,,,,,,26,27,31,25,,31,,,,,,,,,,,,,,,,25,31,,,,,,,,,,,,,42,37,31,,,,,31,,,,,,,,,,,,42,5,,43,37,31,,,31,,,,,,,,,,,,33,46,5,,34,31,,,31,,,,,,,,,,,,27,24,38,24,29,31,,,31,,,,,,,,,,,,25,,39,25,,31,,,31,,42,43,,,37,31,,,,,,,39,31,,,,,31,,27,5,47,5,34,31,,,,,,,39,31,,,,,31,,26,27,24,,29,31,,,,,,,39,31,,,,,31,,,25,,,,31,,,,,,,39,31,,,,,31,,,,,,,,,,,,48,,39,48,31,,,,31,,,,,,,,,,,40,42,43,49,37,50,31,,,31,,,,,,,,,,,51,33,5,49,5,37,36,31,,31,,,,,,,,,,40,42,5,,49,5,34,36,31,,31,,,,,,,,,,51,33,5,,49,5,34,36,31,,31,,,,,,,,,51,42,5,,,49,5,34,50,31,,31,,,,,,,,51,42,15,5,,23,28,5,,37,36,31,31,,,,,,,51,42,5,,,,16,28,5,,34,36,31,31,,,,,,51,42,5,,,,,16,28,5,,34,36,31,31,,,,,51,42,5,,,,,,16,28,5,,34,36,31,31,,,,40,42,15,5,,,,,,16,28,5,,34,36,31,31,,,,51,33,5,,,,,,,16,28,5,,34,50,31,31,,,51,42,5,,,,,,,,16,28,5,,,37,36,31,,51,42,5,,,,,,,,23,0,28,5,,46,34,36,31,40,42,5,15,5,,,,,,23,0,,,32,5,,34,36,31,51,33,5,,,,,,,,16,0,,,28,5,,34,36,40,42,5,,,,,,,,,16,0,,,4,5,,29,36,40,33,15,5,,,,,,,23,0,1,0,4,5,,29,52,31,40,27,5,,,,,,,23,0,,,4,5,,34,52,31,,31,53,27,47,5,,,,23,0,,,4,5,,,34,50,31,,31,,40,33,5,,23,54,0,,,4,5,,,,,37,50,31,31,40,42,5,,23,0,,,,4,5,,,,,,,37,36,31,51,33,5,23,1,0,,3,4,5,,,,15,5,,,29,36,40,42,5,,6,0,,28,5,,,,,,,,,29,52,31,51,33,5,,,16,0,,32,5,,,,,,,34,52,31,,42,5,,,,6,0,,,32,5,,,,,,34,50,31,,33,5,,,,,6,0,,,32,5,,,,,,37,50,31,27,5,,,,,,16,0,,,32,5,,,,,,37,36,53,27,5,,,,,6,3,0,,,32,5,,,,,34,36,31,53,33,5,,,,,,6,0,,,32,5,,47,5,34,36,31,40,33,5,15,5,,,,,6,0,1,0,32,5,,,34,36,31,51,33,5,,,,,,,,6,0,,28,5,,,34,36];

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

        if (stageNum === 2)
		return [
			[],
			// Etc...
		];
	}
	getEventsFn(stageNum) {
		// 1=EnemyLand, 2=EnemyAir, 3=Particle, 4=Player, 5=pBullet, 6=eBullet, 7=Hud
		let a = new Array(5**6).fill(b=>b); // 15625 empty functions
		a[0]	=b=>{this.p.free('Player', '4');
					 this.s.bg.speed = 0.5};
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
					 this.s.bg.speed += 0.25;}
		a[1300]	=b=> this.s.bg.speed += 0.25;
		a[1400]	=b=>{this.s.bg.speed += 0.25;
					 this.p.free('Assaulter', '2', {x: 130});}
		a[1450]	=b=> this.s.bg.speed += 0.25;
		a[1550]	=b=>{this.s.bg.speed += 0.25;
					 this.p.free('Assaulter', '2', {x: 30});}
		a[1650]	=b=> this.s.bg.speed += 0.25;
		a[1700]	=b=> this.p.free('Assaulter', '2');
		a[1750]	=b=> this.s.bg.speed += 0.25;
		a[1780]	=b=> this.p.free('SinePop', '2', {phase:-1});
		a[1790]	=b=> this.p.free('SinePop', '2', {phase:-1});
		a[1800]	=b=> this.p.free('SinePop', '2', {phase:-1});
		a[1810]	=b=> this.p.free('SinePop', '2', {phase:-1});
		a[1850]	=b=> this.s.bg.speed += 0.25;
		a[1910]	=b=> this.p.free('Sniper', '2', {x: 60});
		a[1920]	=b=> this.p.free('Sniper', '2', {x: 100});
		a[1930]	=b=> this.p.free('Sniper', '2', {x: 140});
		a[1940]	=b=> this.p.free('Sniper', '2', {x: 180});
		a[1950]	=b=> this.p.free('Sniper', '2', {x: 220});
		a[1960]	=b=> this.p.free('Sniper', '2', {x: 260});
		a[2070]	=b=> this.s.bg.queue.push(...this.s.patterns['5'], ...this.s.patterns['6'], ...this.s.patterns['7']);
		a[2220]	=b=> this.p.free('Tank', '1', {x:210});
		a[2250]	=b=> this.p.free('Tank', '1', {x:265});
		a[2270]	=b=> this.p.free('Tank', '1', {x:175});
		a[2290]	=b=> this.p.free('Tank', '1', {x:235});
		// a[]	=b=>
		return a
    }
};