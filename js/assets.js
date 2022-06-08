//////////////////////////
// ASSETS
//////////////////////////

class Assets {
	constructor(dir, imageScaled, onLoadFn) {
		// PNGs need to be scaled by 9x minimum and optimized with tinypng.com
		this.imageScaled = imageScaled;
		this.dir = dir;
		this.filenames = {
			bg1: 'download.png',
			player: 'player.png',
			playerBullet: 'pBullet.png',
			enemy: 'enemy.png',
		};

		this.load(onLoadFn);
	}

	load(onLoadFn) {
		// Get number of remaining images to be loaded
		let remaining = Object.keys(this.filenames).length;

		loopOver(this.filenames, (key, file) => {
			// Create a new property for each image
			this[key] = new Image();
			this[key].src = this.dir + file;

			this[key].addEventListener('load', () => {
				// Scale down to intended size once loaded
				this[key].width  /= this.imageScaled;
				this[key].height /= this.imageScaled;
				remaining--;
				// If all images have loaded...
				if(remaining === 0) onLoadFn();
			});
		});
	}
};