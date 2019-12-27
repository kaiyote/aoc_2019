import IntCodeRunner from '../util/IntCodeEmulator'
import Day8 from './Day8'

export default class Day13 {
  part1 (input) {
    const data = this._prepareInput(input)
    const outputBuffer = []
    const outputFun = output => (outputBuffer.push(output))
    new IntCodeRunner(data, outputFun).start()

    return [].concat(...this._getScreen(outputBuffer)[0]).filter(x => x === 2).length
  }

  part2 (input) {
    const data = this._prepareInput(input)
    data[0] = 2
    let outputBuffer = []
    const outputFun = output => (outputBuffer.push(output))
    const runner = new IntCodeRunner(data, outputFun)
    let screen = []
    let scrObj = {}
    let score = 0

    do {
      outputBuffer = []
      runner.paused ? runner.resume() : runner.start()
      ;[screen, score, scrObj] = this._getScreen(outputBuffer, scrObj)

      const ballCol = this._getColumn(screen, 4)
      const paddleCol = this._getColumn(screen, 3)
      runner.inputs.push(Math.sign(ballCol - paddleCol))
    } while ([].concat(...screen).filter(x => x === 2).length > 0 && !runner.done)

    return score
  }

  /**
   * @param {number[]} list of draw instructions
   * @returns {[number[][], number, object]} the screen and the score and the object representation of the screen
   */
  _getScreen (outputBuffer, seed = {}) {
    const day8 = new Day8()

    const screenBuffer = day8._chunkImage(outputBuffer, 3)
    const screen = screenBuffer.reduce((scr, [x, y, tile]) => {
      scr[`${x}:${y}`] = tile
      return scr
    }, seed)

    const xDim = Math.max(...Object.keys(screen).map(x => +x.split(':')[0]))
    const yDim = Math.max(...Object.keys(screen).map(x => +x.split(':')[1]))

    return [day8._chunkImage(Object.keys(screen).filter(x => x !== '-1:0').reduce((scr, k) => {
      const [x, y] = k.split(':').map(x => +x)
      scr[x + y * xDim - 1] = screen[k]
      return scr
    }, new Array(xDim * yDim).fill(0)), xDim), screen['-1:0'], screen]
  }

  /**
   *
   * @param {number} x
   * @returns {string} displayTile
   */
  _getTile (x) {
    switch (x) {
      case 1: return '|'
      case 2: return '■'
      case 3: return '_'
      case 4: return 'o'
      default: return ' '
    }
  }

  /**
   *
   * @param {number[][]} screen
   * @param {number} tile
   * @returns {number} column
   */
  _getColumn (screen, tile) {
    return screen.find(row => row.includes(tile)).indexOf(tile)
  }

  /**
   *
   * @returns {number[]} memory
   */
  _prepareInput (input) {
    return input.trim().split(',').map(x => +x.trim())
  }
}
