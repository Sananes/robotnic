import { Placement } from './game-objects/Placement'

export type Coordinates = {
  x: number
  y: number
}

/** Frame coordinates of sprite e.g. "2x1" */
export type FrameCoordinates = string

export type Level = {
  theme: string
  tilesWidth: number
  tilesHeight: number
  placements: { x: number; y: number; type: string; color?: string }[]
}
