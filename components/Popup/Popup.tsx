import { useState, useRef, useContext, useEffect } from 'react'
import s from './Popup.module.sass'
import Switcher from '../Settings/Settings'
import Notification from '../Settings/Notification'
import ThemeContext from '../../context/theme-context'
import Swal from 'sweetalert2'
import Close from '../../public/images/icons/Close'

interface popupProps {
  modalHandler: (status: any) => void
  onCountChange: (count: number) => void
  type: 'focus' | 'short' | 'long'
}

export default function Popup({
  modalHandler,
  onCountChange,
  type
}: popupProps) {

  const {currentTheme, changeCurrentTheme} = useContext(ThemeContext)

  const [timerValues, setTimerValues] = useState({
    time: 0,
    shortTime: 0,
    longTime: 0
  })
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newCount = parseInt(event.target.value, 10)
    
    if(newCount > 60) {
      newCount = 60
    }
    
    setTimerValues(prevState => ({
      ...prevState,
      time: newCount
    }))
    onCountChange(newCount)

  }

  useEffect(() => {
    const timer = setTimeout(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Your current value is ${timerValues.time}`,
        showConfirmButton: false,
        timer: 3000
      });
    }, 1000);
  
    return () => {
      clearTimeout(timer);
    };
  }, [timerValues.time]);
  

  const handleShortBreak = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newCount = parseInt(event.target.value, 10);
    if(isNaN(newCount)) {
      newCount = 0
    } else if (newCount > 60) {
      newCount = 60;
    }
    setTimerValues(prevState => ({
      ...prevState,
      shortTime: newCount
    }));
    onCountChange(newCount);
  };

  const handleLongBreak = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newCount = parseInt(event.target.value, 10);
    if(isNaN(newCount)) {
      newCount = 0
    } else if (newCount > 60) {
      newCount = 60;
    }
    setTimerValues(prevState => ({
      ...prevState,
      longTime: newCount
    }));
    onCountChange(newCount);
  };

  return <div className={`
    ${currentTheme === 'dark' ? s.darkModal : ''}
    ${s.popup}
    ${type === 'focus'
      ? s.focusPopup
      : type === 'short'
        ? s.shortBreak
        : type === 'long'
          ? s.longBreak
          : ''
    }
  `}>
    <div
      className={s.overlay}
      onClick={() => modalHandler((status: any) => !status)}
    ></div>
    <div className={s.modalWrap}>
      <div className={s.top}>
        <span>Settings</span>
        <div
          className={s.close}
          onClick={() => modalHandler((status: any) => !status)}
        >
          <Close />
        </div>
      </div>
      <div className={s.content}>
        <ul>
          <li>
            <span>Dark mode</span>
            <Switcher />
          </li>
          <li>
            <span>Focus length</span>
            <label>
              <input
                type='number'
                className={s.setTimer}
                min={1}
                max={60}
                value={timerValues.time}
                onChange={handleTimeChange}
              />
            </label>
          </li>
          <li>
            <span>Short break length</span>
            <label>
              <input
                type='number'
                className={s.setTimer}
                min={1}
                max={60}
                value={timerValues.shortTime}
                onChange={handleShortBreak}
              />
            </label>
          </li>
          <li>
            <span>Long break length</span>
            <label>
              <input
                type='number'
                className={s.setTimer}
                min={1}
                max={60}
                value={timerValues.longTime}
                onChange={handleLongBreak}
              />
            </label>
          </li>
          <li>
            <span>Notifications</span>
            <Notification />
          </li>
        </ul>
      </div>
    </div>
  </div>
};
