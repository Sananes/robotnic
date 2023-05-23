import { Placement } from '~/game-objects/Placement'
import Sprite from '~/components/object-graphics/Sprite/Sprite'
import TILES from '~/helpers/tiles'
import { LevelState } from '~/classes/LevelState'
import { PLACEMENT_TYPE_FLOUR } from '~/helpers/const'

export class GoalPlacement extends Placement {
  constructor(
    properties: { id: string | number; x: number; y: number; type: string },
    level: LevelState,
  ) {
    super(properties, level)
  }

  get isDisabled() {
    const nonCollectedFlour = this.level.placements.find(
      (placement) =>
        placement.type === PLACEMENT_TYPE_FLOUR && !placement.hasBeenCollected,
    )
    return Boolean(nonCollectedFlour)
  }

  completesLevelOnCollide(): boolean {
    return !this.isDisabled
  }

  renderComponent() {
    return (
      <Sprite
        frameCoordinates={
          this.isDisabled ? TILES.GOAL_DISABLED : TILES.GOAL_ENABLED
        }
        size={16}
      />
    )
  }
}
