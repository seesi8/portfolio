import Thumbnail from "../components/thumbnail";
import styles from "../styles/intro.module.css";
import Model from "./model";
import { darken } from "polished";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../lib/context";
import Contact from "../components/contact";
import Image from "next/image";
import Link from "next/link";
import { MdWeb } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

function longShadow(color, total = 4000, dark = 0.00125, angleDeg = 25) {
  let val = `0px 0px ${color}`;
  let amt = 0.125;
  const angle = (angleDeg * Math.PI) / 180;
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);

  for (let i = 0; i < total; i++) {
    val += `, ${-(i * dx).toFixed(2)}px ${(i * dy).toFixed(2)}px ${darken(
      amt,
      color
    )}`;
    amt += dark;
  }
  return val;
}

export default function Page({ projects }) {
  const { vertical, height, width } = useContext(ThemeContext);
  const aspect_ratio = width / height;
  const [page, setPage] = useState(0);
  const tabs = ["Home", "Projects", "Contact", "About Me"];
  const [scale, setScale] = useState(0.75);

  const home = useRef(null);
  const thumbnails = useRef(null);
  const contact = useRef(null);
  const about = useRef(null);
  const pages = [
    ``,
    `${styles.second}`,
    `${styles.third}`,
    `${styles.fourth}`,
    `${styles.final}`,
  ];
  const [info, setInfo] = useState({});
  const goTo = (item) => {
    setPage(4);
    setInfo(item);
  };

  useEffect(() => {
    if(width < 885){
      setScale((width/985)*0.75)
    }
    else if(vertical){
      setScale(0.75)
    }
    if(!vertical && width > 885){
      setScale(0.75)
    }
  },  [vertical, width, height])

  return (
    <main className={styles.intro}>
      <h1
        style={{
          textShadow: `${longShadow("#50C878", 30, 0.006)}`,
        }}
        className={styles.introName}
      >
        Samuel Liebert Developer{" "}
      </h1>
      <div className={styles.block}>
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            {tabs.map((tab, i) => {
              if (page == i) {
                return (
                  <p
                    href=""
                    onClick={(e) => setPage(i)}
                    className={styles.dot}
                    key={i}
                    //   style={{ transform: `translateX(-${0}px)` }}
                  >
                    {tab}
                  </p>
                );
              }
              return (
                <p href="" onClick={(e) => setPage(i)} key={i}>
                  {tab}
                </p>
              );
            })}
          </div>
        </div>
        {/* {pages[page]} */}
        <div className={styles.allPages}>
          <div className={`${styles.allPagesInner} ${pages[page]}`}>
            <div ref={home} className={styles.introModelContainer}>
              <Model className={styles.introModel} scale={scale} />
            </div>
            <div className={styles.thumbnailsContainer}>
              <div className={styles.topBlock}></div>
              <div className={styles.thumbnails} ref={thumbnails}>
                <p className={styles.projectsTextContainer}>This includes only a subset of projects that I belive show my growth throughout time. A full list of projects can be found on my <a className={styles.githubLinkText} href="https://github.com/seesi8?tab=repositories">Github</a></p>
                <Thumbnail projects={[...projects, ...projects]} _ref={thumbnails} goTo={goTo} />
              </div>
              <div className={styles.bottomBlock}></div>
            </div>
            <Contact ref={contact} />
            <div className={styles.about}>
              <div className={styles.left}>
                <h1>Hello,</h1>
                <h2>
                  Age:{" "}
                  {Math.floor(
                    (new Date() - new Date("06/14/2008")) /
                      (1000 * 60 * 60 * 24 * 365.25)
                  )}
                  , 📍 Chicago IL
                </h2>
                <h2>Education:</h2>
                <p>Alexander Grahm Bell Elementry</p>
                <p>Lane Technical High School</p>
                <h2>Work Experiance</h2>
                <p>Lifeguard: Jun.2025-Current</p>
                <h2>Other Experiance</h2>
                <p>Purdue Summer Research Program</p>
                <p>Lane Tech Robotics Team - 4645</p>
                <p>Lane Tech Cross Country Team</p>
                <p>Lane Tech Track And Field Team</p>
                <p>Assorted Volunteer Experiance</p>
                <p>NHS membership</p>
                <h2>Achievements</h2>
                <p>Honor Role</p>
                <p>35 ACT</p>
                <p>4.0 Unweighted GPA</p>
                <p>5.2 Weighted GPA</p>
              </div>
              <div className={styles.middleAbout}>
                <h1>Personal</h1>
                <h2>Hobbies:</h2>
                <p>Riding Bikes</p>
                <p>Swiming</p>
                <p>Running</p>
                <p>Programming</p>
                <p>Travel</p>
                <p>Sports</p>
                <p>Skiing</p>
                <h2>Other About Me:</h2>
                <p>
                  Completed Chicago Triathalon{" "}
                  {Math.ceil(
                    (new Date() - new Date("08/23/2023")) /
                      (1000 * 60 * 60 * 24 * 365.25)
                  )}
                  x
                </p>
                <p>Dallas Mavericks Fan</p>
                <p>Fighting Illini Fan</p>
                <h2>Technical Skills</h2>
                <p>
                  <b>Languages: </b> Python, Java, Javascript, Dart, C#, Swift
                  ...
                </p>
                <p>
                  <b>Frameworks: </b> Tensorflow, WPIlib, React, Vue, Three JS,
                  Flutter, Unity, Swift UI, Express, Flask, Electron, Docker
                </p>
                <p>
                  <b>Devices: </b> Linux, Embeded Systems, IOT, Ardiuno,
                  Raspberry PI
                </p>
                <p>
                  <b>Electronics: </b> PCB Design (Fusion 360), Microsoldering,
                  Circuitboard Development
                </p>
                <p>
                  <b>Software: </b> Fusion 360, VS Code, Ghidra, X Code
                </p>
              </div>
              <div className={styles.right}>
                <div className={styles.headshotContainer}>
                  <div className={styles.headshot}>
                    <Image
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/portfolio-dedd9.appspot.com/o/54931ca6-a1e2-4ea3-9f51-1b6998a2dd20?alt=media&token=c9b9f166-b060-4757-b53c-52990cd3d6f0"
                      }
                      fill={true}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.project}>
              <div className={styles.leftColumn}>
                <div className={styles.top}>
                  <h1 className={styles.projectTitle}>{info.title}</h1>

                  <p className={styles.tldr}>{info.tldr}</p>
                </div>
              </div>

              <div className={styles.middle}>
                <div className={styles.middleContainer}>
                  {" "}
                  {info.github ? (
                    <Link className={styles.githubLink} href={info.github}>
                      Github <FaGithub className={styles.icon} />{" "}
                    </Link>
                  ) : (
                    ""
                  )}
                  {info.livedemo ? (
                    <Link className={styles.demoLink} href={info.livedemo}>
                      Demo <MdWeb className={styles.icon} />{" "}
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className={styles.rightColumn}>
                <div className={styles.imageContainerContainer}>
                  <div className={styles.imageContainer}>
                    <Image src={info.imgurl} fill={true} objectFit="contain"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
