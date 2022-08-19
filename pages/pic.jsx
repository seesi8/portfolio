import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import styles from '../components/add.module.css'
import Head from 'next/head';

function UploadJson(e, setStoreageUrl) {

    e.preventDefault();

    const storage = getStorage();
    const storageRef = ref(storage, uuidv4());

    const file = Array.from(e.target.files)[0];

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref)
            .then((url) => {
                setStoreageUrl(url)
            })
    });
}

export default function Page({ }) {
    const [storageUrl, setStoreageUrl] = useState("")

    return (
        <>
            <Head>
                <title>Convert Picture To URL</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <main className={styles.container}>
                <input className={styles.input} type="file" onChange={(e) => UploadJson(e, setStoreageUrl)} />
                <h2 className={styles.done}>{storageUrl}</h2>
            </main>
        </>

    )

}