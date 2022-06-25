//////////////////////////
// POOL OF OBJECTS
//////////////////////////

class Pool {
	constructor(){
		// Where all pools will be stored:
		this.type = {};
		this.resources = [
			[1,		Player],
			[18,	PlayerBullet],
			[35,	EnemyBullet],
			[4, 	SinePop],
			[6, 	Sniper],
			[2, 	Fatty],
			[4, 	Tank],
			[2, 	Assaulter],
			[1, 	Item],
			[120,	Particle]
		]
	}
	needs(assets, gameObjects){
		// Used only when filling pools
		this._assets = assets;
		// Used to push free objects into game.objects
		this.gameObjects = gameObjects;
		// Fill pools
		this.resources.forEach(entityArr => this.fillWith(entityArr))
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
				this.type[entity][i].parentReset(parametersObj);
				this.gameObjects.get(location).push(this.type[entity][i]);
				return;
			};
		};
		// Unnecesary Delete this console log before build
		console.error(`Pool: No more free ${entity}(s)`);
	}
};