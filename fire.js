function Fire() {
  this.fireNode = null;
  this.burning = false;
  this.burned = true;
  this.fireNode = null;
  this.finished = false;
}

Fire.prototype.start = function() {
  if (!this.finished) {
    this.burning = true;
  }
}

Fire.prototype.stop = function() {
  this.burning = false;
  if (this.fireNode)
    this.fireNode.parentElement.removeChild(this.fireNode);
}

Fire.prototype.tick = function(delta, x, y, world) {
  if (!this.burning) return;
  if (!this.fireNode) {
    Tile.draw(this, world.container, x, y, 'flame1.png');
    this.fireNode = this.node;
    delete this.node;
  }
  this.burned += delta;
  
  this.fireNode.src = 'gfx/flame' + (Utils.getAnimationStep(
      this.burned, Fire.animStep, 5) + 1) + '.png';

  if (this.burned > Fire.timeToSpreadUp) {
    world.fire(x, y - 1);
  }
  if (this.burned > Fire.timeToSpreadSide) {
    world.fire(x + 1, y);
    world.fire(x - 1, y);
  }
  if (this.burned > Fire.timeToBurn) {
    this.finished = true;
  }
}

Fire.timeToSpreadUp = 3;
Fire.timeToSpreadSide = 5;
Fire.timeToBurn = 20;
Fire.animStep = 0.047;
