import Snake from "./snake";
import { GameStateType } from "./types";

class Stage {
    private segmentWidth?: number;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.ctx = canvas.getContext('2d')!;

        this.segmentWidth = 20;

        this.ctx.lineWidth = 5;
    }

    render(snake: Snake, state: GameStateType) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderSnake(snake);
        this.renderFood(state.foodPos || { x: 0, y: 0});
    }

    renderSnake(snake: Snake) {
        let current = snake.head;

        while (current) {
            let pos = current.position;
            this.ctx.fillStyle = "#000000";
            this.ctx.fillRect(pos.x, pos.y, this.segmentWidth!, this.segmentWidth!);
            current = current.next;
        }
    }

    renderFood(foodPos: {[coord: string]: number}) {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(foodPos.x, foodPos.y, this.segmentWidth!, this.segmentWidth!);
        this.ctx.stroke();
    }
}

export default Stage;