import IntCodeRunner from '../util/IntCodeEmulator'

export default class Day7 {
  /**
   *
   * @param {string} input
   * @returns {number}
   */
  part1 (input) {
    const data = this._prepareInput(input)
    let inputSignal = 0
    let maxOutput = 0
    for (const perm of this.permutations([0, 1, 2, 3, 4])) {
      for (const phase of perm) {
        new IntCodeRunner(data.slice(0), output => (inputSignal = output), [phase, inputSignal]).start()
      }
      maxOutput = Math.max(maxOutput, inputSignal)
      inputSignal = 0
    }

    return maxOutput
  }

  part2 (input) {
    const data = this._prepareInput(input)
    let inputSignal = 0
    let maxOutput = 0
    let runners = []
    for (const perm of this.permutations([5, 6, 7, 8, 9])) {
      let firstPass = true
      do {
        if (firstPass) {
          for (const phase of perm) {
            const runner = new IntCodeRunner(data.slice(0), output => (inputSignal = output), [phase, inputSignal])
            runners.push(runner)
            runner.start()
          }
          firstPass = false
        } else {
          for (const runner of runners) {
            runner.inputs.push(inputSignal)
            runner.resume()
          }
        }
      } while (runners.filter(x => x.paused).length > 0)

      maxOutput = Math.max(maxOutput, inputSignal)
      inputSignal = 0
      runners = []
    }

    return maxOutput
  }

  /**
   *
   * @returns {number[]} memory
   */
  _prepareInput (input) {
    return input.trim().split(',').map(x => +x.trim())
  }

  permutations (xs) {
    const ret = []

    for (let i = 0; i < xs.length; i = i + 1) {
      const rest = this.permutations(xs.slice(0, i).concat(xs.slice(i + 1)))

      if (!rest.length) {
        ret.push([xs[i]])
      } else {
        for (let j = 0; j < rest.length; j = j + 1) {
          ret.push([xs[i]].concat(rest[j]))
        }
      }
    }

    return ret
  }
}
