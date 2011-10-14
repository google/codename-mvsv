function Player() {
  this.actor = null;
}

Player.prototype.setUpEventHandlers = function() {
  document.body.addEventListener('keydown', this.keyDown.bind(this));
  document.body.addEventListener('keyup', this.keyUp.bind(this));
};

Player.prototype.tick = function(delta) {
  if (!this.actor) return;
  if (this.left) {
    this.actor.accelerate(-C.playerAcceleration * delta);
  }
  if (this.right) {
    this.actor.accelerate(C.playerAcceleration * delta);
  }
}

Player.prototype.keyDown = function(e) {
  switch (e.keyCode) {
    case 37:
      this.left = true;
      break;
    case 38: 
      this.up = true;
      break;
    case 39:
      this.right = true;
      break;
    case 40:
      this.down = true;
      break;
  }
};

Player.prototype.keyUp = function(e) {
  switch (e.keyCode) {
    case 37:
      this.left = false;
      break;
    case 38: 
      this.up = false;
      break;
    case 39:
      this.right = false;
      break;
    case 40:
      this.down = false;
      break;
  }
};
