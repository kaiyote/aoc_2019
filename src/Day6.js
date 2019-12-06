import Graph from 'graph-data-structure'

export default class Day6 {
  part1 (input) {
    const pairs = this._prepareInput(input)
    const graph = Graph()
    for (const pair of pairs) {
      graph.addEdge(pair[1], pair[0])
    }
    return graph.topologicalSort().reduce((total, node) => total + graph.depthFirstSearch([node], false).length, 0)
  }

  part2 (input) {
    const pairs = this._prepareInput(input)
    const graph = Graph()
    for (const pair of pairs) {
      graph.addEdge(pair[1], pair[0])
    }
    const branchNode = graph.lowestCommonAncestors('YOU', 'SAN')[0]
    return graph.shortestPath('YOU', branchNode).length - 2 + graph.shortestPath('SAN', branchNode).length - 2 // minus you/san + branch
  }

  /**
   *
   * @returns {string[][]} pairs
   */
  _prepareInput (input) {
    return input.split('\n').map(pair => pair.trim().split(')'))
  }
}
