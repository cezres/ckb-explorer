export const validNumber = (value: any, defaultValue: number) => {
  if (typeof value !== 'string') {
    return defaultValue
  }
  return value ? parseInt(value, 10) : defaultValue
}

export const startEndEllipsis = (value: string, length = 8) => {
  if (value === undefined || value === null) return ''
  return `${value.substr(0, 16)}...${value.substr(value.length - length, length)}`
}

export const hexToUtf8 = (value: string) => {
  return value ? decodeURIComponent(value.replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&')) : value
}
