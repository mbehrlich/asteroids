var Util = require("./utils.js");
var Asteroid = require("./asteroid.js");
var Bullet = require("./bullet.js");
var Ship = require("./ship.js");

function Game() {
  this.DIM_X = 1000;
  this.DIM_Y = 800;
  const NUM_ASTEROIDS = 8;
  this.asteroids = [];
  this.bullets = [];
  while (this.asteroids.length < NUM_ASTEROIDS) {
    this.addAsteroids();
  }
  let options = {
    pos: [this.DIM_X/2, this.DIM_Y/2],
    game: this
  };
  this.ship = new Ship(options);
}

Game.prototype.allObjects = function() {
  let allOfThem = this.asteroids.concat(this.ship).concat(this.bullets);
  return allOfThem;
};

Game.prototype.addAsteroids = function() {
  let options = {
    pos: this.randomPosition(),
    game: this
  };
  this.asteroids.push(new Asteroid(options));
};

Game.prototype.randomPosition = function() {
  let x = Math.floor(Math.random() * this.DIM_X);
  let y = Math.floor(Math.random() * this.DIM_Y);
  return [x, y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0,0,this.DIM_X,this.DIM_Y);
  this.allObjects().forEach(function(object) {
    object.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach(function(object) {
    object.move();
  });
};

Game.prototype.wrap = function(pos) {
  pos[0] = pos[0] % this.DIM_X;
  pos[1] = pos[1] % this.DIM_Y;
  if (pos[0] < 0) {
    pos[0] = this.DIM_X + pos[0];
  }
  if (pos[1] < 0) {
    pos[1] = this.DIM_Y + pos[1];
  }
  return pos;
};

Game.prototype.checkCollisions = function() {
  let objects = this.allObjects();
  objects.forEach(function(object, index) {
    objects.forEach(function(object2, index2) {
      if(index !== index2 && object.isCollidedWith(object2)){
        object.collideWith(object2);
      }
    });
  });
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(object){
  object.pos = [undefined, undefined];
};

Game.prototype.isOutOfBounds = function(pos) {
  if (pos[0] < 0 || pos[0] > this.DIM_X) {
    return true;
  }
  if (pos[1] < 0 || pos[1] > this.DIM_Y) {
    return true;
  }
  return false;
};

module.exports = Game;
