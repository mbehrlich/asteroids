/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var GameView = __webpack_require__(1);

	document.addEventListener("DOMContentLoaded", function() {
	  let canvas = document.getElementById("game-canvas");
	  let ctx = canvas.getContext("2d");
	  let view = new GameView(ctx);
	  view.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(2);


	function GameView(ctx) {
	  this.game = new Game();
	  this.canvas = ctx;

	}

	GameView.prototype.start = function() {
	  const view = this;
	  this.bindKeyHandlers();
	  window.setInterval(function() {
	    view.game.step();
	    view.game.draw(view.canvas);
	  }, 20);
	};

	GameView.prototype.bindKeyHandlers = function () {
	  let game = this.game;

	  key('w', function() {
	    game.ship.power([0,-1]);
	  });
	  key('a', function() {game.ship.power([-1,0])});
	  key('s', function() {game.ship.power([0,1])});
	  key('d', function() {game.ship.power([1,0])});
	  key('space', function() {game.ship.fireBullet()});
	};

	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var Asteroid = __webpack_require__(4);
	var Bullet = __webpack_require__(6);
	var Ship = __webpack_require__(7);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util = {
	  inherits (childClass, parentClass) {
	    function Surrogate(){ }
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  },
	  randomVec(length) {
	    let a = (Math.random()*(length * 2)) - length;
	    let b = Math.sqrt(Math.pow(length, 2) - Math.pow(a, 2));
	    let dir = Math.floor(Math.random() * 2);
	    if (dir === 0) {
	      b = b * -1;
	    }
	    return [a, b];
	  },
	  dist(pos1, pos2){
	    let a = pos1[0] - pos2[0];
	    let b = pos1[1] - pos2[1];
	    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
	  }
	};




	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(5);
	var Util = __webpack_require__(3);
	var Ship = __webpack_require__(7);
	const Bullet = __webpack_require__(6);

	function Asteroid(options) {
	  options.color = "#808080";
	  options.radius = 25;
	  options.vel = Util.randomVec(5);
	  MovingObject.call(this, options);

	}



	Util.inherits(Asteroid, MovingObject);

	Asteroid.prototype.collideWith = function (otherObject){
	  
	  if (otherObject instanceof Ship) {
	    otherObject.relocate();
	  } else if (otherObject instanceof Bullet) {
	    this.game.remove(otherObject);
	    this.game.remove(this);
	  }
	};

	module.exports = Asteroid;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);

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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(5);
	const Ship = __webpack_require__(7);
	const Asteroid = __webpack_require__(4);
	const Util = __webpack_require__(3);

	function Bullet(options) {
	    options.color = "#FFFF00";
	    options.radius = 5;
	    MovingObject.call(this, options);
	    this.isWrappable = false;
	}

	Util.inherits(Bullet, MovingObject);

	// Bullet.prototype.collideWith = function(otherObject){
	//   if (otherObject instanceof Asteroid) {
	//     this.game.remove(otherObject);
	//     this.game.remove(this);
	//   }
	// };

	module.exports = Bullet;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(5);
	var Util = __webpack_require__(3);
	var Bullet = __webpack_require__(6);

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


/***/ }
/******/ ]);