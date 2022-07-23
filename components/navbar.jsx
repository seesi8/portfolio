import { useContext } from "react"
import { UserContext } from '../lib/context'
import styles from './Navbar.module.css'
import Link from "next/link";

export default function Navbar({ }) {
  const { user, username } = useContext(UserContext)
  return (
    <div className={styles.navbar}>
      <div className={styles.leftColumn}>
        <div className={styles.logo}>
          <Link href="/"><a>S.D.D</a></Link>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.usernameContainer}>
          <h1 className={styles.username}>
            {user ?
              <>@{username}</>
              :
              <Link href="/signin"><a>Sign In</a></Link>
            }
          </h1>
        </div>
        {user && <Link href="/signin"><img className={styles.userPhoto} src={user.photoURL} /></Link>}
      </div>
    </div>
  )
}