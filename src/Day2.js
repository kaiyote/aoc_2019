import runIntCode from '../util/IntCodeEmulator'

export default class Day2 {
  part1 (input) {
    const data = this._prepareInput(input)
    return runIntCode(data)
  }

  part2 (input) {
    const initMem = this._prepareInput(input)

    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        const workMem = initMem.slice(0)
        workMem[1] = i
        workMem[2] = j
        if (this.part1(workMem.join(','))[0] === 19690720) {
          return [i, j]
        }
      }
    }
  }

  _prepareInput (input) {
    return input.trim().split(',').map(x => +x.trim())
  }
}
