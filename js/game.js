//////////////////////////
// GAME
//////////////////////////

class Game {
  constructor() {
    // Layers Guide
    // Change variable name to this.layers
    this.objects = new Map(
      Object.entries({
        Floor: [],
        E_Land: [],
        E_Air: [],
        Parts: [],
        Pickups: [],
        pBullets: [],
        Players: [],
        eBullets: [],
        Hud: [],
      })
    );
    this.queuedFns = [];
    this.sfxFlags = {};
    this.fade = {};
  }
  needs(customMath, stage, pool, input, displayHeight, audioPlayer) {
    // Custom math functions
    this.math = customMath;
    // To call level events and scroll background
    this.stage = stage;
    // To scroll background
    this.displayHeight = displayHeight;
    // To liberate objects when hp <= 0
    this.pool = pool;
    // To access buttons mainly
    this.input = input;
    // To play sounds
    this.audioPlayer = audioPlayer;
  }
  init() {
    /** Empty contents of this.objects map */
    for (const [_, arr] of game.objects) arr.length = 0;
    /** Misc */
    this.stopFlag = false;
    this.iteration = 0;
    this.queuedFns.length = 0;
    this.resetCounter = 0;

    // Collision stuff setup (si, hay que meterlos en un array si o si para que no se haga deep copy!)
    // "Sametype" array
    this.playersArr = [this.objects.get('Players')][0];
    this.pBulletsArr = [this.objects.get('pBullets')][0];
    // "Multi" Groups (can include multiple types in the same array)
    this.airHazardsGroup = [
      this.objects.get('E_Air'),
      this.objects.get('eBullets'),
    ];
    this.pickupsGroup = [this.objects.get('Pickups')];
    this.enemiesGroup = [this.objects.get('E_Air'), this.objects.get('E_Land')];

    // Fade stuff
    this.fade = {
      opacity: 100,
      color: '#000',
      dir: 'fadeOut',
      speed: 1,
      layer: 'top',
    };
  }
  updateFade(fade) {
    switch (fade.dir) {
      case 'fadeOut':
        if (fade.opacity >= 0) fade.opacity -= fade.speed;
        break;
      case 'fadeIn':
        if (fade.opacity <= 100) fade.opacity += fade.speed;
        break;
    }
    if (fade.opacity == 101 || fade.opacity == -1) fade.dir = 'none';
  }
  update() {
    // Update fade transparency
    this.updateFade(this.fade);

    // Gamepad to Raw input
    this.input.gamepadToRaw();

    // Update arr of pressed buttons
    this.input.updateButtons();

    // Current level events. If an events returns something, abort update (fixes bug of player dying)
    if (this.stage.events[this.iteration]() === 'stop') return;

    // Update Frame Counter
    this.iteration++;

    // Update Background Position
    this.scrollBackground(this.stage.bg.speed);

    // Run update function on each gameObject
    for (const [_, arr] of this.objects)
      arr.forEach(entity => this.updateEntity(entity));

    // At this point call functions inside queue (bullet and particle freeing)
    this.freeQueued();

    // Test for collisions between Player and airHazards
    this.testCollision(
      this.playersArr,
      this.airHazardsGroup,
      (player, hazard) => {
        hazard.hp = player.hp = 0;
        player.explode = true;
        // Sfx
        this.sfxFlags.die = true;
      }
    );

    // Test for collisions between PlayerBullets and Pickups
    this.testCollision(this.playersArr, this.pickupsGroup, (player, item) => {
      // Item dies and explodes
      item.hp = 0;
      item.explode = true;
      // Create a single particle with beheavior 2 (follows player)
      this.queuedFns.push([
        'Particle',
        { x: player.x, y: player.y, colors: item.colors, beheavior: 2 },
      ]);
      // Sfx
      this.sfxFlags.item = true;
    });

    // Test for collisions between pBullets and Enemies
    this.testCollision(
      this.pBulletsArr,
      this.enemiesGroup,
      (pBullet, enemy) => {
        // pBullet muere
        pBullet.hp = 0;
        // Enemy pierde HP y activa animacion de hitState
        enemy.hp--;
        enemy.hitState = 1;
        // Si el enemy evaluado murio en la colision, explotar y marcar flag de Sfx
        if (enemy.hp <= 0) {
          enemy.explode = true;
          this.sfxFlags.xplos = true;
        }
      }
    );

    // Handle entities if hp <= 0
    this.handleDeadEntities();

    // Call functions inside queue again (particle freeing)
    this.freeQueued();

    // Play sounds passing flags, then set all flags to false
    this.audioPlayer.playSfx(this.sfxFlags);
    for (const flag in this.sfxFlags) this.sfxFlags[flag] = false;

    // Reset game if player dies
    if (!this.playersArr[0]) {
      this.resetCounter++;
      if (this.resetCounter === 50) this.fade.dir = 'fadeIn';
      if (this.resetCounter === 150) debug.gameReset();
    }
  }
  testCollision(sametype, group, doSomethingWith) {
    // Si el array de una de las dos parties esta vacio, return now.
    if (!sametype.length) return;
    // Loopear sobre cada sametype (player o pBullets son los dos unicos casos que hay hasta ahora)
    for (let entity1 of sametype) {
      // Loopear sobre cada layer del grupo
      for (let layer of group) {
        // If entity1 is dead, break loop
        if (!entity1.hp) break;
        // Loopear sobre cada entity del layer
        for (let entity2 of layer) {
          // If entity2 is dead, skip it and test the next one.
          if (!entity2.hp) continue;

          // If collision
          if (this.collisionBetween(entity1, entity2)) {
            doSomethingWith(entity1, entity2);
            // Si entity1 murio, no chequear con nadie mas en este layer
            if (!entity1.hp) break;
          }
        }
      }
    }
  }
  collisionBetween(a, b) {
    return (
      b.hitbox[0] < a.hitbox[1] &&
      a.hitbox[0] < b.hitbox[1] &&
      b.hitbox[2] < a.hitbox[3] &&
      a.hitbox[2] < b.hitbox[3]
    );
  }
  scrollBackground(spd) {
    // Scroll background: move each row, wrap around and change pattern
    this.stage.bg.rows.forEach((_, y) => {
      // Move
      this.stage.bg.rows[y] += spd;

      // If row position is greater or equal than display height
      if (this.stage.bg.rows[y] >= this.displayHeight) {
        // Move to the top
        this.stage.bg.rows[y] -= this.displayHeight + this.stage.bg.tileSize;

        // If index is equal to last row AND if queue is full, activate changePattern flag
        // changePattern will remain true until all rows has been replaced in array
        if (
          y === this.stage.bg.rows.length - 1 &&
          this.stage.bg.queue.length >= this.stage.bg.tileQty
        ) {
          this.stage.bg.changePattern = true;
        }

        // If changePattern is true, change each next row for next pattern's row
        if (this.stage.bg.changePattern) {
          for (let tile = 0; tile < this.stage.bg.numCols; tile++) {
            let targetTile = tile + y * this.stage.bg.numCols;
            this.stage.bg.pattern[targetTile] = this.stage.bg.queue[targetTile];
          }
        }

        // If changePattern is true but index === 0, deactivate changePattern flag
        if (this.stage.bg.changePattern && !y) {
          this.stage.bg.changePattern = false;
          // Also delete 1 full pattern from queue
          this.stage.bg.queue.splice(
            0,
            this.stage.bg.numCols * this.stage.bg.rows.length
          );
        }
      }
    });
  }
  // Entities update function
  updateEntity(entity) {
    // General updates for all entities (start)
    entity.hitState = 0;
    // Allow 50 frames to pass on timer 7 and then set deadBound flag to true
    // 50 is a good number that allows Items to survive the top bound when "jumping" up
    if (entity.timerCount(50, 7)) entity.deadBound = true;
    // For entities that are dying now, keep calling killAnimation and return
    if (entity.dying) return entity.killAnimation();
    // Particular updateData
    entity.updateData?.(this.input.buttons);
    // Update position
    entity.updatePos?.(this.input.buttons);
    // Test for out of bounds (Player only)
    if (entity instanceof Player) entity.fixOutOfBounds();
    // Anything besides the player must be killed if out of bounds.
    if (entity.deadBound) this.testDeadBound(entity);
    // Every entity that is NOT a particle gets their hitbox updated
    if (entity.hitbox) entity.updateHitbox();
    // General updates for all entities (end)
    if (entity.opacity < 0) entity.opacity = 0;
  }
  testDeadBound(entity) {
    if (!entity.deadBound) return;

    if (
      entity.y >= entity.displayHeight + entity.height / 2 ||
      entity.y <= 0 - entity.height / 2 ||
      entity.x >= entity.displayWidth + entity.width / 2 ||
      entity.x <= 0 - entity.width / 2
    )
      entity.hp = 0;
  }
  // Killing entities
  handleDeadEntities() {
    for (const [_, arr] of this.objects) {
      for (let i = arr.length - 1; i > -1; i--) {
        // Si ya no tienen nada de hp, matarlos.
        if (arr[i].hp <= 0) this.kill(arr[i]);
        // Si tras la matanza hay entities que esten free...
        if (arr[i].free) {
          // Liberar item (will only happen if they have carryItem flag and if killed by collision)
          arr[i].releaseItem();
          // Sacar del array
          arr.splice(i, 1);
        }
      }
    }
  }
  kill(entity) {
    // Si entity ya se encuentra on it's kill Animation, return.
    if (entity.dying) return;

    // Enemies with flag killAnimation that have been killed by collision will not be free instantly but will go through an animation first.
    if (entity.killAnimation && entity.explode) return entity.killAnimation();

    // Para los demas: Si ha sido matado por colision, generar particulas de explosion (will only happen if they have explosionData)
    if (entity.explode) entity.spawnParticles(entity.explosionData());

    // In the case of the Player, it will be positioned far so that new eBullets will always go down
    if (entity instanceof Player) entity.positionFar();

    // Finally, all entities EXCEPT those with delayFree flag will be free NOW! Killing is done for these.
    entity.free = true;
  }
  // Freeing everything that's on the queue
  freeQueued() {
    this.queuedFns.forEach(parameters => this.pool.free(...parameters));
    this.queuedFns.length = 0;
  }
};
