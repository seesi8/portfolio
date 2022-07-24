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
                    <h1 className={styles.itemTitle}>I did my first coding project</h1>
                    <p className={styles.itemDate}>Sometime in 2014</p>
                    <h2 className={styles.itemBody}>Yound me had wanted my own live camera. My parents suggested that instead of buying it </h2>
                </li>
                <li className={styles.item}>
                    <h1 className={styles.itemTitle}>I Was Born</h1>
                    <p className={styles.itemDate}>6/14/2008</p>
                    <h2 className={styles.itemBody}>I was born in 2008 in Chicago, IL.</h2>
                </li>
                <div className="cirlceContainer">
                <div className="circle"></div>
                </div>
            </ul>
        </>
    )
}