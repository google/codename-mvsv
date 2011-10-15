
function World() {
  this.tiles = [];
  this.actors = [];
  this.player = null;
  this.lastLoop = 0;
};

World.prototype.draw = function(container) {
  for (var i = 0; i < this.tiles.length; i++) {
    for (var j = 0; j < this.tiles[i].length; j++) {
      this.tiles[i][j].draw(container, i, j, this);
    }
  }
  for (var i = 0; i < this.actors.length; i++) {
    this.actors[i].draw(container);
  }
}

World.prototype.fire = function(x, y) {
  if (x > 0 && x < this.tiles.length &&
      y > 0 && y < this.tiles[x].length &&
      this.tiles[x][y].fire) {
    this.tiles[x][y].fire();
  }
  for (var i = 0; i < this.actors.length; i++) {
    if (this.actors[i].touch(x, y) && this.actors[i].fire) {
      this.actors[i].fire();
    }
  }
}

World.prototype.loop = function() {
  var now = new Date().getTime() / 1000.0;
  var delta = now - this.lastLoop;
  this.lastLoop = now;
  if (delta > C.maxStep) {
    setTimeout(this.loop.bind(this));
    return;
  }

  this.player.tick(delta);
  for (var i = 0; i < this.actors.length; i++) {
    this.actors[i].tick(delta, this);
  }
  for (var i = 0; i < this.tiles.length; i++) {
    for (var j = 0; j < this.tiles[i].length; j++) {
      if (this.tiles[i][j].tick) {
        this.tiles[i][j].tick(delta);
      }
    }
  }
  setTimeout(this.loop.bind(this));
};
