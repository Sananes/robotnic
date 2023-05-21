import { Placement } from '~/game-objects/Placement'
import Sprite from '~/components/object-graphics/Sprite/Sprite'
import { THEME_TILES_MAP } from '~/helpers/const'
import { Level } from '~/components/level-layout/RenderLevel/RenderLevel'

export class WallPlacement extends Placement {
  renderComponent() {
    const wallTileCoordinates =
      THEME_TILES_MAP[this.level.theme as keyof Level].WALL
    return <Sprite frameCoordinates={wallTileCoordinates} />
  }

  isSolidForBody() {
    return true
  }
}
