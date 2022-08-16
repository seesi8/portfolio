import styles from '../components/thumbnail.module.css'
import Loader from '../components/loader'
import React, { useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';


export default function thumbnail({ projects }) {
  return (
    <div className={styles.container}>
      {projects ? projects.map((proj) => <><ProjItem item={proj} key={proj.slug} /></>) : null}
    </div>
  )
}

function ProjItem(item) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  item = item.item
  const onClick = e => {
    e.preventDefault()
    console.log(setLoading)
    setLoading(true)
    router.push(`/${item.slug}`)
  }
  return (
    <div className={styles.card}>
      <Loader show={loading} />
      <div className={styles.cardImageContainer}>
        <img className={styles.cardImage} src={item.imgurl} alt="" />
      </div>
      <div className="cardTools">
        <button onClick={onClick} className={styles.cardViewButton}><h3 className={styles.cardViewButtonReadMore}>Read More</h3></button>
        <h2 className={styles.cardTitle}>{item.title}</h2>
      </div>
    </div>
  )
}