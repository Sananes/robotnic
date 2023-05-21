import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from '~/helpers/const'

type Direction =
  | typeof DIRECTION_DOWN
  | typeof DIRECTION_LEFT
  | typeof DIRECTION_RIGHT
  | typeof DIRECTION_UP

export class DirectionControls {
  private directionKeys: {
    a: Direction
    s: Direction
    d: Direction
    ArrowLeft: Direction
    w: Direction
    ArrowUp: Direction
    ArrowRight: Direction
    ArrowDown: Direction
  }

  protected heldDirection: Set<Direction>
  private directionKeyDownHandler: (event: KeyboardEvent) => void
  private directionKeyUpHandler: (event: KeyboardEvent) => void

  constructor() {
    this.directionKeys = {
      ArrowDown: DIRECTION_DOWN,
      ArrowUp: DIRECTION_UP,
      ArrowLeft: DIRECTION_LEFT,
      ArrowRight: DIRECTION_RIGHT,
      s: DIRECTION_DOWN,
      w: DIRECTION_UP,
      a: DIRECTION_LEFT,
      d: DIRECTION_RIGHT,
    }

    this.heldDirection = new Set()

    this.directionKeyDownHandler = (event: KeyboardEvent) => {
      // @ts-ignore
      const direction = this.directionKeys[event.key]
      if (direction && !this.heldDirection.has(direction)) {
        this.heldDirection.add(direction)
      }
    }

    this.directionKeyUpHandler = (event: KeyboardEvent) => {
      // @ts-ignore
      const direction = this.directionKeys[event.key]
      if (this.heldDirection.has(direction)) {
        this.heldDirection.delete(direction)
      }
    }

    document.addEventListener('keydown', this.directionKeyDownHandler)
    document.addEventListener('keyup', this.directionKeyUpHandler)
  }

  get direction() {
    const [direction] = this.heldDirection
    return direction
  }

  unbind() {
    document.removeEventListener('keydown', this.directionKeyDownHandler)
    document.removeEventListener('keyup', this.directionKeyUpHandler)
  }
}
