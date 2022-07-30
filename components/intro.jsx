import styles from '../components/intro.module.css'
import Model from './model'
import styled from 'styled-components';
import { rgba, darken } from 'polished';
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
  const aspect_ratio = useWindowDimensions().width / useWindowDimensions().height
  const { width, height } = useWindowDimensions()
  useEffect(() => {
    setVertical(width / height > 1 ? false : true)
  }, [width, height])
  const [vertical, setVertical] = useState(false)
  const longShadow = (color, total = 4000, dark = 0.00125) => {
    let val = `0px 0px ${color}`
    total = total;
    let amt = 0.125;
    for (var i = 0; i < total; i++) {
      val += `, ${-i}px ${i}px ${darken(amt, color)}`
      amt += dark
    }
    return val;
  }
  return (
    <main className={styles.intro}>
      <h1 style = {{textShadow: `${longShadow("#50C878",vertical ? 20 : 4000, vertical ? 0.029 : 0.0008, )}`}}className={styles.introName}>Samuel Liebert Age: 14 </h1>
      <Model className={styles.introModel} scale={!vertical ? ((aspect_ratio / 3.5) + .5) : (1)} />
    </main>
  )
}