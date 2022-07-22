import styles from '../components/intro.module.css'
import Model from './model'
import { useState, useEffect } from 'react';

function useWindowDimensions() {

  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}



export default function Page({ }) {
  const aspect_ratio = useWindowDimensions().width/useWindowDimensions().height
  const {width, height} = useWindowDimensions()
  const vertical = width/height > 1 ? false : true;
  console.log(vertical)
  return (
    <main className={styles.intro}>
        <h1 className={styles.introName}>Samuel Liebert Age: 14 </h1>
        <Model className={styles.introModel} scale={!vertical ? ((aspect_ratio/3.5)+.5) : (1)}/>
    </main>
  )
}