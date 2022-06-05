//////////////////////////
// POOL OF OBJECTS
//////////////////////////

class Pool {
	constructor(assets, gameObjects) {
		this.gameObjects = gameObjects;
		this.createPool(10, 'playerBullet', assets)
		this.createPool(5, 'enemy', assets)
		// this.createPool(2, 'enemyBullet', assets)
	}
	createPool(size, name, assets){
		this[name] = new Array(size).fill(0).map(() => this.createObject(name, assets));
	}
	createObject(name, assets){
		if (name === 'playerBullet') return new PlayerBullet(assets[name]);
		if (name === 'enemy') return new Enemy(assets[name]);
		if (name === 'enemyBullet') return new EnemyBullet(assets[name]);
	}
	getFreeObject(name,a,b,c,d,e) {
		let arrSize = this[name].length;
		for (let i = 0; i < arrSize; i++) {
			if (this[name][i].free) {
				this[name][i].free = false;
				this[name][i].reset(a,b,c,d,e);
				this.gameObjects[name].push(this[name][i]);
				return;
			};
		};
		// debug
		console.error(`No more free of "${name}" (Game iteration #${game.iteration})`);
	}
	releaseObject(obj){obj.free = true;}
};