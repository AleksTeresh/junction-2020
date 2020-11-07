/**
 * Utils
 */
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