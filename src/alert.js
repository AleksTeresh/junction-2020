import dateFns from 'date-fns'
const { startOfMonth, endOfMonth, differenceInHours } = dateFns
import * as Reward from './reward.js'

export const getAlertsData = (
  statistics,
  goals,
  rewardDelta,
  achievementDelta
) => {
  const goalAlerts = goals
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

  const goalChangeAlerts = goals
    .map(goal => {
      const category = goal.category
      const monthCount = 3
      const goalWasAchivedManyTimes = Reward.testBoundary(category, monthCount)(statistics, goals)

      if (goalWasAchivedManyTimes) {
        const currentGoalValue = goal.updates[goal.updates.length - 1].percentage * statistics.income

        switch (goal.type) {
          case 'LIMIT': {
            const suggestedGoalValue = Math.max(
              currentGoalValue * 0.8,
              Math.max(0, currentGoalValue - 30)
            )
            return {
              type: 'DECREASE',
              category: category,
              currentValue: currentGoalValue,
              suggestedValue: suggestedGoalValue
            }
          }
          case 'MINIMUM': {
            const suggestedGoalValue = Math.max(
              currentGoalValue * 1.1,
              Math.max(0, currentGoalValue + 40)
            )
            return {
              type: 'INCREASE',
              category: category,
              currentValue: currentGoalValue,
              suggestedValue: suggestedGoalValue
            }            
          }
          default:
        }
      }
    })
    .filter(p => p !== undefined)

  const achievementAlerts = achievementDelta.map(achievement => {
    return {
      type: 'ACHIEVEMENT',
      name: achievement
    }
  })

  const rewardAlerts = rewardDelta.map(reward => {
    return {
      type: 'REWARD',
      name: reward
    }
  })

  return [...goalAlerts, ...achievementAlerts, ...rewardAlerts, ...goalChangeAlerts]
}