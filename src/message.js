import dateFns from 'date-fns'
const { differenceInCalendarDays } = dateFns
import { categories } from './config.js'
import * as Utils from './utils.js'

export function getAlertMessage(alertDate) {
  const {
    endTime,
    category,
    currentValue,
    boundary,
    type
  } = alertDate
  const remainingDays = differenceInCalendarDays(new Date(endTime), new Date())
  switch (type) {
    case 'START':
      return `You should really start spending money on ${categories[category].humanString}. You've only allocated ${currentValue.toFixed(2)}$ out of ${boundary.toFixed(2)} and you only have ${remainingDays} days to go!`
    case 'STOP':
      return `You should really stop spending money on ${categories[category].humanString}. You've already spent ${currentValue.toFixed(2)}$ out of ${boundary.toFixed(2)} and you still have ${remainingDays} days to go!`
    default:
      throw new Error('Unknown type of alert')
  }
}

export function getSuggestionMesssages(statistic, goals, goalResults) {
  let allSuccess = true
  const failureMessages = Object.entries(goalResults).map(([categoryName, ratio]) => {
    const goal = Utils.findGoalByCategory(goals, categoryName)
    const boundary = goal.updates[goal.updates.length - 1].percentage * statistic.income
    if (ratio > 1.6) {
      allSuccess = false
      return `You've seriously missed your goal on ${categories[categoryName].humanString} last month. Indeed, you've went ${((ratio - 1) * boundary).toFixed(2)} $ over your limit! YOu really need to get your act together next month`
    } else if (ratio > 1.0) {
      allSuccess = false
      return `You've slightly missed your goal on ${categories[categoryName].humanString} last months. Just saving up ${((ratio - 1) * boundary).toFixed(2)} $ and you would achieve your goal!`
    }
  }).filter(p => p !== undefined)

  if (allSuccess) {
    return ["You've achieved all the goals you've set! Great job! Keep going! Wohoooo!"]
  } else {
    return failureMessages
  }
}