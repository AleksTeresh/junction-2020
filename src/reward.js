import dateFns from 'date-fns'
const { differenceInMonths } = dateFns
import * as Utils from './utils.js'

export function testLimit(category, monthCount) {
  return (statistics, goals) => {
    const thisGoal = Utils.findGoalByCategory(goals, category)
    if (!thisGoal) return false

    const lastLimitUpdate = thisGoal.updates[thisGoal.updates.length - 1]
    if (differenceInMonths(new Date(), new Date(lastLimitUpdate.timestamp)) < monthCount) {
      return false
    }

    const result = statistics.prevMonthExpenditureByCategory.slice(0, monthCount)
      .reduce((acc, prevMonthExpenditure) => {
       const valueRatio = Utils.getCurrentValueToBoundaryRatio(
          statistics.income,
          thisGoal,
          prevMonthExpenditure
        )

        switch (thisGoal.type) {
          case 'LIMIT': 
            return acc && valueRatio < 1.0
          case 'MINIMUM':
            return acc && valueRatio >= 1.0
          default:
            return false
        }
      }, true)
    return result
  }
}

export const rewards = [
  {
    id: 'CATEGORY_LIMIT_MASTERY_EATOUT',
    definition: 'Meet your Eating out limit goal for 3 consecutive months',
    test: testLimit('Ravintolat_kahvilat', 3)
  },
  {
    id: 'CATEGORY_LIMIT_MASTERY_ENTERTAIMENT',
    definition: 'Meet your Entertainment limit goal for 3 consecutive months',
    test: testLimit('Kulttuuri_viihde', 3)
  },
  {
    id: 'CATEGORY_LIMIT_MASTERY_GROCERIES',
    definition: 'Meet your Groceries limit goal for 3 consecutive months',
    test: testLimit('Ruoka_paivittaistavarakauppa', 3)
  }
]

export const achievements = [
  {
    id: 'CATEGORY_LIMIT_MASTERY_EATOUT',
    definition: 'Meet your Eating out limit goal for 3 consecutive months',
    test: testLimit('Ravintolat_kahvilat', 3)
  },
  {
    id: 'CATEGORY_LIMIT_MASTERY_ENTERTAIMENT',
    definition: 'Meet your Entertainment limit goal for 3 consecutive months',
    test: testLimit('Kulttuuri_viihde', 3)
  },
  {
    id: 'CATEGORY_LIMIT_MASTERY_GROCERIES',
    definition: 'Meet your Groceries limit goal for 3 consecutive months',
    test: testLimit('Ruoka_paivittaistavarakauppa', 3)
  }
]