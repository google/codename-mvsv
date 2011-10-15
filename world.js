
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

World.prototype.freeze = function(x, y) {
  for (var i = Math.floor(x); i <= Math.ceil(x); i++) 
    for (var j = Math.floor(y); j <= Math.ceil(y); j++)
      if (i > 0 && i < this.tiles.length &&
          j > 0 && j < this.tiles[i].length &&
          this.tiles[i][j].freeze) {
        this.tiles[i][j].freeze();
      }

  for (var i = 0; i < this.actors.length; i++) {
    if (this.actors[i].touch(x, y) && this.actors[i].freeze) {
      this.actors[i].freeze();
    }
  }
}

World.prototype.melt = function(x, y) {
  for (var i = Math.floor(x); i <= Math.ceil(x); i++) 
    for (var j = Math.floor(y); j <= Math.ceil(y); j++)
      if (i > 0 && i < this.tiles.length &&
          j > 0 && j < this.tiles[i].length &&
          this.tiles[i][j].melt) {
        this.tiles[i][j].melt();
      }

  for (var i = 0; i < this.actors.length; i++) {
    if (this.actors[i].touch(x, y) && this.actors[i].melt) {
      this.actors[i].melt();
    }
  }
}

World.prototype.loop = function() {
  if (this.shouldStop) return;
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

World.prototype.fail = function() {
  this.shouldStop = true;
  var loseDiv = document.createElement('div');
  loseDiv.className = 'lose';
  loseDiv.innerHTML = "He's dead Jim!";
  document.body.appendChild(loseDiv);
};

World.prototype.removeActor = function(actor) {
  for (var i = 0; i < this.actors.length; i++) {
    if (this.actors[i] != actor) continue;
    this.actors.splice(i, 1);
    if (actor.node) {
      actor.node.parentElement.removeChild(actor.node);
    }
  }  
};

