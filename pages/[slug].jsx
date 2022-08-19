import { firestore } from '../lib/firebase';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import Project from '../components/project'
import Head from 'next/head'
import Error from 'next/error'


export default function Slug({ proj }) {
    /*becasue display is set to blocking you need to check to see if there is no data and redirec to a 404. The reason that there is fallback blocking is so that the project does not have to be restarted every time a project is started.*/
    if(proj != "404"){
        return (
            <main className='postContainer'>
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
            <Error statusCode={404} />
        )
    }

}

export async function getStaticProps({ params }) {
    const { slug } = params;
    const projectsRef = doc(firestore, "projects", slug)
    const projectsSnap = await getDoc(projectsRef);
    let data = undefined;

    if (projectsSnap.data() != undefined) {
        data = projectsSnap.data()
        data.datemade = (new Date(data.datemade.toDate())).toLocaleDateString()
    }else{
        data = "404"
    }

    //make the date serializable

    return {
        props: { proj: data },
        revalidate: 300,
    }
}

export async function getStaticPaths() {
    const projectsRef = query(collection(firestore, "projects"))
    const projectsSnap = await getDocs(projectsRef);
    let paths = []

    projectsSnap.forEach((doc) => {
        paths.push({ params: { slug: doc.data().slug } })
    });

    return {
        paths,
        fallback: 'blocking'
    }
}
