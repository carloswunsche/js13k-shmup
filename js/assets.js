//////////////////////////
// ASSETS
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
		let widthAcc = 0, variations = 6, mod = [];
		// Put sourceX info and, since we are here, the full width of each entity
		this.gfx.forEach(obj => {obj.sourceX = widthAcc; widthAcc += obj.w; obj.fullW = (obj.w*2)-1})
		// Put variations and background too (at the end)
		for(let v = 0; v < variations; v++)this.gfx.forEach(obj => mod.push({...obj, offset: v+1}))
		this.gfx.push(...mod, {fullW:176,h:8,bg:'bg'})
		// Set remaining graphics to load
		this.remaining = this.gfx.length;

		this.palettes = [
			{ // 0) Fuchsia
				99:	[243, 119, 250],
				60:	[129, 0, 115],
				39: [35, 23, 139]
			},
			{ // 1) Blue
				99:	[59, 187, 250],
				60:	[0, 127, 135],
				39: [0, 0, 167]
			},
			{ // 2) Labirynth Water
				99:	[59, 187, 250],
				60:	[0, 127, 135],
				39: [79, 79, 79]
			},
			{ // 3)  Pale green 2
				99:	[155, 250, 239],
				60:	[0, 127, 135],
				39: [0, 59, 19]
			},
			{ // 4)  Sonikku mania
				99:	[239,187,59],
				60:	[199,70,95],
				39: [31,55,235]
			},
			{ // 5)  Lively Green
				99:	[127,207,15],
				60:	[0,147,0],
				39:	[79,79,79]
			},
			{ // 6)  Orange
				99:	[250, 151, 55],
				60:	[199, 75, 11],
				39: [23, 59, 91]
			},
			{ // 7) Player palette
				99:	[254, 254, 254],
				60:	[250, 178, 0],
				39: 	[0, 78, 180]
			},
			{ // 8) BG Palette 1
				165:[120,180,83],		//highlights
				133:[72, 149, 81],		//pasto
				99:	[180,172,172],		//barro
				60:	[46, 106, 189],		//agua
				39: [64, 64, 88]		//grone
			},
			{ // 9) BG Palette 2
				165:[51, 74, 117],		//highlights
				133:[53, 46, 95],		//pasto
				99:	[64, 81, 65],		//barro
				60:	[32, 23, 85],		//agua
				39: [56, 41, 41]		//grone
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
		this.gfx.forEach((entity, index) => {
			let img = new Image();
			img.src = entity.bg ? 'i/bg.webp' : 'i/sprites.webp';
			img.onload = () => {
				// Create new canvas to work with
				let c=document.createElement('canvas'),x=c.getContext('2d');
				c.width = entity.fullW; 
				c.height = entity.h;

				// Draw regular + mirrored sprite
				if (!entity.bg) {
					[0,1].forEach(side=>{
					x.scale(side?-1:1, 1);
					x.drawImage(
						img, 							 			// sprites.webp
						entity.sourceX + (entity.offset || 0),		// X source
						0,							 				// Y source
						entity.w,					 				// Source width
						entity.h,					 				// Source height
						side ? -entity.w+1 : 0,			 				// Destination X
						0, 							 				// Destination Y
						side ? -entity.w : entity.w, 					// Destination width
						entity.h					 				// Destination height
						);
					})
				// Normal draw for the background
				} else x.drawImage(img,0,0);


				// Get pixel data from canvas and create fakeData to build new image
				let data = x.getImageData(0,0,c.width,c.height), dataD = data.data, fakeData = [];
				// Then change canvas height to fit all color variations
				c.width = c.width * this.palettes.length;
				// Write every palette variation of image into fakeData
				this.palettes.forEach((_, paletteNumber) => {
					// Fill fakeData based on dataD shade information
					for(let i = 0; i < dataD.length; i+=4) {
						// If shade on pixel:
						if (dataD[i] > 0) {
							// Set alpha all the way up
							fakeData[i+3] = 255;
							// Replace with pallete color if available
							fakeData.splice(i,3,...this.palettes[paletteNumber][dataD[i]] || [0,0,0]); 
						}
					}
					// Insert data from fakeData Array into a newData Uint8ClampedArray
					let newData = x.createImageData(c.width / this.palettes.length,c.height);
					fakeData.forEach((el, i) => newData.data[i] = el);
					// Draw new image into canvas
					x.putImageData(newData, paletteNumber * entity.fullW, 0);
				})

				// Determine what name will the graphic have
				let name = entity.bg || index;
				// Create final image and set canvas as the source
				this[name] = new Image();
				this[name].src = c.toDataURL();
				// Add source height property as the full height of entity
				this[name].sWidth = entity.fullW;
				// When source finishes loading, count down
				this[name].onload = () => this.countDown();
			}
		})
		return this;
	}
	countDown(){
		this.remaining--;
		if(!this.remaining) this.runGameFn();
	}
	showcaseGraphics(){
		// Create canvas to showcase graphics
		let c=document.createElement('canvas'),ctx=c.getContext('2d'), gap = 30;
		c.width = gap * this.palettes.length; 
		c.height = gap * this.gfx.length;

		// Clear background and append canvas
		document.body.innerHTML = '';
		document.body.append(c)
		// Set webpage and canvas style
		document.body.style.backgroundColor='white'
		c.style.border='1px solid grey'
		c.style.backgroundColor='white'
		c.style.padding='5px';
		c.style.imageRendering='pixelated'
        ctx.mozImageSmoothingEnabled = 0;
        ctx.webkitImageSmoothingEnabled = 0;
        ctx.msImageSmoothingEnabled = 0;
        ctx.imageSmoothingEnabled = 0;

		// Draw everything
		for(let y = 0; y < this.gfx.length; y++){
			// Break if property does not exist (like background, which is called assets.bg)
			if (this[y] == void 0) break
			// Draw
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
				` ↑ Sprite ${y-1}`,
				0,
				(y * gap) - gap/8)
		}
		return (function () {
			console.clear();
			return 'Hola zoy carl. aca estan todos los graficos q hace el game a partir de una imagen de mierda en greyscale. Las filas son las paletas y las columnas los distintos sprites'
		})()
	}
};