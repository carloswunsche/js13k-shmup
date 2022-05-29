//////////////////////////
// ASSETS
//////////////////////////

class LoadAssets {
	constructor(call) {
		// PNGs need to be scaled by 32x and optimized with tinypng.com
		this.imageScaled = 32;
		this.dir = 'img/';
		this.filenames = {
			bg1: 'bg.png',
			player: 'player.png',
			pBullet: 'pBullet.png',
			enemy: 'enemy.png',
		};

		this.load(this.imageScaled, call);
	}

	load(imageScaled, call) {
		let remaining = Object.keys(this.filenames).length;
		for (const [key, file] of Object.entries(this.filenames)) {
			this[key] = new Image();
			this[key].src = this.dir + file;

			// Scale back to intended size once loaded
			this[key].addEventListener('load', () => {
				this[key].width  /= imageScaled;
				this[key].height /= imageScaled;
				remaining--;
				// If all images have loaded
				if(remaining === 0) this.onCompletion(call)
			});
		};
	}

	onCompletion(call) {
		delete this.dir;
		delete this.filenames;
		call.game.setup(1);
		call.engine.start();
	}
}