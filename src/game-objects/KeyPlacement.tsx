import { LevelState } from '~/classes/LevelState'
import { Placement } from './Placement'
import { LOCK_KEY_COLORS } from '~/helpers/const'
import { JSX } from 'solid-js'
import ElevatedSprite from '~/components/object-graphics/ElevatedSprite/ElevatedSprite'
import TILES from '~/helpers/tiles'

export class KeyPlacement extends Placement {
  constructor(properties: Placement, level: LevelState) {
    super(properties, level)
    this.color = properties.color ?? LOCK_KEY_COLORS.BLUE
  }

  addsItemToInventoryOnCollide(): string {
    return `KEY_${this.color}`
  }

  renderComponent(): JSX.Element {
    const frameCoordinates =
      this.color === LOCK_KEY_COLORS.BLUE ? TILES.BLUE_KEY : TILES.GREEN_KEY
    return <ElevatedSprite frameCoordinates={frameCoordinates} />
  }
}
