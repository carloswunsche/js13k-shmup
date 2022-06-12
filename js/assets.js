//////////////////////////
// ASSETS
//////////////////////////

class Assets {
	constructor(dir) {
		this._dir = dir;
		this._filenames = {
			Stage1: 'stage-1.png',
			Player: 'player.png',
			PlayerBullet: 'pBullet.png',
			EnemyPop1: 'enemy.png',
			Tank: 'tank1.png',
			Particle: 'part.png',
		}
		this.patterns = {};
		this.patterns[1] = 
		[1,1,1,1,1,1,1,2,3,4,1,1,1,5,6,1,1,1,1,1,1,1,1,1,1,1,7,8,8,8,9,1,1,5,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,6,1,1,1,2,3,1,1,1,1,1,1,1,1,1,1,1,1,1,5,6,1,1,7,8,8,1,1,1,1,1,1,1,1,1,1,1,1,1,5,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,6,1,1,1,1,1,1,1,1,2,3,4,1,1,1,1,1,1,1,5,6,1,1,1,1,1,1,1,7,8,8,8,9,1,1,1,1,1,1,5,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,6,1,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,5,6,1,1,1,1,1,8,9,1,1,1,1,1,1,1,1,1,1,1,5,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,10,11,12,13,1,1,1,10,11,1,1,1,1,1,1,1,1,1,1,1,14,15,15,16,1,1,1,17,18,1,1,1,1,1,1,1,1,1,1,1,19,20,21,22,1,1,1,14,23,24,1,1,1,1,1,1,10,11,25,13,26,27,28,29,1,1,1,19,20,30,31,1,1,1,1,1,14,15,15,16,1,1,1,1,1,1,1,26,27,32,33,1,1,1,1,1,19,20,21,22,1,1,1,1,1,1,1,1,1,34,1,1,1,1,1,1,26,27,28,29,1,1,1,1,1,1,1,1,1,35,13,1,1,1,1,1,1,1,1,1,1,36,1,1,1,1,1,1,1,37,38,1,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,39,38,1,1,1,2,3,4,1,1,1,1,5,1,1,1,1,1,1,1,15,16,1,1,7,8,8,8,9,1,1,1,5,1,1,1,1,1,1,1,21,22,1,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,28,29,1,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,40,41,5,41,41,42,1,1,2,3,1,1,1,1,1,1,1,1,1,1,43,44,45,11,13,6,1,7,8,8,1,1,1,1,1,1,1,1,1,1,43,46,47,48,38,6,1,1,1,1,1,1,1,49,1,1,1,1,50,1,43,51,52,53,54,55,42,1,1,1,1,1,7,8,9,1,1,1,1,40,56,51,52,53,57,58,6,1,1,1,1,1,1,1,1,1,1,1,1,43,59,39,52,60,39,54,6,1,1,1,1,1,1,1,1,1,1,1,1,43,51,39,61,39,62,54,55,42,50,1,1,1,1,1,1,1,49,1,40,56,51,39,61,57,39,39,58,6,1,1,1,1,1,1,1,7,8,9,43,59,39,39,63,48,39,39,54,6,1,1,1,1,1,1,1,1,1,40,56,51,64,39,39,61,39,39,54,6,1,1,1,1,1,1,1,1,1,43,59,39,39,39,47,53,39,39,54,55,42,1,1,1,49,1,1,1,40,56,51,39,39,39,52,53,39,39,39,58,6,1,1,7,8,9,1,40,56,59,39,39,39,39,52,53,39,64,39,54,6,1,1,1,1,1,40,56,59,39,39,39,39,39,52,53,39,39,39,54,55,42,1,1,1,40,56,59,39,39,39,39,39,39,52,65,48,39,39,39,58,6,1,1,1,43,59,39,62,39,39,39,39,39,63,65,53,39,39,64,54,6,1,1,40,56,51,39,39,39,39,39,62,39,39,52,53,39,39,39,54,6,1,1,43,59,39,39,39,39,39,39,39,39,39,52,65,48,39,39,54,6,1,40,56,51,39,39,39,39,39,39,39,39,47,65,65,53,39,39,54,6,1,56,51,66,39,39,39,39,64,39,39,39,52,65,67,53,39,39,54,6,43,59,68,69,70,71,39,39,39,39,39,47,65,65,65,60,39,39,54,6,56,51,72,73,30,74,39,39,39,47,75,65,65,65,60,76,39,39,54,6,59,77,78,79,80,81,39,39,47,65,65,65,65,60,39,39,39,39,54,6,51,39,39,82,83,39,47,75,65,67,65,65,60,39,39,39,39,84,85,6,51,39,39,39,39,47,65,65,65,67,65,60,39,57,39,39,84,85,86,9,51,39,39,47,75,65,65,65,65,87,60,39,39,39,39,39,54,86,9,1,88,37,39,63,65,65,65,65,60,39,39,39,39,39,39,39,54,6,1,1,89,88,37,39,52,67,65,53,39,39,62,39,39,66,39,39,54,6,1,1,7,89,51,39,63,87,65,65,48,39,39,39,39,39,39,39,54,55,42,1,1,56,51,39,39,39,63,65,65,48,39,39,57,39,39,39,90,58,55,42,43,59,39,39,39,39,39,63,65,65,75,75,48,39,39,39,39,90,58,6,43,51,91,92,39,39,39,39,63,87,65,67,65,48,39,76,39,39,54,6,43,51,39,39,39,39,39,66,39,39,63,65,65,53,39,39,39,39,54,6,43,88,37,39,39,39,39,39,39,39,39,63,65,65,48,39,57,39,54,6,7,89,51,39,39,39,39,39,39,39,39,39,52,65,65,48,39,76,54,6];
	}

	loadAnd(runSetupFn) {
		// Get number of remaining images to be loaded
		let remaining = Object.keys(this._filenames).length;

		loopOver(this._filenames, (key, file) => {
			// Create a new property for each image
			this[key] = new Image();

			// Set source image
			// this[key].src = this._dir + file;

			// Set source image with hit state
			this.setSrcWithHitState(this[key], this._dir + file)

			// When image has loaded...
			this[key].addEventListener('load', () => {
				// Scale down to intended size once loaded
				// this[key].width  /= this._imageScaled;
				// this[key].height /= this._imageScaled;
				remaining--;
				// If all images have loaded...
				if(remaining === 0) runSetupFn();
			});
		});
		return this;
	}
	setSrcWithHitState(key, filename){
		// Load original image
		let img = new Image()
		img.src = filename;
		// When original image loads...
		img.addEventListener('load', () => {
			// Create temporal canvas
			let canvas = document.createElement('canvas')
			let ctx = canvas.getContext('2d');
			canvas.height = img.height;
			canvas.width = img.width * 2;
			// New property on key element to save source width
			key.sWidth = img.width;
			// Draw original image
			ctx.drawImage(img, 0, 0)
			// Get pixel data
			const imgData = ctx.getImageData(0,0,canvas.width/2,canvas.height);
			const arr = imgData.data;
			// Create new arr pushing modified pixel data
			const arr2 = [];
			arr.forEach((n)=>{
			   if (n>0 && n<180) n += 80;
			   if (n>255) n = 255;
			   arr2.push(n)
			})
			// Create new data container and insert new arr
			const imageData2 = ctx.createImageData(img.width, img.height);
			imageData2.data.set(arr2)
			// Draw new imageData right next to original
			ctx.putImageData(imageData2, img.width, 0);
			// Finally Load new image
			key.src = canvas.toDataURL();
		})
	}
	getPoolInputArr(stageNum){
        if (stageNum === 1)
		return [
			[12,PlayerBullet],
			[4, EnemyPop1],
			[2, Tank],
			[150,Particle]
		];

        if (stageNum === 2)
		return [
			[],
			// Etc...
		];
	}
	getEventsFn(stageNum) {
        if (stageNum === 1) return function(iteration){
			if (iteration === 50)   this.pool.getFreeObject('EnemyPop1', 'EnemyAir', {phase:-1});
			if (iteration === 60)   this.pool.getFreeObject('EnemyPop1', 'EnemyAir', {phase:-1});
			if (iteration === 70)   this.pool.getFreeObject('EnemyPop1', 'EnemyAir', {phase:-1});
			if (iteration === 80)   this.pool.getFreeObject('EnemyPop1', 'EnemyAir', {phase:-1});
            if (iteration === 145)  this.pool.getFreeObject('Tank', 'EnemyLand', {x:95});
			if (iteration === 225)  this.pool.getFreeObject('Tank', 'EnemyLand', {x:200});
            // if (iteration === 200)   this.bg.speed += 1;
			if (iteration === 400)  this.pool.getFreeObject('EnemyPop1', 'EnemyAir', {phase:1});
			if (iteration === 430)  this.pool.getFreeObject('EnemyPop1', 'EnemyAir', {phase:1});
			if (iteration === 460)  this.pool.getFreeObject('EnemyPop1', 'EnemyAir', {phase:1});
			if (iteration === 490)  this.pool.getFreeObject('EnemyPop1', 'EnemyAir', {phase:1});
            if (iteration === 550)  this.bg.queue.push(...this.patterns['2'], ...this.patterns['3'], ...this.patterns['4']);
			if (iteration === 660)  this.pool.getFreeObject('Tank', 'EnemyLand', {x:95});
			if (iteration === 880)  this.pool.getFreeObject('Tank', 'EnemyLand', {x:208});

			// Los  decimales NO le gustan a firefox al renderizar bg. 
			// Chrome en cambio no tiene drama con (0.25 en adelante).
			if (iteration === 1200)  this.bg.speed += 0.25;
			if (iteration === 1300)  this.bg.speed += 0.25;
			if (iteration === 1400)  this.bg.speed += 0.25;
			if (iteration === 1500)  this.bg.speed += 0.25;
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