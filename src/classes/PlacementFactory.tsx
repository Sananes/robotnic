import {
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_PLAYER,
  PLACEMENT_TYPE_WALL,
} from '~/helpers/const'
import { PlayerPlacement } from '~/game-objects/PlayerPlacement'
import { GoalPlacement } from '~/game-objects/GoalPlacement'
import { WallPlacement } from '~/game-objects/WallPlacement'
import { FlourPlacement } from '~/game-objects/FlourPlacement'
import { LevelState } from '~/classes/LevelState'

export class PlacementFactory {
  createPlacement(
    config: { id: string | number; x: number; y: number; type: string },
    level: LevelState,
  ) {
    return this.getInstance(config, level)
  }

  getInstance(
    config: { id: string | number; x: number; y: number; type: string },
    level: LevelState,
  ) {
    switch (config.type) {
      case PLACEMENT_TYPE_PLAYER:
        return new PlayerPlacement(config, level)
      case PLACEMENT_TYPE_GOAL:
        return new GoalPlacement(config, level)
      case PLACEMENT_TYPE_WALL:
        return new WallPlacement(config, level)
      case PLACEMENT_TYPE_FLOUR:
        return new FlourPlacement(config, level)
      default:
        console.warn('NO TYPE FOUND', config.type)
        return null
    }
  }
}

export const placementFactory = new PlacementFactory()
