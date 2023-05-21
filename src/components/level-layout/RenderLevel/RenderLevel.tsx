import { createEffect, createSignal, onCleanup, Show, Suspense } from 'solid-js'
import { THEME_BACKGROUNDS } from '~/helpers/const'

import LevelBackgroundTilesLayer from '../LevelBackgroundTilesLayer/LevelBackgroundTilesLayer'
import styles from './RenderLevel.module.css'
import { LevelState } from '~/classes/LevelState'
import { PlayerPlacement } from '~/game-objects/PlayerPlacement'
import { GoalPlacement } from '~/game-objects/GoalPlacement'

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
    const levelState = new LevelState('1-1', (newState) => {
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
            {/*<For each={level.placements}>*/}
            {/*  {(placement) => {*/}
            {/*    const [x, y] = placement.displayXY()*/}

            {/*    return (*/}
            {/*      <div*/}
            {/*        style={{*/}
            {/*          position: 'absolute',*/}
            {/*          transform: `translate3d(${x}px, ${y}px, 0px`,*/}
            {/*        }}*/}
            {/*      >*/}
            {/*        {placement.debug}*/}
            {/*        {placement.renderComponent()}*/}
            {/*      </div>*/}
            {/*    )*/}
            {/*  }}*/}
            {/*</For>*/}
            {level()?.placements.map((placement) => {
              const [x, y] = placement.displayXY()

              return (
                <div
                  style={{
                    position: 'absolute',
                    transform: `translate3d(${x}px, ${y}px, 0px`,
                    'z-index': placement.zIndex(),
                  }}
                >
                  {placement.renderComponent()}
                </div>
              )
            })}
            {/*<LevelPlacementsLayer level={level} />*/}
          </div>
        </div>
      </Show>
    </Suspense>
  )
}
