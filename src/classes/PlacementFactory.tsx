import {
  PLACEMENT_TYPE_CELEBRATION,
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_KEY,
  PLACEMENT_TYPE_LOCK,
  PLACEMENT_TYPE_PLAYER,
  PLACEMENT_TYPE_WALL,
} from '~/helpers/const'
import { PlayerPlacement } from '~/game-objects/PlayerPlacement'
import { GoalPlacement } from '~/game-objects/GoalPlacement'
import { WallPlacement } from '~/game-objects/WallPlacement'
import { FlourPlacement } from '~/game-objects/FlourPlacement'
import { LevelState } from '~/classes/LevelState'
import { CelebrationPlacement } from '~/game-objects/CelebrationPlacement'
import { LockPlacement } from '~/game-objects/LockPlacement'
import { KeyPlacement } from '~/game-objects/KeyPlacement'

const placementTypeClassMap = {
  [PLACEMENT_TYPE_PLAYER]: PlayerPlacement,
  [PLACEMENT_TYPE_GOAL]: GoalPlacement,
  [PLACEMENT_TYPE_WALL]: WallPlacement,
  [PLACEMENT_TYPE_FLOUR]: FlourPlacement,
  [PLACEMENT_TYPE_CELEBRATION]: CelebrationPlacement,
  [PLACEMENT_TYPE_KEY]: KeyPlacement,
  [PLACEMENT_TYPE_LOCK]: LockPlacement,
}

export class PlacementFactory {
  createPlacement(
    config: { id: string | number; x: number; y: number; type: string },
    level: LevelState,
  ) {
    const placementClass = placementTypeClassMap[config.type as string]
    if (!placementClass) {
      console.warn('NO TYPE FOUND', config.type)
    }
    // Generate a new instance with random ID
    const instance = new placementClass(config, level)
    instance.id = Math.floor(Math.random() * 9999999) + 1
    return instance
  }
}

export const placementFactory = new PlacementFactory()
