//////////////////////////
// INPUT
//////////////////////////

class Input {
	constructor() {
		this.enabled = true;
		// btn1,btn2,left,right,up,down,spdDown,spdUp,createEnemy,Run,Halt,Step
		this.raw = new Array(6).fill(false);
			// Btn1, Btn2, left,right,up,down
		this.game = new Array(6).fill(0);

		this.history = []
		this.saved = localStorage.getItem('savedInputs') || [];
		this.saved = typeof this.saved === 'string' ? JSON.parse(this.saved) : [];

		window.addEventListener('keydown', key => {
			this.updateArray(key.code, this.raw, true);
			// console.log(key.code)
		});
		window.addEventListener('keyup', key => {
			this.updateArray(key.code, this.raw, false);
		});
	}

	updateArray (keyCode, arr, pressed) {
		switch (keyCode) {
			case 'ArrowUp':   arr[0]  = pressed; return;
			case 'ArrowRight':arr[1]  = pressed; return;
			case 'ArrowDown': arr[2]  = pressed; return;
			case 'ArrowLeft': arr[3]  = pressed; return;
			case 'KeyZ':      arr[4]  = pressed; return;
			case 'KeyX':      arr[5]  = pressed; return;
		};
	}

	rawToGame () {
		if (!this.enabled) return this.game.fill(0);
		// Write state (1, 2, or 0) into this.game
		for (const i in this.raw) {
			if(this.raw[i] && this.game[i] < 2) this.game[i]++;
			if(!this.raw[i]) this.game[i] = 0;
		};
	}

	playerInputData() {
		return {
			axis: this.getAxis(),
			inputGame: this.game,
		};
	}

	getAxis () {
		let arr = [0, 0];
		// X axis
		if (this.game[3]) arr[0] = -1;
		if (this.game[1]) arr[0] = +1;
		if (this.game[3] && this.game[1]) arr[0] = 0;
		// Y axis
		if (this.game[0]) arr[1] = -1;
		if (this.game[2]) arr[1] = +1;
		if (this.game[0] && arr[2]) arr[1] = 0;
		return arr;
	}

};