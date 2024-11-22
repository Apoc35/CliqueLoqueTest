function validateCNPJ(cnpj) {
  // Remove any characters that aren't digits
  cnpj = cnpj.replace(/[^\d]/g, '')

  // Validate length
  if (cnpj.length !== 14) return false

  // Validate if all digits are the same
  if (/^(\d)\1{13}$/.test(cnpj)) return false

  // Calculate first check digit
  let sum = 0
  let weight = 2
  for (let i = 11; i >= 0; i--) {
    sum += parseInt(cnpj.charAt(i)) * weight
    weight = weight === 9 ? 2 : weight + 1
  }
  let digit = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (parseInt(cnpj.charAt(12)) !== digit) return false

  // Calculate second check digit
  sum = 0
  weight = 2
  for (let i = 12; i >= 0; i--) {
    sum += parseInt(cnpj.charAt(i)) * weight
    weight = weight === 9 ? 2 : weight + 1
  }
  digit = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (parseInt(cnpj.charAt(13)) !== digit) return false

  return true
}

module.exports = { validateCNPJ }