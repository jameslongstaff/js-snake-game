import { Segment } from './segment.js';
export class Snake {
    constructor(stage) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.stage = stage;
    }

    push(direction) {
        let newSegment;

        if (!this.head) {
            newSegment = new Segment(direction);
            this.head = newSegment;
        } else {
            newSegment = new Segment(direction);

            let oldTail = this.tail;
            oldTail.next = newSegment;
            newSegment.prev = oldTail;
        }

        this.tail = newSegment;
        this.length++;

        return this;
    }

    updatePosition(x, y) {
        let tempX = this.head.position.x;
        let tempY = this.head.position.y;

        let current = this.head;

        if (current) {
            while (current) {
                if (current === this.head) {
                    current.position.x = x;
                    current.position.y = y;
                } else {
                    let tx = current.position.x;
                    let ty = current.position.y;
                    current.position.x = tempX;
                    current.position.y = tempY;
                    tempX = tx;
                    tempY = ty;
                }

                current = current.next;
            }
        }
    }

    getSegmentPositions() {
        let current = this.head;
        let positions = [];

        while (current) {
            positions.push({ x: current.position.x, y: current.position.y })
            current = current.next;
        }

        return positions;
    }
}