import { createEffect, createSignal } from 'solid-js'
import { SPRITE_SHEET_SOURCE } from '~/helpers/const'

import RenderLevel from '~/components/level-layout/RenderLevel/RenderLevel'

export const [spriteSheetImage, setSpriteSheetImage] = createSignal<
  CanvasImageSource | HTMLImageElement | null
>(null)

export const [currentLevel, setCurrentLevel] = createSignal('DemoLevel1')

export default function Home() {
  createEffect(() => {
    const image = new Image()
    image.src = SPRITE_SHEET_SOURCE

    image.onload = () => {
      setSpriteSheetImage(image)
    }
  })

  return <RenderLevel />
}
