import runIntCode from '../util/IntCodeEmulator'

export default class Day5 {
  part1 (input, outputFunc = _ => { }, inputVal = 1) {
    const data = this._prepareInput(input)
    return runIntCode(data, outputFunc, inputVal)
  }

  _prepareInput (input) {
    return input.trim().split(',').map(x => +x.trim())
  }
}
