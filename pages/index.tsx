import {useState, useContext} from 'react'
import Head from 'next/head'
import Focus from '../components/Focus/Focus'
import ShortBreak from '../components/ShortBreak/ShortBreak'
import LongBreak from '../components/LongBreak/LongBreak'


export default function Home() {
  const [currentComponent, setCurrentComponent] = useState(1)

  const handleForwardClick = () => {
    if (currentComponent < 3) {
      setCurrentComponent(currentComponent + 1)
    } else {
      setCurrentComponent(1)
    }
  }

  return <>
    <Head>
      <title>POMO Front-end developer exercise</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className='theme' >
      {currentComponent === 1 && <Focus handleForwardClick={handleForwardClick} />}
      {currentComponent === 2 && <ShortBreak handleForwardClick={handleForwardClick} /> }
      {currentComponent === 3 && <LongBreak handleForwardClick={handleForwardClick} />}
    </main>
  </>
}
