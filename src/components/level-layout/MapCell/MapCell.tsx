import { mergeProps } from 'solid-js'

import { toCellPx } from '~/helpers/utils'

import Sprite, { SpriteProps } from '~/components/object-graphics/Sprite/Sprite'

interface MapCellProps {
  x: number
  y: number
}
export default function MapCell(_props: MapCellProps & SpriteProps) {
  const props = mergeProps(_props)
  const x = props.x
  const y = props.y
  return (
    <div
      style={{
        position: 'absolute',
        left: toCellPx(x),
        top: toCellPx(y),
      }}
    >
      <Sprite size={props.size} frameCoordinates={props.frameCoordinates} />
    </div>
  )
}
