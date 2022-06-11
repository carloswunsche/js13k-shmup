//////////////////////////
// POOL OF OBJECTS
//////////////////////////

class Pool {
	needs(assets, gameObjects, gameIteration){
		// Used only when filling pools
		this._assets = assets;
		// Used to push free objects into game.objects
		this.gameObjects = gameObjects;
		// Used for debugging only
		this.gameIteration = gameIteration;
	}
	fillWith(size, objClass){
		this[objClass.name] = new Array(size).fill(0).map(() => 
			new objClass(this._assets[objClass.name])
		);
	}
	getFreeObject(entity,type,par) {
		if (!this[entity]) return console.error(`Pool: Object "${entity}" not found (Game iteration #${this.gameIteration})`);
		let arrSize = this[entity].length;
		for (let i = 0; i < arrSize; i++) {
			if (this[entity][i].free) {
				this[entity][i].free = false;
				this[entity][i].reset(par);
				this.gameObjects.get(type).push(this[entity][i]);
				return;
			};
		};
		console.error(`Pool: No more free ${entity}(s) (Game iteration #${this.gameIteration})`);
	}
	releaseObject(obj){
		obj.free = true;
	}
	deleteUnused(){
		delete this._assets;
	}
};