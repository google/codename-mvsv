function Magician() {
  this.actor = new Actor();
  this.actor.width = 0.8;
  this.actor.height = 0.9;
  this.animTime = 0;
  this.fire_ = new Fire();
  this.jumpSound = new Audio('sfx/jump.mp3');
  this.fireSound = new Audio('sfx/fireball.mp3');
  this.snowSound = new Audio('throw_snowball.mp3');
}

Magician.prototype.touch = function(x, y) {
  return this.actor.touch(x, y);
}

Magician.prototype.fire = function() {
  this.fire_.start();
}

Magician.prototype.water = function() {
  if (this.fire_.burning) {
    this.fire_.stop();
    this.fire_ = new Fire();
  }
}
Magician.prototype.destroy = function() {
  this.die();
}

Magician.prototype.die = function() {
    this.node.src = 'gfx/player_dead.png';
    var die_scream = new Audio('sfx/dying_scream.mp3');
    die_scream.play();
    world.fail();
};

Magician.prototype.accelerate = function(x) {
  this.actor.accelerate(x);
};

Magician.prototype.tick = function(delta, world) {
  this.actor.tick(delta, world);
  this.fire_.tick(delta, this.actor.x, this.actor.y, world);
  this.node.style.top = this.actor.y * C.size + 'px';
  this.node.style.left = this.actor.x * C.size + 'px';
  this.animTime += delta;
  if (this.actor.speed != 0) {
    var src = 'gfx/magician_';
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

Magician.prototype.draw = function(container) {
  if (this.node) {
    this.node.parentElement.removeChild(this.node);
  }
  this.node = document.createElement('img');
  this.node.style.top = this.actor.y * C.size + 'px';
  this.node.style.left = this.actor.x * C.size + 'px';
  this.node.src = 'gfx/magician_ltor1.png';
  this.node.className = 'magician';
  container.appendChild(this.node);
};

Magician.prototype.jump = function() {
  if (this.actor.vspeed == 0) {
    this.actor.vspeed += C.jumpBoost;
    this.jumpSound.play();
  }
};

Magician.prototype.specialAbility = function(which, world) {
  switch (which) {
    case 0:
      this.fireAbility(world);
      this.meltAbility(world);
      break;
    case 1:
      this.snowAbility(world);
      this.freezeAbility(world);
      break;
  } 
};

Magician.prototype.snowAbility = function(world) {
    var ball = new SnowBall();
    world.actors.push(ball);
    ball.actor.direction = this.actor.direction;
    ball.actor.x = this.actor.x + this.actor.direction;
    ball.actor.y = this.actor.y;
    ball.world = world;
    ball.accelerate(this.actor.direction);
    ball.draw(world.container);
    this.snowSound.play();
}

Magician.prototype.fireAbility = function(world) {
  var ball = new FireBall();
  world.actors.push(ball);
  ball.actor.direction = this.actor.direction;
  ball.actor.x = this.actor.x + this.actor.direction;
  ball.actor.y = this.actor.y;
  ball.world = world;
  ball.accelerate(this.actor.direction);
  ball.draw(world.container);
  this.fireSound.play();
};

Magician.prototype.freezeAbility = function(world) {
  var targetX = 0;
  var targetY = Math.floor(this.actor.y);
  if (this.actor.direction > 0) {
    targetX = Math.ceil(this.actor.x) + 1;
  } else {
    targetX = Math.floor(this.actor.x) - 1;
  }
  world.freeze(targetX, targetY); 
};

Magician.prototype.meltAbility = function(world) {
  var targetX = 0;
  var targetY = Math.floor(this.actor.y);
  if (this.actor.direction > 0) {
    targetX = Math.ceil(this.actor.x) + 1;
  } else {
    targetX = Math.floor(this.actor.x) - 1;
  }
  world.melt(targetX, targetY); 
};
