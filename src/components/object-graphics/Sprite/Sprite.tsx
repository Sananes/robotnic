import { createEffect, createMemo, mergeProps } from 'solid-js'
import { CELL_SIZE } from '~/helpers/const'
import { spriteSheetImage } from '~/routes'
export interface SpriteProps {
  size?: number
  frameCoordinates: string
}
function Sprite(_props: SpriteProps) {
  const props = mergeProps({ size: 16 }, _props)
  let canvasRef: HTMLCanvasElement

  createEffect(() => {
    if (!spriteSheetImage()) return
    const context = canvasRef.getContext('2d') as CanvasRenderingContext2D

    context.clearRect(0, 0, canvasRef.width, canvasRef.height)

    const tileSheetX = Number(props.frameCoordinates.split('x')[0])
    const tileSheetY = Number(props.frameCoordinates.split('x')[1])

    context.drawImage(
      spriteSheetImage() as HTMLCanvasElement,
      tileSheetX * CELL_SIZE,
      tileSheetY * CELL_SIZE,
      props.size,
      props.size,
      0,
      0,
      props.size,
      props.size,
    )
  })

  return (
    <canvas
      width={props.size}
      height={props.size}
      ref={(el) => (canvasRef = el)}
    />
  )
}

const MemoizedSprite = createMemo(() => Sprite)

export default MemoizedSprite()
