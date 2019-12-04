import Day4 from '../src/Day4'

describe('Day 4', () => {
  const runner = new Day4()

  it('part 1 behaves', () => {
    expect(runner.part1('111111-111111')).toBe(1)
    expect(runner.part1('223450-223450')).toBe(0)
    expect(runner.part1('123789-123789')).toBe(0)

    expect(runner.part1(data)).toBe(1855)
  })

  it('part 2 behaves', () => {
    expect(runner.part2('112233-112233')).toBe(1)
    expect(runner.part2('123444-123444')).toBe(0)
    expect(runner.part2('111122-111122')).toBe(1)

    expect(runner.part2(data)).toBe(1253)
  })

  const data = '138307-654504'
})
