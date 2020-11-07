import dateFns from 'date-fns'
const { endOfMonth, addMonths } = dateFns
import * as Alert from './alert.js'
import * as Message from './message.js'
import * as External from './external.js'
import * as Utils from './utils.js'
import * as Config from './config.js'
import * as Transactions from './transactions.js'


/**
 * Statistics Generation
 */
const getThisMonthExpenditureByCategory = (transactions) => {
  return Utils.mapPropsToObject(Config.categories, (category) => Transactions.getMonthlyExpenditure(transactions, category, new Date()))
}

const getPrevMonthsExpenditureByCategory = (transactions) => {
  return [...Array(8).keys()]
    .filter(k => k !== 0)
    .map(monthsBack => 
      Utils.mapPropsToObject(
        Config.categories,
        (category) => Transactions.getMonthlyExpenditure(
          transactions,
          category, 
          endOfMonth(addMonths(new Date(), -monthsBack))
        ))
    ) 
} 

/**
 * Result Generation
 */
const getRewards = (statistics, state) => {
  const existingRewards = state.rewards
  const newRewards =  Config.rewards.filter(reward => !existingRewards.includes(reward.id)).filter(reward => reward.test(statistics)).map(reward => reward.id)
  return [
    ...existingRewards,
    ...newRewards
  ]
}

const getAchievements = (statistics, state) => {
  const existingAchievements = state.achievements
  const newAchievements = Config.achievements.filter(achievement => !existingAchievements.includes(achievement.id)).filter(achievement => achievement.test(statistics)).map(achievement => achievement.id)
  return [
    ...existingAchievements,
    ...newAchievements
  ]
}

const getMonthlyReport = (statistics) => {
  return null
}

const getAlerts = (statistics, state) => {
  const alertsData = Alert.getAlertsData(statistics, state.goals)
  return alertsData.map(alertData => ({
    ...alertData,
    message: Message.getAlertMessage(alertData)
  }))
}


/**
 * Main Execution
 */
function main() {
  /**
   * Get External Data
   */
  const transactions = External.getTransactions()
  const state = External.getState()

  /**
   * Generate Statistics from External Data
   */
  const statistics = {
    income: Transactions.getAverageIncome(transactions),
    thisMonthExpenditureByCategory: getThisMonthExpenditureByCategory(transactions),
    prevMonthExpenditureByCategory: getPrevMonthsExpenditureByCategory(transactions),
  }
  console.log('STATS', statistics)
  /**
   * Generate Result from Statistics
   */
  return {
    rewards: getRewards(statistics, state),
    achievements: getAchievements(statistics, state),
    reports: getMonthlyReport(statistics),
    alerts: getAlerts(statistics, state),
  }
}

console.log(main())
