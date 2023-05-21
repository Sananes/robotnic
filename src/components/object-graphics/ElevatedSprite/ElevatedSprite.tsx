import styles from './ElevatedSprite.module.css'
import Sprite from '~/components/object-graphics/Sprite/Sprite'
import TILES from '~/helpers/tiles'
import { mergeProps } from 'solid-js'
import { FrameCoordinates } from '~/types'
import { CELL_SIZE } from '~/helpers/const'

export default function ElevatedSprite(_props: {
  frameCoordinates: FrameCoordinates
  size?: number
  pxAboveGround?: number
}) {
  const props = mergeProps({ pxAboveGround: 3, size: CELL_SIZE }, _props)
  return (
    <div class={styles.elevatedSprite}>
      <Sprite frameCoordinates={TILES.SHADOW} />
      <div
        class={styles.bodyContainer}
        style={{
          transform: `translateY(${-props.pxAboveGround}px)`,
        }}
      >
        <Sprite frameCoordinates={props.frameCoordinates} size={props.size} />
      </div>
    </div>
  )
}
