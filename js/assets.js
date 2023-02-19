//////////////////////////
// ASSETS
//////////////////////////

class Assets {
	constructor() {
	}

	getPalettesArr(){
		return [
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
	}

	getSpriteSizes() {
		/**README 
		 * en spriteSizes, las medidas tienen que estar 
		 * en el orden en que aparecen en la imagen.
		 * w = width
		 * h = height
		*/
		let 
		widthAcc = 0, 
		variations = 6, 
		mod = [],
		spriteSizes = [
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
		// Add sourceX info and the full width of each entity to the array
		spriteSizes.forEach(obj => {obj.sourceX = widthAcc; widthAcc += obj.w; obj.fullW = (obj.w*2)-1})
		// Add sprite variations
		for(let v = 0; v < variations; v++) spriteSizes.forEach(obj => mod.push({...obj, offset: v+1}))
		// Add background
		spriteSizes.push(...mod, {fullW:72,h:8,bg:'bg'})
		return spriteSizes
	}

	load(fn) {
		// Save start game function
		this.assetsReady = fn;
		// Get palettes array
		this.palettes = this.getPalettesArr()
		// Get background tiles map array
		// this.bgTilesMap = this.getDecompressedBgTilesMap()
		// Get sprite sizes array
		const spriteSizes = this.getSpriteSizes();
		// Set remaining graphics to load
		this.remainingGraphicsToLoad = spriteSizes.length;

		spriteSizes.forEach((entity, index) => {
			let img = new Image();
			img.src = entity.bg ? 'img/bg.webp' : 'img/sprites.webp';
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
				// Regular draw for the background (no mirroring)
				} else {x.drawImage(img,0,0)}


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
				// Add source width property as the full width of entity
				this[name].sWidth = entity.fullW;
				/** Add width and height to this.bg */
				if (entity.bg) this.bg.width = entity.fullW;
				if (entity.bg) this.bg.height = entity.h;

				// When source finishes loading, count down
				this[name].onload = () => this.countDown();
			}
		})
	}
	countDown(){
		this.remainingGraphicsToLoad--;
		if(this.remainingGraphicsToLoad === 0) this.assetsReady();
		// Uncomment this and showcaseGraphics function to see all generated graphics
		// if(!this.graphicsToLoad) this.showcaseGraphics();
	}
	/** REMOVE FROM FINAL BUILD */
	// showcaseGraphics(){
	// 	// Create canvas to showcase graphics
	// 	let c=document.createElement('canvas'),ctx=c.getContext('2d'), gap = 30;
	// 	c.width = gap * this.palettes.length; 
	// 	c.height = gap * this.spriteSizes.length;

	// 	// Clear background and append canvas
	// 	document.body.innerHTML = '';
	// 	document.body.append(c)
	// 	// Set webpage and canvas style
	// 	document.body.style.backgroundColor='white'
	// 	c.style.border='1px solid grey'
	// 	c.style.backgroundColor='white'
	// 	c.style.padding='5px';
	// 	c.style.imageRendering='pixelated'
    //     ctx.mozImageSmoothingEnabled = 0;
    //     ctx.webkitImageSmoothingEnabled = 0;
    //     ctx.msImageSmoothingEnabled = 0;
    //     ctx.imageSmoothingEnabled = 0;

	// 	// Draw everything
	// 	for(let y = 0; y < this.spriteSizes.length; y++){
	// 		// Break if property does not exist (like background, which is called assets.bg)
	// 		if (this[y] == void 0) break
	// 		// Draw
	// 		for(let x = 0; x < 12; x++){
	// 			ctx.drawImage(
	// 				this[y],				// image
	// 				this.spriteSizes[y].fullW * x,  // source x
	// 				0,						// source y
	// 				this.spriteSizes[y].fullW,		// source width
	// 				this.spriteSizes[y].h,			// source height
	// 				x * gap,				// destination x
	// 				y * gap,				// destination y
	// 				this.spriteSizes[y].fullW,		// destination W
	// 				this.spriteSizes[y].h			// destination H
	// 			)
	// 		}
	// 		ctx.font = "10px Arial";
	// 		ctx.fillText(
	// 			` ↑ Sprite ${y-1}`,
	// 			0,
	// 			(y * gap) - gap/8)
	// 	}
	// 	return (function () {
	// 		console.clear();
	// 		return 'Hola zoy carl. aca estan todos los graficos q hace el game a partir de una imagen de mierda en greyscale. Las filas son las paletas y las columnas los distintos sprites'
	// 	})()
	// }
};