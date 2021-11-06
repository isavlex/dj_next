export default function isEmpty(obj) {
  if (obj) {
    return Object.keys(obj).length ? false : true
  }
  return true
}