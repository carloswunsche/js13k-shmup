//////////////////////////
// POOL OF OBJECTS
//////////////////////////

class Pool {
	constructor(initialSize, assets) {
		this.poolArray = new Array(initialSize)
		.fill(0) // Preallocation
		.map(() => this.createObject(assets)) // Populating
		this.arrSize = this.poolArray.length;
	}
	createObject(assets){
		return this.free(new PlayerBullet(assets.pBullet))
	}
	free(obj){
		obj.free = true;
		return obj;
	}
	unFreeAll(){
		for (let i = 0; i < this.arrSize; i++) {
			this.poolArray[i].free = false;
		};
	}
	getFreeObject(array,a,b,c,d,e) {
		for (let i = 0; i < this.arrSize; i++) {
			if (this.poolArray[i].free) {
				this.poolArray[i].free = false;
				this.poolArray[i].reset(a,b,c,d,e);
				array.push(this.poolArray[i]);
				return;
			};
		};
	}
};