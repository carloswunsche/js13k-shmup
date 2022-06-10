//////////////////////////
// INPUT
//////////////////////////

class Input {
	constructor() {
		this.enabled = true;
		this.raw = new Array(6).fill(false);
		this.buttons = new Array(6).fill(0);

		this.inputHistory = [];
		this.savedInputs = localStorage.getItem('savedInputs') || [];
		this.savedInputs = typeof this.savedInputs === 'string' ? JSON.parse(this.savedInputs) : [];

		window.addEventListener('keydown', key => {
			this.updateRaw(key.code, this.raw, true);
			// console.log(key.code)
		})
		window.addEventListener('keyup', key => {
			this.updateRaw(key.code, this.raw, false);
		})
		window.addEventListener('visibilitychange', e => {
			if (e.target.visibilityState === 'hidden') {
				this.raw.fill(false);
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

	// Fix this. This axis is only used for easily moving the player but nothing else
	// Player should be provided with input.game to calculate this tool for itself
	playerInputData() {
		return {
			axis: this.getAxis(),
			buttons: this.buttons,
		};
	}

	getAxis () {
		let arr = [0, 0];
		// X axis
		if (this.buttons[3]) arr[0] = -1;
		if (this.buttons[1]) arr[0] = +1;
		if (this.buttons[3] && this.buttons[1]) arr[0] = 0;
		// Y axis
		if (this.buttons[0]) arr[1] = -1;
		if (this.buttons[2]) arr[1] = +1;
		if (this.buttons[0] && arr[2]) arr[1] = 0;
		return arr;
	}
};