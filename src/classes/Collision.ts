import { Level } from '~/components/level-layout/RenderLevel/RenderLevel'
import { Coordinates, Placement } from '~/types'

export class Collision {
  private readonly forBody: any
  private level: any
  private placementsAtPosition: Placement[]
  public x: number
  public y: number
  constructor(
    forBody: { x: number; y: number },
    level: Level,
    position: Coordinates | null = null,
  ) {
    this.forBody = forBody
    this.level = level
    this.placementsAtPosition = []
    this.x = position ? position.x : forBody.x
    this.y = position ? position.y : forBody.y

    this.scanPlacementsAtPosition()
  }

  scanPlacementsAtPosition() {
    this.placementsAtPosition = this.level.placements.filter(
      (placement: Placement) => {
        const isSelf = placement.id === this.forBody.id
        return !isSelf && placement.x === this.x && placement.y === this.y
      },
    )
  }

  withSolidPlacement() {
    return this.placementsAtPosition.find((placement) =>
      placement.isSolidForBody(this.forBody),
    )
  }
}
