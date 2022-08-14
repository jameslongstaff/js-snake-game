export type CoordinateType = {
  x: number;
  y: number;
}

export type GameStateType = {
  direction: 'right' | 'left' | 'up' | 'down',
  isOver: boolean,
  foodPos?: CoordinateType,
  score: number,
  start: CoordinateType,
}