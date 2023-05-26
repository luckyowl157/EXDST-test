import { useContext, useState, useEffect } from 'react'
import ThemeContext from '../../context/theme-context'

import s from './ColorSwitcher.module.sass'

const ThemeSwitch = () => {
  const { currentTheme, changeCurrentTheme } = useContext(ThemeContext)
  const [isChecked, setIsChecked] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'dark'
  })
  useEffect(() => {
    localStorage.setItem('theme', isChecked ? 'dark' : 'light')
  }, [isChecked])

  const handleToggle = () => {
    setIsChecked(!isChecked)
    changeCurrentTheme(isChecked ? 'light' : 'dark')
  }

  return <>
    <label className={`
      ${s.switch} 
      ${currentTheme === 'dark' ? s.darkToggle : s.lightToggle}
    `}>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={handleToggle}
      />
      <div className={s.slider}></div>

    </label>
  </>

}

export default ThemeSwitch