import dateFns from 'date-fns'
const { startOfMonth, endOfMonth, differenceInHours } = dateFns

export const getAlertsData = (statistics, goals) => { 
  const alerts = goals
    .map(goal => {
      const category = goal.category
      const boundary = goal.updates[goal.updates.length - 1].percentage * statistics.income
      const currentValue = statistics.thisMonthExpenditureByCategory[goal.category]
      const valueRatio = currentValue / boundary
      const timeRatio = differenceInHours(endOfMonth(new Date()), new Date()) /
                        differenceInHours(endOfMonth(new Date()), startOfMonth(new Date()))

      switch (goal.type) {
        case 'LIMIT': {
          if (valueRatio >= 0.1 && timeRatio < 0.9) {
            return {
              type: 'STOP',
              category: category,
              currentValue: currentValue,
              boundary: boundary,
              endTime: endOfMonth(new Date()),
            }
          }
          break
        }
        case 'MINIMUM': {
          if (valueRatio <= 0.7 && timeRatio > 0.1) {
            return {
              type: 'START',
              category: category,
              currentValue: currentValue,
              boundary: boundary,
              endTime: endOfMonth(new Date()),
            }
          }
          break
        }
        default:
      }
    })
    .filter(p => p !== undefined)

  return alerts
}