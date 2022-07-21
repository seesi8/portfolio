import { firestore } from '../lib/firebase';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useState } from 'react';
import Project from '../components/project'

export default function Slug({ proj }) {
    return (
        <main>
            <div>
                <Project post={proj}></Project>
            </div>
        </main>
    )
}

export async function getStaticProps({ params }) {
    const { slug } = params;
    const ref = doc(firestore, "projects", slug)
    const docSnap = await getDoc(ref);
    let data = undefined;
    if (docSnap.data()) {
        data = docSnap.data()
    } 
    return { 
        props: { proj: data }, 
        revalidate: 300, 
    }
}

export async function getStaticPaths() {
    const ref = query(collection(firestore, "projects"))
    const docsSnap = await getDocs(ref);
    let paths = []
    docsSnap.forEach((doc) => {
        paths.push({params: { slug: doc.data().slug}})
    }); 
    return{
        paths,
        fallback: true
    }
}
