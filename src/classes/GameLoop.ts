export class GameLoop {
  public onStep: () => void
  public rafCallback: number | null
  private hasStopped: any

  constructor(onStep: () => void) {
    this.onStep = onStep
    this.rafCallback = null
    this.hasStopped = false
    this.start()
  }

  start() {
    let previousMs: number
    const step = 1 / 60
    const tick = (timestampMs: number) => {
      if (this.hasStopped) return
      if (previousMs === undefined) {
        previousMs = timestampMs
      }
      let delta = (timestampMs - previousMs!) / 1000
      while (delta >= step) {
        this.onStep()
        delta -= step
      }
      previousMs = timestampMs - delta * 1000
      this.rafCallback = requestAnimationFrame(tick)
    }

    // Initial kickoff
    this.rafCallback = requestAnimationFrame(tick)
  }

  stop() {
    if (typeof this.rafCallback === 'number') {
      this.hasStopped = true
      cancelAnimationFrame(this.rafCallback)
    }
  }
}
