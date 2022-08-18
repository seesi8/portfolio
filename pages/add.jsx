import { setDoc, doc} from "firebase/firestore";
import { firestore} from '../lib/firebase';
import styles from '../components/add.module.css'
import kebabCase from 'lodash.kebabcase';
import React, { useState } from "react";

async function UploadJson(e, setDone) {

    e.preventDefault();

    for (let fileIndex in e.target.files) {
        if (isNaN(fileIndex)) { 
            continue
        }
        const fileReader = new FileReader();

        fileReader.onload = (e) => {

            const text = e.target.result;
            const fileJSON = JSON.parse(text)

            if (fileJSON.title && fileJSON.tldr && fileJSON.imgurl && fileJSON.description && fileJSON.github && fileJSON.livedemo && fileJSON.datemade) {
                let Project = { ...fileJSON }
                Project.slug = encodeURI(kebabCase(fileJSON.title))
                Project.datemade = new Date(Project.datemade)
                const projectRef = setDoc(doc(firestore, "projects", Project.slug), {
                    ...Project
                });
                setDone("Done")

            } else {
                setDone("Wrong")
            }

        };

        fileReader.readAsText(e.target.files[fileIndex]);
    }
}

export default function Add({ }) {

    /*done is not a bool because there are three error states*/
    const [done, setDone] = useState("Not Done")

    return (
        <main className={styles.container}>
            <input className={styles.input} type="file" multiple onChange={(e) => UploadJson(e, setDone)} />
            <h1 className={styles.done}>{done}</h1>
        </main>
    )

}