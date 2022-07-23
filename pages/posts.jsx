import { collection, query, where, getDocs, orderBy, doc, getDoc, limit } from "firebase/firestore";
import Thumbnail from '../components/thumbnail'
import { firestore } from '../lib/firebase';
import { useState } from "react";

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


export default function posts(projects) {
    const [posts, setPosts] = useState(projects.projects);
    const [postsEnd, setPostsEnd] = useState(false);
    const getMorePosts = async () => {
        //const [loading, setLoading] = useState(false);
      
        cursor = hi
        //setLoading(true);
        const last = posts[posts.length - 1];

        const thequery = query(collection(firestore, "projects"), orderBy("datemade"), startAt(cursor), limit(LIMIT))
        let newPosts = [] 
        const querySnap = await getDocs(thequery);
        querySnap.forEach((doc) => {
            newPosts.push(doc.data())
        });
        setPosts(newPosts.concat(projects.projects));
        //setLoading(false);

        if (newPosts.length < LIMIT) {
            setPostsEnd(true);
        }
    };
    console.log(posts)
    return (
        <main>
            <Thumbnail projects={posts} />
            <button onClick={getMorePosts}>Click Me</button>
        </main>
    )
}