import * as Analyzers from './analyzers.js'
import * as External from './external.js'
import * as Utils from './utils.js'

/**
 * Main
 */
const transactions = External.getTransactions()
const state = External.getState()
const analyzers = Utils.mapProp(Analyzers, a => a)

function main() {
  const statistics = {}
  state.goals.forEach(goal => analyzers.forEach(analyzer => {
    statistics[analyzer.name] = analyzer(transactions, state, goal)
  }))
  return statistics
}

console.log(main())
