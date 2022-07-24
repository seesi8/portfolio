import styles from './timeline.module.css'

export default function timeline({ }) {
    return (
        <>
            <ul className={styles.list}>
                <h1 className={styles.listTitle}>Timeline Of My Life</h1>
                <div className={styles.lineContainer}>
                    <div className={styles.line}></div>
                </div>
                <li className={styles.item}>
                    <h1 className={styles.itemTitle}>Demo Poj</h1>
                    <p className={styles.itemDate}>This is date for a thing</p>
                    <h2 className={styles.itemBody}>this is a breif discription of a even that happened on the couse of my life whihc is really cools</h2>
                </li>
                <li className={styles.item}>
                    <h1 className={styles.itemTitle}>Demo Poj</h1>
                    <p className={styles.itemDate}>This is date for a thing</p>
                    <h2 className={styles.itemBody}>this is a breif discription of a even that happened on the couse of my life whihc is really cools</h2>
                </li>
                <li className={styles.item}>
                    <h1 className={styles.itemTitle}>Demo Poj</h1>
                    <p className={styles.itemDate}>This is date for a thing</p>
                    <h2 className={styles.itemBody}>this is a breif discription of a even that happened on the couse of my life whihc is really cools</h2>
                </li>
                <li className={styles.item}>
                    <h1 className={styles.itemTitle}>Demo Poj</h1>
                    <p className={styles.itemDate}>This is date for a thing</p>
                    <h2 className={styles.itemBody}>this is a breif discription of a even that happened on the couse of my life whihc is really cools</h2>
                </li>
            </ul>
        </>
    )
}