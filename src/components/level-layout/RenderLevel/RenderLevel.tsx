import {
  createEffect,
  createRenderEffect,
  createSignal,
  onCleanup,
  onMount,
  Show,
  Suspense,
} from 'solid-js'
import { THEME_BACKGROUNDS } from '~/helpers/const'

import LevelBackgroundTilesLayer from '../LevelBackgroundTilesLayer/LevelBackgroundTilesLayer'
import styles from './RenderLevel.module.css'
import { LevelState } from '~/classes/LevelState'
import { PlayerPlacement } from '~/game-objects/PlayerPlacement'
import { GoalPlacement } from '~/game-objects/GoalPlacement'
import FlourCount from '~/components/hud/FlourCount'
import LevelCompleteMessage from '~/components/hud/LevelCompleteMessage'
import { currentLevel } from '~/routes'
import { createStore } from 'solid-js/store'
import LevelPlacementsLayer from '~/components/level-layout/LevelPlacementsLayer/LevelPlacementsLayer'

export default function RenderLevel() {
  const [level, setLevel] = createSignal<
    | LevelState
    | {
        debug: number
        tilesWidth: number
        theme: string
        placements: (PlayerPlacement | GoalPlacement)[]
        tilesHeight: number
      }
    | null
  >(null)

  createEffect(() => {
    const levelState = new LevelState(currentLevel(), (newState) => {
      setLevel(newState)
    })

    setLevel(levelState.getState())

    onCleanup(() => levelState.destroy())
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
          <FlourCount level={level()} />
          {level().isCompleted && <LevelCompleteMessage />}
        </div>
      </Show>
    </Suspense>
  )
}
