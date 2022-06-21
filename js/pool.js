//////////////////////////
// POOL OF OBJECTS
//////////////////////////

class Pool {
	constructor(){
		// Where all pools will be stored:
		this.type = {};
	}
	needs(assets, gameObjects){
		// Used only when filling pools
		this._assets = assets;
		// Used to push free objects into game.objects
		this.gameObjects = gameObjects;
	}
	fillWith([size, objClass]){
		this.type[objClass.name] = new Array(size).fill(0).map(() => 
			new objClass(this._assets[objClass.name])
		);
	}
	free(entity,location,parametersObj) {
		let arrSize = this.type[entity].length;
		for (let i = 0; i < arrSize; i++) {
			if (this.type[entity][i].free) {
				this.type[entity][i].free = false;
				this.type[entity][i].reset(parametersObj);
				this.gameObjects.get(location).push(this.type[entity][i]);
				return;
			};
		};
		// Unnecesary Delete this console log before build
		console.error(`Pool: No more free ${entity}(s)`);
	}
};