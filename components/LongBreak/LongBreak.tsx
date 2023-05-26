import React, { useState, useEffect, useContext } from 'react'
import Popup from '../Popup/Popup'
import Settings from '../../public/images/icons/Settings'
import Start from '../../public/images/icons/Start'
import Pause from '../../public/images/icons/Pause'
import Forward from '../../public/images/icons/Forward'
import Coffee from '../../public/images/icons/Coffee'
import ThemeContext from '../../context/theme-context'

// styles
import s from './LongBreak.module.sass'

interface TimerProps {
  initialCount?: number
  handleForwardClick: () => void
}

export default function Focus({ initialCount = 15, handleForwardClick }: TimerProps) {

  const { currentTheme, changeCurrentTheme } = useContext(ThemeContext)
  const [count, setCount] = useState<number>(initialCount * 60);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [popup, setPopup] = useState(false);

  const handleCountChange = (newCount: number) => {
    setCount(newCount * 60);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCounting) {
      timer = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount > 0) {
            return prevCount - 1;
          }
          return prevCount;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isCounting]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return <><span>{minutes.toString().padStart(2, '0')}</span><span>{seconds.toString().padStart(2, '0')}</span></>
  };

  const handleStartClick = () => {
    setIsCounting((prevIsCounting) => !prevIsCounting);
  };

  return <section className={`
  ${s.longBreak}
  ${currentTheme === 'light' ? s.light : s.dark}
    section
  `}>
    <div className={`${s.wrapper} wrapper `}>
      <div className={`${s.top} top`}>
        <Coffee />
        <div>Long Break</div>
      </div>
      <div className={`
        timer
        ${s.timer}
        ${isCounting ? 'started' : ''}
      `}>
        {formatTime(count)}
      </div>
      <div className={`
        ${s.buttons}
        buttonList
      `}>
        <button
          onClick={() => setPopup(true)}
        >
          <Settings />
        </button>
        <button onClick={handleStartClick}>
          {isCounting ? <Pause /> : <Start />}

        </button>
        <button onClick={handleForwardClick}>
          <Forward />
        </button>
      </div>
    </div>
    {popup &&
      <Popup
        type='long'
        onCountChange={handleCountChange}
        modalHandler={setPopup}
      />
    }
  </section>
};
