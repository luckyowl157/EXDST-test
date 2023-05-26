import {FC, useState, useEffect, ReactNode} from 'react'
import ThemeContext from './theme-context'

interface props {
  children: ReactNode
}

const ThemeContextWrapper: FC<props> = ({children}) => {
  const persistedTheme: any = typeof window === 'undefined'
  if(!persistedTheme) localStorage.getItem('theme')
  const [theme, setTheme] = useState('light' || persistedTheme
  )

  const changeCurrentTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    if(theme === 'light') document.body.classList.remove('dark')
    else document.body.classList.add('dark')
  }, [theme])
  return <ThemeContext.Provider value={{currentTheme: theme, changeCurrentTheme}}>{children}</ThemeContext.Provider>
}
export default ThemeContextWrapper