//////////////////////////
// INPUT gamebuttons deberia estar dentro de game.js
//////////////////////////

class Input {
	constructor() {
		this.enabled = true;
		this.raw = new Array(5).fill(0);
		this.buttons = new Array(5).fill(0);
		this.analogAxis = [0,0]

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

		// Touch: Shot button
		let shotBtn = document.querySelector('.shot-btn');	
		shotBtn.addEventListener('touchstart', e=>this.updateRaw('KeyZ', this.raw, 1))
		shotBtn.addEventListener('touchend', e=>this.updateRaw('KeyZ', this.raw, 0))

		// Touch: Analog
		let analog = document.querySelector('.analog');
		analog.addEventListener('touchmove', e=>{
			this.analogAxis[0] = (e.targetTouches[0].clientX-e.targetTouches[0].target.offsetLeft-(e.targetTouches[0].target.clientWidth/2));
			this.analogAxis[1] = (e.targetTouches[0].clientY-e.targetTouches[0].target.offsetTop-(e.targetTouches[0].target.clientHeight/2));
			
			if (this.analogAxis[0] <= -25) this.raw[3] = 1;
			if (this.analogAxis[0] >= 25)  this.raw[1] = 1;
			if (this.analogAxis[0] > -25 && this.analogAxis[0] < 25) {this.raw[3] = this.raw[1] = 0}

			if (this.analogAxis[1] <= -25) this.raw[0] = 1;
			if (this.analogAxis[1] >= 25)  this.raw[2] = 1;
			if (this.analogAxis[1] > -25 && this.analogAxis[1] < 25) {this.raw[0] = this.raw[2] = 0}
		})

		analog.addEventListener('touchend', e=>this.raw.splice(0,4,...[0,0,0,0]))


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
			// case 'KeyX':      return arr[5] = pressed;
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