import Head from "next/head";
import { fixDate } from "../lib/hooks";
import styles from "../styles/index.module.css";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  getDoc,
  limit,
} from "firebase/firestore";
import Thumbnail from "../components/thumbnail";
import { firestore } from "../lib/firebase";
import Timeline from "../components/timeline";
import Contact from "../components/contact";
import Intro from "../components/intro";
import { ThemeContext } from "../lib/context";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export async function getServerSideProps({}) {
  let projects = [];
  const projectsRef = query(
    collection(firestore, "projects"),
    orderBy("datemade", "desc"),
    // limit(4)
  );
  const projectsSnap = await getDocs(projectsRef);

  projectsSnap.forEach((doc) => {
    projects.push(doc.data());
  });

  //Format the date into a serializeable object
  projects = fixDate(projects);

  return {
    props: { projects: projects },
  };
}

export default function Home(projects) {
  const { vertical } = useContext(ThemeContext);
  const router = useRouter();
  const goToPosts = (e) => {
    router.push("/projects");
  };
  const [waveOffsets, setWaveOffsets] = useState([]);
  const [timer, setTimer] = useState(null);

  const handleMouseEnter = () => {
    setTimer(
      setTimeout(() => {
        goToPosts();
      }, 3000)
    );
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
  };

  return (
    <main className={styles.main}>
      {/* <div className={styles.waveContainer}>{waves}</div> */}

      <Head>
        <title>Samuel Liebert</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Intro projects={projects.projects}/>
      {/* <Thumbnail projects={projects.projects} /> */}
      {/* <div className={styles.moreButtonContainerContainer}>
        <div className={styles.rocketContainer}>
          <div className={styles.rocket}>
            <Image src={"/rocket.svg"} layout="fill" />
          </div>
        </div>
        <div
          className={styles.moreButtonContainer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className={styles.moreButton}>
            <h1 className={styles.moreButtonTitle}>To Projects</h1>
          </button>
        </div>
      </div> */}
    </main>
  );
}
