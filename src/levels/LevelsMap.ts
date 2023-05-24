import { Level } from '~/types'

import DemoLevel1 from '~/levels/DemoLevel1'
import DemoLevel2 from '~/levels/DemoLevel2'
import DemoLevel3 from '~/levels/DemoLevel3'

const Levels: { [x: string]: Level } = {
  DemoLevel1: DemoLevel1,
  DemoLevel2: DemoLevel2,
  DemoLevel3: DemoLevel3,
}

export default Levels
