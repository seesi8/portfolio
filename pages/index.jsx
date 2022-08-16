import Head from 'next/head'
import Image from 'next/image'
import styles from '../components/index.module.css'
import { collection, query, where, getDocs, orderBy, doc, getDoc, limit } from "firebase/firestore";
import Thumbnail from '../components/thumbnail'
import { firestore } from '../lib/firebase';
import Project from '../components/project'
import { BrowserRouter as Router } from 'react-router-dom';
import kebabCase from 'lodash.kebabcase';
import Timeline from '../components/timeline'
import Contact from '../components/contact'
import Intro from '../components/intro'
import { motion } from 'framer-motion';
import { useState, useEffect} from 'react'

function useWindowDimensions() {

  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}




export async function getServerSideProps({ }) {

  const ref = query(collection(firestore, "projects"), orderBy("datemade"), limit(4))
  const docsSnap = await getDocs(ref);
  let projects = []
  docsSnap.forEach((doc) => {
    projects.push(doc.data())
  });
  console.log(projects)
  return {
    props: { projects: projects.reverse() },
  }
}
import { useRouter } from 'next/router'


export default function Home(projects) {
  const aspect_ratio = useWindowDimensions().width / useWindowDimensions().height
  const { width, height } = useWindowDimensions()
  useEffect(() => {
    setVertical(width / height > 1 ? false : true)
  }, [width, height])
  const [vertical, setVertical] = useState(false)
  const router = useRouter()
  const buttonClick = (e) => {
    e.preventDefault()

    router.push("/projects")

  }
  return (
    <main className={styles.main}>
      <Head>
        <title>Samuel Liebert</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Intro />
      <Thumbnail projects={projects.projects} />
      <div className={styles.moreButtonContainer}>
        <button onClick={buttonClick} className={styles.moreButton}><h1 className={styles.moreButtonTitle}>More</h1></button>
      </div>
      <Contact />
      <hr className={styles.dotedHr} />
      <div className={styles.statement} style={(vertical) ? {display: "block"} : {}}>
        <p className={styles.statementText}>
          Hi, I am samuel liebert I have been coding since the age of 6. I primarily code in HTML, CSS, and javascript. I am also well versed in python and the many features it includes such as pulling API data, GUI setups, and flask for browser applications. My first coding project was when I was 6. I had wanted a live video camera to keep watch on my room while I was away. My parents agreed only under one condition, I built it myself. We got a raspberry pi 0w and got to work, installing camera modules and a full-stack website to support the live video feed it provided, although I barely used my new creation this project inspired me to do many more projects. This was around the time I coded my first website. It was a fun webpage for my and my other fourth-grade friends to write a short description about themselves and use QR codes to create a login system for our new website. A few years later I got a 3d printer. I started learning 3d modeling from the ground up using tinkercad and sculpting software when I was young into blender at the beginning of quarantine and then taking the final step up to fusion 360 in the last year. I have created many projects with this 3d printer, including a new webcam shell, costumes, many figurines, and many mounts for many many things. All of this leads up to my biggest, which I started in early 2022, 3d printer product, A fully functional CNC router. Following the Documentation of the MPCNC, I built my CNC cutter using mostly 3d printed parts. When the start of the pandemic started I decided to start trying to code more. I built a dice probability calculator with graphs using Matplotlib in python. Worked on some neural networks and machine learning using TensorFlow. My favorite project I made using python, was not my hardest but was by far the funniest to code. I made a countdown clock this was my first time using multithreading, so it was a fun thing to learn In the end it was not just a countdown clock, but also showed you a video of your choosing, played music, showed fun sound effects, and showed cute videos of pandas, along with a fun disco background. I also did JSON work when making my mods for video games such as Minecraft. After doing this for a while I decided to create some of my games. I decided to use unity and C#. I created many IDLE and other fun mobile games. I also created a 2D platformer-style game, which incorporated world-building with an emphasis and mining the world around you with collectible pickaxes. I later moved on to my biggest project, Hytools.net This was a website used to help in a video game called Hypixel Skyblock. This game has an active economy with an auction house where players could sell in-game items to other players. I created a website to analyze what offers were underpriced and other albatross. I also used Node.Js and MySQL to create databases to predict the prices of items in the future. This was done by pulling API from the game and uploading the sorted data to a database which then predicted what the price would be once your offer to be something would be accepted. I also learned how to animate at the same time. I used blender to create masterfully rendered images. I Then learned how to animate and tell stories through these animations. I used this skill to tell the stories of slaves during slavery and their mindset keeping them from running away. I have also learned how to do other projects, like creating an RC submarine using an Arduino, I also used a raspberry pi to control my 3d printer through projects like Octo-pi. I also learned the basics of G Code while building my CNC router. In conclusion, my coding journey has been a fun one and is ever-evolving, learning new skills, and adapting. I am now 13 and heading into my freshman year. I look forward to many fun projects ahead.
        </p>
        <Timeline />
      </div>
    </main>

  )
}
