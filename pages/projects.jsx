import { Timestamp, collection, query, getDocs, orderBy,startAfter, startAt, doc, getDoc, limit } from "firebase/firestore";
import Thumbnail from '../components/thumbnail'
import { firestore } from '../lib/firebase';
import Loader from '../components/loader'
import {fixDate} from '../lib/hooks'
import { useState } from "react";
import styles from '../components/posts.module.css'
import Head from 'next/head'

const LIMIT = 4;

export async function getServerSideProps({ }) {

    let projects = []

    const projectsRef = query(collection(firestore, "projects"), orderBy("datemade", "desc"), limit(LIMIT))
    const projectsSnap = await getDocs(projectsRef);
    projectsSnap.forEach((doc) => {
        projects.push(doc.data())
    });

    //Format the date into a serializeable object
    projects = fixDate(projects)

    return {
        props: { projects: projects },
    }

}

async function getMorePosts(cursor) {

    let newPosts = []
    console.log(cursor)
    const projectsQuery = query(collection(firestore, "projects"), orderBy("datemade", "desc"), startAfter(new Date(cursor)), limit(LIMIT))
    const projectsQuerySnap = await getDocs(projectsQuery);

    

    projectsQuerySnap.forEach((doc) => {
        newPosts.push(doc.data())
    });

    newPosts = fixDate(newPosts)

    //cursor is off by one so account for it

    return (
        newPosts
    )
}

export default function Posts(projects) {
    const [posts, setPosts] = useState(projects.projects);
    const [postsEnd, setPostsEnd] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {

        setLoading(true);

        let cursor = new Date(posts[posts.length - 1].datemade)
        console.log(cursor)
        console.log(posts[posts.length - 1].datemade)
        const newPosts = await getMorePosts(cursor)

        const postsRef = posts.concat(newPosts);
        setPosts(postsRef);

        if (newPosts.length < LIMIT) {
            setPostsEnd(true);
        }
        cursor = new Date(posts[posts.length - 1].datemade)

        setLoading(false);
    };

    return (
        <main className={styles.main}>
            <Head>
                <title>Projects</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Loader show={loading} />
            <Thumbnail projects={posts} />
            <div className={styles.container}>
                <h1 className={styles.noMorePosts}>{postsEnd && "No More Posts ..."}</h1>
            </div>
            <div className={styles.container}>
                <button className={styles.loadMoreButton} onClick={handleClick}>{!postsEnd ? "Load More" : "Try Again"}</button>
            </div>
        </main>
    )
}