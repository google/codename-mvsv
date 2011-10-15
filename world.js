
function World() {
  this.tiles = [];
  this.actors = [];
  this.player = null;
  this.lastLoop = 0;
  this.container = null;
};

World.prototype.draw = function(container) {
  this.container = container;
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
  for (var i = Math.floor(x); i <= Math.ceil(x); i++) 
    for (var j = Math.floor(y); j <= Math.ceil(y); j++)
      if (i > 0 && i < this.tiles.length &&
          j > 0 && j < this.tiles[i].length &&
          this.tiles[i][j].fire) {
        this.tiles[i][j].fire();
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
