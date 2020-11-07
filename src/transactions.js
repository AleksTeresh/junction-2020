import dateFns from 'date-fns'
const { startOfMonth, isWithinInterval, parseISO, parse } = dateFns

/**
 * Transaction Queries
 */
export const getMonthlyExpendature = (transactions, category, now) => {
  const startTime = startOfMonth(new Date())
  const endTime = new Date(now)
  const interval = { start: startTime, end: endTime }

  const result = transactions
    .filter(t => isWithinInterval(parseISO(t.timestamp), interval) && t.category.includes(category))
    .reduce((acc, t) => acc + t.amount, 0)
  return -result
}
