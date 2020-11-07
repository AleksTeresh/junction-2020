import * as External from './external.js'
import * as Transactions from './transactions.js'

const now = Date.now() // - 9999999999999999
const transactions = External.getTransactions()
const income = Transactions.getAverageIncome(transactions)

const totalSpendGoal = process.argv[3]
const totalGoalRatio = totalSpendGoal / income
const totalGoalRatioComplement = 1 - totalGoalRatio

const getGoalsFromIncome = (income) => {
  if (income < 800) {
    return [
      { type: 'LIMIT', category: 'Asuminen', updates: [{ timestamp: now, percentage: 0.6 * totalGoalRatio}] },
      { type: 'LIMIT', category: 'Ruoka_paivittaistavarakauppa', updates: [{ timestamp: now, percentage: 0.3 * totalGoalRatio}] },
      { type: 'MINIMUM', category: 'Saastot_sijoitukset', updates: [{ timestamp: now, percentage: 0.1 * totalGoalRatioComplement}] },
      { type: 'LIMIT', category: 'Ravintolat_kahvilat', updates: [{ timestamp: now, percentage: 0.1 * totalGoalRatio}] },
    ]
  } else if (income < 2000) {
    return [
      { type: 'LIMIT', category: 'Asuminen', updates: [{ timestamp: now, percentage: 0.4 * totalGoalRatio}] },
      { type: 'LIMIT', category: 'Ruoka_paivittaistavarakauppa', updates: [{ timestamp: now, percentage: 0.15 * totalGoalRatio}] },
      { type: 'MINIMUM', category: 'Saastot_sijoitukset', updates: [{ timestamp: now, percentage: 0.25 * totalGoalRatioComplement}] },
      { type: 'LIMIT', category: 'Liikkuminen', updates: [{ timestamp: now, percentage: 0.05 * totalGoalRatio}] },
      { type: 'LIMIT', category: 'Kulttuuri_viihde', updates: [{ timestamp: now, percentage: 0.05 * totalGoalRatio}] },
      { type: 'LIMIT', category: 'Hyvinvointi', updates: [{ timestamp: now, percentage: 0.05 * totalGoalRatio}] },
      { type: 'LIMIT', category: 'Harrastukset', updates: [{ timestamp: now, percentage: 0.05 * totalGoalRatio}] },
      { type: 'LIMIT', category: 'Ravintolat_kahvilat', updates: [{ timestamp: now, percentage: 0.1 * totalGoalRatio}] },
    ]
  } else if (income < 4000) {
    return [
      { type: 'LIMIT', category: 'Asuminen', updates: [{ timestamp: now, percentage: 0.25 * totalGoalRatio}] },
      { type: 'LIMIT', category: 'Ruoka_paivittaistavarakauppa', updates: [{ timestamp: now, percentage: 0.1 * totalGoalRatio}] },
      { type: 'MINIMUM', category: 'Saastot_sijoitukset', updates: [{ timestamp: now, percentage: 0.3 * totalGoalRatioComplement}] },
      { type: 'LIMIT', category: 'Liikkuminen', updates: [{ timestamp: now, percentage: 0.04 * totalGoalRatio}] },
      { type: 'LIMIT', category: 'Kulttuuri_viihde', updates: [{ timestamp: now, percentage: 0.05 * totalGoalRatio}] },
      { type: 'LIMIT', category: 'Hyvinvointi', updates: [{ timestamp: now, percentage: 0.07 * totalGoalRatio}] },
      { type: 'LIMIT', category: 'Harrastukset', updates: [{ timestamp: now, percentage: 0.08 * totalGoalRatio}] },
      { type: 'LIMIT', category: 'Ravintolat_kahvilat', updates: [{ timestamp: now, percentage: 0.1 * totalGoalRatio}] },
    ]
  } else {
    return [
      { type: 'LIMIT', category: 'Asuminen', updates: [{ timestamp: now, percentage: 0.25 * totalGoalRatio}] },
      { type: 'MINIMUM', category: 'Saastot_sijoitukset', updates: [{ timestamp: now, percentage: 0.45 * totalGoalRatioComplement}] },
      { type: 'LIMIT', category: 'Hyvinvointi', updates: [{ timestamp: now, percentage: 0.08 * totalGoalRatio}] },
      { type: 'LIMIT', category: 'Harrastukset', updates: [{ timestamp: now, percentage: 0.08 * totalGoalRatio}] },
      { type: 'LIMIT', category: 'Ravintolat_kahvilat', updates: [{ timestamp: now, percentage: 0.1 * totalGoalRatio}] },
    ]
  }
}

const defaultState = {
  rewards: [],
  achievements: [],
  goals: getGoalsFromIncome(income),
  now: now
}

External.setState(defaultState)
