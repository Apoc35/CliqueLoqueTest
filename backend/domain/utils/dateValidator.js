function validateDate(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return false
  }

  return true
}

module.exports = { validateDate }