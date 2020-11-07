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
    goals: [
      { type: 'LIMIT', category: 'Ravintolat_kahvilat', updates: [{ timestamp: 191231234, percentage: 0.05 }] },
    ],
    now: 1604730272000
  }
}
