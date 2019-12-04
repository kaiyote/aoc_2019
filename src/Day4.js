export default class Day4 {
  part1 (input) {
    const [low, high] = this._prepareInput(input)
    const nums = new Array(high).fill(0).slice(low - 1).map((_, i) => i + low)
      .filter(x => this._hasRepeat(x) && this._onlyIncrease(x))
    return nums.length
  }

  part2 (input) {
    const [low, high] = this._prepareInput(input)
    const nums = new Array(high).fill(0).slice(low - 1).map((_, i) => i + low)
      .filter(x => this._hasRepeat2(x) && this._onlyIncrease(x))
    return nums.length
  }

  _prepareInput (input) {
    return input.split('-').map(x => +x)
  }

  _hasRepeat (num) {
    return num.toString(10).match(/(\d)\1/g)
  }

  _hasRepeat2 (num) {
    return (this._hasRepeat(num) || []).filter(x => !new RegExp(`(${x[0]}){3,}`).test(num.toString(10))).length > 0
  }

  _onlyIncrease (num) {
    return num.toString(10).split('').map(x => +x).reduce((prev, curr) => ({ min: curr, good: prev.good && curr >= prev.min }), { min: 1, good: true }).good
  }
}
