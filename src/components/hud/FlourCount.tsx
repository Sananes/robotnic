import { LevelState } from '~/classes/LevelState'
import { PLACEMENT_TYPE_FLOUR } from '~/helpers/const'

export default function FlourCount(props: { level: LevelState }) {
  const count = () =>
    props.level.placements.filter((placement) => {
      return (
        placement.type === PLACEMENT_TYPE_FLOUR && !placement.hasBeenCollected
      )
    }).length

  return (
    <p
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        color: '#fff',
      }}
    >
      Flour Remaining: {count()}
    </p>
  )
}
