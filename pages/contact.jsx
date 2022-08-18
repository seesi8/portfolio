import styles from '../components/contactPage.module.css'
import { useRouter } from 'next/router'
import { rgba, darken } from 'polished';
import React, { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import Head from 'next/head'
import { UserContext, ThemeContext } from '../lib/context'
import { firestore } from '../lib/firebase'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useContext } from 'react'



function getDifferenceInHours(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60);
}

function longShadow(color, total = 4000, dark = 0.00125) {
    let pixel = `0px 0px ${color}`
    let pointer = 0.325;
    for (var i = 0; i < total; i++) {
        pixel += `, ${-i}px ${i}px ${darken(pointer, color)}`
        pointer += dark
    }
    return pixel;
}

async function sendEmail(e, form, user, router) {
    e.preventDefault();

    if (!user) {
        toast.error('Account required for message')
        return
    }

    const userRef = doc(firestore, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (getDifferenceInHours(new Date(userSnap.data().emailTime), new Date()) <= 24) {
        toast.error('Sorry we have to limit you to one email per day')
        return
    }

    let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!form.current.email.value.match(regexEmail)) {
        toast.error('Invalid Email')
        return
    }

    // update time since last message
    setDoc(userRef, { emailTime: (new Date()).toLocaleDateString() }, { merge: true });
    
    //send email
    emailjs.sendForm('service_xhe5u5g', 'template_r4slb0e', form.current, 'eExXGPoAtphOwzk6q')
    
    toast.success('Message Sent')
    router.push("/")
    return

};

export default function Contact({ }) {
    const { user, username } = useContext(UserContext);
    const { vertical, width } = useContext(ThemeContext)

    const router = useRouter()
    const query = router.query

    /* form values */
    const [email, setEmail] = useState(query.email)
    const [name, setName] = useState(query.name)
    const [subject, setSubject] = useState(query.subject)
    const [body, setBody] = useState()

    /* dark area calculations for passing into longShadow */
    const [darkArea, setdarkArea] = useState(.0001)
    useEffect(() => {
        //calcuted usising quardanates of width and what length should be at the two main aspect ratios then putting it into a linerar formula
        setdarkArea((-.0000003030303030303 * width) + 0.001195757575758)
    }, [width])

    const form = useRef();

    return (
        <main className={styles.main}>
            <Head>
                <title>Contact Me</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={styles.contact}>
                <h1 style={{ textShadow: `${longShadow(rgba(95, 242, 255, 0.6), 4000, darkArea,)}` }}>Contact Me</h1>
            </div>
            <form ref={form} onSubmit={(e) => sendEmail(e, form, user, router)} className={styles.form}>
                <input required placeholder='Name' onChange={(e) => setName(e.target.value)} name="name" value={name} className={styles.formInput} />
                <input required placeholder='Subject' onChange={(e) => setSubject(e.target.value)} name="subject" value={subject} className={styles.formInput} />
                <input required placeholder='Email' onChange={(e) => setEmail(e.target.value)} name="email" value={email} className={styles.formInput} />
                <button className={styles.formSubmitButton}>Submit</button>
                <textarea required placeholder='Message' onChange={(e) => setBody(e.target.value)} name="message" value={body} className={styles.formMainBody}></textarea>
            </form>
        </main>
    )
}