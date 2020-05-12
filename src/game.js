import { Snake } from './snake.js';
import { Stage } from './stage.js';

/**
 * Responsibility for managing the set up and control of the game.
 */
class Game {
    constructor() {
        this.segmentWidth = 20;
        this.canvas = window.document.getElementById('canvas');
        this.score = window.document.getElementById('score');
        this.fps = 7;

        this.state = {
            direction: 'right',
            paused: false,
            isOver: false,
            foodPos: undefined,
            score: 0,
            start: { x: 0, y: 0 },
        }

        this.keyMap = {
            32: 'space',
            39: 'right',
            37: 'left',
            38: 'up',
            40: 'down',
            80: 'p',
        };

        this.init();
    }
    
    /**
     * Sets up the initial state of the game when starting new.
     */
    init() {
        window.addEventListener("keydown", this.keydown.bind(this), false);

        this.stage = new Stage(this.canvas);
        this.snake = new Snake();
        this.positions = [];

        for (let i = 0; i < this.canvas.height - this.segmentWidth; i += this.segmentWidth) {
            for (let j = 0; j < this.canvas.width - this.segmentWidth; j += this.segmentWidth) {
                this.positions.push({ x: j, y: i });
            }
        }

        this.snake.push();
        this.loop();
    }

    /**
     * Controls the movement of the snake.
     */
    updateSnakePosition() {
        let passedMaxY = this.state.start.y > this.canvas.height + this.segmentWidth;
        let passedMinY = this.state.start.y < -this.segmentWidth;

        let passedMaxX = this.state.start.x > this.canvas.width + this.segmentWidth;
        let passedMinX = this.state.start.x < -this.segmentWidth;

        if (passedMaxX || passedMinX || passedMinY || passedMaxY) {
            if (passedMaxX) this.state.start.x = 0;
            if (passedMinX) this.state.start.x = this.canvas.width;
            if (passedMinY) this.state.start.y = this.canvas.height - this.segmentWidth;
            if (passedMaxY) this.state.start.y = 0;
        } else {
            switch (this.state.direction) {
                case 'left':
                    this.state.start.x -= this.segmentWidth;
                    break;
                case 'right':
                    this.state.start.x += this.segmentWidth;
                    break;
                case 'up':
                    this.state.start.y -= this.segmentWidth;
                    break
                case 'down':
                    this.state.start.y += this.segmentWidth;
                    break;
            }
        }

        this.snake.updatePosition(this.state.start.x, this.state.start.y);
    }

    /**
     * Checks for segment collisions and collisions with food, then updates the game state accordingly.
     * @param {*} populatedPositions 
     */
    checkCollision(populatedPositions) {
        let length = new Set(populatedPositions.map((p) => `${p.x}|${p.y}`)).size;

        if (length !== populatedPositions.length) {
            this.state.isOver = true;
        }

        let head = this.snake.head;

        if (
            (head.position.x === this.state.foodPos.x) &&
            (head.position.y === this.state.foodPos.y)
        ) {
            this.state.foodPos = this.generateRandomCoord();
            this.snake.push();
            this.state.score++;
            this.updateScore();
        }
    }

    /**
     * Updates the score on screen using the score stored in the state.
     */
    updateScore() {
        this.score.innerHTML = "Score: " + this.state.score;
    }

    /**
     * Resets the game, cleaning the state re-initialises.
     */
    reset() {
        this.state = {
            direction: 'right',
            paused: false,
            isOver: false,
            foodPos: undefined,
            score: 0,
            start: { x: 0, y: 0 },
        }

        this.updateScore();
        this.init();
    }

    draw() {
        let populatedPositions = this.snake.getSegmentPositions();
        let availablePositions = this.positions.filter((p) => !populatedPositions.includes(p));

        let randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];

        if (this.state.foodPos === undefined) {
            this.state.foodPos = randomPosition;
        }

        this.checkCollision(populatedPositions);
        this.updateSnakePosition();

        this.stage.render(this.snake, this.state);
    }

    loop() {
        if (!!this.state)
            if (!this.state.isOver) {
                if (!this.state.paused) {
                    setTimeout(() => {
                        requestAnimationFrame(this.loop.bind(this));
                        this.draw();
                    }, 1000 / this.fps);
                }
            } else {
                // window.document.getElementById('game-over-screen').classList.add('show');
                this.reset();
            }
    }

    keydown(event) {
        var key = this.keyMap[event.keyCode]
        
        if (key === 'p') {
            this.state.paused = !this.state.paused;
        } else {

            if (
                (key === 'left' && this.state.direction !== 'right') ||
                (key === 'right' && this.state.direction !== 'left') ||
                (key === 'up' && this.state.direction !== 'down') ||
                (key === 'down' && this.state.direction !== 'up')
            ) {
                this.state.direction = key;
            }
        }
    }

    generateRandomCoord() {
        let randomX = (this.getRandomInt(0, (this.canvas.width / 2 - this.segmentWidth) / 10) * this.segmentWidth);
        let randomY = (this.getRandomInt(0, (this.canvas.height / 2 - this.segmentWidth) / 10) * this.segmentWidth);

        return { x: randomX, y: randomY };
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


}

const game = new Game();
game.init();