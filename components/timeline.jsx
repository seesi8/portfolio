import styles from './timeline.module.css'

export default function timeline({ }) {
    return (
        <>
            <ul className={styles.list}>
                <h1 className={styles.listTitle}>Timeline Of My Life</h1>
                <li className={styles.item}>
                    <h1 className={styles.itemTitle}>I made this website</h1>
                    <p className={styles.itemDate}>8/18/22</p>
                    <h2 className={styles.itemBody}>In my cource of wanting to become a better programmer I wanted to learn a js framework. Because of it's popularity i choose react. I did some other projects with it before staritng this page</h2>
                </li>
                <li className={styles.item}>
                    <h1 className={styles.itemTitle}>Quarentine started</h1>
                    <p className={styles.itemDate}>3/13/2022</p>
                    <h2 className={styles.itemBody}>when covid started I continued my coding and worked on more advanced projects using python and eventualy into js and c#</h2>
                </li>
                <li className={styles.item}>
                    <h1 className={styles.itemTitle}>I made my fist website</h1>
                    <p className={styles.itemDate}>Early 2017</p>
                    <h2 className={styles.itemBody}>I was in fourth grade and I was amazed by the idea of having a website. I wanted to create my own websites for me and my friends to use. A couple tutorials and reading the documentation later it was made.</h2>
                </li>
                <li className={styles.item}>
                    <h1 className={styles.itemTitle}>I did my first coding project</h1>
                    <p className={styles.itemDate}>Sometime in 2014</p>
                    <h2 className={styles.itemBody}>Yound me had wanted my own live camera. My parents suggested that instead of buying it. I created a web server using a raspberry pi and created a live camera using a rapserry pi 0 </h2>
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
