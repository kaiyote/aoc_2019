export default class Day3 {
  part1 (input) {
    const paths = this._prepareInput(input)
    const [pos1, pos2] = paths.map(this._process).map(x => x.map(JSON.stringify)).map(x => new Set(x))

    return Math.min(...Array.from(pos1).filter(p1 => pos2.has(p1)).map(p => JSON.parse(p)).map(p => Math.abs(p.x) + Math.abs(p.y)).filter(x => x !== 0))
  }

  part2 (input) {
    const paths = this._prepareInput(input)
    const [pos1, pos2] = paths.map(this._process)
    const [sPos1, sPos2] = [pos1, pos2].map(x => x.map(JSON.stringify)).map(x => new Set(x))
    const crossPoints = new Set(Array.from(sPos1).filter(p1 => sPos2.has(p1)))
    const [fPos1, fPos2] = [pos1, pos2].map(x => x.map((pos, i) => crossPoints.has(JSON.stringify(pos)) ? ({ ...pos, i }) : null).filter(x => x))

    return Math.min(...fPos1.map(p => p.i + fPos2.find(p2 => p2.x === p.x && p2.y === p.y).i).filter(x => x !== 0))
  }

  _prepareInput (input) {
    return input.split('\n').map(i => i.split(',').map(x => x.trim()))
  }

  _process (path) {
    return path.reduce((locs, pos) => {
      const dir = pos[0]
      const count = +pos.slice(1)
      const last = locs[locs.length - 1]
      switch (dir) {
        case 'U':
          locs.push(...(new Array(count).fill(0).map((_, i) => ({ x: last.x, y: last.y + i + 1 }))))
          break
        case 'D':
          locs.push(...(new Array(count).fill(0).map((_, i) => ({ x: last.x, y: last.y - i - 1 }))))
          break
        case 'L':
          locs.push(...(new Array(count).fill(0).map((_, i) => ({ x: last.x - i - 1, y: last.y }))))
          break
        case 'R':
          locs.push(...(new Array(count).fill(0).map((_, i) => ({ x: last.x + i + 1, y: last.y }))))
          break
      }
      return locs
    }, [{ x: 0, y: 0 }])
  }
}
