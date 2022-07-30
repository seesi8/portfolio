import { collection, query, where, getDocs, orderBy, startAt, doc, getDoc, limit } from "firebase/firestore";
import Thumbnail from '../components/thumbnail'
import { firestore } from '../lib/firebase';
import Loader from '../components/loader'
import { useState } from "react";
import styles from '../components/posts.module.css'
import { position } from "polished";

const LIMIT = 4;

export async function getServerSideProps({ }) {
    const ref = query(collection(firestore, "projects"), orderBy("datemade"), limit(LIMIT))
    const docsSnap = await getDocs(ref);
    let projects = []
    docsSnap.forEach((doc) => {
        projects.push(doc.data())
    });
    return {
        props: { projects: projects },
    }
}
let cursor = ""

export default function posts(projects) {
    const [posts, setPosts] = useState(projects.projects);
    const [postsEnd, setPostsEnd] = useState(false);
    const [loading, setLoading] = useState(false);
    const getMorePosts = async () => {
        setLoading(true);
        cursor = posts[posts.length - 1].datemade
        console.log(cursor)

        const last = posts[posts.length - 1];

        const thequery = query(collection(firestore, "projects"), orderBy("datemade"), startAt(cursor), limit(LIMIT + 1))
        let newPosts = []
        const querySnap = await getDocs(thequery);
        querySnap.forEach((doc) => {
            newPosts.push(doc.data())
        });
        newPosts.shift()
        const postsRef = posts;
        setPosts(postsRef.concat(newPosts));

        if (newPosts.length < LIMIT) {
            setPostsEnd(true);
        }
        cursor = posts[posts.length - 1].datemade
        setLoading(false);
    };
    return (
        <main className={styles.main}>
            <Loader show={loading} />
            <Thumbnail projects={posts} />
            <div className={styles.loadMoreButtonContainer}>
                <button className={styles.loadMoreButton} onClick={getMorePosts}>Load More</button>
            </div>
        </main>
    )
}