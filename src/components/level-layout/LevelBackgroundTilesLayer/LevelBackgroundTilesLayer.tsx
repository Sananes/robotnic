import { createMemo, For } from 'solid-js'
import { THEME_TILES_MAP } from '~/helpers/const'
import MapCell from '~/components/level-layout/MapCell/MapCell'

export default function LevelBackgroundTilesLayer(props: {
  level: { tilesWidth: number; tilesHeight: number; theme: string | number }
}) {
  const widthWithWalls = createMemo(() => props.level.tilesWidth + 1)
  const heightWithWalls = createMemo(() => props.level.tilesHeight + 1)
  const tiles = createMemo(() => THEME_TILES_MAP[props.level.theme])

  function getBackgroundTile(x: number, y: number) {
    if (x === 0) return tiles().LEFT
    if (x === widthWithWalls()) return tiles().RIGHT
    if (y === 0) return tiles().TOP
    if (y === heightWithWalls()) return tiles().BOTTOM

    return tiles().FLOOR
  }

  const canvases = createMemo(() => {
    let result = []

    for (let y = 0; y <= heightWithWalls(); y++) {
      for (let x = 0; x <= widthWithWalls(); x++) {
        if (y === heightWithWalls()) {
          if (x === 0 || x === widthWithWalls()) {
            continue
          }
        }
        result.push({
          x,
          y,
          frameCoordinates: getBackgroundTile(x, y),
        })
      }
    }

    return result
  })

  return (
    <For each={canvases()}>
      {(canvas) => {
        return (
          <MapCell
            x={canvas.x}
            y={canvas.y}
            frameCoordinates={canvas.frameCoordinates}
          />
        )
      }}
    </For>
  )
}
