import {
  LEVEL_THEMES,
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_PLAYER,
  PLACEMENT_TYPE_WALL,
} from '~/helpers/const'
import { placementFactory } from '~/classes/PlacementFactory'
import { PlayerPlacement } from '~/game-objects/PlayerPlacement'
import { GoalPlacement } from '~/game-objects/GoalPlacement'
import { Placement } from '~/game-objects/Placement'
import { GameLoop } from '~/classes/GameLoop'
import { DirectionControls } from '~/classes/DirectionControls'

export class LevelState {
  public id: string
  public readonly theme: string
  public readonly tilesWidth: number
  public readonly tilesHeight: number
  public placements: (PlayerPlacement | GoalPlacement)[]
  public gameLoop: GameLoop | undefined
  public debug: number
  private directionControls: DirectionControls
  private playerRef: PlayerPlacement | undefined

  constructor(
    public levelId: string,
    public onEmit: (newState: {
      debug: number
      tilesWidth: number
      theme: string
      placements: (PlayerPlacement | GoalPlacement)[]
      tilesHeight: number
    }) => void,
  ) {
    this.id = levelId
    this.onEmit = onEmit
    this.directionControls = new DirectionControls()

    this.theme = LEVEL_THEMES.BLUE
    this.tilesWidth = 8
    this.tilesHeight = 8
    this.debug = 0
    this.placements = [
      { id: 0, x: 2, y: 2, type: PLACEMENT_TYPE_PLAYER },
      { id: 1, x: 6, y: 4, type: PLACEMENT_TYPE_GOAL },
      { id: 2, x: 4, y: 4, type: PLACEMENT_TYPE_WALL },
      { id: 3, x: 5, y: 2, type: PLACEMENT_TYPE_WALL },
      { id: 4, x: 6, y: 6, type: PLACEMENT_TYPE_WALL },
      { id: 5, x: 4, y: 3, type: PLACEMENT_TYPE_FLOUR },
    ].map((config: { id: number; x: number; y: number; type: string }) => {
      return placementFactory.createPlacement(config, this)
    }) as unknown as Placement[]
    this.playerRef = this.placements.find(
      (player) => player.type === PLACEMENT_TYPE_PLAYER,
    ) as PlayerPlacement

    console.log(this.playerRef)
    this.start()
  }

  start() {
    this.startGameLoop()
  }

  startGameLoop() {
    this.gameLoop?.stop()
    this.gameLoop = new GameLoop(() => {
      this.tick()
    })
  }

  tick() {
    this.debug = Math.random()

    if (this.directionControls.direction) {
      this.playerRef?.controllerMoveRequested(this.directionControls.direction)
    }

    this.placements.forEach((placement) => {
      placement.tick()
    })

    this.onEmit(this.getState())
  }

  isPositionOutOfBounds(x: number, y: number): boolean {
    return (
      x === 0 ||
      y === 0 ||
      x >= this.tilesWidth + 1 ||
      y >= this.tilesHeight + 1
    )
  }

  getState() {
    return {
      debug: this.debug,
      theme: this.theme,
      tilesWidth: this.tilesWidth,
      tilesHeight: this.tilesHeight,
      placements: this.placements,
    }
  }

  destroy() {
    this.gameLoop?.stop()
    this.directionControls.unbind()
  }
}
