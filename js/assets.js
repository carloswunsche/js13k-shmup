//////////////////////////
// ASSETS (falta ver si hay otra forma de comprimir las paletas)
//////////////////////////

class Assets {
	constructor(runGameFn) {
		this.runGameFn = runGameFn;
		this.gfx = [
			{n: 'Assaulter',	w:8, h:15},
			{n: 'Boat',			w:6, h:15},
			{n: 'Tank',			w:6, h:15},
			{n: 'Fatty',		w:7, h:13},
			{n: 'Player',		w:6, h:13},
			{n: 'Sniper',		w:7, h:11},
			{n: 'SinePop',		w:6, h:8 },
			{n: 'Item',			w:4, h:8},
			{n: 'PlayerBullet',	w:1, h:7 }, 
			// {n: 'EnemyBullet',	w:2, h:3 },
			// Always background at the end
			{n: 'bg', 			w:176,h:8}
		];

		this.palettes = {
			// 0: { // Toxic purple
			// 	high:	[187,0,187],
			// 	mid:	[127,0,239],
			// 	shad: 	[0,0,167],
			// },
			// 1: { // Bubblegum Pink
			// 	high:	[250, 115, 179],
			// 	mid:	[227, 87, 0],
			// 	shad: 	[139, 0, 115]
			// },
			0: { // Fuchsia
				high:	[243, 119, 250],
				mid:	[129, 0, 115],
				shad: 	[35, 23, 139]
			},
			1: { // Blue
				high:	[59, 187, 250],
				mid:	[0, 127, 135],
				shad: 	[0, 0, 167]
			},
			2: { // Labirynth Water
				high:	[59, 187, 250],
				mid:	[0, 127, 135],
				shad: 	[79, 79, 79]
			},
			3: { // Pale green 2
				high:	[155, 250, 239],
				mid:	[0, 127, 135],
				shad: 	[0, 59, 19]
			},
			4: { // Sonikku mania
				high:	[239,187,59],
				mid:	[199,70,95],
				shad: 	[31,55,235]
			},
			5: { // Lively Green
				high:	[127,207,15],
				mid:	[0,147,0],
				shad:	[79,79,79]
			},
			6: { // Orange
				high:	[250, 151, 55],
				mid:	[199, 75, 11],
				shad: 	[23, 59, 91]
			},
			7: { // Player palette
				high:	[254, 254, 254],
				mid:	[250, 178, 0],
				shad: 	[0, 78, 180]
			},
			8: { // BG Palette 1
				xtra2:	[120,180,83],		//highlights
				xtra1:	[72, 149, 81],		//pasto
				high:	[180,172,172],		//barro
				mid:	[46, 106, 189],		//agua
				shad: 	[64, 64, 88]		//grone
			},
			9: { // BG Palette 2
				xtra2:	[51, 74, 117],		//highlights
				xtra1:	[53, 46, 95],		//pasto
				high:	[64, 81, 65],		//barro
				mid:	[32, 23, 85],		//agua
				shad: 	[56, 41, 41]		//grone
			},
		}

		this.bigPattern = [0,,,,,,,,,,,,,,,,,,,1,0,,,,1,0,,,,,,,,,,,,,,,2,0,,,,,,,,,,,,,,,,,,,3,4,0,,,,,,,,,,,,,,,,,,3,4,0,,,,,,,,,,,,,,,,,,3,2,0,,,,,,,,,,1,0,,,,,,,3,,4,0,,,,,,,,,,,,,,,,,3,,4,0,,,,,,,,,,,,,,,1,0,3,,4,0,,,,1,0,,,,,,,,,,5,6,3,7,0,,,,,,,,,,,,,,,6,3,,7,0,,,,,,,,,,,,,,,6,3,,,0,,,,,,,,,,,,,,,,8,3,,,0,,,,,,,,,,,,,,,,,8,3,,0,,1,0,,,,,,,,,,,,,,9,3,,0,,,,,,,,,,,,1,0,,,,,8,3,0,,,,,,,,,,,,,,,,,,,8,2,5,,0,,,,,,,,,,,,,,,,1,3,,,2,5,,0,,1,0,,,,,,,,,,,3,,,,,,4,0,,,,,,,,,,,,,3,,,,,,2,0,,,,,,,,,,,,,3,,,,,,,4,0,,,,1,0,,,,,,,3,,,,,,,2,0,,,,,,,,,,,,3,,,,,,,,4,0,,,,,,,,,,,3,,,,,,,7,0,,,,,,,,,,,,3,,,,,,,4,0,,,,,,,,,,,,3,,,,,,,2,0,,,1,0,,,,,,,,3,,,,,,,,2,5,0,,,,,,,,,,3,,,,,,,,,,2,0,,,,,,1,0,,3,,,,,,,,,,,4,0,,,,,,,,3,,,,,,,,,,,4,0,,,,,,,,3,,,,,,,,,,,4,0,,,,,,,,3,,,,,,,,,,,4,0,,,,,,5,,10,3,,,,,,,,,,2,0,,1,0,,6,3,10,11,12,10,3,,,,,,,,,2,0,,,6,3,13,11,14,11,,12,10,3,,,,,,,,2,5,6,3,,13,14,15,14,,11,,12,10,,3,,,,,,,,,,16,14,,,,,,11,,,17,3,,,,,,,,16,11,14,,,,,,,,,12,10,3,,,,,,13,11,14,,,18,19,14,,,,,11,,12,10,3,,,,16,14,,,,17,3,19,14,,,,,,11,,12,10,,16,11,14,,15,14,12,3,13,14,,,,,,,,11,,20,11,14,,,,,11,17,3,21,,19,14,,,,,,,20,14,,,,,,,12,3,,,13,14,,,,,,,20,14,,,,,,,11,12,10,,16,14,,,,,,,20,14,,,,,,,,11,,,,14,,,15,14,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,15,,,,,14,,,,,,,,20,14,,,,,15,,,14,,15,,,,,,,14,,20,14,15,,,,14,,,,,,,,,15,,,14,,20,15,,,14,,,,,,,,,,,,,15,,,20,15,14,,,,,,,,,,,,,,,,,,20,14,,,,,,,15,14,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,15,14,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,15,14,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,15,14,,,,,,,,,,18,21,,19,14,,,,,,,,,,,,,,18,21,3,,10,16,14,,,,,,,,,,,,,18,3,,,13,14,,,,,,,,,,,,,,,17,3,,10,16,14,,,,,,,,,,,,,18,21,3,,13,14,,,,,,,,,,,,,,,17,3,7,8,3,19,14,,,,,15,14,,,,,,,,12,3,2,0,8,3,19,14,,,,,,,,,15,14,,,11,12,3,2,0,8,13,14,,,,,,,,,,,,,,11,17,7,0,,8,19,14,,,,,,,,,,,,,,17,2,0,,,8,19,14,,,,,,,,,,,,,12,3,2,5,,6,13,14,,,,,,,,,,,,,11,12,10,,,,16,14,,,,,,,,,,,,,,11,,,20,11,,14,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,15,14,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,18,21,,19,14,,,,15,14,,,,,,,,,,18,3,7,8,3,19,14,,,,,,,,,,,,,,17,3,4,9,3,,21,19,14,,,,,,,,,,,18,3,7,0,9,3,,,13,14,,,,,,,,,,18,3,7,0,1,9,3,,,,19,14,,,15,14,,,18,21,3,,2,0,,9,3,,,,13,14,,,,,,,17,3,,,,2,0,9,3,,,,13,14,,,,,,18,3,,,,,,4,9,3,,,,13,14,,,,,18,3,,,,,,,4,0,8,3,,,13,14,,,,18,3,,,,,,,,4,0,,8,3,,,21,14,,,17,3,,,,,,,7,0,1,0,,8,3,,,14,,,17,3,,,,,,7,0,,,,,6,3,,,14,,18,3,,,,,,7,0,,,,,9,3,,,,14,,17,3,,,,,,4,0,,,,,9,3,,,,14,,17,3,,,,,7,0,1,0,,,5,6,3,,,,14,18,3,,,,,7,0,,,,,6,3,,,,,10,21,3,,,,,7,0,,,,,9,3,,,,,13,11,3,,,,,7,0,,,,,,9,3,,,,,16,14,3,,,,,4,1,0,,,,,,8,3,,,16,11,14,3,,,,7,0,,,,,6,2,0,9,3,,13,11,14,,10,3,,7,0,,,,,6,3,,4,0,8,3,13,14,,,11,17,3,4,0,,,,9,3,,7,0,,9,3,,19,14,,,17,3,2,0,,,,,8,3,2,0,,9,3,,,19,14,,12,3,,2,5,0,,,,8,3,2,0,6,3,,,13,14,,11,17,3,,,4,1,0,,,8,7,9,3,,,,13,14,,,17,3,,,2,0,,,,,,9,3,,,,13,14,,18,3,,,,,2,0,,,,,,8,3,,,,21,14,17,3,,,,,,2,0,,,,,,8,3,,,,14,17,3,,,,,,,4,0,1,0,,,9,3,,,3];

		// Decompress bigPattern
		let index=0;
		for(let i=0; i<this.bigPattern.length;i++) {
			index = this.bigPattern[i] == void 0 ? index : this.bigPattern[i]; 
			this.bigPattern.splice(i,1,index)
		}
	}

	loadAndRun() {
		// Length of this.gfx + background
		// this.remaining = this.gfx.length +1;
		this.remaining = this.gfx.length;

		// Load background image (old)
		// this.bg = new Image()
		// this.bg.src = 'i/bg.webp'
		// this.bg.onload = () => this.countDown();

		// Create accumulator
		let widthAcc = 0;
		this.gfx.forEach((entity, index)=>{
			// Accumulate width
			widthAcc += entity.w
			// Put the accumulated width into next index entity
			if (this.gfx[index+1]) this.gfx[index+1].prevW = Number(widthAcc);
			// Create new canvas to work next
			let c=document.createElement('canvas'),x=c.getContext('2d');

			// Load WEBP file based on entity name
			let i = new Image();
			i.src = entity.n === 'bg' ? 'i/bg.webp' : 'i/sprites.webp';
			i.onload = () => {
				// About canvas width: It has to be double the size to allow mirroring, but a pixel less
				// to avoid repetition of the middle column. You'll also see this as a +1 on the drawImage fn.
				c.width = entity.n === 'bg' ? entity.w : (entity.w * 2)-1; 
				c.height = entity.h;

				if (entity.n !== 'bg') {
					// Draw regular + mirrored sprite
					[0,1].forEach(side=>{
					x.scale(side?-1:1, 1);
					x.drawImage(
						i, 							// sprites.webp
						entity.prevW || 0,			// X source
						0,							// Y source
						entity.w,					// Source width
						entity.h,					// Source height
						side?-entity.w+1:0,			// Destination X
						0, 							// Destination Y
						side?-entity.w:entity.w, 	// Destination width
						entity.h					// Destination height
						);
					})
					// After drawing, update entity width using the canvas'
					entity.w = c.width;
				} else {
					// Normal draw for background tileset
					x.drawImage(i,0,0)
				}


				// Get pixel data from canvas
				let data = x.getImageData(0,0,c.width,c.height);
				let dataD = data.data;
				// Create fake data array (to be able to access array methods)
				let fakeData = [];
				// Change canvas height to fit all color variations
				c.width = c.width * Object.keys(this.palettes).length;


				// Draw every palette variation of image into the canvas
				Object.keys(this.palettes).forEach((_, paletteNumber) => {
					// Fill fakeData based on dataD shade information
					for(let i = 0; i < dataD.length; i+=4) {
						// Fill with zeroes first (not necessary)
						// fakeData.splice(i,4,...[0,0,0,0])
						// If shade, put alpha all the way up
						if (dataD[i] > 0) fakeData[i+3] = 255;
						// Depending on which shade, replace with tone
						if (dataD[i] == 39) fakeData.splice(i,3,...this.palettes[paletteNumber].shad);
						if (dataD[i] == 60) fakeData.splice(i,3,...this.palettes[paletteNumber].mid);
						if (dataD[i] == 99) fakeData.splice(i,3,...this.palettes[paletteNumber].high);
						// for BG
						if (dataD[i] == 133) fakeData.splice(i,3,... this.palettes[paletteNumber].xtra1 || [0,0,0]);
						if (dataD[i] == 165) fakeData.splice(i,3,... this.palettes[paletteNumber].xtra2 || [0,0,0]);
					}
					// Insert data from fakeData Array into newData Uint8ClampedArray
					let newData = x.createImageData(c.width / Object.keys(this.palettes).length,c.height);
					fakeData.forEach((el, i) => newData.data[i] = el);
					// Draw new image into canvas
					x.putImageData(newData, paletteNumber * entity.w, 0);
				})

				// Create final image and set canvas as the source
				this[entity.n] = new Image();
				// Set source height as the original height reported by entity
				this[entity.n].sWidth = entity.w;
				// Set source
				this[entity.n].src = c.toDataURL();
				// When source finishes loading, count down
				this[entity.n].onload = () => this.countDown();
			}
		})
		return this;
	}
	countDown(){
		this.remaining--;
		if(!this.remaining) this.runGameFn();
	}
};