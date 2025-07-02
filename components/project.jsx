import styles from "../styles/project.module.css";
import ReactMarkdown from "react-markdown";

export default function Proj({ post }) {
  //slug imported for latter
  const { title, slug, tldr, imgurl, datemade, description, github, livedemo } =
    post;

  //here for opening in github and livedemo
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>

        <img src={imgurl} className={styles.mainimg} />
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.dateMade}>
          Made {new Date(datemade).toLocaleDateString()}
        </p>
        <p className={styles.tldr}>
          <ReactMarkdown>{tldr}</ReactMarkdown>
        </p>
        <div className={styles.toolButtons}>
          <button
            className={styles.liveDemoButton}
            onClick={() => openInNewTab(livedemo)}
          >
            <a className={styles.liveDemo}>Demo</a>
          </button>
          <button
            className={styles.githubButton}
            onClick={() => openInNewTab(github)}
          >
            <a className={styles.github}> Source Code </a>
          </button>
        </div>
      </div>
    </main>
  );
}
