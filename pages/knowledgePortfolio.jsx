
import { v4 as uuidv4 } from 'uuid';
import Knowledge from '../components/knowledge';
import { collection, query, where, getDocs, orderBy, doc, getDoc, limit } from "firebase/firestore";
import { firestore } from '../lib/firebase';

export async function getServerSideProps({ }) {

    const ref = query(collection(firestore, "knowledge"), limit(4))
    const docsSnap = await getDocs(ref);
    console.log(docsSnap)
    let items = []
    docsSnap.forEach((doc) => {
        items.push(doc.data())
    });
    console.log(items)
    return {
        props: { items: items },
    }
}


export default function knowledgePortfolio({ items }) {
    return (
        <main>
            {items ? items.map((item) => <><Knowledge theKnoledge={item} key={uuidv4()} /></>) : null}
        </main>
    )
}