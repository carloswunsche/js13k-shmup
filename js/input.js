//////////////////////////
// INPUT
//////////////////////////

class Input {
	constructor() {
		this.enabled = true;
		this.raw = new Array(6).fill(0);
		this.buttons = new Array(6).fill(0);

		// this.inputHistory = [];
		// this.savedInputs = localStorage.getItem('savedInputs') || [];
		// this.savedInputs = typeof this.savedInputs === 'string' ? JSON.parse(this.savedInputs) : [];

		window.addEventListener('keydown', key => {
			this.updateRaw(key.code, this.raw, 1);
			// console.log(key.code)
		})
		window.addEventListener('keyup', key => {
			this.updateRaw(key.code, this.raw, 0);
		})
		// Unnecesary ?
		window.addEventListener('visibilitychange', e => {
			if (e.target.visibilityState === 'hidden') {
				this.raw.fill(0);
			};
		})
	}

	updateRaw (keyCode, arr, pressed) {
		// Switch case es mas economico en bytes que if
		switch(keyCode){
			case 'ArrowUp':   return arr[0] = pressed;
			case 'ArrowRight':return arr[1] = pressed;
			case 'ArrowDown': return arr[2] = pressed;
			case 'ArrowLeft': return arr[3] = pressed;
			case 'KeyZ':      return arr[4] = pressed;
			// Ojo este boton no se esta usando
			case 'KeyX':      return arr[5] = pressed;
		}
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