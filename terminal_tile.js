function TerminalTile() {
  this.passible = true;
  this.time = Math.random();
}

TerminalTile.prototype.tick = function(delta) {
  var something = Utils.getAnimationStep(this.time, C.animStep, 8) + 1;
  this.time += delta;
  this.node.src = "gfx/terminal" + something + ".png";
}

TerminalTile.prototype.draw = function(container, x, y, world) {
  name = "terminal1.png";
  Tile.draw(this, container, x, y, name);
}

TerminalTile.prototype.hack = function() {
};
