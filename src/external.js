import * as fs from 'fs'

const userId = process.argv[2]
const PATH_TRANSACTIONS = `./data/dude${userId}.json`
const PATH_STATE = `./data/state${userId}.json`

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
