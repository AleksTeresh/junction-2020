import * as fs from 'fs'

/**
 * External Requests
 */
export const getTransactions = () => {
  return JSON.parse(fs.readFileSync('./data/dude7.json'))
}

export const getState = () => {
  return {
    income: 2000,
    goals: [
      { type: 'LIMIT', category: 'Ravintolat_kahvilat', updates: [{ timestamp: 191231234, percentage: 0.1 }] },
    ]
  }
}
