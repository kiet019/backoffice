export const backgroundColor = '#DDDFE5'

export const checkDuplicate = (data: string, option: string[]) => {
  const isDuplicate = option.find(value => value === data)
  return isDuplicate
}

export function encodeTextToNumber(text: string) {
  let result = ''
  for (let i = 0; i < text.length; i++) {
    result += text.charCodeAt(i).toString().padStart(3, '0')
  }
  return `1` + result
}

export function decodeNumberToText(number: string) {
  let result = ''
  for (let i = 1; i < number.length; i += 3) {
    const charCode = parseInt(number.substring(i, i + 3))
    result += String.fromCharCode(charCode)
  }
  return result
}

export const convertArrayToString = (array: any[]): string => {
  let string = ''
  array.forEach(item => (string += `-${item}`))
  return string.slice(1, string.length)
}

export const convertStringToArray = (data: string | undefined): any[] => {
  if (data) {
    const array = data.split('-')
    return array
  } else {
    return []
  }
}
