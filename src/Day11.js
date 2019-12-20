import IntCodeRunner from '../util/IntCodeEmulator'
import Day8 from './Day8'

export default class Day11 {
  part1 (input) {
    const data = this._prepareInput(input)
    let currentLocation = '0:0'
    let direction = 0
    const hull = {}
    let output = []
    let inputVal = 0
    const runner = new IntCodeRunner(data.slice(0), outSignal => (output.push(outSignal)), [])
    do {
      runner.inputs.push(inputVal)
      runner.paused ? runner.resume() : runner.start()
      hull[currentLocation] = output[0]
      const [newDir, newLoc] = this._move(output[1], currentLocation, direction)
      currentLocation = newLoc
      direction = newDir
      inputVal = hull[currentLocation] || 0
      output = []
    } while (!runner.done)

    return Object.keys(hull).length
  }

  part2 (input) {
    const data = this._prepareInput(input)
    let currentLocation = '0:0'
    let direction = 0
    const hull = {}
    let output = []
    let inputVal = 1
    const runner = new IntCodeRunner(data.slice(0), outSignal => (output.push(outSignal)), [])
    do {
      runner.inputs.push(inputVal)
      runner.paused ? runner.resume() : runner.start()
      hull[currentLocation] = output[0]
      const [newDir, newLoc] = this._move(output[1], currentLocation, direction)
      currentLocation = newLoc
      direction = newDir
      inputVal = hull[currentLocation] || 0
      output = []
    } while (!runner.done)

    const xDim = Math.max(...Object.keys(hull).map(x => +x.split(':')[0]))
    const yDim = Math.max(...Object.keys(hull).map(x => +x.split(':')[1]))
    const pic = Object.keys(hull).reduce((curr, k) => {
      const [x, y] = k.split(':').map(x => +x)
      curr[x + (y * xDim) - 1] = hull[k]
      return curr
    }, new Array(xDim * yDim).fill(0))

    console.log(new Day8()._chunkImage(pic, xDim).map(row => row.map(x => x === 0 ? ' ' : '█').join('')).join('\n'))
    return pic
  }

  _prepareInput (input) {
    return input.trim().split(',').map(x => +x.trim())
  }

  _move (dir, currentLocation, currentDirection) {
    const [x, y] = currentLocation.split(':').map(x => +x)
    const newDirection = this._turn(currentDirection, dir)
    switch (newDirection) {
      case 0: // up
        return [newDirection, `${x}:${y - 1}`]
      case 1: // right
        return [newDirection, `${x + 1}:${y}`]
      case 2: // down
        return [newDirection, `${x}:${y + 1}`]
      case 3: // left
        return [newDirection, `${x - 1}:${y}`]
    }
  }

  _turn (currentDirection, dir) {
    switch (currentDirection) {
      case 0: // up
        return dir ? 1 : 3
      case 1: // right
        return dir ? 2 : 0
      case 2: // down
        return dir ? 3 : 1
      case 3: // left
        return dir ? 0 : 2
    }
  }
}
