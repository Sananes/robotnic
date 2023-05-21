import { Placement } from '~/game-objects/Placement'
import Sprite from '~/components/object-graphics/Sprite/Sprite'
import TILES from '~/helpers/tiles'
import { LevelState } from '~/classes/LevelState'

export class GoalPlacement extends Placement {
  constructor(
    properties: { id: string | number; x: number; y: number; type: string },
    level: LevelState,
  ) {
    super(properties, level)
  }

  tick() {}

  renderComponent() {
    return <Sprite frameCoordinates={TILES.GOAL_DISABLED} size={16} />
  }
}
