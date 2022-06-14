//////////////////////////
// INPUT
//////////////////////////

class Input {
	constructor() {
		this.enabled = true;
		this.raw = new Array(6).fill(0);
		this.buttons = new Array(6).fill(0);

		this.inputHistory = [];
		this.savedInputs = localStorage.getItem('savedInputs') || [];
		this.savedInputs = typeof this.savedInputs === 'string' ? JSON.parse(this.savedInputs) : [];

		window.addEventListener('keydown', key => {
			this.updateRaw(key.code, this.raw, 1);
			// console.log(key.code)
		})
		window.addEventListener('keyup', key => {
			this.updateRaw(key.code, this.raw, 0);
		})
		window.addEventListener('visibilitychange', e => {
			if (e.target.visibilityState === 'hidden') {
				this.raw.fill(0);
			};
		})
	}

	updateRaw (keyCode, arr, pressed) {
		switch (keyCode) {
			case 'ArrowUp':   arr[0]  = pressed; return;
			case 'ArrowRight':arr[1]  = pressed; return;
			case 'ArrowDown': arr[2]  = pressed; return;
			case 'ArrowLeft': arr[3]  = pressed; return;
			case 'KeyZ':      arr[4]  = pressed; return;
			case 'KeyX':      arr[5]  = pressed; return;
		};
	}

	updateButtons () {
		if (!this.enabled) return this.buttons.fill(0);
		// Write state (1, 2, or 0) into this.buttons
		for (const i in this.raw) {
			if(this.raw[i] && this.buttons[i] < 2) this.buttons[i]++;
			if(!this.raw[i]) this.buttons[i] = 0;
		}
	}
};