//////////////////////////
// ASSETS
//////////////////////////

class Assets {
	constructor(dir, imageScaled) {
		// PNGs need to be scaled by 32x and optimized with tinypng.com
		this.imageScaled = imageScaled;
		this.dir = dir;
		this.filenames = {
			bg1: 'bg.png',
			player: 'player.png',
			playerBullet: 'pBullet.png',
			enemy: 'enemy.png',
		};

		this.load();
	}

	load() {
		// Get number of remaining images to be loaded
		let remaining = Object.keys(this.filenames).length;

		loopOver(this.filenames, (key, file) => {
			// Create a new property for each image
			this[key] = new Image();
			this[key].src = this.dir + file;

			// Scale down to intended size once loaded
			this[key].addEventListener('load', () => {
				this[key].width  /= this.imageScaled;
				this[key].height /= this.imageScaled;
				remaining--;
				// If all images have loaded
				if(remaining === 0) this.onCompletion()
			});
		});
	}

	onCompletion() {
		delete this.dir;
		delete this.filenames;
		assetsReady();
	}
};