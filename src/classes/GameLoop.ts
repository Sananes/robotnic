export class GameLoop {
  public onStep: () => void
  public rafCallback: number | null

  constructor(onStep: () => void) {
    this.onStep = onStep
    this.rafCallback = null
    this.start()
  }

  start() {
    let previousMs: number
    const step = 1 / 60
    const tick = (timestampMs: number) => {
      if (previousMs === undefined) {
        previousMs = timestampMs
      }
      let delta = (timestampMs - previousMs!) / 1000
      while (delta >= step) {
        this.onStep()
        delta -= step
      }
      previousMs = timestampMs - delta * 1000
      //Recapture the callback to be able to shut it off
      this.rafCallback = requestAnimationFrame(tick)
    }

    // Initial kickoff
    this.rafCallback = requestAnimationFrame(tick)
  }

  stop() {
    if (typeof this.rafCallback === 'number') {
      cancelAnimationFrame(this.rafCallback)
    }
  }
}
