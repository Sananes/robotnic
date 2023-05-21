import { Placement } from '~/game-objects/Placement'
import ElevatedSprite from '~/components/object-graphics/ElevatedSprite/ElevatedSprite'
import TILES from '~/helpers/tiles'
import { PLACEMENT_TYPE_FLOUR } from '~/helpers/const'

export class FlourPlacement extends Placement {
  addsItemToInventoryOnCollide() {
    return PLACEMENT_TYPE_FLOUR
  }

  renderComponent() {
    return <ElevatedSprite frameCoordinates={TILES.FLOUR} />
  }
}
