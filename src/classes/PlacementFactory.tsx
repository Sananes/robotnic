import {
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_PLAYER,
  PLACEMENT_TYPE_WALL,
} from '~/helpers/const'
import { PlayerPlacement } from '~/game-objects/PlayerPlacement'
import { GoalPlacement } from '~/game-objects/GoalPlacement'
import { Level } from '~/components/level-layout/RenderLevel/RenderLevel'
import { WallPlacement } from '~/game-objects/WallPlacement'

export class PlacementFactory {
  createPlacement(
    config: { id: string | number; x: number; y: number; type: string },
    level: Level,
  ) {
    return this.getInstance(config, level)
  }

  getInstance(
    config: { id: string | number; x: number; y: number; type: string },
    level: Level,
  ) {
    switch (config.type) {
      case PLACEMENT_TYPE_PLAYER:
        return new PlayerPlacement(config, level)
      case PLACEMENT_TYPE_GOAL:
        return new GoalPlacement(config, level)
      case PLACEMENT_TYPE_WALL:
        return new WallPlacement(config, level)
      default:
        console.warn('NO TYPE FOUND', config.type)
        return null
    }
  }
}

export const placementFactory = new PlacementFactory()
