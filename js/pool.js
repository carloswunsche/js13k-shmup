//////////////////////////
// POOL OF OBJECTS (pretty much OK)
//////////////////////////

class Pool {
	constructor(){
		// Where all pools will be stored:
		this.type = {};
		this.resources = [
		// How many // Class // Graphic name
		// There are 51 graphics available
			[1,		Player,			4], // Player first so entities has access to AccessToPlayer class
			[9, 	Assaulter,		0],
			[9, 	Boat,			1],
			[9, 	Tank,			2],
			[9, 	Fatty,			3],
			[9, 	Sniper,			5],
			[9, 	SinePop,		6],
			[9, 	Item,			7],
			[18,	PlayerBullet,	8],
			[35,	EnemyBullet],
			[120,	Particle],
		]
	}
	needs(assets, gameObjects){
		// Used only when filling pools
		this.assets = assets;
		// Used to push free objects into game.objects
		this.gameObjects = gameObjects;
		// Fill pools (esto deberia estar dentro de un init(){})
		this.resources.forEach(poolData => this.fillWith(poolData))
	}
	fillWith([howMany, Entity, assetIndex]){
		this.type[Entity.name] = new Array(howMany).fill(0).map(() => 
			new Entity(this.assets[assetIndex])
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