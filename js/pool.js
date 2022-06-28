//////////////////////////
// POOL OF OBJECTS (pretty much OK)
//////////////////////////

class Pool {
	constructor(){
		// Where all pools will be stored:
		this.type = {};
		this.resources = [
			[1,		Player],
			[18,	PlayerBullet],
			[35,	EnemyBullet],
			[9, 	SinePop],
			[9, 	Sniper],
			[9, 	Fatty],
			[9, 	Tank],
			[9, 	Assaulter],
			[9, 	Boat],
			[9, 	Item],
			[120,	Particle]
		]
	}
	needs(assets, gameObjects){
		// Used only when filling pools
		this._assets = assets;
		// Used to push free objects into game.objects
		this.gameObjects = gameObjects;
		// Fill pools (esto deberia estar dentro de un init(){})
		this.resources.forEach(entityArr => this.fillWith(entityArr))
	}
	fillWith([size, objClass]){
		this.type[objClass.name] = new Array(size).fill(0).map(() => 
			new objClass(this._assets[objClass.name])
		);
	}
	free(entity,resetPar) {
		let arrSize = this.type[entity].length;
		for (let i = 0; i < arrSize; i++) {
			if (this.type[entity][i].free) {
				this.type[entity][i].free = false;
				this.type[entity][i].parentReset(resetPar);
				this.gameObjects.get(this.type[entity][i].layer).push(this.type[entity][i]);
				return;
			};
		};
		// Unnecesary Delete this console log before build
		console.error(`Pool: No more free ${entity}(s)`);
	}
};