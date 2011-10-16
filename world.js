
function World() {
  this.tiles = [];
  this.actors = [];
  this.player = null;
  this.lastLoop = 0;
  this.container = null;
  this.winSound = new Audio('sfx/exit_level.mp3');
  this.bgMusic = new Audio('sfx/TheValley.mp3');
  this.bgMusic.play();
  this.bgMusic.lopp = true;
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
  var used = false;
  for (var i = Math.floor(x); i <= Math.ceil(x); i++) 
    for (var j = Math.floor(y); j <= Math.ceil(y); j++)
      if (i > 0 && i < this.tiles.length &&
          j > 0 && j < this.tiles[i].length &&
          this.tiles[i][j].fire) {
        this.tiles[i][j].fire();
        used = true;
      }

  for (var i = 0; i < this.actors.length; i++) {
    if (this.actors[i].touch(x, y) && this.actors[i].fire) {
      this.actors[i].fire();
      used = true;
    }
  }
  return used;
}

World.prototype.freeze = function(x, y) {
  var used = false;
  for (var i = Math.floor(x); i <= Math.ceil(x); i++) 
    for (var j = Math.floor(y); j <= Math.ceil(y); j++)
      if (i > 0 && i < this.tiles.length &&
          j > 0 && j < this.tiles[i].length &&
          this.tiles[i][j].freeze) {
        this.tiles[i][j].freeze();
        used = true;
      }

  for (var i = 0; i < this.actors.length; i++) {
    if (this.actors[i].touch(x, y) && this.actors[i].freeze) {
      this.actors[i].freeze();
      used = true;
    }
  }
  return used;
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

World.prototype.win = function() {
  this.shouldStop = true;
  this.winSound.play();
  var winDiv = document.createElement('div');
  winDiv.className = 'win';
  winDiv.innerHTML = "The Science of Magic <br> and <br>The Magic of Science<br> " +
      "congratulate <br> you for your achievement!";
  var nextLink = document.getElementById('next').innerHTML;
  winDiv.innerHTML += '<a href="' + nextLink + '">Next</a>';
  
  document.body.appendChild(winDiv);
}

World.prototype.removeActor = function(actor) {
  for (var i = 0; i < this.actors.length; i++) {
    if (this.actors[i] != actor) continue;
    this.actors.splice(i, 1);
    if (actor.node) {
      actor.node.parentElement.removeChild(actor.node);
    }
  }  
};

World.prototype.replaceTile = function(x, y, newTile) {
  var container = this.tiles[x][y].node.parentElement;
  container.removeChild(this.tiles[x][y].node);
  this.tiles[x][y] = newTile;
  newTile.draw(container, x, y, this);
};

World.prototype.destroy = function(x, y) {
  for (var i = Math.max(0, Math.floor(x - C.dynamiteRadius));
       i <= Math.min(this.tiles.length - 1, Math.floor(x + C.dynamiteRadius)); i++)
    for (var j = Math.max(0, Math.floor(y - C.dynamiteRadius));
         j <= Math.min(this.tiles[i].length - 1,
                       Math.floor(y + C.dynamiteRadius)); j++) {
      var newTile = new FreeTile();
      this.replaceTile(i, j, newTile);
      for (var k = 0; k < this.actors.length; k++) {
        if (this.actors[k].touch(i, j) && this.actors[k].destroy) {
          this.actors[k].destroy();
        }
      }
    }
};
