function Magician() {
  this.actor = new Actor();
  this.animTime = 0;

  this.burning = false;
  this.burned = 0;
}

Magician.prototype.touch = function(x, y) {
  return this.actor.touch(x, y);
}

Magician.prototype.fire = function() {
  this.burning = true;
}

Magician.prototype.accelerate = function(x) {
  this.actor.accelerate(x);
};

Magician.prototype.tick = function(delta, world) {
  this.actor.tick(delta, world);
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
  }
};

Magician.prototype.specialAbility = function(which, world) {
  switch (which) {
    case 0:
      this.fireAbility(world);
      break;
  } 
};

Magician.prototype.fireAbility = function(world) {
  var targetX = 0;
  var targetY = Math.floor(this.actor.y);
  if (this.actor.direction > 0) {
    targetX = Math.ceil(this.actor.x) + 1;
  } else {
    targetX = Math.floor(this.actor.x) - 1;
  }
  world.fire(targetX, targetY); 
};
