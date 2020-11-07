import * as Transactions from './transactions.js'

/**
 * Analyzers
 */
export const limit = (transactions, state, goal) => {
  if (goal.type !== 'LIMITS') return
  const goalValue = state.income * goal.updates[goal.updates.length - 1].percentage
  const currentValue = Transactions.getMonthlyExpendature(transactions, goal.category, state.now)
  console.log('currentValue', currentValue)
  return currentValue / goalValue
}

// export const reward = (transactions, state, goal) => {
//   if (goal.type !== 'LIMIT') return
//   const goalValue = state.income * goal.updates[goal.updates.length - 1].percentage
//   const currentValue = Transactions.getMonthlyExpendature(transactions, goal.category, state.now)
//   if (currentValue < goalValue / 2) {
//     return 'FREE MOVIE TICKET' 
//   }
// }