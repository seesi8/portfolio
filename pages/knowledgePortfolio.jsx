import styles from '../styles/knowledge.module.css'
import { v4 as uuidv4 } from 'uuid';
import Knowledge from '../components/knowledge';
import { collection, query, where, getDocs, orderBy, doc, getDoc, limit } from "firebase/firestore";
import { firestore } from '../lib/firebase';

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
        <main className={styles.knowlage}>
            {items ? items.map((item) => <><Knowledge theKnowledge={item} key={uuidv4()} /></>) : null}
        </main>
    )
}