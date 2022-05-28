//////////////////////////
// ASSETS
//////////////////////////

class Assets {
  #dir = 'img/';
  // PNGs need to be scaled by 32x and optimized with tinypng.com
  #filenames = {
    bg1: 'bg.png',
    player: 'player.png',
    pBullet: 'pBullet.png',
    enemy: 'enemy.png',
  };

  constructor(fns) {
    let remaining = Object.keys(this.#filenames).length;

    for (const [entity, png] of Object.entries(this.#filenames)) {
      this[entity] = new Image();
      this[entity].src = this.#dir+png;

      this[entity].addEventListener('load', () => {
        this[entity].width  /= 32;
        this[entity].height /= 32;
        remaining--;
        if(remaining === 0) fns.start();
      });
    };
  }
}