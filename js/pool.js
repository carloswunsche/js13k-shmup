//////////////////////////
// POOL OF OBJECTS
//////////////////////////

class Pool {
	needs(assets, gameObjects, gameIteration){
		this._assets = assets;
		this._gameObjects = gameObjects;
		this._gameIteration = gameIteration;
	}
	fillWith(size, objClass){
		this[objClass.name] = new Array(size).fill(0).map(() => 
			new objClass(this._assets[objClass.name])
		);
	}
	getFreeObject(objClass,a,b,c,d,e) {
		let name = objClass.name;
		if (!this[name]) return console.error(`Pool: Object "${name}" not found (Game iteration #${this._gameIteration})`);
		let arrSize = this[name].length;
		for (let i = 0; i < arrSize; i++) {
			if (this[name][i].free) {
				this[name][i].free = false;
				this[name][i].reset(a,b,c,d,e);
				this._gameObjects[name].push(this[name][i]);
				return;
			};
		};
		console.error(`Pool: No more free ${name}(s) (Game iteration #${this._gameIteration})`);
	}
	releaseObject(obj){obj.free = true;}
	deleteUnused(){
		delete this._assets;
	}
};