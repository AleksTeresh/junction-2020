/**
 * Utils
 */
export const forEachKey = (obj, fn) => {
  for (const key in obj) {
    fn(key)
  }
}

export const forEachProp = (obj, fn) => {
  for (const key in obj) {
    fn(obj[key])
  }
}

export const mapProp = (obj, fn) => {
  const arr = []
  forEachProp(obj, a => arr.push(fn(a)))
  return arr
}


export const mapPropsToObject = (obj, fn) => {
  const res = {}
  for (const key in obj) {
    res[key] = fn(key, obj[key], obj)
  }
  return res
}

export const findGoalByCategory = (goals, category) => {
  return goals
    .filter(g => g.category === category)[0]
}

export const getCurrentValueToBoundaryRatio = (income, goal, spendingPerCategory) => {
  const limit = goal.updates[goal.updates.length - 1].percentage * income
  const currentValue = spendingPerCategory[goal.category]
  return currentValue / limit
}