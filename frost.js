function Frost() {
  this.freezing = false;
  this.frozen = 0;
  this.molten = 0;
  this.finished = false;
  this.finishedMelting = false;
  this.melting = false;
}

Frost.prototype.startFreezing = function() {
  if (!this.finishedFreezing) {
    this.freezing = true;
    this.frozen = 0;
    this.melting = false;
  }
}

Frost.prototype.startMelting = function() {
  if (!this.finishedMelting) {
    this.freezing = false;
    this.molten = 0;
    this.melting = true;
  }
}

Frost.prototype.stopFreezing = function() {
  this.freezing = false;
}

Frost.prototype.stopMelting = function() {
  this.melting = false;
}

Frost.prototype.tick = function(delta, x, y, world) {
  if (!this.freezing && !this.melting) return;
  if (this.freezing) {
    this.frozen += delta;
  
    if(this.frozen < Frost.timeActive) {
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
    }
    if (this.frozen > Fire.timeToFreeze) {
      this.finishedFreezing = true;
      this.freezing = false;
    }
  }
  if (this.melting) {
    this.molten += delta;
  
    if(this.molten < Frost.timeActive) {
      if (this.molten > Frost.timeToSpreadUp) {
	world.melt(x, y - 1);
      }
      if (this.molten > Frost.timeToSpreadSide) {
	world.melt(x + 1, y);
	world.melt(x - 1, y);
      }
      if (this.molten > Frost.timeToSpreadDown) {
	world.melt(x, y+1);
      }
    }
    if (this.molten > Fire.timeToFreeze) {
      this.melting = false;
      this.finishedMelting = true;
    }
  }
}

Frost.timeToSpreadUp = 3;
Frost.timeToSpreadSide = 3;
Frost.timeToSpreadDown = 3;
Frost.timeToFreeze = 0;
Frost.timeActive = 3.1;