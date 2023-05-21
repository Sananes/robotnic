import { JSX } from 'solid-js'

import {
  CELL_SIZE,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from '~/helpers/const'
import { LevelState } from '~/classes/LevelState'

export class Placement {
  public type: string
  private id: string | number
  public x: number
  public y: number
  protected level: LevelState
  public travelPixelsPerFrame: number
  public movingPixelsRemaining: number
  public movingPixelDirection: string
  protected debug: number
  protected spriteFacingDirection: string
  protected spriteWalkFrame: number

  constructor(properties: Placement, level: LevelState) {
    this.id = properties.id
    this.type = properties.type
    this.x = properties.x
    this.y = properties.y
    this.level = level
    this.debug = 0

    this.travelPixelsPerFrame = 1.5
    this.movingPixelsRemaining = 0
    this.movingPixelDirection = DIRECTION_RIGHT
    this.spriteFacingDirection = DIRECTION_RIGHT
    this.spriteWalkFrame = 0
  }

  tick() {}

  isSolidForBody() {
    return false
  }

  displayXY() {
    if (this.movingPixelsRemaining > 0) {
      return this.displayMovingXY()
    }

    const x = this.x * CELL_SIZE
    const y = this.y * CELL_SIZE

    return [x, y]
  }

  displayMovingXY() {
    const x = this.x * CELL_SIZE
    const y = this.y * CELL_SIZE
    const progressPixels = CELL_SIZE - this.movingPixelsRemaining

    switch (this.movingPixelDirection) {
      case DIRECTION_LEFT:
        return [x - progressPixels, y]
      case DIRECTION_RIGHT:
        return [x + progressPixels, y]
      case DIRECTION_UP:
        return [x, y - progressPixels]
      default:
        return [x, y + progressPixels]
    }
  }

  zIndex() {
    return 1
  }

  renderComponent(): JSX.Element {
    return null
  }
}
