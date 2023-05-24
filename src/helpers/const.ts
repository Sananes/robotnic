import { Coordinates } from '~/types'

export const CELL_SIZE = 16
export const Z_INDEX_LAYER_SIZE = 10
export const SPRITE_SHEET_SOURCE = '/sprite.png'

export type LEVEL_THEME_COLORS = 'YELLOW' | 'BLUE' | 'GREEN' | 'PINK' | 'GRAY'

export const PLACEMENT_TYPE_PLAYER = 'HERO'
export const PLACEMENT_TYPE_GOAL = 'GOAL'
export const PLACEMENT_TYPE_WALL = 'WALL'
export const PLACEMENT_TYPE_FLOUR = 'FLOUR'
export const PLACEMENT_TYPE_CELEBRATION = 'CELEBRATION'

export const DIRECTION_LEFT = 'LEFT'
export const DIRECTION_RIGHT = 'RIGHT'
export const DIRECTION_UP = 'UP'
export const DIRECTION_DOWN = 'DOWN'

export const BODY_SKINS = {
  NORMAL: 'NORMAL',
  WATER: 'WATER',
  ICE: 'ICE',
  CONVEYOR: 'CONVEYOR',
  FIRE: 'FIRE',
  TELEPORT: 'TELEPORT',
  SCARED: 'SCARED',
}

export const HERO_RUN_1 = 'HERO_RUN_1'
export const HERO_RUN_2 = 'HERO_RUN_2'

export const directionUpdateMap: {
  [x: string]: Coordinates
} = {
  [DIRECTION_LEFT]: { x: -1, y: 0 },
  [DIRECTION_RIGHT]: { x: 1, y: 0 },
  [DIRECTION_UP]: { x: 0, y: -1 },
  [DIRECTION_DOWN]: { x: 0, y: 1 },
}

export const LEVEL_THEMES = {
  YELLOW: 'YELLOW',
  BLUE: 'BLUE',
  GREEN: 'GREEN',
  PINK: 'PINK',
  GRAY: 'GRAY',
}

export const THEME_BACKGROUNDS = {
  [LEVEL_THEMES.YELLOW]: '#2F2808',
  [LEVEL_THEMES.BLUE]: '#3D4C67',
  [LEVEL_THEMES.GREEN]: '#2F2808',
  [LEVEL_THEMES.PINK]: '#673D5E',
  [LEVEL_THEMES.GRAY]: '#96A1C7',
}

export const THEME_TILES_MAP = {
  [LEVEL_THEMES.YELLOW]: {
    FLOOR: '1x1',
    TOP: '1x0',
    LEFT: '0x1',
    RIGHT: '2x1',
    BOTTOM: '1x2',
    WALL: '0x2',
  },
  [LEVEL_THEMES.BLUE]: {
    FLOOR: '4x1',
    TOP: '4x0',
    LEFT: '3x1',
    RIGHT: '5x1',
    BOTTOM: '4x2',
    WALL: '3x2',
  },
  [LEVEL_THEMES.GREEN]: {
    FLOOR: '7x1',
    TOP: '7x0',
    LEFT: '6x1',
    RIGHT: '8x1',
    BOTTOM: '7x2',
    WALL: '6x2',
  },
  [LEVEL_THEMES.PINK]: {
    FLOOR: '10x1',
    TOP: '10x0',
    LEFT: '9x1',
    RIGHT: '11x1',
    BOTTOM: '10x2',
    WALL: '9x2',
  },
  [LEVEL_THEMES.GRAY]: {
    FLOOR: '13x1',
    TOP: '13x0',
    LEFT: '12x1',
    RIGHT: '14x1',
    BOTTOM: '13x2',
    WALL: '12x2',
  },
}
