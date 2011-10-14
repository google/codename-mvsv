function Magician() {
  this.actor = new Actor();
}

Magician.prototype.accelerate = function(x) {
  this.actor.accelrate(x);
};

Magician.prototype.tick = function(delta) {
  this.actor.tick(delta);
  this.node.style.top = this.actor.y * C.size + 'px';
  this.node.style.left = this.actor.x * C.size + 'px';
};

Magician.prototype.draw = function(container) {
  this.node = document.createElement('img');
  this.node.src = 'gfx/magician_ltor1.png';
  this.node.className = 'magician';
  container.appendChild(this.node);
}
