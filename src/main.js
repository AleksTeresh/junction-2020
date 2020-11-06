import * as Analyzers from './analyzers.js'
import * as External from './external.js'


// const forEachProp = (obj, fn) => {
//   for (const key in obj) {
//     fn(obj[key])
//   }
// }

// const mapProp = (obj, fn) => {
//   const arr = []
//   forEachProp(obj, a => arr.push(a))
//   return arr
// }


/**
 * Main
 */
const transactions = External.getTransactions()
const state = External.getState()
const analyzers = [
  Analyzers.limit,
  Analyzers.reward,
]

function main() {
  const result = {
    limits: {},
    rewards: {},
  }
  state.goals.forEach(goal => analyzers.forEach(analyzer => analyzer(result, transactions, state, goal)))
  return result
}

// console.log(mapProp(Analyzers))

console.log(main())
