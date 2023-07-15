export function convertTypes(str: string): any {
  if (/^-?\d*\.?\d+$/.test(str)) {
    return parseFloat(str)
  }

  if (/^(true|false)$/i.test(str)) {
    return str.toLowerCase() === 'true'
  }

  return str
}
