import '../styles/globals.sass'
import ThemeContextWrapper from '../context/theme-wrapper'

function MyApp({Component, pageProps}) {
  return <>
    <ThemeContextWrapper>
      <Component {...pageProps} />
    </ThemeContextWrapper>
  </>
}

export default MyApp