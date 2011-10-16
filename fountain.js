function FountainTile() {
  this.passible = true;
  this.frost_ = new Frost();
  this.frozen = false;
  this.x = 0;
  this.y = 0;
  this.world = null;
  FountainTile.bgMusic.play();
}
FountainTile.bgMusic = new Audio('sfx/water.mp3');
FountainTile.bgMusic.loop = true;
FountainTile.prototype.draw = function(container, x, y, world) {
  this.x = x;
  this.y = y;
  this.world = world;
  if (!this.frozen) {
    name = "fountain.png";
  } else {
    name = "fountain_frozen.png";
  }
  Tile.draw(this, container, x, y, name);
}

FountainTile.prototype.tick = function(delta) {
  if (this.frost_.finished && this.frost_.freezing) {
    this.frost_.stopFreezing();
  }
  if (this.frost_.finishedMelting && this.fire_.melting) {
    this.fire_.stopMelting();
  }
  this.frost_.tick(delta, this.x, this.y, this.world);
}

FountainTile.prototype.freeze = function() {
  if (this.frozen) {
    return;
  }
  FountainTile.bgMusic.pause();
  this.frozen = true;
  this.passible = false;
  this.node.src = "gfx/fountain_frozen.png";
  this.frost_.startFreezing();
}

FountainTile.prototype.fire = function() {
  this.melt();
}

FountainTile.prototype.melt = function() {
  if (!this.frozen) {
    return;
  }
  FountainTile.bgMusic.play();
  this.frozen = false;
  this.passible = true;
  this.frost_.startMelting();
  this.node.src = "gfx/fountain.png";
}
