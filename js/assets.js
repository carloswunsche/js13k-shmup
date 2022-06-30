//////////////////////////
// ASSETS (falta ver si hay otra forma de comprimir las paletas)
//////////////////////////

class Assets {
	constructor(runGameFn) {
		this.runGameFn = runGameFn;
		this.gfx = [
			// Tienen que estar en el orden en que aparecen en el spritesheet
			{w:8, h:15},
			{w:6, h:15},
			{w:6, h:15},
			{w:7, h:13},
			{w:6, h:13},
			{w:7, h:11},
			{w:6, h:8},
			{w:4, h:8},
			{w:1, h:7},
		];

		// Fill gfx array with sourceX info and variations
		// Variables needed
		let widthAcc = 0, v = 0, variations = 5, mod = [];
		// Put sourceX info and, since we are here, the full width of each entity
		this.gfx.forEach(obj => {obj.sourceX = widthAcc; widthAcc += obj.w; obj.fullW = (obj.w*2)-1})
		// Put variations and, 
		while(v < variations){this.gfx.forEach(obj => mod.push({...obj, offset: v+1}));v++}
		this.gfx.push(...mod, {w: 176, fullW:176,h:8,bg:'bg'})
		// Set remaining graphics to load now (gfx + background)
		this.remaining = this.gfx.length;


		this.palettes = [
			// { // Toxic purple
			// 	high:	[187,0,187],
			// 	mid:	[127,0,239],
			// 	shad: 	[0,0,167],
			// },
			// { // Bubblegum Pink
			// 	high:	[250, 115, 179],
			// 	mid:	[227, 87, 0],
			// 	shad: 	[139, 0, 115]
			// },
			{ // 0) Fuchsia
				high:	[243, 119, 250],
				mid:	[129, 0, 115],
				shad: 	[35, 23, 139]
			},
			{ // 1) Blue
				high:	[59, 187, 250],
				mid:	[0, 127, 135],
				shad: 	[0, 0, 167]
			},
			{ // 2) Labirynth Water
				high:	[59, 187, 250],
				mid:	[0, 127, 135],
				shad: 	[79, 79, 79]
			},
			{ // 3)  Pale green 2
				high:	[155, 250, 239],
				mid:	[0, 127, 135],
				shad: 	[0, 59, 19]
			},
			{ // 4)  Sonikku mania
				high:	[239,187,59],
				mid:	[199,70,95],
				shad: 	[31,55,235]
			},
			{ // 5)  Lively Green
				high:	[127,207,15],
				mid:	[0,147,0],
				shad:	[79,79,79]
			},
			{ // 6)  Orange
				high:	[250, 151, 55],
				mid:	[199, 75, 11],
				shad: 	[23, 59, 91]
			},
			{ // 7) Player palette
				high:	[254, 254, 254],
				mid:	[250, 178, 0],
				shad: 	[0, 78, 180]
			},
			{ // 8) BG Palette 1
				xtra2:	[120,180,83],		//highlights
				xtra1:	[72, 149, 81],		//pasto
				high:	[180,172,172],		//barro
				mid:	[46, 106, 189],		//agua
				shad: 	[64, 64, 88]		//grone
			},
			{ // 9) BG Palette 2
				xtra2:	[51, 74, 117],		//highlights
				xtra1:	[53, 46, 95],		//pasto
				high:	[64, 81, 65],		//barro
				mid:	[32, 23, 85],		//agua
				shad: 	[56, 41, 41]		//grone
			},
		]
		this.bigPattern = [0,,,,,,,,,,,,,,,,,,,1,0,,,,1,0,,,,,,,,,,,,,,,2,0,,,,,,,,,,,,,,,,,,,3,4,0,,,,,,,,,,,,,,,,,,3,4,0,,,,,,,,,,,,,,,,,,3,2,0,,,,,,,,,,1,0,,,,,,,3,,4,0,,,,,,,,,,,,,,,,,3,,4,0,,,,,,,,,,,,,,,1,0,3,,4,0,,,,1,0,,,,,,,,,,5,6,3,7,0,,,,,,,,,,,,,,,6,3,,7,0,,,,,,,,,,,,,,,6,3,,,0,,,,,,,,,,,,,,,,8,3,,,0,,,,,,,,,,,,,,,,,8,3,,0,,1,0,,,,,,,,,,,,,,9,3,,0,,,,,,,,,,,,1,0,,,,,8,3,0,,,,,,,,,,,,,,,,,,,8,2,5,,0,,,,,,,,,,,,,,,,1,3,,,2,5,,0,,1,0,,,,,,,,,,,3,,,,,,4,0,,,,,,,,,,,,,3,,,,,,2,0,,,,,,,,,,,,,3,,,,,,,4,0,,,,1,0,,,,,,,3,,,,,,,2,0,,,,,,,,,,,,3,,,,,,,,4,0,,,,,,,,,,,3,,,,,,,7,0,,,,,,,,,,,,3,,,,,,,4,0,,,,,,,,,,,,3,,,,,,,2,0,,,1,0,,,,,,,,3,,,,,,,,2,5,0,,,,,,,,,,3,,,,,,,,,,2,0,,,,,,1,0,,3,,,,,,,,,,,4,0,,,,,,,,3,,,,,,,,,,,4,0,,,,,,,,3,,,,,,,,,,,4,0,,,,,,,,3,,,,,,,,,,,4,0,,,,,,5,,10,3,,,,,,,,,,2,0,,1,0,,6,3,10,11,12,10,3,,,,,,,,,2,0,,,6,3,13,11,14,11,,12,10,3,,,,,,,,2,5,6,3,,13,14,15,14,,11,,12,10,,3,,,,,,,,,,16,14,,,,,,11,,,17,3,,,,,,,,16,11,14,,,,,,,,,12,10,3,,,,,,13,11,14,,,18,19,14,,,,,11,,12,10,3,,,,16,14,,,,17,3,19,14,,,,,,11,,12,10,,16,11,14,,15,14,12,3,13,14,,,,,,,,11,,20,11,14,,,,,11,17,3,21,,19,14,,,,,,,20,14,,,,,,,12,3,,,13,14,,,,,,,20,14,,,,,,,11,12,10,,16,14,,,,,,,20,14,,,,,,,,11,,,,14,,,15,14,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,15,,,,,14,,,,,,,,20,14,,,,,15,,,14,,15,,,,,,,14,,20,14,15,,,,14,,,,,,,,,15,,,14,,20,15,,,14,,,,,,,,,,,,,15,,,20,15,14,,,,,,,,,,,,,,,,,,20,14,,,,,,,15,14,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,15,14,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,15,14,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,15,14,,,,,,,,,,18,21,,19,14,,,,,,,,,,,,,,18,21,3,,10,16,14,,,,,,,,,,,,,18,3,,,13,14,,,,,,,,,,,,,,,17,3,,10,16,14,,,,,,,,,,,,,18,21,3,,13,14,,,,,,,,,,,,,,,17,3,7,8,3,19,14,,,,,15,14,,,,,,,,12,3,2,0,8,3,19,14,,,,,,,,,15,14,,,11,12,3,2,0,8,13,14,,,,,,,,,,,,,,11,17,7,0,,8,19,14,,,,,,,,,,,,,,17,2,0,,,8,19,14,,,,,,,,,,,,,12,3,2,5,,6,13,14,,,,,,,,,,,,,11,12,10,,,,16,14,,,,,,,,,,,,,,11,,,20,11,,14,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,15,14,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,,,20,14,,,,,,,,,,,,,,,,,18,21,,19,14,,,,15,14,,,,,,,,,,18,3,7,8,3,19,14,,,,,,,,,,,,,,17,3,4,9,3,,21,19,14,,,,,,,,,,,18,3,7,0,9,3,,,13,14,,,,,,,,,,18,3,7,0,1,9,3,,,,19,14,,,15,14,,,18,21,3,,2,0,,9,3,,,,13,14,,,,,,,17,3,,,,2,0,9,3,,,,13,14,,,,,,18,3,,,,,,4,9,3,,,,13,14,,,,,18,3,,,,,,,4,0,8,3,,,13,14,,,,18,3,,,,,,,,4,0,,8,3,,,21,14,,,17,3,,,,,,,7,0,1,0,,8,3,,,14,,,17,3,,,,,,7,0,,,,,6,3,,,14,,18,3,,,,,,7,0,,,,,9,3,,,,14,,17,3,,,,,,4,0,,,,,9,3,,,,14,,17,3,,,,,7,0,1,0,,,5,6,3,,,,14,18,3,,,,,7,0,,,,,6,3,,,,,10,21,3,,,,,7,0,,,,,9,3,,,,,13,11,3,,,,,7,0,,,,,,9,3,,,,,16,14,3,,,,,4,1,0,,,,,,8,3,,,16,11,14,3,,,,7,0,,,,,6,2,0,9,3,,13,11,14,,10,3,,7,0,,,,,6,3,,4,0,8,3,13,14,,,11,17,3,4,0,,,,9,3,,7,0,,9,3,,19,14,,,17,3,2,0,,,,,8,3,2,0,,9,3,,,19,14,,12,3,,2,5,0,,,,8,3,2,0,6,3,,,13,14,,11,17,3,,,4,1,0,,,8,7,9,3,,,,13,14,,,17,3,,,2,0,,,,,,9,3,,,,13,14,,18,3,,,,,2,0,,,,,,8,3,,,,21,14,17,3,,,,,,2,0,,,,,,8,3,,,,14,17,3,,,,,,,4,0,1,0,,,9,3,,,3];
		// Decompress bigPattern
		let index=0;
		for(let i=0; i<this.bigPattern.length;i++) {
			index = this.bigPattern[i] == void 0 ? index : this.bigPattern[i]; 
			this.bigPattern.splice(i,1,index)
		}
	}

	loadAndRun() {
		// Temporary
		// this.bg = new Image()
		// this.bg.src = 'i/bg.webp';
		// this.bg.onload = () => this.countDown()

			this.gfx.forEach((entity, index) => {
				let i = new Image();
				i.src = entity.bg ? 'i/bg.webp' : 'i/sprites.webp';
				i.onload = () => {
					// Create new canvas to work next
					let c=document.createElement('canvas'),x=c.getContext('2d');
					// About canvas width: It has to be double the size to allow mirroring, but a pixel less
					// to avoid repetition of the middle column. You'll also see this as a +1 on the drawImage fn.
					c.width = entity.bg ? entity.fullW : (entity.w * 2)-1;  
					c.height = entity.h;
	
					if (!entity.bg) {
						// Draw regular + mirrored sprite
						[0,1].forEach(side=>{
						x.scale(side?-1:1, 1);
						x.drawImage(
							i, 							 				// sprites.webp
							entity.sourceX + (entity.offset || 0),		// X source
							0,							 				// Y source
							entity.w,					 				// Source width
							entity.h,					 				// Source height
							side?-entity.w+1:0,			 				// Destination X
							0, 							 				// Destination Y
							side?-entity.w:entity.w, 					// Destination width
							entity.h					 				// Destination height
							);
						})
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
					this.palettes.forEach((_, paletteNumber) => {
						// Fill fakeData based on dataD shade information
						for(let ii = 0; ii < dataD.length; ii+=4) {
							// Fill with zeroes first (not necessary)
							// fakeData.splice(i,4,...[0,0,0,0])
							// If shade, put alpha all the way up
							if (dataD[ii] > 0) fakeData[ii+3] = 255;
							// Depending on which shade, replace with tone
							if (dataD[ii] == 39) fakeData.splice(ii,3,...this.palettes[paletteNumber].shad);
							if (dataD[ii] == 60) fakeData.splice(ii,3,...this.palettes[paletteNumber].mid);
							if (dataD[ii] == 99) fakeData.splice(ii,3,...this.palettes[paletteNumber].high);
							// for BG
							if (dataD[ii] == 133) fakeData.splice(ii,3,... this.palettes[paletteNumber].xtra1 || [0,0,0]);
							if (dataD[ii] == 165) fakeData.splice(ii,3,... this.palettes[paletteNumber].xtra2 || [0,0,0]);
						}
						// Insert data from fakeData Array into newData Uint8ClampedArray
						let newData = x.createImageData(c.width / this.palettes.length,c.height);
						fakeData.forEach((el, i) => newData.data[i] = el);
						// Draw new image into canvas
						x.putImageData(newData, paletteNumber * entity.fullW, 0);
					})
	
					// Determine what name will the graphic have
					let name = entity.bg || index;
					// Create final image and set canvas as the source
					this[name] = new Image();
					// Set source height as the original height reported by entity
					this[name].sWidth = entity.fullW;
					// Set source
					this[name].src = c.toDataURL();
					// When source finishes loading, count down
					this[name].onload = () => this.countDown();
				}
			})
		
		return this;
	}
	countDown(){
		this.remaining--;
		if(!this.remaining) this.runGameFn();
		// if(!this.remaining) this.showcaseGraphics();
	}
	showcaseGraphics(){
		// Remove background from gfx
		this.gfx.splice(-1)

		// Replace everything with a canvas to draw on
		document.write('<html><head><title>Showcase Graphics</title></head><body></body></html>')
		let c=document.createElement('canvas'),ctx=c.getContext('2d');
		document.body.append(c)

		// Set canvas proportions
		let gap = 30
		c.width = gap * this.palettes.length; 
		c.height = gap * this.gfx.length;

		// Set style
		c.style.border='1px solid grey'
		c.style.padding='5px';
		c.style.imageRendering='pixelated'
        ctx.mozImageSmoothingEnabled = 0;
        ctx.webkitImageSmoothingEnabled = 0;
        ctx.msImageSmoothingEnabled = 0;
        ctx.imageSmoothingEnabled = 0;

		// Draw everything
		for(let y = 0; y < this.gfx.length; y++){
			for(let x = 0; x < 12; x++){
				ctx.drawImage(
					this[y],				// image
					this.gfx[y].fullW * x,  // source x
					0,						// source y
					this.gfx[y].fullW,		// source width
					this.gfx[y].h,			// source height
					x * gap,				// destination x
					y * gap,				// destination y
					this.gfx[y].fullW,		// destination W
					this.gfx[y].h			// destination H
				)
			}
			ctx.font = "10px Arial";
			ctx.fillText(
				`Graphic #${y-1} ↑`,
				0,
				(y * gap) - gap/8)
		}
	}
};