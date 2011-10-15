function Magician() {
  this.actor = new Actor();
  this.animTime = 0;
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
    src += Math.floor(this.actor.animTime % (C.animStep * 2) / C.animStep) + 1;
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
