function TrapTile() {
  this.passible = true;
  this.frost_ = new Frost();
  this.melting = false;
  this.world = null;
  this.time = Math.random();
  this.frozen = false;
}

TrapTile.prototype.tick = function(delta) {
  this.time += delta;
  if (this.frost_.finished && this.frost_.freezing) {
    this.frost_.stopFreezing();
  }
  if (this.frost_.finishedMelting && this.fire_.melting) {
    this.fire_.stopMelting();
  }
  if (!this.frozen) {
    var something = Utils.getAnimationStep(this.time, C.animStep, 15) + 1;
    if (something > 8) {
      something = 16 - something;
    }
    this.node.src = "gfx/spike" + something + ".png";
  } else {
    this.node.src = "gfx/spike-frozen.png";
  }
    
  this.frost_.tick(delta, this.x, this.y, this.world);
}

TrapTile.prototype.draw = function(container, x, y, world) {
  Tile.draw(this, container, x, y, "spike1.png");
  this.world = world
}

TrapTile.prototype.actorAction = function(actor) {
  if (this.frozen) {
    return;
  }
  var name = Utils.getObjectClass(actor);
  if (name != "Scientist" && name != "Magician") return;
  actor.die();
}

TrapTile.prototype.freeze = function() {
  if (this.frozen) {
    return;
  }
  this.passible = true;
  this.frozen = true;
  this.node.src = "gfx/spike-frozen.png";
  this.frost_.startFreezing();
}

TrapTile.prototype.fire = function() {
  this.melt();
}

TrapTile.prototype.melt = function() {
  if (!this.frozen) {
    return true;
  }
  this.frost_.startMelting();
  this.frozen = false;
  this.passible = true;
  this.node.src = "gfx/spike1.png";
}
