function Player() {
  this.actor = null;

  this.magician = null;
  this.scientist = null;
  this.current = 'magician';

  this.jumpReady = true;
  this.jump = false;
  this.left = false;
  this.right = false;
  this.world = null;
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
  if (this.jump) {
    this.actor.jump();
    this.jump = false;
    this.jumpReady = false;
  }
  if (this.actor.actor.crashed) {
    this.actor.die();
  }
}

Player.prototype.switchCharacters = function() {
  if (this.current == 'magician') {
    this.current = 'scientist';
    this.actor = this.scientist;
  } else {
    this.current = 'magician';
    this.actor = this.magician;
  }
};

Player.prototype.specialAbility = function(which) {
  this.actor.specialAbility(which, this.world);
};

Player.prototype.keyDown = function(e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 9:
      this.switchCharacters();
      break;
    case 37:
      this.left = true;
      break;
    case 38: 
      if (this.jumpReady) this.jump = true;
      break;
    case 39:
      this.right = true;
      break;
    case 40:
      this.down = true;
      break;
    case 49:  // '1'
    case 50:
    case 51:
      this.specialAbility(e.keyCode - 49);
      break;
  }
};

Player.prototype.keyUp = function(e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 37:
      this.left = false;
      break;
    case 38: 
      this.jumpReady = true;
      break;
    case 39:
      this.right = false;
      break;
    case 40:
      this.down = false;
      break;
  }
};
