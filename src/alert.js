import dateFns from 'date-fns'
const { startOfMonth, endOfMonth, differenceInHours } = dateFns

export const getAlertsData = (stats, goals) => {
  const alerts = goals
    .filter(g => g.type === 'LIMITS')
    .map(g => {
      const category = g.category
      const limit = g.updates[g.updates.length - 1].percentage * stats.income
      const currentValue = stats['LIMITS'][category]['limit'] * stats.income
      const valueRatio = currentValue / limit
      const timeRatio = differenceInHours(endOfMonth(new Date()), new Date()) /
                        differenceInHours(endOfMonth(new Date()), startOfMonth(new Date()))

      if (valueRatio >= 0.1 && timeRatio < 0.8) {
        return {
          type: 'STOP',
          category,
          currentValue,
          limit,
          endTime: endOfMonth(new Date()),
        }
      }
    })
    .filter(p => p !== undefined)

  return alerts
}