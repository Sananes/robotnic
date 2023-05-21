import { mergeProps } from 'solid-js'
import { Placement } from '~/game-objects/Placement'

export default function LevelPlacementsLayer(_props: any) {
  const props = mergeProps(_props)

  return props.level.placements.map((placement: Placement) => {
    const [x, y] = placement.displayXY()

    return (
      <div
        style={{
          position: 'absolute',
          transform: `translate3d(${x}px, ${y}px, 0px`,
        }}
      >
        {placement.renderComponent()}
      </div>
    )
  })
}
