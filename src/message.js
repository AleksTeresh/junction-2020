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

function getSmallFailureSuggestionMessage(goal, boundary, ratio) {
  const categoryName = goal.category
  switch (goal.type) {
    case 'LIMIT': 
      return `You've slightly missed your goal on ${categories[categoryName].humanString} last months. Just saving up ${((ratio - 1) * boundary).toFixed(2)} $ and you would achieve your goal!`
    case 'MINIMUM':
      return `You've slightly missed your goal on ${categories[categoryName].humanString} last months. Just allocate ${((ratio - 1) * boundary).toFixed(2)} $ more and you would have achieved your goal!`
    default:
      throw new Error('Unknown type of a goal')
  }
}

function getBigFailureSuggestionMessage(goal, boundary, ratio) {
  const categoryName = goal.category
  switch (goal.type) {
    case 'LIMIT': 
      return `You've seriously missed your goal on ${categories[categoryName].humanString} last month. Indeed, you've went ${((ratio - 1) * boundary).toFixed(2)} $ over your limit! YOu really need to get your act together next month`
    case 'MINIMUM':
      return `You've seriously missed your goal on ${categories[categoryName].humanString} last month. Indeed, you've came short of ${((ratio - 1) * boundary).toFixed(2)} $! You really need to get your act together next month`
    default:
      throw new Error('Unknown type of a goal')
  }
}

function isFailure(goal, ratio) {
  if (goal.type === 'LIMIT') {
    return ratio > 1.0
  } else if (goal.type === 'MINIMUM') {
    return ratio < 1.0
  } else {
    throw new Error('Unknown type of a goal')
  }
}

function isBigFailure(goal, ratio) {
  if (goal.type === 'LIMIT') {
    return ratio > 1.6
  } else if (goal.type === 'MINIMUM') {
    return ratio < 0.5
  } else {
    throw new Error('Unknown type of a goal')
  }
}

export function getSuggestionMesssages(statistic, goals, goalResults) {
  let allSuccess = true
  const failureMessages = Object.entries(goalResults).map(([categoryName, ratio]) => {
    const goal = Utils.findGoalByCategory(goals, categoryName)
    const boundary = goal.updates[goal.updates.length - 1].percentage * statistic.income
    if (isBigFailure(goal, ratio)) {
      allSuccess = false
      return getBigFailureSuggestionMessage(goal, boundary, ratio)
    } else if (isFailure(goal, ratio)) {
      allSuccess = false
      return getSmallFailureSuggestionMessage(goal, boundary, ratio)
    }
  }).filter(p => p !== undefined)

  if (allSuccess) {
    return ["You've achieved all the goals you've set! Great job! Keep going! Wohoooo!"]
  } else {
    return failureMessages
  }
}