var Util = require("./utils.js");

function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
  this.isWrappable = true;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2*Math.PI
  );

  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  if (this.isWrappable) {
    this.pos = this.game.wrap(this.pos);
  } else if (this.game.isOutOfBounds(this.pos)) {
    this.game.remove(this);
  }
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  let radiusSum = this.radius + otherObject.radius;
  let distance = Util.dist(this.pos, otherObject.pos);
  if (radiusSum > distance) {
    return true;
  }
  return false;
};

MovingObject.prototype.collideWith = function(otherObject) {};


module.exports = MovingObject;
