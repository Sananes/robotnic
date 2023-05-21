export type Coordinates = {
  x: number
  y: number
}

/** Frame coordinates of sprite e.g. "2x1" */
export type FrameCoordinates = string

export type Placement = {
  id: number
  type: string
  x: Coordinates['x']
  y: Coordinates['y']
  isSolidForBody: (coordinates: Coordinates) => boolean
}
