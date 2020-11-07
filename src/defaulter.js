import * as External from './external.js'
import * as Transactions from './transactions.js'

const now = Date.now()
const transactions = External.getTransactions()
const income = Transactions.getAverageIncome(transactions)

const getGoalsFromIncome = (income) => {
  if (income < 800) {
    return [
      { type: 'LIMITS', category: 'Asuminen', updates: [{ timestamp: now, percentage: 0.6 }] },
      { type: 'LIMITS', category: 'Ruoka_paivittaistavarakauppa', updates: [{ timestamp: now, percentage: 0.3 }] },
      { type: 'LIMITS', category: 'Saastot_sijoitukset', updates: [{ timestamp: now, percentage: 0.1 }] },
      { type: 'LIMITS', category: 'Ravintolat_kahvilat', updates: [{ timestamp: now, percentage: 0.1 }] },
    ]
  } else if (income < 2000) {
    return [
      { type: 'LIMITS', category: 'Asuminen', updates: [{ timestamp: now, percentage: 0.4 }] },
      { type: 'LIMITS', category: 'Ruoka_paivittaistavarakauppa', updates: [{ timestamp: now, percentage: 0.15 }] },
      { type: 'LIMITS', category: 'Saastot_sijoitukset', updates: [{ timestamp: now, percentage: 0.25 }] },
      { type: 'LIMITS', category: 'Liikkuminen', updates: [{ timestamp: now, percentage: 0.05 }] },
      { type: 'LIMITS', category: 'Kulttuuri_viihde', updates: [{ timestamp: now, percentage: 0.05 }] },
      { type: 'LIMITS', category: 'Hyvinvointi', updates: [{ timestamp: now, percentage: 0.05 }] },
      { type: 'LIMITS', category: 'Harrastukset', updates: [{ timestamp: now, percentage: 0.05 }] },
      { type: 'LIMITS', category: 'Ravintolat_kahvilat', updates: [{ timestamp: now, percentage: 0.1 }] },
    ]
  } else if (income < 4000) {
    return [
      { type: 'LIMITS', category: 'Asuminen', updates: [{ timestamp: now, percentage: 0.25 }] },
      { type: 'LIMITS', category: 'Ruoka_paivittaistavarakauppa', updates: [{ timestamp: now, percentage: 0.1 }] },
      { type: 'LIMITS', category: 'Saastot_sijoitukset', updates: [{ timestamp: now, percentage: 0.3 }] },
      { type: 'LIMITS', category: 'Liikkuminen', updates: [{ timestamp: now, percentage: 0.04 }] },
      { type: 'LIMITS', category: 'Kulttuuri_viihde', updates: [{ timestamp: now, percentage: 0.05 }] },
      { type: 'LIMITS', category: 'Hyvinvointi', updates: [{ timestamp: now, percentage: 0.07 }] },
      { type: 'LIMITS', category: 'Harrastukset', updates: [{ timestamp: now, percentage: 0.08 }] },
      { type: 'LIMITS', category: 'Ravintolat_kahvilat', updates: [{ timestamp: now, percentage: 0.1 }] },
    ]
  } else {
    return [
      { type: 'LIMITS', category: 'Asuminen', updates: [{ timestamp: now, percentage: 0.25 }] },
      { type: 'LIMITS', category: 'Saastot_sijoitukset', updates: [{ timestamp: now, percentage: 0.45 }] },
      { type: 'LIMITS', category: 'Hyvinvointi', updates: [{ timestamp: now, percentage: 0.08 }] },
      { type: 'LIMITS', category: 'Harrastukset', updates: [{ timestamp: now, percentage: 0.08 }] },
      { type: 'LIMITS', category: 'Ravintolat_kahvilat', updates: [{ timestamp: now, percentage: 0.1 }] },
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
