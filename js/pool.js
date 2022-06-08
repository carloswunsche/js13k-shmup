//////////////////////////
// POOL OF OBJECTS
//////////////////////////

class Pool {
	init(assets, gameObjects){
		this.gameObjects = gameObjects;
		this.assets = assets;
		this.create(10, 'playerBullet')
		this.create(5, 'enemy')
	}
	create(size, name){
		this[name] = new Array(size).fill(0).map(() => this.createObject(name));
	}
	createObject(name){
		if (name === 'playerBullet') return new PlayerBullet(this.assets[name]);
		if (name === 'enemy') return new Enemy(this.assets[name]);
		if (name === 'enemyBullet') return new EnemyBullet(this.assets[name]);
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
		// Debug
		console.error(`Pool: No more free "${name}"s (Game iteration #${game.iteration})`);
	}
	releaseObject(obj){obj.free = true;}
};