import styles from '../components/intro.module.css'
import Model from './model'
function getWindow(){
  if (typeof window !== 'undefined') {
    const width = window.innerWidth
    const height = window.innerHeight
    return(
      width,
      height
    )
  }
}

export default function Page({ }) {
  const window = getWindow()
  console.log(window)
  return (
    <main className={styles.intro}>
        <h1 className={styles.introName}>Samuel <br/> Libert <br /> Age: 14</h1>
        <Model className={styles.introModel} scale={1}/>
    </main>
  )
}