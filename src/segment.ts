export class Segment {
    public position: {[coord: string]: number} = { x: 0, y: 0 };
    public next = null;
    public prev = null;
}