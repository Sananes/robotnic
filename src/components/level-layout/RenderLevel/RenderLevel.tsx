import { createEffect, createSignal, onCleanup, Show, Suspense } from 'solid-js'
import { THEME_BACKGROUNDS } from '~/helpers/const'

import LevelBackgroundTilesLayer from '../LevelBackgroundTilesLayer/LevelBackgroundTilesLayer'
import styles from './RenderLevel.module.css'
import { LevelState } from '~/classes/LevelState'
import { PlayerPlacement } from '~/game-objects/PlayerPlacement'
import { GoalPlacement } from '~/game-objects/GoalPlacement'
import FlourCount from '~/components/hud/FlourCount'
import LevelCompleteMessage from '~/components/hud/LevelCompleteMessage'
import { currentLevel } from '~/routes'
import LevelPlacementsLayer from '~/components/level-layout/LevelPlacementsLayer/LevelPlacementsLayer'
import { Placement } from '~/game-objects/Placement'

export default function RenderLevel() {
  const [level, setLevel] = createSignal<LevelState | null>(null)

  createEffect(() => {
    const levelState = new LevelState(currentLevel(), (newState) => {
      setLevel(newState)
    })

    onCleanup(() => levelState.destroy())
  })

  createEffect(() => {
    if (!level()) return
  })

  return (
    <Suspense>
      <Show when={level()?.placements}>
        <div
          class={styles.fullScreenContainer}
          style={{
            background: THEME_BACKGROUNDS[level()!.theme],
          }}
        >
          <div class={styles.gameScreen}>
            <LevelBackgroundTilesLayer level={level() as LevelState} />
            <LevelPlacementsLayer level={level()} />
          </div>
          <FlourCount level={level()!} />
          {level()?.isCompleted && <LevelCompleteMessage />}
        </div>
      </Show>
    </Suspense>
  )
}
