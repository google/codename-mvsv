function Frost() {
  this.freezing = false;
  this.frozen = true;
  this.finished = false;
}

Frost.prototype.start = function() {
  if (!this.finished) {
    this.freezing = true;
  }
}

Frost.prototype.stop = function() {
  this.freezing = false;
}

Frost.prototype.tick = function(delta, x, y, world) {
  if (!this.freezing) return;

  this.frozen += delta;
 
  if (this.frozen > Frost.timeToSpreadUp) {
    world.freeze(x, y - 1);
  }
  if (this.frozen > Frost.timeToSpreadSide) {
    world.freeze(x + 1, y);
    world.freeze(x - 1, y);
  }
  if (this.frozen > Frost.timeToSpreadDown) {
    world.freeze(x, y+1);
  }
  if (this.frozen > Fire.timeToFreeze) {
    this.finished = true;
  }
}

Frost.timeToSpreadUp = 3;
Frost.timeToSpreadSide = 3;
Frost.timeToSpreadDown = 3;
Frost.timeToFreeze = 20;
