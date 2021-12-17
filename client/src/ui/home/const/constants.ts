const CANVAS_SIZE: Array<number> = [600, 600]
const SNAKE_START: Array<Array<number>> = [
  [8, 7],
  [8, 8]
]
const APPLE_START: number[] = [8, 3]
const SCALE: number = 40
const SPEED: number = 100
const DIRECTIONS: object = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
}

export {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
}