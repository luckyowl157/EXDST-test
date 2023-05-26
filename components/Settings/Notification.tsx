import {useState, useEffect, useContext } from 'react'
import Swal from 'sweetalert2'

import s from './ColorSwitcher.module.sass'
import ThemeContext from '../../context/theme-context'

export default function Notification() {
  const {currentTheme, changeCurrentTheme} = useContext(ThemeContext)
  const [isNotified, setIsNotified] = useState(() => {
    const saveNotification = localStorage.getItem('Notification')
    return saveNotification === 'true'
  })

  const handleClick = () => {
    if(!isNotified === true) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'You have enabled notifications!',
        showConfirmButton: false,
        timer: 3000
      })
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'You have turned off notifications',
        showConfirmButton: false,
        timer: 3000
      })
    }
  }
  
  useEffect(() => {
    localStorage.setItem('Notification', isNotified ? 'true' : 'false')
  }, [isNotified])

  return <>
    <label className={`
      ${s.switch}
      ${currentTheme === 'dark' ? s.darkToggle : s.lightToggle}
    `}
      onClick={handleClick}
    >
      <input
        type='checkbox'
        checked={isNotified}
        onChange={
          () => setIsNotified(!isNotified)
        }
      />
      <div className={s.slider}></div>
    </label>
  </>
};
