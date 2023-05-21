import { mergeProps } from 'solid-js'

import { toCellPx } from '~/helpers/utils'

import Sprite, { SpriteProps } from '~/components/object-graphics/Sprite/Sprite'

interface MapCellProps {
  x: number
  y: number
}
export default function MapCell(_props: MapCellProps & SpriteProps) {
  const props = mergeProps(_props)
  return (
    <div
      style={{
        position: 'absolute',
        left: toCellPx(props.x),
        top: toCellPx(props.y),
      }}
    >
      <Sprite size={props.size} frameCoordinates={props.frameCoordinates} />
    </div>
  )
}
