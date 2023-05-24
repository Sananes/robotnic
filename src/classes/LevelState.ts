import { PLACEMENT_TYPE_PLAYER } from '~/helpers/const'
import { placementFactory } from '~/classes/PlacementFactory'
import { PlayerPlacement } from '~/game-objects/PlayerPlacement'
import { Placement } from '~/game-objects/Placement'
import { GameLoop } from '~/classes/GameLoop'
import { DirectionControls } from '~/classes/DirectionControls'
import Levels from '~/levels/LevelsMap'
import { Level } from '~/types'

export class LevelState {
  public id: string
  public readonly theme!: string
  public readonly tilesWidth!: number
  public readonly tilesHeight!: number
  public placements: Placement[] = []
  public gameLoop: GameLoop | undefined
  private directionControls: DirectionControls
  private playerRef: PlayerPlacement | undefined
  public isCompleted: boolean = false

  constructor(
    public levelId: string,
    public onEmit: (newState: {
      tilesWidth: number
      theme: string
      placements: Level['placements']
      tilesHeight: number
      isCompleted: boolean
    }) => void,
  ) {
    this.id = levelId
    this.onEmit = onEmit
    this.directionControls = new DirectionControls()
    this.isCompleted = false

    const levelData = Levels[this.id]

    this.theme = levelData.theme
    this.tilesWidth = levelData.tilesWidth
    this.tilesHeight = levelData.tilesHeight
    this.placements = levelData.placements.map(
      (config: { id: number; x: number; y: number; type: string }) => {
        return placementFactory.createPlacement(config, this)
      },
    ) as unknown as Placement[]

    this.playerRef = this.placements.find(
      (player) => player.type === PLACEMENT_TYPE_PLAYER,
    ) as PlayerPlacement
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

  addPlacement(config: { type: string; x: number; y: number; id: number }) {
    this.placements.push(placementFactory.createPlacement(config, this))
  }

  deletePlacement(placementToRemove: Placement) {
    this.placements = this.placements.filter(
      (placement) => placement.id !== placementToRemove.id,
    )
  }

  tick() {
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

  completeLevel() {
    this.isCompleted = true
    this.gameLoop?.stop()
  }

  getState() {
    return {
      theme: this.theme,
      tilesWidth: this.tilesWidth,
      tilesHeight: this.tilesHeight,
      placements: this.placements,
      isCompleted: this.isCompleted,
    }
  }

  destroy() {
    this.gameLoop?.stop()
    this.directionControls.unbind()
  }
}
