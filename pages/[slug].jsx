import { firestore } from '../lib/firebase';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useState } from 'react';
import Project from '../components/project'
import Head from 'next/head'
import { useRouter } from 'next/router'
export default function Slug({ proj }) {
    if(proj != "404"){
        return (
            <main>
                <Head>
                    <title>{proj.title}</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <div>
                    <Project post={proj}></Project>
                </div>
            </main>
        )
    }else{
        return (
            <div>
                <h1>404 : No Page Found</h1>
            </div>
        )
    }

}

export async function getStaticProps({ params }) {
    const { slug } = params;
    const ref = doc(firestore, "projects", slug)
    const docSnap = await getDoc(ref);
    let data = undefined;
    if (docSnap.data()) {
        data = docSnap.data()
    }
    !data && (data = "404")
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
        paths.push({ params: { slug: doc.data().slug } })
    });
    return {
        paths,
        fallback: 'blocking'
    }
}
