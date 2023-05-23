import { Placement } from '~/game-objects/Placement'
import { createMemo, For, JSX } from 'solid-js'

export default function LevelPlacementsLayer(props: any) {
  const placements = createMemo(() => {
    let results: {
      x: number
      y: number
      zIndex: number
      renderComponent: JSX.Element
    }[] = []
    props.level.placements
      .filter((placement: Placement) => !placement.hasBeenCollected)
      .map((p: Placement) => {
        const [x, y] = p.displayXY()

        results.push({
          x,
          y,
          zIndex: p.zIndex(),
          renderComponent: p.renderComponent(),
        })
      })

    return results
  })

  return (
    <For each={placements()}>
      {(placement) => (
        <div
          style={{
            position: 'absolute',
            transform: `translate3d(${placement.x}px, ${placement.y}px, 0px`,
            'z-index': placement.zIndex,
          }}
        >
          {placement.renderComponent}
        </div>
      )}
    </For>
  )
}
