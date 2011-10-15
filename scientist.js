function Scientist() {
  this.actor = new Actor();
  this.animTime = 0;
}

Scientist.prototype.touch = function(x, y) {
  return this.actor.touch(x, y);
}

Scientist.prototype.fire = function() {
  alert("He's dead Jim!");
}

Scientist.prototype.accelerate = function(x) {
  this.actor.accelerate(x);
};

Scientist.prototype.tick = function(delta, world) {
  this.actor.tick(delta, world);
  this.node.style.top = this.actor.y * C.size + 'px';
  this.node.style.left = this.actor.x * C.size + 'px';
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
  }
};

Scientist.prototype.specialAbility = function(which, world) {
  alert('Not implemented.');
};
