import { useUserData } from '../lib/hooks';
import { useWindowDimensions } from '../lib/hooks';
import { UserContext } from '../lib/context'
import { ThemeContext } from '../lib/context'
import '../styles/globals.css'
import NavBar from '../components/navbar'
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Roboto } from '@next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '400', '300', '500', '700', '900']
})

function MyApp({ Component, pageProps }) {

  const [vertical, setVertical] = useState(false)
  const { width, height } = useWindowDimensions()
  const userData = useUserData();

  useEffect(() => {
    setVertical(width / height > 1 ? false : true)
  }, [width, height])

  const theme = { vertical: vertical, width: width, height: height }

  return (

    <UserContext.Provider value={userData}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <ThemeContext.Provider value={theme}>
        <Toaster />
        <NavBar />
        <div className={roboto.className}>
          <Component {...pageProps} />
        </div>
      </ThemeContext.Provider>
    </UserContext.Provider>

  );
}

export default MyApp;