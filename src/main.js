import * as Alert from './alert.js'
import * as Message from './message.js'
import * as Analyzers from './analyzers.js'
import * as External from './external.js'
import * as Utils from './utils.js'
import * as Config from './config.js'

/**
 * Main
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
  // const categoryExpenditure = 
}


function getIncome() {
  return 2000
}

function main() {
  const transactions = External.getTransactions()
  const state = External.getState()
  const analyzers = Utils.mapProp(Analyzers, a => a)

  /**
   * Generate Statistics
   */
  const statistics = {
    income: getIncome(transactions)
  }
  state.goals.forEach(goal => analyzers.forEach(analyzer => {
    statistics[goal.type] = statistics[goal.type] || {}
    statistics[goal.type][goal.category] = statistics[goal.type][goal.category] || {}
    statistics[goal.type][goal.category][analyzer.name] = analyzer(transactions, state, goal)
  }))

  console.log('statistics', statistics)
  
  /**
   * Generate Result from Statistics
   */
  const alertsData = Alert.getAlertsData(statistics, state.goals)
  console.log(alertsData)
  return {
    rewards: getRewards(statistics, state),
    achievements: getAchievements(statistics, state),
    reports: [{
      id: 1234567890,
      monthlyExpendatureByCategory: {
        'Entertainment': 400,
        'Living': 600,
      },
      monthlyGoalDelta: {
        'Entertainment': -20,
        'Living': 15,
      },
      suggestions: [
        { 
          id: 1234,
          type: 'REDUCE',
          category: 'Entertainment',
          amount: 10,
          timeframe: '2 Weeks',
          message: '{0} spending on {1} by {2} euros in the next {3}'
        }
      ]
    }],
    alerts: alertsData.map(a => ({
      ...a,
      message: Message.getAlertMessage(a)
    }))
  }
}

console.log(main())
