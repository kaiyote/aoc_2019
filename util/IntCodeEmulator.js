class IntCodeRunner {
  /**
   *
   * @param {number[]} memory
   * @param {(arg: number) => void} outputFun
   * @param {number|number[]} input
   */
  constructor (memory, outputFun = null, input = 1) {
    this.memory = memory
    this.inputs = Array.isArray(input) ? input.slice(0) : [input]
    this.instructionPointer = 0
    this.done = false
    this.paused = false
    this.outputFun = outputFun
  }

  pause () {
    this.paused = true
  }

  resume () {
    this.paused = false
    return this._runIntCode()
  }

  start () {
    return this._runIntCode()
  }

  _runIntCode () {
    while (this.instructionPointer < this.memory.length && !this.done && !this.paused) {
      const [op, ...paramModes] = parseOpCode(this.memory[this.instructionPointer])
      switch (op) {
        case 99: // finish
          this.done = true
          break
        case 1: // addition
          this.memory[this.memory[this.instructionPointer + 3]] = paramModes
            .slice(0, 2)
            .map((mode, i) => getParam(this.memory, this.instructionPointer + i + 1, mode))
            .reduce((prev, curr) => prev + curr)
          this.instructionPointer += 4
          break
        case 2: // multiplication
          this.memory[this.memory[this.instructionPointer + 3]] = paramModes
            .slice(0, 2)
            .map((mode, i) => getParam(this.memory, this.instructionPointer + i + 1, mode))
            .reduce((prev, curr) => prev * curr)
          this.instructionPointer += 4
          break
        case 3: // read input (cheat mode)
          if (this.inputs.length === 0) {
            this.pause()
            break
          }
          this.memory[this.memory[this.instructionPointer + 1]] = this.inputs.shift()
          this.instructionPointer += 2
          break
        case 4: // print output
          this.outputFun && this.outputFun(getParam(this.memory, this.instructionPointer + 1, paramModes[0]))
          this.instructionPointer += 2
          break
        case 5: // jump-not-zero
          if (getParam(this.memory, this.instructionPointer + 1, paramModes[0]) !== 0) {
            this.instructionPointer = getParam(this.memory, this.instructionPointer + 2, paramModes[1])
          } else {
            this.instructionPointer += 3
          }
          break
        case 6: // jump-zero
          if (getParam(this.memory, this.instructionPointer + 1, paramModes[0]) === 0) {
            this.instructionPointer = getParam(this.memory, this.instructionPointer + 2, paramModes[1])
          } else {
            this.instructionPointer += 3
          }
          break
        case 7: // bool-less-than
          this.memory[this.memory[this.instructionPointer + 3]] =
            getParam(this.memory, this.instructionPointer + 1, paramModes[0]) < getParam(this.memory, this.instructionPointer + 2, paramModes[1])
              ? 1
              : 0
          this.instructionPointer += 4
          break
        case 8: // bool-equals
          this.memory[this.memory[this.instructionPointer + 3]] =
            getParam(this.memory, this.instructionPointer + 1, paramModes[0]) === getParam(this.memory, this.instructionPointer + 2, paramModes[1])
              ? 1
              : 0
          this.instructionPointer += 4
          break
      }
    }

    return this.memory
  }
}

/**
 *
 * @param {number} opcode
 * @returns {number[]} [op, ...paramModes]
 */
const parseOpCode = opcode => {
  const digits = opcode.toString(10).padStart(5, '0').split('')
  const op = +digits.slice(digits.length - 2).join('')
  const paramModes = digits.slice(0, digits.length - 2).reverse().map(x => +x)
  return [op, ...paramModes]
}

/**
 *
 * @param {number[]} memory
 * @param {number} pointer
 * @param {number} paramMode
 * @returns {number} param
 */
const getParam = (memory, pointer, paramMode) => paramMode === 0
  ? memory[memory[pointer]]
  : memory[pointer]

export default IntCodeRunner
