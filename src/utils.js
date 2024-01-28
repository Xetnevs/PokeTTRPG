const capitalizeRomanNumerals = input => {
  // Define a regular expression for identifying Roman numerals
  const romanNumeralPattern =
    /\b(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})\b/gi

  // Replace each Roman numeral with its capitalized form
  const result = input.replace(romanNumeralPattern, match =>
    match.toUpperCase()
  )

  return result
}

export const sanitizeString = (inputString = '') => {
  const stringWithSpaces = inputString.replaceAll('-', ' ').replaceAll('_', ' ')
  const capitalizedString = stringWithSpaces.replace(/\b\w/g, match =>
    match.toUpperCase()
  )
  return capitalizeRomanNumerals(capitalizedString)
}
