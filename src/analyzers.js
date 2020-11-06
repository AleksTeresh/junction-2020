import * as Transactions from './transactions.js'

/**
 * Analyzers
 */
export const limit = (result, transactions, state, goal) => {
  if (goal.type !== 'LIMIT') return
  const goalValue = state.income * goal.updates[goal.updates.length - 1].percentage
  const currentValue = Transactions.getMonthlyExpendature(transactions, goal.category)
  result.limits[goal.type] = currentValue > goalValue ? 'EXCEEDED' : 'WITHIN'
}

export const reward = (result, transactions, state, goal) => {
  if (goal.type !== 'LIMIT') return
  const goalValue = state.income * goal.updates[goal.updates.length - 1].percentage
  const currentValue = Transactions.getMonthlyExpendature(transactions, goal.category)
  if (currentValue < goalValue / 2) {
    result.rewards[goal.type] = 'FREE MOVIE TICKET' 
  }
}