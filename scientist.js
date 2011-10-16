function Scientist() {
  this.actor = new Actor();
  this.actor.width = 0.5;
  this.actor.height = 0.9;
  this.animTime = 0;
  this.dynamite = 1;

  this.fire_ = new Fire();
  this.jumpSound = new Audio('sfx/jump.mp3');
  this.hackingSound = new Audio('sfx/type_on_terminal.mp3');
  this.noSound = new Audio('sfx/no1.mp3');
  this.world = null;
}

Scientist.prototype.touch = function(x, y) {
  return this.actor.touch(x, y);
}

Scientist.prototype.fire = function() {
  this.fire_.start();
}

Scientist.prototype.destroy = function() {
  this.die();
}

Scientist.prototype.freeze = function() {
  if (this.fire_.burning) {
    this.water();
  }
}

Scientist.prototype.water = function() {
  if (this.fire_.burning) {
    this.fire_.stop();
    this.fire_ = new Fire();
  }
}

Scientist.prototype.die = function() {
    this.node.src = 'gfx/player_dead.png';
    var die_scream = new Audio('sfx/dying_scream.mp3');
    die_scream.play();
    world.fail();
};

Scientist.prototype.accelerate = function(x) {
  this.actor.accelerate(x);
};

Scientist.prototype.tick = function(delta, world) {
  if (!this.hackingSound.paused && !this.hackingSound.ended) return;
  this.actor.tick(delta, world);
  this.fire_.tick(delta, this.actor.x, this.actor.y, world);
  this.node.style.top = this.actor.y * C.size + 'px';
  this.node.style.left = this.actor.x * C.size - 8 + 'px';
  this.animTime += delta;
  if (this.actor.speed != 0) {
    var src = 'gfx/scientist_';
    if (this.actor.direction > 0) {
      src += 'ltor';
    } else {
      src += 'rtol';
    }
    src += Utils.getAnimationStep(this.actor.animTime, C.animStep, 2) + 1;
    src += '.png';
    this.node.src = src;
  }
  if (this.fire_.finished && this.fire_.burning) {
    this.die();
  }
  this.tile = world.tiles[Math.round(this.actor.x)][Math.round(this.actor.y)];
  if (this.tile.actorAction) {
    this.tile.actorAction(this);
  }
};

Scientist.prototype.draw = function(container) {
    if (this.node) {
    this.node.parentElement.removeChild(this.node);
  }
  this.node = document.createElement('img');
  this.node.style.top = this.actor.y * C.size + 'px';
  this.node.style.left = this.actor.x * C.size + 'px';
  this.node.src = 'gfx/scientist_ltor1.png';
  this.node.className = 'magician';
  container.appendChild(this.node);
};

Scientist.prototype.jump = function() {
  if (this.actor.vspeed == 0) {
    this.actor.vspeed += C.jumpBoost;
    this.jumpSound.play();
  }
};

Scientist.prototype.specialAbility = function(which, world) {
  switch (which) {
    case 0:
      this.hackAbility();
      break;
    case 1:
      this.demolitionAbility();
      break;
  };
};

Scientist.prototype.hackAbility = function() {
  if (!this.tile || !this.tile.hack) {
    this.noSound.play();
    return;
  }
  this.hackingSound.play();
  this.node.src = 'gfx/scientist_hacking.png';
  this.tile.hack();
};

Scientist.prototype.demolitionAbility = function() {
  if (!this.dynamite || this.dynamite < 1) {
    this.noSound.play();
    return;
  }
  this.dynamite--;
  var dynamite = new Dynamite();
  dynamite.actor.x = this.actor.x;
  dynamite.actor.y = this.actor.y;
  dynamite.speed = this.speed;
  dynamite.draw(this.world.container, dynamite.actor.x, dynamite.actor.y, this.world);
  this.world.actors.push(dynamite);
};
