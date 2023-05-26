import { createContext } from 'react';

const themeValue = {
  currentTheme: 'light',
  changeCurrentTheme: (newTheme: 'light' | 'dark') => {}
}

const ThemeContext = createContext(themeValue)

export default ThemeContext