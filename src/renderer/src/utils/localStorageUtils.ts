// utils/localStorageUtils.ts

export const localStorageUtils = {
  set<T>(key: string, value: T): void {
    try {
      const json = JSON.stringify(value)
      localStorage.setItem(key, json)
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error)
    }
  },

  get<T>(key: string): T | null {
    try {
      const json = localStorage.getItem(key)
      if (!json) return null
      return JSON.parse(json) as T
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error)
      return null
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  },

  clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.error(`Error clearing localStorage:`, error)
    }
  }
}
