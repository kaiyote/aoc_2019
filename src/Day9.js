import IntCodeRunner from '../util/IntCodeEmulator'

export default class Day9 {
  part1 (input, outputFunc, inputVal = 1) {
    const data = this._prepareInput(input)
    return new IntCodeRunner(data, outputFunc, inputVal).start()
  }

  /**
   *
   * @returns {number[]} memory
   */
  _prepareInput (input) {
    return input.trim().split(',').map(x => +x.trim())
  }
}
