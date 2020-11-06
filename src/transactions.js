import dateFns from 'date-fns'
const { startOfMonth, endOfMonth, isWithinInterval, parseISO } = dateFns

/**
 * Transaction Queries
 */
export const getMonthlyExpendature = (transactions, category) => {
  const startTime = startOfMonth(new Date())
  const endTime = endOfMonth(new Date())

  const result = transactions
    .filter(t => isWithinInterval(parseISO(t.timestamp), { start: startTime, end: endTime }) && t.category.includes(category))
    .reduce((acc, t) => acc + t.amount, 0)
  return -result
}
