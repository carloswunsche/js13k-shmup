//////////////////////////
// ASSETS
//////////////////////////

class Assets {
	constructor(dir) {
		this._dir = dir;
		this._filenames = {
			// Backgrounds
			Stage1: 		'stage-1.png',
			// Player
			Player: 		'player.png',
			PlayerBullet: 	'pBullet.png',
			// Enemies
			SinePop: 		'enemy.png',
			Sniper: 		'enemy2.png',
			Fatty: 			'pop_3.png',
			Tank: 			'tank1.png',
			Assaulter: 		'assault.png',
			EnemyBullet: 	'eBullet.png',
			// Particles
			Particle: 		'part.png',
		}
		this.patterns = {};
		this.patterns[1] = 
		[0,,,,,,,,,,,,1,0,,,,,,1,0,1,0,,,,,,,,,,,,,,,2,0,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,1,0,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,2,0,,,,,,,,,,,,,,,,1,0,0,,,1,0,,,,,,,,,,,,,,,,0,,,,,,,,,1,0,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,1,0,,,,,,0,,1,0,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,2,0,,,,,1,0,,,0,,,,,,1,0,,,,,,,,,,,,,0,,,,,,,,,,,,,,,,,,,,3,4,5,,,,0,,1,0,,,,,,,,1,0,,6,,3,,,,4,0,,,,,,,,,,,,,7,6,,8,,6,'3a','5a',0,,,,,1,0,,,,,,8,,,,,6,,4,0,,,,,,,,,,1,0,8,,,,6,9,10,'3a','5a',0,,,,,,,,,,,6,8,,,,,6,,4,0,,,,,,,,,,,8,,,,,,6,,'3a','5a',0,,1,0,,,,,,,8,,,,,,,,6,4,0,,,,,,,,,,8,,,,,,,6,,'3a','5a',0,,,,,,1,0,,8,,,,,,,6,,'3a','5a',0,,,,,,,,,8,,,,,,9,10,6,'4a',0,,,,,,,,,,8,,,,,,6,,'4a',0,,,,1,0,,,,,,8,,,,,6,,'4a',0,,,,,,,,,,,'4c',6,,8,,6,,'4a',0,,,1,0,,,,,,5,'4c',6,6,8,,6,,'4a',0,,,,,,,,,,'4c',6,,,6,,,,,4,5,0,,,,5,,,,'4c',6,,,,11,'3b',,6,,,,4,0,,'4c',6,,,,,,,'3b','11c',12,,13,11,6,,,,4,'4c',6,,,14,15,6,'3b','11c',12,,12,,,13,11,6,,16,17,18,19,6,,,'3b','11c',12,,,,12,,,,20,'3c',6,21,22,23,24,6,,'11c',12,,,,,,12,,,,13,11,6,25,26,27,28,6,'3a',12,,,,,,,12,,,,,13,11,6,14,15,6,,'11c',12,,,,,,,12,,,,,,13,11,6,,,'3a',12,,,,,,,,12,,,,,,,20,'3c',6,,'3a',12,,,,,,,,12,,,,,,,13,11,6,,,'11b',12,,,,,,,12,,,,,,,,13,11,6,,,'11b',12,,,,,,12,,,,,,,,,13,11,7,6,'3a',12,,,,,,12,,,,,,,,,,13,11,6,,'11b',12,,,,,12,,,,,,,,,,,20,'3c',6,'3a',12,,,,,12,,,,,,,,,,,13,11,'3b','11c',12,,,,,12,,,,,,,,,,,,20,29,30,12,,,,,12,,,,,,,,,,,,13,31,32,12,,,,,33,,34,12,,,,,,,,,,35,12,,,,,,36,,12,,,,,,,,,,,35,12,,,,,,12,,,,,,,,,,,,,35,12,,,,,,12,,,,,,,,,,,,,35,12,,,,,,33,,,,,,,,,,,,,35,33,,,,,,36,,,,,,,,,,,,,35,36,,,,,,12,,,,,,,,,,,,,35,12,,,,,,12,,,,,,,,,,,,,35,12,,,'34b',33,,12,,,,,,,,,,,,,35,12,,,,36,,12,,,,,,,,,,,,,35,12,,,,,,12,,,,,,,,,,,,,35,12,,,,,,12,,,,,,,,,,,,,35,12,,,,,,12,,,,,,,,,,,,,35,12,,,,,,12,'34b',33,,,34,12,,,,,,,35,12,,,,,,12,,36,,,12,,,,,,,,35,12,,,,,,12,,,,,,,,,,,,,35,12,,,,,,12,,,,,,,,,,,'11a',3,,'11b',12,,,,,12,,,,,,,,,,,37,38,,39,12,,,,'11a',12,,,,,'11a',3,,'11b',12,,20,40,29,30,12,,,,37,12,,,,,'3c',7,41,'3a',12,,13,42,43,32,12,,,,20,12,,,,,37,38,,39,12,,,,35,12,,,,,13,12,,,,,20,40,29,30,12,,,,35,12,,,,,,12,,,,,13,42,44,32,12,,,,35,12,,,,,,3,'11b',12,,,,,,,,,,,35,12,,,,,,38,39,12,,,,,,,,,,,35,12,,,,,,29,30,12,,,,,,,,,,,35,12,,,,,,44,32,12,,,,,,,,,,,35,12,,,,,,12,,,,,,,,,,,,,35,12,,,,,,33,,,,,,,,,,,,,35,33,,,,,,36,,,,,,,,,,,,,35,36,,,,,,12,,,,,,,,,,'11a',3,,45,'11b',12,,,,,12,,,,,,,,,,'3c',6,'4a','4b','3a',12,,,,,12,,,,,,,,,46,'3c',6,'5a','5c','3a','46a',12,,,,12,,,,,,,,'34b','11a',6,,'5a','5c',6,'11b',34,12,,,12,,,,,,,,'34b','3c',6,,4,'5c',6,'3a',34,12,,,12,,,,,,,,46,'3c',41,6,,47,6,'3a','46a',12,,,12,,,,,,,'34b','11a',6,,,,47,6,,'11b',34,12,,12,,,,,,,46,'3c',6,,,,47,6,7,'3a',34,12,,12,,,,,,'34b','11a',6,,,,,47,6,,'3a',34,12,,12,,,,,,46,'3c',6,,,,'4a','5c',6,,'3a','46a',12,,12,,,,,46,'11a',6,,,,,'5a','5c',6,,,'11b',34,12,12,,,,46,'11a',6,,,,41,6,'5a','5c',6,,,'3a',34,12,12,,,46,'11a',6,,,,,,,'5a',0,'4b',6,,'3a','46a',12,12,,'34b','11a',6,,,,,,,,'5a',1,'5c',6,,,'11b',34,12,,46,'3c',6,,,,,,,,4,0,'5c',6,,,'3a',34,12,'34b','11a',6,,,,,,,,,,'5a',0,'4b',6,,'3a',34,12,'34b','3c',6,,,,,,,,,,'5a',1,'5c',6,,'3a',34,12,'34b','3c',6,,,,,,,,,'4a',0,,'5c',6,,'3a',34,12,'34b','3c',8,6,,41,6,,,,,'5a',0,1,'5c',6,,'3a',34,12,46,'3c',6,,,,,,,,'4a',0,,,'4c',6,,'3a',34,46,'11a',6,,,,,,,'4a','5b',0,,,'4c',6,,,'3a',34,'11a',6,,,,,,,'4a',0,,,,'4c',6,,41,6,'3a',34,'3c',6,,,,,'4a','5b',0,1,0,,'4c',6,,,,,'11c',34,'3c',6,,,,'4a',0,,,1,0,'4c',6,,,,,'11c','46b',12,'3c',6,,'4a','5b',0,,,,5,'4c',6,,,,,'3a','46b',12,,11,6,,4,0,,,,'4c',6,,,,,,,'3a',34,12,,'46c',11,6,,4,1,0,'5c',6,,,,,8,6,,'3a',34,12,,12,'46c','3c',6,,4,0,,'4b',6,,,,,,,'3a','46a',12,,12,46,'3c',6,,,4,0,,'4b',6,,,,,,,'11b',34,12,'34b','11a',6,,,,,4,5,0,'4b',6,,,,,,'3a',34,12,'34b','3c',6,,41,6,,,,4,0,'5b',,'4b',6,,,'3a','46a',12,'34b',11,6,,,,,8,6,,4,0,,,'4b',6,,,'11b',34,12,'46c','3c',6,,,,,,,,4,0,,'5c',6,,,'3a',34,12,'34b','3c',6,,,,,,,,,'5a',0,,'4b',6,,'3a',34];
	}

	loadAnd(runSetupFn) {
		// Get number of remaining images to be loaded
		let remaining = Object.keys(this._filenames).length;

		for (const key in this._filenames) {
			// Create a new property for each image
			this[key] = new Image();

			// Set source image with hit state
			this.setSrcWithHitState(this[key], this._dir + this._filenames[key])

			// When image has loaded...
			this[key].addEventListener('load', () => {
				remaining--;
				if(remaining === 0) runSetupFn();
			});
		};
		return this;
	}
	setSrcWithHitState(key, imgPath){
		// Load original image
		let img = new Image()
		// Required to fix "The canvas has been tainted by cross-origin data" (not really necesary when uploaded to netlify)
		// img.crossOrigin = "Anonymous"
		// Insert png into source
		img.src = imgPath;
		// When png loads...
		img.addEventListener('load', () => {
			// Create temporal canvas
			let c = document.createElement('canvas')
			let ctx = c.getContext('2d');
			// Set dimensions to image size
			c.height = img.height;
			// But double the width to be able to draw hit state image later on
			c.width = img.width * 2;
			// New property on key element to save source width
			key.sWidth = img.width;
			// Draw original image
			ctx.drawImage(img, 0, 0)
			// Get pixel data
			let imgData = ctx.getImageData(0,0,c.width/2,c.height);
			// Create new arr and push modified pixel data
			let arr2 = [];
			imgData.data.forEach((n)=>{
			   if (n>0 && n<180) n += 80;
			   if (n>255) n = 255;
			   arr2.push(n)
			})
			// Create new data container and insert new arr
			let imgData2 = ctx.createImageData(img.width, img.height);
			imgData2.data.set(arr2)
			// Draw new imageData right next to original
			ctx.putImageData(imgData2, img.width, 0);
			// Finally Load new image that includes the original + a hit state
			key.src = c.toDataURL();
		})
	}
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
		// Think of a better solution, like an object with iteration keys
        if (stageNum === 1) return function(iteration){
			if (iteration === 0)		   this.pool.getFreeObject('Player', 'Player');
			// if (iteration === 0)	       this.bg.speed += 2;
			// if (iteration === 0)	return game.iteration = 2069;
			if (iteration === 0)	return this.bg.speed = 1;
			if (iteration === 50)   return this.pool.getFreeObject('SinePop', 'EnemyAir', {phase:-1});
			if (iteration === 60)   return this.pool.getFreeObject('SinePop', 'EnemyAir', {phase:-1});
			if (iteration === 70)   return this.pool.getFreeObject('SinePop', 'EnemyAir', {phase:-1});
			if (iteration === 80)   return this.pool.getFreeObject('SinePop', 'EnemyAir', {phase:-1});
            if (iteration === 145)  return this.pool.getFreeObject('Tank', 'EnemyLand', {x:95});
			if (iteration === 225)  return this.pool.getFreeObject('Tank', 'EnemyLand', {x:200});
			if (iteration === 300)  return this.pool.getFreeObject('Sniper', 'EnemyAir', {x: 60});
			if (iteration === 400)  return this.pool.getFreeObject('SinePop', 'EnemyAir', {phase:1});
			if (iteration === 430)  return this.pool.getFreeObject('SinePop', 'EnemyAir', {phase:1});
			if (iteration === 460)  return this.pool.getFreeObject('SinePop', 'EnemyAir', {phase:1});
			if (iteration === 490)  return this.pool.getFreeObject('SinePop', 'EnemyAir', {phase:1});
            if (iteration === 550)  	   this.bg.queue.push(...this.patterns['2'], ...this.patterns['3'], ...this.patterns['4']);
			if (iteration === 550)  return this.pool.getFreeObject('Sniper', 'EnemyAir', {x: 260});
			if (iteration === 580)  return this.pool.getFreeObject('Fatty', 'EnemyAir', {side: 1});
			if (iteration === 660)  return this.pool.getFreeObject('Tank', 'EnemyLand', {x:95});
			if (iteration === 750)  return this.pool.getFreeObject('Sniper', 'EnemyAir');
			if (iteration === 820)  return this.pool.getFreeObject('SinePop', 'EnemyAir', {phase:-1});
			if (iteration === 840)  return this.pool.getFreeObject('SinePop', 'EnemyAir', {phase:-1});
			if (iteration === 860)  return this.pool.getFreeObject('SinePop', 'EnemyAir', {phase:-1});
			if (iteration === 880)	return this.pool.getFreeObject('Tank', 'EnemyLand', {x:208});
			if (iteration === 1000) return this.pool.getFreeObject('Sniper', 'EnemyAir');
			if (iteration === 1020) return this.pool.getFreeObject('Sniper', 'EnemyAir', {x: 60});
			if (iteration === 1040) return this.pool.getFreeObject('Sniper', 'EnemyAir', {x: 260});
			if (iteration === 1200) 	   this.pool.getFreeObject('Fatty', 'EnemyAir', {side: 1});
			if (iteration === 1200)        this.pool.getFreeObject('Fatty', 'EnemyAir', {side: -1});
			if (iteration === 1200)	return this.bg.speed += 0.25;
			if (iteration === 1300) return this.bg.speed += 0.25;
			if (iteration === 1400) 	   this.bg.speed += 0.25;
			if (iteration === 1400) return this.pool.getFreeObject('Assaulter', 'EnemyAir', {x: 240});
			if (iteration === 1450) return this.bg.speed += 0.25;
			if (iteration === 1550)        this.bg.speed += 0.25;
			if (iteration === 1550) return this.pool.getFreeObject('Assaulter', 'EnemyAir', {x: 20});
			if (iteration === 1650) return this.bg.speed += 0.25;
			if (iteration === 1700) return this.pool.getFreeObject('Assaulter', 'EnemyAir');
			if (iteration === 1750) return this.bg.speed += 0.25;
			if (iteration === 1780) return this.pool.getFreeObject('SinePop', 'EnemyAir', {phase:-1});
			if (iteration === 1790) return this.pool.getFreeObject('SinePop', 'EnemyAir', {phase:-1});
			if (iteration === 1800) return this.pool.getFreeObject('SinePop', 'EnemyAir', {phase:-1});
			if (iteration === 1810) return this.pool.getFreeObject('SinePop', 'EnemyAir', {phase:-1});
			if (iteration === 1850) return this.bg.speed += 0.25;
			// Row of snipers appear
			if (iteration === 1910) return this.pool.getFreeObject('Sniper', 'EnemyAir', {x: 60});
			if (iteration === 1920) return this.pool.getFreeObject('Sniper', 'EnemyAir', {x: 100});
			if (iteration === 1930) return this.pool.getFreeObject('Sniper', 'EnemyAir', {x: 140});
			if (iteration === 1940) return this.pool.getFreeObject('Sniper', 'EnemyAir', {x: 180});
			if (iteration === 1950) return this.pool.getFreeObject('Sniper', 'EnemyAir', {x: 220});
			if (iteration === 1960) return this.pool.getFreeObject('Sniper', 'EnemyAir', {x: 260});
			if (iteration === 2070) return this.bg.queue.push(...this.patterns['5'], ...this.patterns['6'], ...this.patterns['7']);
			// Tanks appear in the dessert
			if (iteration === 2220) return this.pool.getFreeObject('Tank', 'EnemyLand', {x:210});
			if (iteration === 2250) return this.pool.getFreeObject('Tank', 'EnemyLand', {x:265});
			if (iteration === 2270) return this.pool.getFreeObject('Tank', 'EnemyLand', {x:175});
			if (iteration === 2290) return this.pool.getFreeObject('Tank', 'EnemyLand', {x:235});
			if (iteration === 2700) return this.bg.speed -= 0.25;
			if (iteration === 2800) return this.bg.speed -= 0.25;
			if (iteration === 2900) return this.bg.speed -= 0.25;
			if (iteration === 3900) return this.bg.speed -= 0.25;
        };
        if (stageNum === 2) return function(iteration){
            // Events here...
        };
    }
	deleteUnused(){
		delete this._dir;
		delete this._imageScaled
		delete this._filenames
	}
};