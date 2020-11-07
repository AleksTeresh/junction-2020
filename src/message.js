import dateFns from 'date-fns'
const { differenceInCalendarDays } = dateFns
import { categories } from './config.js'

export function getAlertMessage(alertDate) {
  const {
    endTime,
    category,
    currentValue,
    limit,
    type
  } = alertDate
  const remainingDays = differenceInCalendarDays(new Date(endTime), new Date())
  switch (type) {
    case 'START':
      return `You should really start spending money on ${categories[category].humanString}. You've only spent ${currentValue}$ out of ${limit} and you only have ${remainingDays} days to go!`
    case 'STOP':
      return `You should really stop spending money on ${categories[category].humanString}. You've already spent ${currentValue}$ out of ${limit} and you still have ${remainingDays} days to go!`
    default:
      throw new Error('Unknown type of alert')
  }
}