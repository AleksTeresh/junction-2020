import * as fs from 'fs'

const PATH_TRANSACTIONS = process.argv[3]
const PATH_STATE = process.argv[2]

/**
 * External Requests
 */
export const getTransactions = () => {
  return JSON.parse(fs.readFileSync(PATH_TRANSACTIONS))
}

export const getState = () => {
  return JSON.parse(fs.readFileSync(PATH_STATE))
}

export const setState = (state) => {
  fs.writeFileSync(PATH_STATE, JSON.stringify(state, null, 2))
}
