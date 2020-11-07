import dateFns from 'date-fns'
const { startOfMonth, endOfMonth, differenceInHours } = dateFns
import * as Utils from './utils.js'

export const getAlertsData = (statistics, goals) => { 
  const alerts = goals
    .filter(g => g.type === 'LIMITS')
    .map(goal => {
      const category = goal.category
      const limit = goal.updates[goal.updates.length - 1].percentage * statistics.income
      const currentValue = statistics.thisMonthExpenditureByCategory[goal.category]
      const valueRatio = currentValue / limit
      const timeRatio = differenceInHours(endOfMonth(new Date()), new Date()) /
                        differenceInHours(endOfMonth(new Date()), startOfMonth(new Date()))

      if (valueRatio >= 0.1 && timeRatio < 0.9) {
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