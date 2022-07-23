import styles from '../components/thumbnail.module.css'
import Loader from '../components/loader'
import React, { useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
export default function thumbnail({ projects }) {
  return (
    <div className={styles.container}>
      {projects.projects ? projects.projects.map((proj) => <ProjItem item={proj} key={proj.slug} />) : null}
    </div>
  )
}

function ProjItem(item) {
  const router = useRouter()
  item = item.item
  const [loading, setLoading] = useState(false)
  const onClick = e => {
    e.preventDefault()
    setLoading(true)
    router.push(`/${item.slug}`)
  }
  return (
      <div className={styles.card}>
        <Loader show = {loading}/>
        <div className={styles.cardImageContainer}>
          <img className={styles.cardImage} src={item.imgurl} alt="" />
        </div>
        <div className="cardTools">
          <h2 className={styles.cardTitle}>{item.title}</h2>

          <button onClick={onClick} className={styles.cardViewButton}><h3 className={styles.cardViewButtonReadMore}>Read More</h3></button>

        </div>
      </div>
  )
}