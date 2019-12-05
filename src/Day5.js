export default class Day5 {
  part1 (input, outputFunc = _ => { }, inputVal = 1) {
    const data = this._prepareInput(input)
    let i = 0
    while (i < data.length && this._parseOpcode(data[i])[0] !== 99) {
      const [op, ...paramModes] = this._parseOpcode(data[i])
      if (op === 1) {
        data[data[i + 3]] = this._getParam(data, data[i + 1], paramModes[0] || 0) + this._getParam(data, data[i + 2], paramModes[1] || 0)
        i += 4
      }
      if (op === 2) {
        data[data[i + 3]] = this._getParam(data, data[i + 1], paramModes[0] || 0) * this._getParam(data, data[i + 2], paramModes[1] || 0)
        i += 4
      }
      if (op === 3) {
        data[data[i + 1]] = inputVal
        i += 2
      }
      if (op === 4) {
        outputFunc(this._getParam(data, data[i + 1], paramModes[0] || 0))
        i += 2
      }
      if (op === 5) {
        if (this._getParam(data, data[i + 1], paramModes[0] || 0) !== 0) {
          i = this._getParam(data, data[i + 2], paramModes[1] || 0)
        } else {
          i += 3
        }
      }
      if (op === 6) {
        if (this._getParam(data, data[i + 1], paramModes[0] || 0) === 0) {
          i = this._getParam(data, data[i + 2], paramModes[1] || 0)
        } else {
          i += 3
        }
      }
      if (op === 7) {
        if (this._getParam(data, data[i + 1], paramModes[0] || 0) < this._getParam(data, data[i + 2], paramModes[1] || 0)) {
          data[data[i + 3]] = 1
        } else {
          data[data[i + 3]] = 0
        }
        i += 4
      }
      if (op === 8) {
        if (this._getParam(data, data[i + 1], paramModes[0] || 0) === this._getParam(data, data[i + 2], paramModes[1] || 0)) {
          data[data[i + 3]] = 1
        } else {
          data[data[i + 3]] = 0
        }
        i += 4
      }
    }
    return data
  }

  _prepareInput (input) {
    return input.trim().split(',').map(x => +x.trim())
  }

  _parseOpcode (opcode) {
    const codes = opcode.toString(10).split('')
    const op = +codes.slice(codes.length - 2).join('')
    const paramModes = codes.slice(0, codes.length - 2).reverse().map(x => +x)
    return [op, ...paramModes]
  }

  _getParam (data, val, paramMode) {
    return paramMode === 0 ? data[val] : val
  }
}
