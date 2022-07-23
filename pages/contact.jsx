import styles from '../components/contactPage.module.css'
import { useRouter } from 'next/router'
import { rgba, darken } from 'polished';
import React, { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { UserContext } from '../lib/context'
import { firestore } from '../lib/firebase'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useContext } from 'react'

function useWindowDimensions() {

    const hasWindow = typeof window !== 'undefined';

    function getWindowDimensions() {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;
        return {
            width,
            height,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow]);

    return windowDimensions;
}
function getDifferenceInHours(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60);
}

export default function Page({ }) {
    const aspect_ratio = useWindowDimensions().width / useWindowDimensions().height
    const { width, height } = useWindowDimensions()
    const router = useRouter()
    const query = router.query
    useEffect(() => {
        setVertical(width / height > 1 ? false : true)
        //calcuted usising quardanates of width and what length should be at the two main aspect ratios then putting it into a linerar formula
        setlength((-.0000003030303030303 * width) + 0.001195757575758)
    }, [width, height])
    const [vertical, setVertical] = useState(false)
    const [email, setEmail] = useState(query.email)
    const [name, setName] = useState(query.name)
    const [subject, setSubject] = useState(query.subject)
    const [body, setBody] = useState()
    const [length, setlength] = useState(.0001)
    console.log(length)
    const longShadow = (color, total = 4000, dark = 0.00125) => {
        let val = `0px 0px ${color}`
        total = total;
        let amt = 0.325;
        for (var i = 0; i < total; i++) {
            val += `, ${-i}px ${i}px ${darken(amt, color)}`
            amt += dark
        }
        return val;
    }
    const { user, username } = useContext(UserContext);

    const sendEmail = async (e) => {
        e.preventDefault();
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
        let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!user) {
            if (getDifferenceInHours(new Date(docSnap.data().emailTime), new Date()) > 24) {
                if (email.match(regexEmail)) {
                    toast.success('Message Sent')
                    setDoc(docRef, { emailTime: (new Date()).toLocaleDateString() }, { merge: true });
                    emailjs.sendForm('service_xhe5u5g', 'template_r4slb0e', form.current, 'eExXGPoAtphOwzk6q')
                    router.push("/")
                }
                else {
                    toast.error('Invalid Email')
                }
            }
            else {
                toast.error('Sorry we have to limit you to one email per day')
            }
        }
        else{
            toast.error('Account required for message')
        }

    };
    const form = useRef();
    return (
        <main className={styles.main}>
            <div className={styles.contact}>
                <h1 style={{ textShadow: `${longShadow(rgba(95, 242, 255, 0.6), 4000, length,)}` }}>Contact Me</h1>
            </div>
            <form ref={form} onSubmit={sendEmail} className={styles.form}>
                <input placeholder='Name' onChange={(e) => setName(e.target.value)} name="name" value={name} className={styles.formInput} />
                <input placeholder='Subject' onChange={(e) => setSubject(e.target.value)} name="subject" value={subject} className={styles.formInput} />
                <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} name="email" value={email} className={styles.formInput} />
                <button className={styles.formSubmitButton}>Submit</button>
                <textarea placeholder='Message' onChange={(e) => setBody(e.target.value)} name="message" value={body} className={styles.formMainBody}></textarea>
            </form>
        </main>
    )
}