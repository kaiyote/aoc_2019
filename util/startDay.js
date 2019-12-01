const implementation = `export default class Day{day} {
  part1 (input) {
    return +input
  }

  part2 (input) {
    return +input
  }

  _prepareInput (input) {
    return input
  }
}
`

const test = `import Day{day} from '../src/Day{day}'

describe('Day {day}', () => {
  const runner = new Day{day}()

  test('part 1 behaves', () => {

  })

  test('part 2 behaves', () => {

  })

  const data = ''
})
`

if (process.argv.length < 3) {
  console.error('Must pass the day number to the script to continue')
} else {
  const fs = require('fs')
  const day = process.argv[2]
  fs.writeFileSync(`./src/Day${day}.js`, implementation.replace(/{day}/g, day))
  fs.writeFileSync(`./test/Day${day}.test.js`, test.replace(/{day}/g, day))
}
