import { Placement } from '~/game-objects/Placement'
import { Z_INDEX_LAYER_SIZE } from '~/helpers/const'
import Sprite from '~/components/object-graphics/Sprite/Sprite'
import TILES from '~/helpers/tiles'
import { LevelState } from '~/classes/LevelState'

export class CelebrationPlacement extends Placement {
  private frame: number

  constructor(
    properties: { id: string | number; x: number; y: number; type: string },
    level: LevelState,
  ) {
    super(properties, level)

    this.frame = 1
  }

  tick() {
    if (this.frame <= 8) {
      this.frame += 0.5
      return
    }
    this.level.deletePlacement(this)
  }

  zIndex() {
    return this.y * Z_INDEX_LAYER_SIZE + 2
  }

  renderComponent() {
    const frameCeilNumber = Math.ceil(this.frame)
    const frameCoordinates = `PARTICLE_${frameCeilNumber}`
    return <Sprite frameCoordinates={TILES[frameCoordinates]} />
  }
}
