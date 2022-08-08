import { collection, addDoc, setDoc, doc, getDocs, deleteDoc, query, orderBy, limit } from "firebase/firestore";
import { firestore, firebase, serverTimestamp } from '../lib/firebase';
import { v4 as uuidv4 } from 'uuid';
import kebabCase from 'lodash.kebabcase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";


export default function Page({ }) {
    const [storageUrl, setStoreageUrl] = useState("")
    const UploadJson = async (e) => {
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

    return (
        <main style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <input type="file" onChange={UploadJson} />
            <h2>{storageUrl}</h2>
        </main>
    )

}