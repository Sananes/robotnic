import {
  createEffect,
  createMemo,
  createSignal,
  For,
  Index,
  mergeProps,
  onCleanup,
} from 'solid-js'

import MapCell from '../MapCell/MapCell'
import { THEME_TILES_MAP } from '~/helpers/const'
import { LevelState } from '~/classes/LevelState'
import { FrameCoordinates } from '~/types'
import { currentLevel } from '~/routes'
import { createStore } from 'solid-js/store'

interface Props {
  level: LevelState
}

export default function LevelBackgroundTilesLayer(props: {
  level: { tilesWidth: number; tilesHeight: number; theme: string | number }
}) {
  const widthWithWalls = () => props.level.tilesWidth + 1
  const heightWithWalls = () => props.level.tilesHeight + 1
  const tiles = () => THEME_TILES_MAP[props.level.theme]

  function getBackgroundTile(x: number, y: number) {
    if (x === 0) return tiles().LEFT
    if (x === widthWithWalls()) return tiles().RIGHT
    if (y === 0) return tiles().TOP
    if (y === heightWithWalls()) return tiles().BOTTOM

    return tiles().FLOOR
  }

  let canvases = []

  for (let y = 0; y <= heightWithWalls(); y++) {
    for (let x = 0; x <= widthWithWalls(); x++) {
      if (y === heightWithWalls()) {
        if (x === 0 || x === widthWithWalls()) {
          continue
        }
      }
      canvases.push({
        x,
        y,
        frameCoordinates: getBackgroundTile(x, y),
      })
    }
  }

  return (
    <Index each={canvases}>
      {(canvas) => {
        return (
          <MapCell
            x={canvas().x}
            y={canvas().y}
            frameCoordinates={canvas().frameCoordinates}
          />
        )
      }}
    </Index>
  )
}
