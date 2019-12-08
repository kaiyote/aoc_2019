export default class Day8 {
  part1 (input, width = 25, height = 6) {
    const layers = this._prepareInput(input, width, height)
    const minLayer = layers.map((x, i) => ({ len: x.filter(y => y === 0).length, layer: i })).sort((a, b) => a.len - b.len)[0].layer
    return layers[minLayer].filter(x => x === 1).length * layers[minLayer].filter(x => x === 2).length
  }

  part2 (input, width = 25, height = 6) {
    const layers = this._prepareInput(input, width, height)
    const pic = new Array(width * height).fill(0).map((_, i) => layers.map(l => l[i]).find(l => l !== 2))
    return this._chunkImage(pic, width)
  }

  /**
   * @param {string} input
   * @returns {number[][]}
   */
  _prepareInput (input, width, height) {
    const pixels = input.split('').map(x => +x)
    return this._chunkLayer(pixels, width, height)
  }

  _chunkLayer (data, width, height) {
    const layers = []
    let pixels = data.slice(0)
    while (pixels.length > 0) {
      layers.push(pixels.slice(0, width * height))
      pixels = pixels.slice(width * height)
    }

    return layers.filter(x => x.length > 0)
  }

  _chunkImage (data, width) {
    const rows = []
    let pixels = data.slice(0)
    while (pixels.length > 0) {
      rows.push(pixels.slice(0, width))
      pixels = pixels.slice(width)
    }

    return rows.filter(x => x.length > 0)
  }
}
