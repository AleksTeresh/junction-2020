import dateFns from 'date-fns'
const { differenceInMonths } = dateFns

export function testLimit(category, monthCount) {
  return (statistics, goals) => {
    const thisGoal = goals.filter(g => g.type === 'LIMITS' && g.category === category)[0]
    if (!thisGoal) return false

    const lastLimitUpdate = thisGoal.updates[thisGoal.updates.length - 1]
    if (differenceInMonths(new Date(), new Date(lastLimitUpdate.timestamp)) < monthCount) {
      return false
    }

    const limit = lastLimitUpdate.percentage * statistics.income // in dollars
    const result = statistics.prevMonthExpenditureByCategory.slice(0, monthCount)
      .reduce((acc, prevMonthExpenditure) => {
        const currentValue = prevMonthExpenditure[category]
        const valueRatio = currentValue / limit
        return acc && valueRatio < 1.0
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