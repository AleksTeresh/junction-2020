import dateFns from 'date-fns'
const { endOfMonth, startOfMonth, addMonths, isWithinInterval, parseISO } = dateFns

/**
 * Transaction Queries
 */
export const getMonthlyExpenditure = (transactions, category, endTime) => {
  const startTime = startOfMonth(endTime)
  const interval = { start: startTime, end: endTime }

  const result = transactions
    .filter(t => isWithinInterval(parseISO(t.timestamp), interval) && t.category.includes(category))
    .reduce((acc, t) => acc + t.amount, 0)
  return result === 0 ? 0 : -result
}

export function getAverageIncome(transactions) {
  const lookBackMonths = 6
  const interval = { start: addMonths(startOfMonth(new Date()), -lookBackMonths), end: addMonths(endOfMonth(new Date()), -1) }
  const incomeAverage = transactions
    .filter(t => t.amount > 0 && isWithinInterval(parseISO(t.timestamp), interval))
    .reduce((acc, t) => acc + t.amount, 0) / lookBackMonths
  return incomeAverage
}