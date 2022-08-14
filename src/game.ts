import Snake from './snake';
import Stage from './stage';
import { CoordinateType, GameStateType } from './types';
import { keyMap } from './utils';

const initialState: GameStateType = {
    direction: 'right',
    isOver: false,
    foodPos: undefined,
    score: 0,
    start: { x: 0, y: 0 },
}

/**
 * Responsibility for managing the set up and control of the game.
 */
class Game {
    private segmentWidth: number;
    private fps: number;
    private snake?: Snake;

    private canvas: HTMLCanvasElement;
    private score: HTMLDivElement;

    private state: GameStateType;
    private stage?: Stage;
    private positions: CoordinateType[] = [];

    constructor() {
        this.segmentWidth = 20;
        this.canvas = window.document.getElementById('canvas') as HTMLCanvasElement;
        this.score = window.document.getElementById('score') as HTMLDivElement;
        this.fps = 7;

        this.state = { ...initialState };

        this.init();
    }

    init() {
        window.addEventListener("keydown", () => this.keydown.bind(this), false);

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
        let snakeOutOfBounds = passedMaxX || passedMinX || passedMinY || passedMaxY;

        // set the start x/y to opposite side if head moves outside of stage
        if (snakeOutOfBounds) {
            if (passedMaxX) { 
                this.state.start.x = 0;
            } else if (passedMinX) {
                this.state.start.x = this.canvas.width;
            } else if (passedMinY) {
                this.state.start.y = this.canvas.height - this.segmentWidth;
            } else if (passedMaxY) {
                this.state.start.y = 0; 
            }

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

        this.snake!.updatePosition(this.state.start.x, this.state.start.y);
    }

    /**
     * Checks for segment collisions and collisions with food, then updates the game state accordingly.
     * @param {*} populatedPositions 
     */
    checkCollision() {
        let populatedPositions = this.snake!.getSegmentPositions();
        let length = new Set(populatedPositions.map((p: CoordinateType) => `${p.x}|${p.y}`)).size;

        if (length !== populatedPositions.length) {
            this.state.isOver = true;
        }

        if (
            (this.snake!.head!.position.x === this.state.foodPos!.x) &&
            (this.snake!.head!.position.y === this.state.foodPos!.y)
        ) {
            this.state.foodPos = this.getRandomPosition();
            this.snake!.push();
            this.state.score++;
            this.updateScore();
        }
    }

    /**
     * Updates the score on screen using the score stored in the state.
     */
    updateScore() {
        this.score.innerHTML = `Score: ${this.state.score}`;
    }

    /**
     * Resets the game, cleaning the state re-initialises.
     */
    reset() {
        this.state = { ...initialState };
        this.updateScore();
        this.init();
    }

    draw() {
        if (this.state.foodPos === undefined) {
            this.state.foodPos = this.getRandomPosition();
        }

        this.checkCollision();
        this.updateSnakePosition();

        this.stage!.render(this.snake!, this.state);
    }

    loop() {
        if (this.state)
            if (!this.state.isOver) {
                setTimeout(() => {
                    requestAnimationFrame(this.loop.bind(this));
                    this.draw();
                }, 1000 / this.fps);
            } else {
                this.reset();
            }
    }

    keydown(event: KeyboardEvent) {
        var key = keyMap[event.key]

        if (
            (key === 'left' && this.state.direction !== 'right') ||
            (key === 'right' && this.state.direction !== 'left') ||
            (key === 'up' && this.state.direction !== 'down') ||
            (key === 'down' && this.state.direction !== 'up')
        ) {
            this.state.direction = key;
        }
    }

    getRandomPosition() {
        let populatedPositions = this.snake!.getSegmentPositions();
        let availablePositions = this.positions.filter((p) => !populatedPositions.includes(p));

        return availablePositions[Math.floor(Math.random() * availablePositions.length)];
    }
}

export default Game;