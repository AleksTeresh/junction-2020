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