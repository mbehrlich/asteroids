var MovingObject = require("./moving_object.js");
var Util = require("./utils.js");
var Bullet = require("./bullet.js");

function Ship(options) {
  options.color = "#FF0000";
  options.radius = 15;
  options.vel = [0, 0];
  MovingObject.call(this, options);
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.pos = [this.game.DIM_X / 2, this.game.DIM_Y / 2];
  this.vel = [0, 0];
};

Ship.prototype.power = function(impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.fireBullet = function() {
  let bulletVel = [this.vel[0] * 2, this.vel[1] * 2];
  if (this.vel[0] === 0 && this.vel[1] === 0) {
    bulletVel = [0, -2];
  }
  let bulletPos = [this.pos[0], this.pos[1]];
  let options = {game: this.game, pos: bulletPos, vel: bulletVel };
  let bullet = new Bullet(options);
  this.game.bullets.push(bullet);
};

module.exports = Ship;
