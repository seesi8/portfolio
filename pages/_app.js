import { useUserData } from '../lib/hooks';
import { UserContext } from '../lib/context'
import '../styles/globals.css'
import NavBar from '../components/navbar'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Toaster />
      <NavBar/>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;