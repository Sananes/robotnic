import { Placement } from '~/game-objects/Placement'
import Player from '~/components/object-graphics/Player/Player'
import {
  BODY_SKINS,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  directionUpdateMap,
  HERO_RUN_1,
  HERO_RUN_2,
  Z_INDEX_LAYER_SIZE,
} from '~/helpers/const'
import TILES from '~/helpers/tiles'
import { Collision } from '~/classes/Collision'
import { FrameCoordinates } from '~/types'
import { LevelState } from '~/classes/LevelState'

const heroSkinMap = {
  [BODY_SKINS.NORMAL]: [TILES.HERO_LEFT, TILES.HERO_RIGHT],
  [HERO_RUN_1]: [TILES.HERO_RUN_1_LEFT, TILES.HERO_RUN_1_RIGHT],
  [HERO_RUN_2]: [TILES.HERO_RUN_2_LEFT, TILES.HERO_RUN_2_RIGHT],
}

export class PlayerPlacement extends Placement {
  constructor(
    properties: { id: string | number; x: number; y: number; type: string },
    level: LevelState,
  ) {
    super(properties, level)
    this.debug = 0
  }

  controllerMoveRequested(direction: string) {
    if (this.movingPixelsRemaining > 0) return

    // Make sure next space is available
    const canMove = this.canMoveToNextDestination(direction)
    if (!canMove) return

    this.movingPixelsRemaining = 16
    this.movingPixelDirection = direction
    this.updateFacingDirection()
    this.updateWalkFrame()
  }

  canMoveToNextDestination(direction: string) {
    const { x, y } = directionUpdateMap[direction]
    const nextX = this.x + x
    const nextY = this.y + y
    const isOutOfBounds = this.level.isPositionOutOfBounds(nextX, nextY)

    if (isOutOfBounds) return false

    const collision = new Collision(this, this.level, {
      x: nextX,
      y: nextY,
    })

    return !collision.withSolidPlacement()
  }

  updateFacingDirection() {
    if (
      this.movingPixelDirection === DIRECTION_LEFT ||
      this.movingPixelDirection === DIRECTION_RIGHT
    ) {
      this.spriteFacingDirection = this.movingPixelDirection
    }
  }

  updateWalkFrame() {
    this.spriteWalkFrame = this.spriteWalkFrame === 1 ? 0 : 1
  }

  tick() {
    // this.debug = Math.random()
    this.tickMovingPixelProgress()
  }

  tickMovingPixelProgress() {
    if (this.movingPixelsRemaining === 0) return

    this.movingPixelsRemaining -= this.travelPixelsPerFrame
    if (this.movingPixelsRemaining <= 0) {
      this.movingPixelsRemaining = 0
      this.onDoneMoving()
    }
  }

  onDoneMoving() {
    const { x, y } = directionUpdateMap[this.movingPixelDirection]
    this.x += x
    this.y += y
    this.handleCollisions()
  }

  handleCollisions() {
    const collision = new Collision(this, this.level)
    const collideThatAddsToInventory = collision.withPlacementAddsToInventory()
    if (collideThatAddsToInventory) {
      console.log('Handle Collision!', collideThatAddsToInventory)
    }
  }

  getFrame(): FrameCoordinates {
    const index = this.spriteFacingDirection === DIRECTION_LEFT ? 0 : 1

    if (this.movingPixelsRemaining > 0) {
      const walkKey = this.spriteWalkFrame === 0 ? HERO_RUN_1 : HERO_RUN_2
      return heroSkinMap[walkKey][index]
    }

    return heroSkinMap[BODY_SKINS.NORMAL][index]
  }

  getYTranslate() {
    if (this.movingPixelsRemaining === 0) return 0
    const PIXELS_FROM_END = 2
    if (
      this.movingPixelsRemaining < PIXELS_FROM_END ||
      this.movingPixelsRemaining > 16 - PIXELS_FROM_END
    ) {
      return -1
    }
    return -2
  }

  zIndex() {
    return this.y * Z_INDEX_LAYER_SIZE + 1
  }

  renderComponent() {
    return (
      <Player
        frameCoordinates={this.getFrame()}
        yTranslate={this.getYTranslate()}
      />
    )
  }
}
