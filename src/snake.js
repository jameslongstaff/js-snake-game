import { Segment } from './segment.js';

/**
 * The snake class controls the creation of the snake object, adding new segments and updating the positions
 * of all segments.
 */
export class Snake {
    constructor(stage) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.stage = stage;
    }

    /**
     * Append a segment to the snake.
     */
    push() {
        let newSegment;

        if (!this.head) {
            newSegment = new Segment();
            this.head = newSegment;
        } else {
            newSegment = new Segment();

            let oldTail = this.tail;
            oldTail.next = newSegment;
            newSegment.prev = oldTail;
        }

        this.tail = newSegment;
        this.length++;

        return this;
    }

    /**
     * Traverse through the segments of the snake updating each segment position using the position 
     * of the previous segment.
     * @param {*} x 
     * @param {*} y 
     */
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

    /**
     * Get an array of coordinates for all snake segment positions.
     */
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