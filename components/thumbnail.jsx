import styles from "../styles/thumbnail.module.css";
import Loader from "../components/loader";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import useScrollPosition from "../reactHooks/useScrollPosition.jsx"
export default function thumbnail({ projects, _ref, goTo }) {

  return (
    <div className={styles.container}>
      {projects
        ? projects.map((proj, i) => (
            <>
              <ProjItem item={proj} key={uuidv4()} _ref={_ref} test="sdfsd" index={i} goTo={goTo}/>
            </>
          ))
        : null}
    </div>
  );
}

function ProjItem({item, test, _ref, index, goTo}) {

  /*
  const onClick = e => {
    e.preventDefault()
    setLoading(true)
    router.push(`/${item.slug}`)
  }
  */


  const scrollPosition = useScrollPosition(_ref);

  return (
    // <div className={styles.card} data-far={index - Math.round(scrollPosition/151)} onClick={(e) => goTo(item)}>
    <div className={styles.card} onClick={(e) => goTo(item)}>

      <div className={styles.title}>{item.title}</div>
      <div className={styles.dateMade}>  {item.datemade} -  {item.languages} →</div>
    </div>
  );
}
