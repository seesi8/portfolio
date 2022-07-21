import { useUserData } from '../lib/hooks';
import { UserContext } from '../lib/context'
import '../styles/globals.css'
import { useEffect } from 'react';
import NavBar from '../components/navbar'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const threeScript = document.createElement("script")
    threeScript.setAttribute("id", "threeScript")
    threeScript.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
    );
    threeScript.setAttribute(
      "src",
      "/static/scripts/vanta.net.min.js"
    );
    document.getElementsByTagName("head")[0].appendChild(threeScript);
    return () => {
      if (threeScript) {
        threeScript.remove()
      }
    }
  }, [])
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <NavBar/>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;