
function World() {
  this.tiles = [];
  this.actors = [];
  this.player = null;
  this.lastLoop = 0;
};

World.prototype.draw = function(container) {
  for (var i = 0; i < this.tiles.length; i++) {
    for (var j = 0; j < this.tiles[i].length; j++) {
      this.tiles[i][j].draw(container, i, j);
    }
  }
  for (var i = 0; i < this.actors.length; i++) {
    this.actors[i].draw(container);
  }
}

World.prototype.loop = function() {
  var now = new Date().getTime() / 1000.0;
  var delta = now - this.lastLoop;
  if (delta > C.maxStep) delta = C.maxStep;
  this.lastLoop = now;

  this.player.tick(delta);
  for (var i = 0; i < this.actors.length; i++) {
    this.actors[i].tick(delta);
  }
  setTimeout(this.loop.bind(this));
};
