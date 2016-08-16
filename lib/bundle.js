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

	var Game = __webpack_require__(1);

	function GameView(ctx) {
	  this.game = new Game();
	  this.canvas = ctx;

	}

	GameView.prototype.start = function() {
	  const view = this;
	  window.setInterval(function() {
	    view.game.moveObjects();
	    view.game.draw(view.canvas);
	  }, 20);
	};

	module.exports = GameView;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(6);
	var Asteroid = __webpack_require__(2);
	var Bullet = __webpack_require__(3);
	var Ship = __webpack_require__(4);

	function Game() {
	  this.DIM_X = 1000;
	  this.DIM_Y = 800;
	  const NUM_ASTEROIDS = 12;
	  this.asteroids = [];
	  while (this.asteroids.length < NUM_ASTEROIDS) {
	    this.addAsteroids();
	  }
	}

	Game.prototype.addAsteroids = function() {
	  let options = {pos: this.randomPosition()};
	  this.asteroids.push(new Asteroid(options));
	};

	Game.prototype.randomPosition = function() {
	  let x = Math.floor(Math.random() * this.DIM_X);
	  let y = Math.floor(Math.random() * this.DIM_Y);
	  return [x, y];
	};

	Game.prototype.draw = function(ctx) {
	  ctx.clearRect();
	  this.asteroids.forEach(function(asteroid) {
	    asteroid.draw(ctx);
	  });
	};

	Game.prototype.moveObjects = function() {
	  this.asteroids.forEach(function(asteroid) {
	    asteroid.move();
	  });
	};


	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(5);
	var Util = __webpack_require__(6);

	function Asteroid(options) {
	  this.color = "#808080";
	  this.radius = "100px";
	  this.vel = Util.randomVec(5);
	  this.pos = options.pos;

	}

	Util.inherits(Asteroid, MovingObject);

	module.exports = Asteroid;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(5);

	function Bullet() {}

	module.exports = Bullet;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(5);

	function Ship() {}

	module.exports = Ship;


/***/ },
/* 5 */
/***/ function(module, exports) {

	function MovingObject(options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
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
	};




	module.exports = MovingObject;


/***/ },
/* 6 */
/***/ function(module, exports) {

	const Util = {
	  inherits (childClass, parentClass) {
	    function Surrogate(){ }
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  },
	  randomVec(length) {
	    let a = Math.random()*(length-1);
	    let b = Math.sqrt(Math.pow(length, 2) - Math.pow(a, 2));
	    return [a, b];
	  }
	};




	module.exports = Util;


/***/ }
/******/ ]);