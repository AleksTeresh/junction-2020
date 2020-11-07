import * as fs from 'fs'

/**
 * External Requests
 */
export const getTransactions = () => {
  return JSON.parse(fs.readFileSync(process.argv[2]))
}

export const getState = () => {
  return {
    income: 2000,
    rewards: [],
    achievements: [],
    goals: [
      { type: 'LIMITS', category: 'Ravintolat_kahvilat', updates: [{ timestamp: 191231234, percentage: 0.07 }] },
      { type: 'LIMITS', category: 'Kulttuuri_viihde', updates: [{ timestamp: 191231234, percentage: 0.07 }] },
      { type: 'LIMITS', category: 'Ruoka_paivittaistavarakauppa', updates: [{ timestamp: 191231234, percentage: 0.07 }] },
    ],
    now: 1604730272000
  }
}
