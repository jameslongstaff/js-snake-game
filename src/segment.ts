class Segment {
    public position: {[coord: string]: number} = { x: 0, y: 0 };
    public next: Segment | null = null;
    public prev: Segment | null = null;
}

export default Segment;