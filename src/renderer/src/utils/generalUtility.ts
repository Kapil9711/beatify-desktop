export const stringUtility = {
  isEmpty: (str: string) => str.trim().length === 0,

  toSlug: (str: string) =>
    str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, ''),

  isEmail: (str: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str),

  capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),

  truncate: (str: string, length: number) =>
    str.length <= length ? str : str.slice(0, length) + '...',

  isUrl: (str: string) => /^(https?:\/\/)?([^\s.]+\.\S{2,}|localhost[:?\d]*)\S*$/.test(str),

  removeExtraSpaces: (str: string) => str.replace(/\s+/g, ' ').trim(),

  kebabCase: (str: string) =>
    str
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase(),

  snakeCase: (str: string) =>
    str
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/\s+/g, '_')
      .toLowerCase(),

  removeSpecialChars: (str: string) => str.replace(/[^\w\s]/gi, ''),

  camelCase: (str: string) =>
    str
      .replace(/[-_]+/g, ' ')
      .trim()
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, '')
}
export const numberUtility = {
  isPositive: (num: number) => num > 0,
  isNumber: (value: unknown): value is number => typeof value === 'number' && !isNaN(value),
  isNegative: (num: number) => num < 0,
  isEven: (num: number) => num % 2 === 0,
  isOdd: (num: number) => num % 2 !== 0,
  toCurrency: (num: number, locale = 'en-IN', currency = 'INR') =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(num),
  clamp: (num: number, min: number, max: number) => Math.min(Math.max(num, min), max),
  roundTo: (num: number, decimals: number = 2) => Number(num.toFixed(decimals)),
  canBeNumber: (value: unknown): boolean =>
    typeof value === 'number'
      ? !isNaN(value)
      : typeof value === 'string'
        ? !isNaN(parseFloat(value)) && isFinite(+value)
        : false
}
export const arrayUtility = {
  isEmpty: <T>(arr: T[]) => arr.length === 0,

  last: <T>(arr: T[]) => arr[arr.length - 1],

  unique: <T>(arr: T[]) => Array.from(new Set(arr)),

  chunk: <T>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    ),

  flatten: <T>(arr: T[][]): T[] => arr.flat(),

  sum: (arr: number[]) => arr.reduce((a, b) => a + b, 0),

  average: (arr: number[]) => (arr.length === 0 ? 0 : arr.reduce((a, b) => a + b, 0) / arr.length)
}
export const dateUtility = {
  isToday: (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  },

  formatDate: (date: Date, locale: string = 'en-IN', options?: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, options).format(date),

  daysBetween: (a: Date, b: Date) => Math.floor(Math.abs(+a - +b) / (1000 * 60 * 60 * 24)),

  addDays: (date: Date, days: number) => {
    const copy = new Date(date)
    copy.setDate(copy.getDate() + days)
    return copy
  },

  startOfDay: (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()),

  endOfDay: (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)
}

export const generalUtil = {
  string: stringUtility,
  number: numberUtility,
  array: arrayUtility,
  date: dateUtility
}
