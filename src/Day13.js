import IntCodeRunner from '../util/IntCodeEmulator'
import Day8 from './Day8'

export default class Day13 {
  part1 (input) {
    const data = this._prepareInput(input)
    const outputBuffer = []
    const outputFun = output => (outputBuffer.push(output))
    new IntCodeRunner(data, outputFun).start()
    const screenBuffer = new Day8()._chunkImage(outputBuffer, 3)
    const screen = screenBuffer.reduce((scr, [x, y, tile]) => {
      scr[`${x}:${y}`] = tile
      return scr
    }, {})

    const xDim = Math.max(...Object.keys(screen).map(x => +x.split(':')[0]))
    const yDim = Math.max(...Object.keys(screen).map(x => +x.split(':')[1]))

    return Object.keys(screen).reduce((scr, k) => {
      const [x, y] = k.split(':').map(x => +x)
      scr[x + y * xDim - 1] = screen[k]
      return scr
    }, new Array(xDim * yDim).fill(0)).filter(x => x === 2).length
  }

  part2 (input) {
    return +input
  }

  /**
   *
   * @returns {number[]} memory
   */
  _prepareInput (input) {
    return input.trim().split(',').map(x => +x.trim())
  }
}
