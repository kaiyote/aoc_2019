export default class Day1 {
  part1 (input) {
    return this._prepareInput(input)
      .map(i => Math.floor(i / 3) - 2)
      .reduce((total, curr) => total + curr)
  }

  part2 (input) {
    let fuelReqs = this._prepareInput(input)
      .map(i => Math.floor(i / 3) - 2)

    let total = fuelReqs.reduce((total, curr) => total + curr)

    while (fuelReqs.length > 0) {
      fuelReqs = fuelReqs.map(i => Math.floor(i / 3) - 2)
        .filter(i => i > 0)

      total += fuelReqs.reduce((t, curr) => t + curr, 0)
    }

    return total
  }

  _prepareInput (input) {
    return input.split('\n').map(s => +s.trim())
  }
}
