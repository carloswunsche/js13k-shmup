//////////////////////////
// INPUT
//////////////////////////

class Input {
	constructor() {
		this.enabled = true;
		// btn1,btn2,left,right,up,down,spdDown,spdUp,createEnemy,Run,Halt,Step
		this.raw = new Array(11).fill(false);
			// Btn1, Btn2, left,right,up,down
		this.game = new Array(6).fill(0);

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
		case 'KeyZ':      arr[0]  = pressed; return;
		case 'KeyX':      arr[1]  = pressed; return;
		case 'ArrowLeft': arr[2]  = pressed; return;
		case 'ArrowRight':arr[3]  = pressed; return;
		case 'ArrowUp':   arr[4]  = pressed; return;
		case 'ArrowDown': arr[5]  = pressed; return;
		case 'Minus':     arr[6]  = pressed; return;
		case 'Equal':     arr[7]  = pressed; return;
		case 'KeyC':      arr[8]  = pressed; return;
		case 'KeyR':      arr[9]  = pressed; return;
		case 'KeyH':      arr[10] = pressed; return;
		case 'KeyS':      arr[11] = pressed; return;
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

	getPlayerMovementData() {
		return {
			axis: this.getAxis(),
			amplitude: this.getAmplitude(),
		};
	}

	getAxis () {
		let arr = [0, 0];
		// X axis
		if (this.game[2]) arr[0] = -1;
		if (this.game[3]) arr[0] = 1;
		if (this.game[2] && this.game[3]) arr[0] = 0;
		// Y axis
		if (this.game[4]) arr[1] = -1;
		if (this.game[5]) arr[1] = 1;
		if (this.game[4] && arr[5]) arr[1] = 0;
		return arr;
	}

	getAmplitude() {
		return 	this.game[2] && this.game[4] || 
				this.game[2] && this.game[5] ||
				this.game[3] && this.game[4] || 
				this.game[3] && this.game[5] ? 0.707 : 1;
	}


};