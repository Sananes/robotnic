import { LevelState } from '~/classes/LevelState'
import { Placement } from './Placement'
import { LOCK_KEY_COLORS } from '~/helpers/const'
import { JSX } from 'solid-js'
import TILES from '~/helpers/tiles'
import Sprite from '~/components/object-graphics/Sprite/Sprite'

export class LockPlacement extends Placement {
  collectInFrames: number

  constructor(properties: Placement, level: LevelState) {
    super(properties, level)
    this.color = properties.color ?? LOCK_KEY_COLORS.BLUE
    this.collectInFrames = 0
  }

  isSolidForBody(): boolean {
    return true
  }

  tick() {
    if (this.collectInFrames > 0) {
      this.collectInFrames -= 1
      if (this.collectInFrames === 0) {
        this.level.deletePlacement(this)
      }
    }
  }

  canBeUnlocked(): boolean {
    const requiredKey = `KEY_${this.color}`
    return this.level.inventory.has(requiredKey)
  }

  unlock() {
    if (this.collectInFrames > 0) return

    this.collectInFrames = 11
  }

  renderComponent(): JSX.Element {
    let frameCoordinates =
      this.color === LOCK_KEY_COLORS.BLUE ? TILES.BLUE_LOCK : TILES.GREEN_LOCK
    if (this.collectInFrames > 0) {
      frameCoordinates = TILES.UNLOCKED_LOCK
    }
    return <Sprite frameCoordinates={frameCoordinates} />
  }
}
