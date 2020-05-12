/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _snake_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snake.js */ \"./src/snake.js\");\n/* harmony import */ var _stage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stage.js */ \"./src/stage.js\");\n\n\n\nconst initialState = {\n    direction: 'right',\n    isOver: false,\n    foodPos: undefined,\n    score: 0,\n    start: { x: 0, y: 0 },\n}\n\n/**\n * Responsibility for managing the set up and control of the game.\n */\nclass Game {\n    constructor() {\n        this.segmentWidth = 20;\n        this.canvas = window.document.getElementById('canvas');\n        this.score = window.document.getElementById('score');\n        this.fps = 7;\n\n        this.state = { ...initialState };\n\n        this.keyMap = {\n            39: 'right',\n            37: 'left',\n            38: 'up',\n            40: 'down',\n        };\n\n        this.init();\n    }\n    \n    /**\n     * Sets up the initial state of the game when starting new.\n     */\n    init() {\n        window.addEventListener(\"keydown\", this.keydown.bind(this), false);\n\n        this.stage = new _stage_js__WEBPACK_IMPORTED_MODULE_1__[\"Stage\"](this.canvas);\n        this.snake = new _snake_js__WEBPACK_IMPORTED_MODULE_0__[\"Snake\"]();\n        this.positions = [];\n\n        for (let i = 0; i < this.canvas.height - this.segmentWidth; i += this.segmentWidth) {\n            for (let j = 0; j < this.canvas.width - this.segmentWidth; j += this.segmentWidth) {\n                this.positions.push({ x: j, y: i });\n            }\n        }\n\n        this.snake.push();\n        this.loop();\n    }\n\n    /**\n     * Controls the movement of the snake.\n     */\n    updateSnakePosition() {\n        let passedMaxY = this.state.start.y > this.canvas.height + this.segmentWidth;\n        let passedMinY = this.state.start.y < -this.segmentWidth;\n\n        let passedMaxX = this.state.start.x > this.canvas.width + this.segmentWidth;\n        let passedMinX = this.state.start.x < -this.segmentWidth;\n        let snakeOutOfBounds = passedMaxX || passedMinX || passedMinY || passedMaxY;\n\n        // set the start x/y to opposite side if head moves outside of stage\n        if (snakeOutOfBounds) {\n\n            if (passedMaxX) { \n                this.state.start.x = 0;\n            } else if (passedMinX) {\n                this.state.start.x = this.canvas.width;\n            } else if (passedMinY) {\n                this.state.start.y = this.canvas.height - this.segmentWidth;\n            } else if (passedMaxY) {\n                this.state.start.y = 0; \n            }\n\n        } else {\n            switch (this.state.direction) {\n                case 'left':\n                    this.state.start.x -= this.segmentWidth;\n                    break;\n                case 'right':\n                    this.state.start.x += this.segmentWidth;\n                    break;\n                case 'up':\n                    this.state.start.y -= this.segmentWidth;\n                    break\n                case 'down':\n                    this.state.start.y += this.segmentWidth;\n                    break;\n            }\n        }\n\n        this.snake.updatePosition(this.state.start.x, this.state.start.y);\n    }\n\n    /**\n     * Checks for segment collisions and collisions with food, then updates the game state accordingly.\n     * @param {*} populatedPositions \n     */\n    checkCollision() {\n        let populatedPositions = this.snake.getSegmentPositions();\n        let length = new Set(populatedPositions.map((p) => `${p.x}|${p.y}`)).size;\n\n        if (length !== populatedPositions.length) {\n            this.state.isOver = true;\n        }\n\n        if (\n            (this.snake.head.position.x === this.state.foodPos.x) &&\n            (this.snake.head.position.y === this.state.foodPos.y)\n        ) {\n            this.state.foodPos = this.getRandomPosition();\n            this.snake.push();\n            this.state.score++;\n            this.updateScore();\n        }\n    }\n\n    /**\n     * Updates the score on screen using the score stored in the state.\n     */\n    updateScore() {\n        this.score.innerHTML = `Score: ${this.state.score}`;\n    }\n\n    /**\n     * Resets the game, cleaning the state re-initialises.\n     */\n    reset() {\n        this.state = { ...initialState };\n        this.updateScore();\n        this.init();\n    }\n\n    draw() {\n        if (this.state.foodPos === undefined) {\n            this.state.foodPos = this.getRandomPosition();\n        }\n\n        this.checkCollision();\n        this.updateSnakePosition();\n\n        this.stage.render(this.snake, this.state);\n    }\n\n    loop() {\n        if (!!this.state)\n            if (!this.state.isOver) {\n                setTimeout(() => {\n                    requestAnimationFrame(this.loop.bind(this));\n                    this.draw();\n                }, 1000 / this.fps);\n            } else {\n                // window.document.getElementById('game-over-screen').classList.add('show');\n                this.reset();\n            }\n    }\n    keydown(event) {\n        var key = this.keyMap[event.keyCode]\n        \n        // prevent the user from changing to the opposite direction\n        if (\n            (key === 'left' && this.state.direction !== 'right') ||\n            (key === 'right' && this.state.direction !== 'left') ||\n            (key === 'up' && this.state.direction !== 'down') ||\n            (key === 'down' && this.state.direction !== 'up')\n        ) {\n            this.state.direction = key;\n        }\n    }\n\n    getRandomPosition() {\n        let populatedPositions = this.snake.getSegmentPositions();\n        let availablePositions = this.positions.filter((p) => !populatedPositions.includes(p));\n\n        return availablePositions[Math.floor(Math.random() * availablePositions.length)];\n    }\n}\n\nconst game = new Game();\ngame.init();\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/segment.js":
/*!************************!*\
  !*** ./src/segment.js ***!
  \************************/
/*! exports provided: Segment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Segment\", function() { return Segment; });\n/**\n * Inidividual node for snake.\n */\nclass Segment {\n    constructor() {\n        this.position = { x: 0, y: 0 };\n        this.next = null;\n        this.prev = null;\n    }\n}\n\n//# sourceURL=webpack:///./src/segment.js?");

/***/ }),

/***/ "./src/snake.js":
/*!**********************!*\
  !*** ./src/snake.js ***!
  \**********************/
/*! exports provided: Snake */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Snake\", function() { return Snake; });\n/* harmony import */ var _segment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./segment.js */ \"./src/segment.js\");\n\n\n/**\n * The snake class controls the creation of the snake object, adding new segments and updating the positions\n * of all segments.\n */\nclass Snake {\n    constructor() {\n        this.head = null;\n        this.tail = null;\n        this.length = 0;\n    }\n\n    /**\n     * Append a segment to the snake.\n     */\n    push() {\n        let newSegment = new _segment_js__WEBPACK_IMPORTED_MODULE_0__[\"Segment\"]();;\n\n        if (!this.head) {\n            this.head = newSegment;\n        } else {\n            let oldTail = this.tail;\n            oldTail.next = newSegment;\n            newSegment.prev = oldTail;\n        }\n\n        this.tail = newSegment;\n        this.length++;\n\n        return this;\n    }\n\n    /**\n     * Traverse through the segments of the snake updating each segment position using the position \n     * of the previous segment.\n     * @param {*} x \n     * @param {*} y \n     */\n    updatePosition(x, y) {\n        let tempX = this.head.position.x;\n        let tempY = this.head.position.y;\n\n        let current = this.head;\n\n        if (current) {\n            while (current) {\n                if (current === this.head) {\n                    current.position.x = x;\n                    current.position.y = y;\n                } else {\n                    let tx = current.position.x;\n                    let ty = current.position.y;\n                    current.position.x = tempX;\n                    current.position.y = tempY;\n                    tempX = tx;\n                    tempY = ty;\n                }\n\n                current = current.next;\n            }\n        }\n    }\n\n    /**\n     * Get an array of coordinates for all snake segment positions.\n     */\n    getSegmentPositions() {\n        let current = this.head;\n        let positions = [];\n\n        while (current) {\n            let { x, y } = current.position;\n            positions.push({ x, y });\n            current = current.next;\n        }\n\n        return positions;\n    }\n}\n\n//# sourceURL=webpack:///./src/snake.js?");

/***/ }),

/***/ "./src/stage.js":
/*!**********************!*\
  !*** ./src/stage.js ***!
  \**********************/
/*! exports provided: Stage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Stage\", function() { return Stage; });\nclass Stage {\n\n    constructor(canvas) {\n        this.canvas = canvas;\n        this.ctx = canvas.getContext('2d');\n\n        this.segmentWidth = 20;\n\n        this.ctx.lineWidth = 5;\n\n        this.start = { x: 0, y: 0 };\n    }\n\n    render(snake, state) {\n        this.ctx.clearRect(0, 0, canvas.width, canvas.height);\n        this.renderSnake(snake);\n        this.renderFood(state.foodPos);\n    }\n\n    renderSnake(snake) {\n        let current = snake.head;\n\n        while (current) {\n            let pos = current.position;\n            this.ctx.fillStyle = \"#000000\";\n            this.ctx.fillRect(pos.x, pos.y, this.segmentWidth, this.segmentWidth);\n            current = current.next;\n        }\n    }\n\n    renderFood(foodPos) {\n        this.ctx.fillStyle = \"#FF0000\";\n        this.ctx.fillRect(foodPos.x, foodPos.y, this.segmentWidth, this.segmentWidth);\n        this.ctx.stroke();\n    }\n}\n\n//# sourceURL=webpack:///./src/stage.js?");

/***/ })

/******/ });