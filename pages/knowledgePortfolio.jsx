import styles from '../components/knowledge.module.css'
import { v4 as uuidv4 } from 'uuid';
import Knowledge from '../components/knowledge';
import { collection, query, where, getDocs, orderBy, doc, getDoc, limit } from "firebase/firestore";
import { firestore } from '../lib/firebase';
import Head from 'next/head';

export async function getServerSideProps({ }) {

    const knowledgeRef = query(collection(firestore, "knowledge"), limit(4))
    const knowledgeSnap = await getDocs(knowledgeRef);

    let items = []
    knowledgeSnap.forEach((doc) => {
        items.push(doc.data())
    });

    return {
        props: { items: items },
    }
}


export default function knowledgePortfolio({ items }) {
    return (
        <>
            <Head>
                <title>Samuel Liebert's Knolage Portfoloio</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <main className={styles.knowlage}>
                {items ? items.map((item) => <><Knowledge theKnowledge={item} key={uuidv4()} /></>) : null}
            </main>
        </>
    )
}