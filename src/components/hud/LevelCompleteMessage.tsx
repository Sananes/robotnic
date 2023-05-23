import { currentLevel, setCurrentLevel } from '~/routes'
import LevelsMap from '~/levels/LevelsMap'
import levelsMap from '~/levels/LevelsMap'

export default function LevelCompleteMessage(props) {
  return (
    <p
      style={{
        position: 'absolute',
        left: '0',
        top: '64',
        color: 'lime',
      }}
    >
      LEVEL COMPLETE!
      <button
        onClick={() => {
          const levelArray = Object.keys(LevelsMap)
          const currentLevelIndex = levelArray.findIndex(
            (id) => id === currentLevel(),
          )
          const nextLevelId = levelArray[currentLevelIndex + 1] ?? levelArray[0]
          setCurrentLevel(nextLevelId)
        }}
      >
        Next Level
      </button>
    </p>
  )
}
