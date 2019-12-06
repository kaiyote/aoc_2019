/**
 *
 * @param {number[]} memory
 * @param {(arg: number) => void} outputFun
 * @param {number} input
 * @return {number[]} memory
 */
const runIntCode = (memory, outputFun, input = 1) => {
  let instructionPointer = 0
  let done = false

  while (instructionPointer < memory.length && !done) {
    const [op, ...paramModes] = parseOpCode(memory[instructionPointer])
    switch (op) {
      case 99: // finish
        done = true
        break
      case 1: // addition
        memory[memory[instructionPointer + 3]] = paramModes
          .slice(0, 2)
          .map((mode, i) => getParam(memory, instructionPointer + i + 1, mode))
          .reduce((prev, curr) => prev + curr)
        instructionPointer += 4
        break
      case 2: // multiplication
        memory[memory[instructionPointer + 3]] = paramModes
          .slice(0, 2)
          .map((mode, i) => getParam(memory, instructionPointer + i + 1, mode))
          .reduce((prev, curr) => prev * curr)
        instructionPointer += 4
        break
      case 3: // read input (cheat mode)
        memory[memory[instructionPointer + 1]] = input
        instructionPointer += 2
        break
      case 4: // print output
        outputFun && outputFun(getParam(memory, instructionPointer + 1, paramModes[0]))
        instructionPointer += 2
        break
      case 5: // jump-not-zero
        if (getParam(memory, instructionPointer + 1, paramModes[0]) !== 0) {
          instructionPointer = getParam(memory, instructionPointer + 2, paramModes[1])
        } else {
          instructionPointer += 3
        }
        break
      case 6: // jump-zero
        if (getParam(memory, instructionPointer + 1, paramModes[0]) === 0) {
          instructionPointer = getParam(memory, instructionPointer + 2, paramModes[1])
        } else {
          instructionPointer += 3
        }
        break
      case 7: // bool-less-than
        memory[memory[instructionPointer + 3]] =
          getParam(memory, instructionPointer + 1, paramModes[0]) < getParam(memory, instructionPointer + 2, paramModes[1])
            ? 1
            : 0
        instructionPointer += 4
        break
      case 8: // bool-equals
        memory[memory[instructionPointer + 3]] =
          getParam(memory, instructionPointer + 1, paramModes[0]) === getParam(memory, instructionPointer + 2, paramModes[1])
            ? 1
            : 0
        instructionPointer += 4
        break
    }
  }

  return memory
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

export default runIntCode
