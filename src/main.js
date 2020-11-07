import dateFns from 'date-fns'
const { endOfMonth, addMonths } = dateFns
import * as Alert from './alert.js'
import * as Message from './message.js'
import * as External from './external.js'
import * as Utils from './utils.js'
import * as Config from './config.js'
import * as Transactions from './transactions.js'
import * as Reward from './reward.js'

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
  const newRewards =  Reward.rewards.filter(reward => !existingRewards.includes(reward.id)).filter(reward => reward.test(statistics, state.goals)).map(reward => reward.id)
  return [
    ...existingRewards,
    ...newRewards
  ]
}

const getAchievements = (statistics, state) => {
  const existingAchievements = state.achievements
  const newAchievements = Reward.achievements.filter(achievement => !existingAchievements.includes(achievement.id)).filter(achievement => achievement.test(statistics, state.goals)).map(achievement => achievement.id)
  return [
    ...existingAchievements,
    ...newAchievements
  ]
}


const getGoalResults = (statistics, state) => {
  return state.goals
    .reduce((acc, goal) => {
      return {
        ...acc,
        [goal.category]: Utils.getCurrentValueToBoundaryRatio(
          statistics.income,
          goal,
          statistics.thisMonthExpenditureByCategory
        )
      } 
    }, {})
}

const getMonthlyReport = (statistics, state) => {
  const goalResults = getGoalResults(statistics, state)
  const suggestions = Message.getSuggestionMesssages(
    statistics,
    state.goals,
    goalResults
  )
  return {
    thisMonthExpenditureByCategory: statistics.thisMonthExpenditureByCategory,
    suggestions: suggestions,
    goals: goalResults
  }
}

const getAlerts = (statistics, state) => {
  const alertsData = Alert.getAlertsData(statistics, state.goals)
  return alertsData.map(alertData => Message.getAlertMessage(alertData))
}


/**
 * Main Execution
 */
function onTransaction() {
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

  /**
   * Generate Result from Statistics
   */
  const result = {
    rewards: getRewards(statistics, state),
    achievements: getAchievements(statistics, state),
    reports: getMonthlyReport(statistics, state),
    alerts: getAlerts(statistics, state),
  }

  /**
   * Set State
   */
  const newState = { 
    ...state,
    rewards: result.rewards,
    achievements: result.achievements,
  }
  External.setState(newState)

  return result
}

console.log(onTransaction())
