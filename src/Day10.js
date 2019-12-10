export default class Day10 {
  part1 (input) {
    const map = this._prepareInput(input)
    for (const i in map) {
      for (const j in map[i]) {

      }
    }
  }

  part2 (input) {
    return +input
  }

  /**
   *
   * @returns {number[][]}
   */
  _prepareInput (input) {
    return input.trim().split('\n').map(line => line.trim().split('').map(c => c === '#' ? 1 : 0))
  }

  /**
   *
   * @param {{ x: number, y: number }} point
   * @param {{ x: number, y: number }} dest
   * @return {{ x: number, y: number }[]} points
   */
  _cast (point, dest) {
    const rise = Math.dest.y - point.y
    const run = dest.x - point.x
  }
}
