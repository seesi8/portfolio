import { useUserData } from '../lib/hooks';
import { useWindowDimensions } from '../lib/hooks';
import { UserContext } from '../lib/context'
import { ThemeContext } from '../lib/context'
import '../styles/globals.css'
import NavBar from '../components/navbar'
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';



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
      <ThemeContext.Provider value={theme}>
        <Toaster />
        <NavBar />
        <div className='componentContainer'>
          <Component {...pageProps} />
        </div>
      </ThemeContext.Provider>
    </UserContext.Provider>

  );
}

export default MyApp;