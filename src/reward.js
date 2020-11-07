import dateFns from 'date-fns'
const { differenceInMonths } = dateFns
import * as Utils from './utils.js'

export function testBoundary(category, monthCount) {
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

export const rewards = {
  CATEGORY_LIMIT_APPRENTICE_EATOUT: {
    id: 'CATEGORY_LIMIT_APPRENTICE_EATOUT',
    definition: 'Meet your Eating out limit goal for 1 month',
    test: testBoundary('Ravintolat_kahvilat', 1)
  },
  CATEGORY_LIMIT_JOURNEYMAN_ENTERTAIMENT: {
    id: 'CATEGORY_LIMIT_JOURNEYMAN_ENTERTAIMENT',
    definition: 'Meet your Entertainment limit goal for 3 consecutive months',
    test: testBoundary('Kulttuuri_viihde', 3)
  },
  CATEGORY_LIMIT_MASTERY_GROCERIES: {
    id: 'CATEGORY_LIMIT_MASTERY_GROCERIES',
    definition: 'Meet your Groceries limit goal for 6 consecutive months',
    test: testBoundary('Ruoka_paivittaistavarakauppa', 6)
  },
  CATEGORY_MIMIMUM_APPRENTICE_INVESTMENT: {
    id: 'CATEGORY_MIMIMUM_APPRENTICE_INVESTMENT',
    definition: 'Meet your Investment alloccation goal for 1 month',
    test: testBoundary('Saastot_sijoitukset', 1)
  },
  CATEGORY_MIMIMUM_JOURNEYMAN_INVESTMENT: {
    id: 'CATEGORY_MIMIMUM_JOURNEYMAN_INVESTMENT',
    definition: 'Meet your Investment alloccation goal for 3 consecutive months',
    test: testBoundary('Saastot_sijoitukset', 3)
  }
}

export const achievements = {
  CATEGORY_LIMIT_APPRENTICE_EATOUT: {
    id: 'CATEGORY_LIMIT_APPRENTICE_EATOUT',
    definition: 'Meet your Eating out limit goal for 1 month',
    test: testBoundary('Ravintolat_kahvilat', 1)
  },
  CATEGORY_LIMIT_APPRENTICE_ENTERTAIMENT: {
    id: 'CATEGORY_LIMIT_APPRENTICE_ENTERTAIMENT',
    definition: 'Meet your Entertainment limit goal for 1 month',
    test: testBoundary('Kulttuuri_viihde', 1)
  },
  CATEGORY_LIMIT_APPRENTICE_GROCERIES: {
    id: 'CATEGORY_LIMIT_APPRENTICE_GROCERIES',
    definition: 'Meet your Groceries limit goal for 1 month',
    test: testBoundary('Ruoka_paivittaistavarakauppa', 1)
  },
  CATEGORY_LIMIT_JOURNEYMAN_EATOUT: {
    id: 'CATEGORY_LIMIT_JOURNEYMAN_EATOUT',
    definition: 'Meet your Eating out limit goal for 3 consecutive months',
    test: testBoundary('Ravintolat_kahvilat', 3)
  },
  CATEGORY_LIMIT_JOURNEYMAN_ENTERTAIMENT: {
    id: 'CATEGORY_LIMIT_JOURNEYMAN_ENTERTAIMENT',
    definition: 'Meet your Entertainment limit goal for 3 consecutive months',
    test: testBoundary('Kulttuuri_viihde', 3)
  },
  CATEGORY_LIMIT_JOURNEYMAN_GROCERIES: {
    id: 'CATEGORY_LIMIT_JOURNEYMAN_GROCERIES',
    definition: 'Meet your Groceries limit goal for 3 consecutive months',
    test: testBoundary('Ruoka_paivittaistavarakauppa', 3)
  },
  CATEGORY_LIMIT_MASTERY_EATOUT: {
    id: 'CATEGORY_LIMIT_MASTERY_EATOUT',
    definition: 'Meet your Eating out limit goal for 6 consecutive months',
    test: testBoundary('Ravintolat_kahvilat', 6)
  },
  CATEGORY_LIMIT_MASTERY_ENTERTAIMENT: {
    id: 'CATEGORY_LIMIT_MASTERY_ENTERTAIMENT',
    definition: 'Meet your Entertainment limit goal for 6 consecutive months',
    test: testBoundary('Kulttuuri_viihde', 6)
  },
  CATEGORY_LIMIT_MASTERY_GROCERIES: {
    id: 'CATEGORY_LIMIT_MASTERY_GROCERIES',
    definition: 'Meet your Groceries limit goal for 6 consecutive months',
    test: testBoundary('Ruoka_paivittaistavarakauppa', 6)
  },
}