import TILES from '~/helpers/tiles'
import Sprite from '~/components/object-graphics/Sprite/Sprite'

import styles from './Player.module.css'
export default function Player(props: {
  yTranslate: number
  frameCoordinates: string
}) {
  return (
    <div class={styles.hero}>
      <div>
        <Sprite frameCoordinates={TILES.SHADOW} />
      </div>
      <div
        class={styles.heroBody}
        style={{
          transform: `translateY(${props.yTranslate}px`,
        }}
      >
        <Sprite frameCoordinates={props.frameCoordinates} size={32} />
      </div>
    </div>
  )
}
