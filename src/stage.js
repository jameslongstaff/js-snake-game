export class Stage {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.segmentWidth = 20;

        this.ctx.lineWidth = 5;

        this.start = { x: 0, y: 0 };
    }

    render(snake, state) {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.renderSnake(snake);
        this.renderFood(state.foodPos);
    }

    renderSnake(snake) {
        let current = snake.head;

        while (current) {
            let pos = current.position;
            this.ctx.fillStyle = "#000000";
            this.ctx.fillRect(pos.x, pos.y, this.segmentWidth, this.segmentWidth);
            current = current.next;
        }
    }

    renderFood(foodPos) {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(foodPos.x, foodPos.y, this.segmentWidth, this.segmentWidth);
        this.ctx.stroke();
    }
}