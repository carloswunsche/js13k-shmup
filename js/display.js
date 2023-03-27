//////////////////////////
// DISPLAY (falta agregar los fades)
//////////////////////////

class Display {
  constructor() {
    this.width = 160;
    this.height = 120;
    this.tileSize = 8;
    this.tileQty = 320;

    this.c = document.querySelector('canvas');
    this.ctx = this.c.getContext('2d');

    this.hitboxes = false;
    this.setScaleAndResize();
    this.pixelatedLook(this.ctx);
    window.addEventListener('resize', () => {
      this.setScaleAndResize();
      this.pixelatedLook(this.ctx);
      this.render(stage.bg, game.objects, game.fade);
    });

    // Prevent scrolling with finger
    window.addEventListener('touchmove', e => e.preventDefault(), {
      passive: false,
    });
  }
  setScaleAndResize(forced) {
    // Set scale
    this.scale = M.min(
      M.trunc(window.innerWidth / this.width),
      M.trunc(window.innerHeight / this.height)
    );

    // REMOVE FROM FINAL BUILD
    // if (forced) this.scale = forced;

    // Resize
    this.c.width = this.scale * this.width;
    this.c.height = this.scale * this.height;
  }
  render(bg, gameObjects, fade) {

    this.renderBackground()
    // Render Background
    this.renderScrollingBg(bg);

    if (fade.layer === 'top') {
      // Regular order
      this.renderGameObjects(gameObjects);
      this.renderFade(fade);
    } else {
      // Reverse order
      this.renderFade(fade);
      this.renderGameObjects(gameObjects);
    }

    // Hitboxes REMOVE FROM FINAL BUILD
    if (this.hitboxes) this.renderHitboxes(gameObjects);
  }
  renderBackground(){
    this.ctx.fillStyle = '#0062c4';
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);
  }

  renderScrollingBg(bg) {
    let i = 0;
    bg.rows.forEach((_, y) => {
      let destY = bg.rows[y] * this.scale;
      for (let x = 0; x < this.width; x += this.tileSize) {
        // Para no renderizar al pedo el row que queda out of bounds (arriba)
        if (bg.rows[y] <= -this.tileSize) {i++;continue;}

        // Si es transparente, skippear
        if (bg.pattern[i] === 0) {i++;continue;}

        // Draw
        this.ctx.drawImage(
          bg.image,
          bg.pattern[i] * this.tileSize + (bg.image.width * bg.palette) -this.tileSize,
          0,
          this.tileSize,
          this.tileSize,
          x * this.scale,
          destY,
          this.tileSize * this.scale,
          this.tileSize * this.scale
        );
        // Update pattern index
        i++;
      }
    });
  }
  renderGameObjects(layers) {
    for (const [_, arr] of layers) {
      arr.forEach(entity => {
        // Save canvas' context state
        this.ctx.save();

        // Set object's opacity
        this.ctx.globalAlpha = entity.opacity / 100;

        // Translate canvas to render position
        this.ctx.translate(entity.x * this.scale, entity.y * this.scale);

        // Rotate
        this.ctx.rotate(entity.rotation);

        if (entity instanceof Particle || entity instanceof EnemyBullet) {
          this.ctx.fillStyle = entity.currentColor || '#fff';
          this.ctx.fillRect(
            -(entity.scale * this.scale) / 2,
            -(entity.scale * this.scale) / 2,
            entity.scale * this.scale,
            entity.scale * this.scale
          );
          this.ctx.restore();
        } else {
          // Draw
          this.ctx.drawImage(
            // Img
            entity.image,
            // Source x
            entity.image.sWidth * entity.palette,
            // Source y
            entity.image.height * entity.hitState,
            // Source width
            entity.image.sWidth,
            // Source height
            entity.image.height,
            // DestX (translate -50%), DestY (translate -50%), DestW, DestH
            -(entity.image?.sWidth * entity.scale * this.scale) / 2,
            -(entity.image?.height * entity.scale * this.scale) / 2,
            entity.image?.sWidth * entity.scale * this.scale,
            entity.image?.height * entity.scale * this.scale
          );

          // Undo opacity, translation and rotation
          this.ctx.restore();
        }
      });
    }
  }
  renderFade(fade) {
    // Immediate return if opacity is outside range
    if (fade.opacity < 0 || fade.opacity > 100) return;

    this.ctx.globalAlpha = fade.opacity / 100; // 1.0 ~ 0.0
    this.ctx.fillStyle = fade.color;
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);
    this.ctx.globalAlpha = 1; // Canvas globalAlpha fix
  }
  pixelatedLook(ctx) {
    // Used if scaling is done through JS
    ctx.mozImageSmoothingEnabled = 0;
    ctx.webkitImageSmoothingEnabled = 0;
    ctx.msImageSmoothingEnabled = 0;
    ctx.imageSmoothingEnabled = 0;
  }

  /**REMOVE FROM FINAL BUILD
   * Both renderHitBoxes and drawLine
   */
  renderHitboxes(gameObjects) {
    for (const [_, arr] of gameObjects) {
      arr.forEach(obj => {
        if (obj.hitbox) {
          // [0] = x1, [1] = x2, [2] = y1, [3] = y2
          this.drawLine(obj.hitbox[0], obj.hitbox[2], 'start', 'white');
          this.drawLine(obj.hitbox[1], obj.hitbox[2]);
          this.drawLine(obj.hitbox[1], obj.hitbox[3]);
          this.drawLine(obj.hitbox[0], obj.hitbox[3]);
          this.drawLine(obj.hitbox[0], obj.hitbox[2]);
        }
      });
    }
  }
  drawLine(x, y, start, color) {
    if (start) {
      this.ctx.strokeStyle = color;
      this.ctx.beginPath();
      this.ctx.moveTo(x * this.scale, y * this.scale);
      return;
    }
    this.ctx.lineTo(x * this.scale, y * this.scale);
    this.ctx.stroke();
  }
}
