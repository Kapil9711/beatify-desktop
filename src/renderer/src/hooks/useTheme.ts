import { localStorageUtils } from '@renderer/utils/localStorageUtils'
import { useEffect, useRef, useState } from 'react'

export interface Theme {
  darkTheme: any
  lightTheme: any
  setTheme: (theme: any, type: 'light' | 'dark') => void
  switchTheme: () => void
  activeThemeType: 'light' | 'dark'
}

const useTheme = (): Theme => {
  const prevTheme = useRef(localStorageUtils.get<'light' | 'dark'>('themeColor') || 'light')
  const [activeThemeType, setActiveThemeType] = useState<'light' | 'dark'>(prevTheme.current)
  const darkTheme = {
    '--color-bg': '#0C0B0E',
    '--color-text': '#FCFCFC',
    '--color-primary': '#597AFA',
    '--color-sidebar': '#18181C',
    '--color-card': '#211F27',
    '--color-border': '#32323D',
    '--color-hover': '#2f2f2f',
    '--color-accent': '#4f46e5',
    '--color-scrollbar': '#444444',

    // Genre tile colors
    '--genre-dance-beat': '#476B8A',
    '--genre-electro-pop': '#A49B81',
    '--genre-alternative-indie': '#A34C33',
    '--genre-hip-pop': '#0C4045',
    '--genre-classical-period': '#A67895',
    '--genre-rap-hip-pop': '#584FA5'
  }
  const lightTheme = {
    '--color-bg': '#F3F1EF', // Light background
    '--color-text': '#3D455A', // Dark text
    '--color-primary': '#5B7AFA', // Indigo (same as dark theme accent)
    '--color-sidebar': '#E8ECEF', // White sidebar
    '--color-card': '#FEFEFE', // White cards
    '--color-border': '#F1EEFE', // Light gray borders
    '--color-hover': '#F0F0F0', // Hover effect
    '--color-accent': '#4F46E5', // Indigo buttons
    '--color-scrollbar': '#CCCCCC', // Scrollbar thumb

    // Genre tile colors (same as dark theme — they don't change)
    '--genre-dance-beat': '#D9E7F2',
    '--genre-electro-pop': '#FFFBF0',
    '--genre-alternative-indie': '#FEF0EC',
    '--genre-hip-pop': '#E5EEED',
    '--genre-classical-period': '#FEF8FC',
    '--genre-rap-hip-pop': '#F1EEFE'
  }
  const themeObj = {
    light: lightTheme,
    dark: darkTheme
  }

  useEffect(() => {
    setTheme(themeObj[prevTheme.current], prevTheme.current)
  }, [])

  function setTheme(theme: any, type: 'light' | 'dark') {
    prevTheme.current = type
    setActiveThemeType(type)
    localStorageUtils.set<'light' | 'dark'>('themeColor', type)
    for (let key in theme) {
      document.documentElement.style.setProperty(key, theme[key])
    }
  }

  const switchTheme = () => {
    if (prevTheme.current == 'light') {
      setTheme(darkTheme, 'dark')
    } else {
      setTheme(lightTheme, 'light')
    }
  }

  return { setTheme, darkTheme, lightTheme, switchTheme, activeThemeType }
}

export default useTheme
