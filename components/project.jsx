import styles from '../components/project.module.css'
import ReactMarkdown from 'react-markdown'

export default function Proj({ post }) {
    
    //slug imported for latter
    const { title, slug, tldr, imgurl, datemade, description, github, livedemo } = post
    
    //here for opening in github and livedemo
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>{title}</h1>
            <hr className={styles.dotedHr} />
            <div className={styles.container}>
                <img src={imgurl} className={styles.mainimg} />
            </div>
            <hr className={styles.dotedHr} />
            <h4 className={styles.tldr}><ReactMarkdown>{tldr}</ReactMarkdown></h4>
            <div className={styles.toolButtons}>
                <button className={styles.dateMadeButton}><a className={styles.dateMade}>Made on: {new Date(datemade).toLocaleDateString()}</a></button>
                <button className={styles.liveDemoButton} onClick={() => openInNewTab(livedemo)}><a className={styles.liveDemo}>Visit Live Demo</a></button>
                <button className={styles.githubButton} onClick={() => openInNewTab(github)}><a className={styles.github}>Visit Github </a></button>
            </div>
            <hr className={styles.dotedHr} />
            <p className={styles.description}>{description}</p>
        </main>
    )
}