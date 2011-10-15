function WoodenTile() {
  this.passible = false;
  this.burning = false;
  this.burned = 0;
  this.x = 0;
  this.y = 0;
  this.world = null;
  this.fireNode = null
}

WoodenTile.prototype.fire = function() {
  if (this.burned < WoodenTile.timeToBurn) {
    this.burning = true;
  }
}

WoodenTile.prototype.draw = function(container, x, y, world) {
  var name = "wall_wood_full.png";
  var topmost = false;
  this.x = x;
  this.y = y;
  this.world = world;
  if (world) {
    if (y == 0 || Utils.getObjectClass(world.tiles[x][y - 1]) != "WoodenTile" ) {
      topmost = true;
    }
    if (topmost) {
      name = "wall_wood_top.png";
    }
  }
  Tile.draw(this, container, x, y, name);
}

WoodenTile.prototype.tick = function(delta) {
  if (!this.burning) return;
  if (!this.fireNode) {
    var tmp = this.node;
    Tile.draw(this, this.node.parentElement, this.x, this.y, 'flame1.png');
    this.fireNode = this.node;
    this.node = tmp;
  }
  this.burned += delta;
  this.fireNode.src = 'gfx/flame' + (Utils.getAnimationStep(
      this.burned, WoodenTile.animStep, 5) + 1) + '.png';

  if (this.burned > WoodenTile.timeToSpreadUp) {
    this.world.fire(this.x, this.y - 1);
  }
  if (this.burned > WoodenTile.timeToSpreadSide) {
    this.world.fire(this.x + 1, this.y);
    this.world.fire(this.x - 1, this.y);
  }
  if (this.burned > WoodenTile.timeToBurn) {
    this.burning = false;
    this.passible = true;
    this.fireNode.parentElement.removeChild(this.fireNode);
    this.node.src = 'gfx/bg_gray.png';
  }
}

WoodenTile.timeToSpreadUp = 2;
WoodenTile.timeToSpreadSide = 8;
WoodenTile.timeToBurn = 30;
WoodenTile.animStep = 0.047;
